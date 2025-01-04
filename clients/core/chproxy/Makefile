# Variables
HELM_VERSION := v3.13.0
CHART_DIR := charts/chproxy
GO_FILES := $(shell find . -name '*.go')
GOLANGCI_LINT_VERSION := v1.55.2

# Colors for terminal output
COLOR_GREEN=\033[0;32m
COLOR_RED=\033[0;31m
COLOR_RESET=\033[0m

.PHONY: all
all: lint test

# Go related targets
.PHONY: go-lint
go-lint:
	@echo "$(COLOR_GREEN)Running Go linter...$(COLOR_RESET)"
	@if ! command -v golangci-lint &> /dev/null; then \
		curl -sSfL https://raw.githubusercontent.com/golangci/golangci-lint/master/install.sh | sh -s -- -b $$(go env GOPATH)/bin $(GOLANGCI_LINT_VERSION); \
	fi
	golangci-lint run ./...

.PHONY: go-test
go-test:
	@echo "$(COLOR_GREEN)Running Go tests...$(COLOR_RESET)"
	go test -v -race ./...

.PHONY: go-build
go-build:
	@echo "$(COLOR_GREEN)Building Go binary...$(COLOR_RESET)"
	go build -o bin/chproxy ./main.go

# Helm related targets
.PHONY: helm-lint
helm-lint:
	@echo "$(COLOR_GREEN)Linting Helm chart...$(COLOR_RESET)"
	helm lint $(CHART_DIR)

.PHONY: helm-template
helm-template:
	@echo "$(COLOR_GREEN)Validating Helm templates...$(COLOR_RESET)"
	helm template $(CHART_DIR)

.PHONY: helm-install-test
helm-install-test:
	@echo "$(COLOR_GREEN)Testing Helm chart installation...$(COLOR_RESET)"
	helm install --dry-run --debug test $(CHART_DIR)

.PHONY: helm-deps
helm-deps:
	@echo "$(COLOR_GREEN)Updating Helm dependencies...$(COLOR_RESET)"
	helm dependency update $(CHART_DIR)

# Combined targets
.PHONY: lint
lint: go-lint helm-lint
	@echo "$(COLOR_GREEN)All linting passed!$(COLOR_RESET)"

.PHONY: test
test: go-test helm-template helm-install-test
	@echo "$(COLOR_GREEN)All tests passed!$(COLOR_RESET)"

# Clean up
.PHONY: clean
clean:
	@echo "$(COLOR_GREEN)Cleaning up...$(COLOR_RESET)"
	rm -rf bin/
	rm -rf $(CHART_DIR)/charts/
	rm -rf $(CHART_DIR)/*.tgz

.PHONY: docs
docs:
	helm-docs --template-files ./charts/chproxy/README.tpl
	
# Help target
.PHONY: help
help:
	@echo "Available targets:"
	@echo "  all              - Run all lint and test targets"
	@echo "  go-lint          - Run Go linter"
	@echo "  go-test          - Run Go tests"
	@echo "  go-build         - Build Go binary"
	@echo "  helm-lint        - Lint Helm chart"
	@echo "  helm-template    - Validate Helm templates"
	@echo "  helm-install-test- Test Helm chart installation"
	@echo "  helm-deps        - Update Helm dependencies"
	@echo "  lint             - Run all linters"
	@echo "  test             - Run all tests"
	@echo "  clean            - Clean up build artifacts"
	@echo "  help             - Show this help message"

# Version information
.PHONY: version
version:
	@echo "Go version: $$(go version)"
	@echo "Helm version: $$(helm version --short)"
	@if command -v golangci-lint &> /dev/null; then echo "golangci-lint version: $$(golangci-lint --version)"; fi