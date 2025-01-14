#!/bin/bash

# Stop all running containers
echo "Stopping all running containers..."
docker stop $(docker ps -aq)

# Remove all containers
echo "Removing all containers..."
docker rm $(docker ps -aq)

# Remove all images
echo "Removing all images..."
docker rmi $(docker images -q)

# Remove all volumes
echo "Removing all volumes..."
docker volume rm $(docker volume ls -q)

# Remove all networks
echo "Removing all networks..."
docker network rm $(docker network ls -q)

# Remove all build cache
echo "Removing build cache..."
docker builder prune -f

echo "Docker cleanup complete!"
