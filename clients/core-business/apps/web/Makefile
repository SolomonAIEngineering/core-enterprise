.PHONY: setup start stop restart clean logs status help

# Default target
help:
	@echo "Available commands:"
	@echo "  make setup   - Initial setup: clone repo, copy env file, and pull images"
	@echo "  make start   - Start all services in detached mode"
	@echo "  make stop    - Stop all services"
	@echo "  make restart - Restart all services"
	@echo "  make clean   - Stop services and remove volumes"
	@echo "  make logs    - View logs from all services"
	@echo "  make status  - Check status of all services"

# Initial setup
setup:
	cd supabase/docker && docker compose pull

# Start services
start: setup
	cd supabase/docker && docker compose up -d 

start-foreground: setup
	cd supabase/docker && docker compose up

# Stop services
stop:
	cd supabase/docker && docker compose stop

# Restart services
restart:
	cd supabase/docker && docker compose down
	cd supabase/docker && docker compose up -d

# Clean everything
clean:
	cd supabase/docker && docker compose down -v
	rm -rf supabase/docker/volumes/db/data/

# View logs
logs:
	cd supabase/docker && docker compose logs -f

# Check status
status:
	cd supabase/docker && docker compose ps 