#!/bin/bash

# Function to check if Docker is running
check_docker() {
    if ! docker info > /dev/null 2>&1; then
        echo "Docker is not running. Attempting to start Docker Desktop..."

        # Start Docker Desktop on macOS
        open -a Docker

        # Wait for Docker to start (timeout after 60 seconds)
        echo "Waiting for Docker to start..."
        for i in {1..60}; do
            if docker info > /dev/null 2>&1; then
                echo "Docker is now running!"
                return 0
            fi
            sleep 1
            echo -n "."
        done

        echo "\nTimeout: Docker did not start within 60 seconds. Please start Docker Desktop manually."
        exit 1
    fi
    echo "Docker is running"
}

# Main execution
check_docker
