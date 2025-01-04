# ClickHouse Proxy

Our ClickHouse Proxy is a Go application running on AWS AppRunner that batches and forwards data to ClickHouse. It implements ClickHouse's HTTP interface to buffer rows in memory and periodically flush them in bulk.

The proxy is accessible at `clickhouse.unkey.cloud`.

Read more: [Architecture Documentation](https://engineering.unkey.com/docs/architecture/clickhouse-proxy)

## Features

- Implements ClickHouse HTTP interface
- Buffers rows in memory
- Periodic flushing (time-based or buffer-full)
- Optional usage in development

## Configuration

The service is configured entirely through environment variables:

| Variable | Required | Type | Default | Description |
|----------|----------|------|---------|-------------|
| `PORT` | No | integer | 7123 | The port to listen on |
| `BASIC_AUTH` | Yes | string | - | Auth credentials in format `<username>:<password>` |
| `CLICKHOUSE_URL` | Yes | string | - | ClickHouse cluster HTTP URL with credentials |

### Basic Auth
Basic auth was chosen for compatibility with ClickHouse SDKs. Configure your SDK URL as:
https://proxyUser:proxyPassword@host:port

### ClickHouse URL Example
https://username:password@abc.us-east-1.aws.clickhouse.cloud:8123

## Development

### Running Locally

Using Go:
```bash
cd /apps/chproxy
go build -o chproxy .
./chproxy
```

Using Docker:
- Refer to the docker-compose reference for container setup

## Infrastructure

The ClickHouse proxy is fully managed in the [unkeyed/infra](https://github.com/unkeyed/infra) repository.

## Usage in API

Enable the proxy in development by setting the `CLICKHOUSE_INSERT_URL` environment variable.

```bash
export CLICKHOUSE_INSERT_URL=http://localhost:7123
```
