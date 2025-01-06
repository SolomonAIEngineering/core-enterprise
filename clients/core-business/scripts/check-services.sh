#!/bin/bash

# Function to check if database services are ready
check_database_services() {
    echo "Checking database services..."

    # Initial wait to give services time to start
    echo "Waiting 10 seconds for initial service startup..."
    sleep 10

    # Try to connect to MySQL and create database if it doesn't exist
    echo "Waiting for MySQL to be ready..."
    for i in {1..5}; do
        # Try to connect and create database using docker exec
        mysql_output=$(docker exec web-ps-mysql-1 mysql -uroot --protocol=TCP -e "CREATE DATABASE IF NOT EXISTS planetscale;" 2>&1)
        if [ $? -eq 0 ]; then
            echo "MySQL is ready and database is created!"
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

        if [ $i -eq 5 ]; then
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

    # Try to connect to PlanetScale HTTP Simulator (retry for 5 seconds)
    echo "Waiting for PlanetScale HTTP Simulator to be ready..."
    for i in {1..5}; do
        # Create the authentication header (base64 encoded username:password)
        auth_header="Basic $(echo -n "root:unused" | base64)"

        response=$(curl -s -w "\n%{http_code}" \
            -H "Authorization: $auth_header" \
            -H "Content-Type: application/json" \
            -H "Accept: application/json" \
            -X POST \
            -d '{"query": "SELECT 1", "database": "planetscale"}' \
            http://localhost:3900/psdb.v1alpha1.Database/Execute 2>&1)

        http_code=$(echo "$response" | tail -n1)
        response_body=$(echo "$response" | head -n1)

        if [ "$http_code" = "200" ] || [ "$http_code" = "204" ]; then
            echo "PlanetScale HTTP Simulator is ready!"
            return 0
        fi

        echo "Connection attempt $i failed. HTTP Code: $http_code"
        echo "Response: $response_body"

        if [ $i -eq 5 ]; then
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
