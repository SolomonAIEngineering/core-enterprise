package main

import (
	"bytes"
	"context"
	"encoding/base64"
	"fmt"
	"io"
	"net/http"
	"net/http/httptest"
	"net/url"
	"os"
	"strings"
	"testing"
	"time"

	"github.com/testcontainers/testcontainers-go"
	"github.com/testcontainers/testcontainers-go/wait"
)

// Add this function at the top of the test file
func initVars(clickhouseURL, basicAuth, port string) {
	// Set environment variables
	if clickhouseURL != "" {
		os.Setenv("CLICKHOUSE_URL", clickhouseURL)
		CLICKHOUSE_URL = clickhouseURL
	}
	if basicAuth != "" {
		os.Setenv("BASIC_AUTH", basicAuth)
		BASIC_AUTH = basicAuth
	}
	if port != "" {
		os.Setenv("PORT", port)
		PORT = port
	}
}

// setupClickHouse creates a ClickHouse container for testing
func setupClickHouse(t *testing.T) (string, func()) {
	ctx := context.Background()

	req := testcontainers.ContainerRequest{
		Image:        "clickhouse/clickhouse-server:latest",
		ExposedPorts: []string{"8123/tcp", "9000/tcp"},
		WaitingFor: wait.ForAll(
			wait.ForHTTP("/").
				WithPort("8123/tcp").
				WithStatusCodeMatcher(func(status int) bool {
					return status == http.StatusOK
				}).
				WithStartupTimeout(30 * time.Second),
		),
		Env: map[string]string{
			"CLICKHOUSE_USER":                      "default",
			"CLICKHOUSE_PASSWORD":                  "default",
			"CLICKHOUSE_DB":                        "test",
			"CLICKHOUSE_DEFAULT_ACCESS_MANAGEMENT": "1",
			"CLICKHOUSE_HTTP_PORT":                 "8123",
			"CLICKHOUSE_TCP_PORT":                  "9000",
		},
	}

	container, err := testcontainers.GenericContainer(ctx, testcontainers.GenericContainerRequest{
		ContainerRequest: req,
		Started:          true,
	})
	if err != nil {
		t.Fatalf("Failed to start container: %s", err)
	}

	// Add context with timeout for container operations
	timeoutCtx, cancel := context.WithTimeout(ctx, 30*time.Second)
	defer cancel()

	// Get the container's host and port
	host, err := container.Host(timeoutCtx)
	if err != nil {
		t.Fatalf("Failed to get container host: %s", err)
	}

	port, err := container.MappedPort(timeoutCtx, "8123/tcp")
	if err != nil {
		t.Fatalf("Failed to get container port: %s", err)
	}

	clickhouseURL := fmt.Sprintf("http://default:default@%s:%s", host, port.Port())

	cleanup := func() {
		timeoutCtx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
		defer cancel()
		if err := container.Terminate(timeoutCtx); err != nil {
			t.Fatalf("Failed to terminate container: %s", err)
		}
	}

	// Wait for ClickHouse to be really ready
	retries := 5
	for i := 0; i < retries; i++ {
		pingURL := fmt.Sprintf("%s?query=%s", clickhouseURL, url.QueryEscape("SELECT 1"))
		resp, err := http.Get(pingURL)
		if err == nil && resp.StatusCode == http.StatusOK {
			break
		}
		if i == retries-1 {
			cleanup()
			t.Fatalf("ClickHouse not ready after %d retries", retries)
		}
		time.Sleep(2 * time.Second)
	}

	// Create test table
	createTableURL := fmt.Sprintf("%s?query=%s", clickhouseURL, url.QueryEscape(
		"CREATE TABLE IF NOT EXISTS test_table (id UInt32, name String) ENGINE = MergeTree() ORDER BY id",
	))
	resp, err := http.Post(createTableURL, "text/plain", nil)
	if err != nil || resp.StatusCode != http.StatusOK {
		cleanup()
		t.Fatalf("Failed to create test table: %v", err)
	}

	return clickhouseURL, cleanup
}

func TestInit(t *testing.T) {
	tests := []struct {
		name        string
		envVars     map[string]string
		shouldError bool
	}{
		{
			name: "valid configuration",
			envVars: map[string]string{
				"CLICKHOUSE_URL": "http://user:pass@localhost:8123",
				"BASIC_AUTH":     "user:pass",
				"PORT":           "7123",
			},
			shouldError: false,
		},
		{
			name: "missing CLICKHOUSE_URL",
			envVars: map[string]string{
				"BASIC_AUTH": "user:pass",
				"PORT":       "7123",
			},
			shouldError: true,
		},
		{
			name: "missing BASIC_AUTH",
			envVars: map[string]string{
				"CLICKHOUSE_URL": "http://user:pass@localhost:8123",
				"PORT":           "7123",
			},
			shouldError: true,
		},
		{
			name: "default PORT",
			envVars: map[string]string{
				"CLICKHOUSE_URL": "http://user:pass@localhost:8123",
				"BASIC_AUTH":     "user:pass",
			},
			shouldError: false,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			// Clear environment
			os.Clearenv()

			// Set test environment variables
			for k, v := range tt.envVars {
				os.Setenv(k, v)
			}

			err := initConfig()
			if tt.shouldError {
				if err == nil {
					t.Error("initConfig() should have returned an error")
				}
			} else {
				if err != nil {
					t.Errorf("initConfig() unexpected error: %v", err)
				}
				if tt.envVars["PORT"] == "" && PORT != "7123" {
					t.Errorf("PORT should default to 7123, got %s", PORT)
				}
			}
		})
	}
}

func TestPersist(t *testing.T) {
	clickhouseURL, cleanup := setupClickHouse(t)
	defer cleanup()

	// Set environment variables for test
	os.Setenv("CLICKHOUSE_URL", clickhouseURL)
	os.Setenv("BASIC_AUTH", "user:pass")
	if err := initConfig(); err != nil {
		t.Fatalf("Failed to initialize config: %v", err)
	}

	tests := []struct {
		name    string
		batch   *Batch
		wantErr bool
	}{
		{
			name: "valid batch",
			batch: &Batch{
				Rows: []string{"(1,'test')", "(2,'test2')"},
				Params: url.Values{
					"query": []string{"INSERT INTO test_table (id, name) VALUES"},
				},
			},
			wantErr: false,
		},
		{
			name: "empty batch",
			batch: &Batch{
				Rows:   []string{},
				Params: url.Values{},
			},
			wantErr: false,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			err := persist(tt.batch)
			if (err != nil) != tt.wantErr {
				t.Errorf("persist() error = %v, wantErr %v", err, tt.wantErr)
			}

			if len(tt.batch.Rows) > 0 {
				// Verify data was inserted
				queryURL := fmt.Sprintf("%s?query=%s", clickhouseURL, url.QueryEscape(
					"SELECT COUNT(*) FROM test_table",
				))
				resp, err := http.Get(queryURL)
				if err != nil {
					t.Fatalf("Failed to query data: %v", err)
				}
				body, _ := io.ReadAll(resp.Body)
				if !strings.Contains(string(body), "2") { // We expect 2 rows
					t.Errorf("Expected 2 rows, got response: %s", string(body))
				}
			}
		})
	}
}

func TestHandleRequest(t *testing.T) {
	clickhouseURL, cleanup := setupClickHouse(t)
	defer cleanup()

	// Create buffer channel for test
	buffer := make(chan *Batch, MAX_BUFFER_SIZE)
	defer close(buffer)

	// Set environment variables
	os.Setenv("CLICKHOUSE_URL", clickhouseURL)
	os.Setenv("BASIC_AUTH", "user:pass")
	if err := initConfig(); err != nil {
		t.Fatalf("Failed to initialize config: %v", err)
	}

	requiredAuthorization := "Basic " + base64.StdEncoding.EncodeToString([]byte(BASIC_AUTH))

	tests := []struct {
		name         string
		method       string
		path         string
		query        string
		body         string
		auth         string
		expectedCode int
		expectedBody string
	}{
		{
			name:         "valid insert request",
			method:       "POST",
			path:         "/",
			query:        "INSERT INTO test_table (id, name) VALUES",
			body:         "(1,'test')\n(2,'test2')",
			auth:         "Basic " + base64.StdEncoding.EncodeToString([]byte("user:pass")),
			expectedCode: http.StatusOK,
			expectedBody: "ok",
		},
		{
			name:         "missing auth",
			method:       "POST",
			path:         "/",
			query:        "INSERT INTO test_table (id, name) VALUES",
			body:         "(1,'test')",
			auth:         "",
			expectedCode: http.StatusUnauthorized,
			expectedBody: "unauthorized\n",
		},
		{
			name:         "invalid query",
			method:       "POST",
			path:         "/",
			query:        "SELECT * FROM test_table",
			body:         "1,'test'",
			auth:         "Basic " + base64.StdEncoding.EncodeToString([]byte("user:pass")),
			expectedCode: http.StatusBadRequest,
			expectedBody: "wrong query\n",
		},
		{
			name:         "health check",
			method:       "GET",
			path:         "/v1/liveness",
			expectedCode: http.StatusOK,
			expectedBody: "ok",
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			// Create test server
			handler := http.NewServeMux()
			handler.HandleFunc("/v1/liveness", func(w http.ResponseWriter, r *http.Request) {
				w.Write([]byte("ok"))
			})
			// Create handler closure with buffer
			handleRequest := func(w http.ResponseWriter, r *http.Request) {
				if r.Method == "GET" {
					http.Error(w, "method not allowed", http.StatusMethodNotAllowed)
					return
				}

				if r.Header.Get("Authorization") != requiredAuthorization {
					http.Error(w, "unauthorized", http.StatusUnauthorized)
					return
				}

				params := r.URL.Query()
				query := params.Get("query")
				if query == "" || !strings.HasPrefix(strings.ToLower(query), "insert into") {
					http.Error(w, "wrong query", http.StatusBadRequest)
					return
				}

				// Read and validate body
				body, err := io.ReadAll(r.Body)
				if err != nil {
					http.Error(w, "cannot read body", http.StatusInternalServerError)
					return
				}

				buffer <- &Batch{
					Params: params,
					Rows:   strings.Split(string(body), "\n"),
				}

				w.Write([]byte("ok"))
			}
			handler.HandleFunc("/", handleRequest)

			server := httptest.NewServer(handler)
			defer server.Close()

			// Create request
			reqURL := fmt.Sprintf("%s%s", server.URL, tt.path)
			if tt.query != "" {
				reqURL = fmt.Sprintf("%s?query=%s", reqURL, url.QueryEscape(tt.query))
			}

			req, err := http.NewRequest(tt.method, reqURL, bytes.NewBufferString(tt.body))
			if err != nil {
				t.Fatal(err)
			}

			if tt.auth != "" {
				req.Header.Set("Authorization", tt.auth)
			}
			if tt.method == "POST" {
				req.Header.Set("Content-Type", "text/plain")
			}

			// Send request
			client := &http.Client{Timeout: time.Second * 10}
			resp, err := client.Do(req)
			if err != nil {
				t.Fatal(err)
			}
			defer resp.Body.Close()

			// Check response
			if resp.StatusCode != tt.expectedCode {
				t.Errorf("Expected status code %d, got %d", tt.expectedCode, resp.StatusCode)
			}

			body, err := io.ReadAll(resp.Body)
			if err != nil {
				t.Fatal(err)
			}

			if string(body) != tt.expectedBody {
				t.Errorf("Expected body %q, got %q", tt.expectedBody, string(body))
			}
		})
	}
}
