.PHONY: setup dev test lint migrate worker verify-github docker-up docker-down

# Default Python command - using uv
PYTHON_CMD = uv run

setup: docker-up
	cp -n .env.template .env || true
	$(PYTHON_CMD) sync
	$(PYTHON_CMD) task generate_dev_jwks || true
	$(PYTHON_CMD) task db_migrate

# Start all development services
dev: docker-up
	$(PYTHON_CMD) task api

# Start the worker
worker:
	$(PYTHON_CMD) task worker

# Run tests
test:
	$(PYTHON_CMD) task test

# Run linter
lint:
	$(PYTHON_CMD) task lint

# Run database migrations
migrate:
	$(PYTHON_CMD) task db_migrate

# Verify GitHub app configuration
verify-github:
	$(PYTHON_CMD) task verify_github_app

# Start Docker services
docker-up:
	docker compose up -d

# Stop Docker services
docker-down:
	docker compose down

# Create a new migration (usage: make new-migration m="description")
new-migration:
	alembic revision --autogenerate -m "$(m)" 

# Format code
format:
	$(PYTHON_CMD) -m ruff format .
	$(PYTHON_CMD) -m ruff check --fix .

# Type checking
typecheck:
	$(PYTHON_CMD) -m mypy polar/ scripts/ polar_backoffice/

# Comprehensive pre-commit check
precommit: format lint typecheck test
	@echo "All checks passed! 🚀"