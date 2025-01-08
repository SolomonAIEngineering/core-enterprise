# Supabase Docker

This repository contains a Docker Compose setup for self-hosting Supabase, an open-source alternative to Firebase. This setup includes all necessary services to run a full Supabase instance locally or in production.

## Prerequisites

- Docker and Docker Compose installed
- Git
- Make (optional, but recommended)

## Quick Start

1. Clone and setup the environment:
```bash
make setup
```

2. Start all services:
```bash
make start
```

## Available Commands

The following Make commands are available for easy management:

- `make setup` - Initial setup: clones repo, copies env file, and pulls images
- `make start` - Start all services in detached mode
- `make stop` - Stop all services
- `make restart` - Restart all services
- `make clean` - Stop services and remove volumes
- `make logs` - View logs from all services
- `make status` - Check status of all services

## Configuration

Before running in production, make sure to:

1. Copy `.env.example` to `.env`
2. Modify the following security-critical variables in `.env`:
   - `POSTGRES_PASSWORD`
   - `JWT_SECRET`
   - `ANON_KEY`
   - `SERVICE_ROLE_KEY`
   - `DASHBOARD_USERNAME`
   - `DASHBOARD_PASSWORD`

## Services Included

- Supabase Studio (Dashboard)
- PostgreSQL Database
- PostgREST
- GoTrue (Auth)
- Realtime
- Storage
- Meta API

## Additional Features

- S3 compatible object storage (see `docker-compose.s3.yml`)
- Development helpers in the `dev/` directory
- Volume persistence in `volumes/` directory

## Documentation

For more detailed information about self-hosting Supabase, visit the [official documentation](https://supabase.com/docs/guides/hosting/docker).

## Support

For issues and support, please refer to:
- [Supabase GitHub Repository](https://github.com/supabase/supabase)
- [Supabase Documentation](https://supabase.com/docs)
