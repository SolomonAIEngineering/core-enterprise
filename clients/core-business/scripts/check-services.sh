#!/bin/bash

# Function to check if database services are ready
check_database_services() {
    echo "Checking database services..."

    # Initial wait to give services time to start
    echo "Waiting 10 seconds for initial service startup..."
    sleep 10

    # Try to connect to MySQL (retry for 60 seconds)
    echo "Waiting for MySQL to be ready..."
    for i in {1..5}; do
        # Try to connect with mysql client, showing the error if it fails
        mysql_output=$(mysql -h127.0.0.1 -P3306 -uroot --protocol=TCP planetscale -e "SELECT 1" 2>&1)
        if [ $? -eq 0 ]; then
            echo "MySQL is ready!"
            break
        fi

        # If connection failed, show the error
        echo "Connection attempt $i failed with error: $mysql_output"

        # Show container status
        echo "Container status:"
        docker ps | grep mysql

        # Show recent logs
        echo "Recent container logs:"
        docker logs $(docker ps -q --filter "name=ps-mysql") --tail 5

        if [ $i -eq 60 ]; then
            echo "MySQL did not become ready in time"
            echo "Last MySQL container status:"
            docker ps | grep mysql
            echo "Last MySQL logs:"
            docker logs $(docker ps -q --filter "name=ps-mysql") --tail 20
            exit 1
        fi
        sleep 1
        echo -n "."
    done

    # Try to connect to PlanetScale HTTP Simulator (retry for 60 seconds)
    echo "Waiting for PlanetScale HTTP Simulator to be ready..."
    for i in {1..60}; do
        if curl -s http://localhost:3900 >/dev/null 2>&1; then
            echo "PlanetScale HTTP Simulator is ready!"
            return 0
        fi

        if [ $i -eq 60 ]; then
            echo "PlanetScale HTTP Simulator did not become ready in time"
            echo "Last PlanetScale container status:"
            docker ps | grep planetscale-proxy
            echo "Last PlanetScale logs:"
            docker logs $(docker ps -q --filter "name=planetscale-proxy") --tail 20
            exit 1
        fi
        sleep 1
        echo -n "."
    done
}

# Main execution
check_database_services
