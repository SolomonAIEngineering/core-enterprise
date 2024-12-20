#!/usr/bin/env python3
import os
import subprocess
from pathlib import Path


def ensure_env_file():
    """Ensure .env file exists"""
    env_template = Path(".env.template")
    env_file = Path(".env")

    if not env_file.exists() and env_template.exists():
        env_file.write_text(env_template.read_text())
        print("Created .env file from template")


def ensure_jwks():
    """Ensure JWKS file exists"""
    try:
        subprocess.run(["uv", "run", "task", "generate_dev_jwks"], check=True)
        print("Generated JWKS file")
    except subprocess.CalledProcessError:
        print("Warning: Failed to generate JWKS file")


def main():
    # Ensure we're in the server directory
    server_dir = Path(__file__).parent.parent
    os.chdir(server_dir)

    ensure_env_file()
    ensure_jwks()

    # Start docker services
    subprocess.run(["docker", "compose", "up", "-d"], check=True)

    # Install dependencies
    subprocess.run(["uv", "sync"], check=True)

    # Run migrations
    subprocess.run(["uv", "run", "task", "db_migrate"], check=True)

    # Start API server
    subprocess.run(["uv", "run", "task", "api"])


if __name__ == "__main__":
    main()
