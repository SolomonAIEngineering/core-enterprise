# Core Enterprise Helm Charts

Welcome to the **Core Enterprise Helm Charts** repository! This repository contains a collection of Helm charts designed to deploy and manage the various components of the Core Enterprise application across different environments. Helm charts provide a streamlined and repeatable way to define, install, and upgrade Kubernetes applications.

## Table of Contents

1. [Overview](#overview)
2. [Helm Chart Structure](#helm-chart-structure)
3. [Helm Charts Description](#helm-charts-description)
    - [1. `core-enterprise-production`](#1-core-enterprise-production)
    - [2. `sandbox-api`](#2-sandbox-api)
    - [3. `production-worker`](#3-production-worker)
    - [4. `production-github-worker`](#4-production-github-worker)
    - [5. `sandbox-worker`](#5-sandbox-worker)
    - [6. `sandbox-github-worker`](#6-sandbox-github-worker)
4. [Prerequisites](#prerequisites)
5. [Installation](#installation)
6. [Configuration](#configuration)
7. [Usage](#usage)
8. [Best Practices](#best-practices)
9. [Troubleshooting](#troubleshooting)
10. [Contributing](#contributing)
11. [License](#license)

---

## Overview

The Solomon AI Core Enterprise application is composed of multiple services, including APIs, workers, databases, and caching layers. Managing these services individually ensures modularity, scalability, and ease of maintenance. This repository provides Helm charts for each major component, enabling seamless deployment and management in Kubernetes environments.

## Helm Chart Structure

The repository is organized into separate Helm charts for each component and environment. Below is an overview of the directory structure:

```
 core-enterprise-helm-charts/
├── core-enterprise-production/
│   ├── Chart.yaml
│   ├── values.yaml
│   ├── templates/
│   │   ├── deployment.yaml
│   │   ├── service.yaml
│   │   ├── ingress.yaml
│   │   └── _helpers.tpl
│   └── .helmignore
├── sandbox-api/
│   ├── Chart.yaml
│   ├── values.yaml
│   ├── templates/
│   │   ├── deployment.yaml
│   │   ├── service.yaml
│   │   ├── ingress.yaml
│   │   └── _helpers.tpl
│   └── .helmignore
├── production-worker/
│   ├── Chart.yaml
│   ├── values.yaml
│   ├── templates/
│   │   ├── deployment.yaml
│   │   ├── service.yaml
│   │   └── _helpers.tpl
│   └── .helmignore
├── production-github-worker/
│   ├── Chart.yaml
│   ├── values.yaml
│   ├── templates/
│   │   ├── deployment.yaml
│   │   ├── service.yaml
│   │   └── _helpers.tpl
│   └── .helmignore
├── sandbox-worker/
│   ├── Chart.yaml
│   ├── values.yaml
│   ├── templates/
│   │   ├── deployment.yaml
│   │   ├── service.yaml
│   │   └── _helpers.tpl
│   └── .helmignore
├── sandbox-github-worker/
    ├── Chart.yaml
    ├── values.yaml
    ├── templates/
    │   ├── deployment.yaml
    │   ├── service.yaml
    │   └── _helpers.tpl
    └── .helmignore

```

Each directory represents a separate Helm chart tailored for specific components and environments.

## Helm Charts Description

### 1. `core-enterprise-production`

**Purpose:**
Deploys the Production API service, responsible for handling client requests, processing business logic, and interacting with other services like databases and caches.

**Key Features:**
- Image configuration for production.
- Environment-specific variables.
- Ingress setup for domain `api.solomon-ai.app`.
- Health checks and pre-deployment commands.

### 2. `sandbox-api`

**Purpose:**
Deploys the Sandbox API service, used for testing and development purposes without affecting the production environment.

**Key Features:**
- Separate domain `sandbox-api.solomon-ai.app`.
- Environment variables tailored for sandbox operations.
- Reduced instance count for cost efficiency.

### 3. `production-worker`

**Purpose:**
Deploys production worker services that handle background tasks, such as data processing, scheduled jobs, and other asynchronous operations.

**Key Features:**
- Configured for high availability.
- Environment variables for production workloads.
- Scalable instance management.

### 4. `production-github-worker`

**Purpose:**
Deploys production workers specifically designed to interact with GitHub, handling tasks like repository monitoring, webhook processing, and GitHub integrations.

**Key Features:**
- Specialized commands for GitHub-related tasks.
- Environment variables for GitHub authentication and operations.
- Optimized for handling GitHub events.

### 5. `sandbox-worker`

**Purpose:**
Deploys sandbox worker services for testing background tasks in a controlled environment.

**Key Features:**
- Environment variables adjusted for sandbox testing.
- Lower resource allocation for development purposes.
- Isolation from production workloads.

### 6. `sandbox-github-worker`

**Purpose:**
Deploys sandbox workers tailored for GitHub interactions, enabling developers to test GitHub integrations without impacting production.

**Key Features:**
- Configured with sandbox-specific GitHub credentials.
- Safe environment for experimenting with GitHub functionalities.
- Minimal resource usage to reduce costs.

### 7. `redis`

**Purpose:**
Deploys the Redis caching service used by both production and sandbox environments to enhance performance through in-memory data storage.

**Key Features:**
- Configured with `noeviction` policy to prevent data loss.
- Scalable deployment options.
- Centralized caching for multiple services.

### 8. `database`

**Purpose:**
Deploys the PostgreSQL database service, providing persistent storage for application data, including user information, transactions, and other critical data.

**Key Features:**
- Configured with read replicas for high availability and load balancing.
- Adjustable storage and performance settings.
- Environment-specific database configurations.

## Prerequisites

Before deploying the Helm charts, ensure that the following prerequisites are met:

- **Kubernetes Cluster:** A running Kubernetes cluster (v1.16 or later).
- **Helm 3:** Installed and configured on your local machine. [Install Helm](https://helm.sh/docs/intro/install/)
- **kubectl:** Configured to interact with your Kubernetes cluster.
- **Container Registry Access:** Ensure that the Kubernetes cluster can pull images from `ghcr.io` using the provided registry credentials.

## Installation

Follow the steps below to install each Helm chart:

### 1. Add the Helm Repository

If you have a Helm repository hosting these charts, add it using:

```bash
helm repo add core-enterprise-helm-charts https://github.com/SolomonAIEngineering/core-enterprise/charts
helm repo update
```

*If the charts are local, navigate to the specific chart directory.*

### 2. Install the Charts

#### c. Install Production API

```bash
helm install core-enterprise-production core-enterprise-helm-charts/core-enterprise-production --values core-enterprise-production/values.yaml
```

#### d. Install Sandbox API

```bash
helm install sandbox-api core-enterprise-helm-charts/sandbox-api --values sandbox-api/values.yaml
```

#### e. Install Production Workers

```bash
helm install production-worker core-enterprise-helm-charts/production-worker --values production-worker/values.yaml
```

#### f. Install Production GitHub Workers

```bash
helm install production-github-worker core-enterprise-helm-charts/production-github-worker --values production-github-worker/values.yaml
```

#### g. Install Sandbox Workers

```bash
helm install sandbox-worker core-enterprise-helm-charts/sandbox-worker --values sandbox-worker/values.yaml
```

#### h. Install Sandbox GitHub Workers

```bash
helm install sandbox-github-worker core-enterprise-helm-charts/sandbox-github-worker --values sandbox-github-worker/values.yaml
```

*Note:* Replace ` core-enterprise-helm-charts` with the actual repository name or path if different.

## Configuration

Each Helm chart comes with a `values.yaml` file containing default configurations. You can customize these values to suit your environment by creating separate values files or using the `--set` flag during installation.

### Customizing Values

1. **Create a Custom Values File:**

   For example, to customize the Production API chart:

   ```bash
   cp core-enterprise-production/values.yaml core-enterprise-production/production-values.yaml
   ```

   Edit `production-values.yaml` with your specific configurations.

2. **Install Using the Custom Values File:**

   ```bash
   helm install core-enterprise-production  core-enterprise-helm-charts/core-enterprise-production --values core-enterprise-production/production-values.yaml
   ```

### Environment Variables

Environment variables are defined within each chart's `values.yaml`. Ensure that all necessary variables are correctly set, especially those related to databases, caches, and external services.

### Image Pull Secrets

Ensure that the `imagePullSecrets` are correctly configured to allow Kubernetes to pull images from your container registry.

## Usage

After installation, you can manage your deployments using standard Helm and kubectl commands.

### Common Commands

- **List Installed Releases:**

  ```bash
  helm list
  ```

- **Upgrade a Release:**

  ```bash
  helm upgrade core-enterprise-production  core-enterprise-helm-charts/core-enterprise-production --values core-enterprise-production/production-values.yaml
  ```

- **Uninstall a Release:**

  ```bash
  helm uninstall core-enterprise-production
  ```

- **Check the Status of a Release:**

  ```bash
  helm status core-enterprise-production
  ```

- **View Kubernetes Resources:**

  ```bash
  kubectl get all -l app.kubernetes.io/name=api-service
  ```

## Best Practices

- **Version Control:**
  Keep all Helm charts and their `values.yaml` files under version control to track changes and collaborate effectively.

- **Environment Segregation:**
  Use separate values files for different environments (e.g., production, sandbox) to maintain isolation and prevent configuration drift.

- **Security:**
  Although this setup embeds environment variables directly, it's recommended to use Kubernetes Secrets or external secret management tools to handle sensitive data securely.

- **Automated Deployments:**
  Integrate Helm chart deployments into your CI/CD pipeline (e.g., using GitHub Actions) to automate and streamline the deployment process.

- **Resource Management:**
  Define appropriate resource requests and limits in the `values.yaml` to ensure efficient utilization and prevent resource contention.

- **Monitoring and Logging:**
  Implement monitoring (e.g., Prometheus) and logging (e.g., ELK Stack) to gain insights into application performance and troubleshoot issues effectively.

## Troubleshooting

- **Pods Not Starting:**
  - Check pod logs for errors:
    ```bash
    kubectl logs <pod-name>
    ```
  - Verify environment variables and configurations.

- **Service Not Accessible:**
  - Ensure Ingress resources are correctly configured.
  - Check if the Ingress controller is running and properly routing traffic.

- **Image Pull Issues:**
  - Verify that `imagePullSecrets` are correctly set and contain valid credentials.
  - Ensure the container registry is accessible from your Kubernetes cluster.

- **Database Connection Problems:**
  - Confirm that the database service is running and accessible.
  - Verify that the correct host, port, and credentials are set in environment variables.

## Contributing

Contributions are welcome! To contribute to the Solomon AI Core Enterprise Helm Charts repository, follow these steps:

1. **Fork the Repository:**

   Click the "Fork" button at the top-right corner of the repository page.

2. **Clone Your Fork:**

   ```bash
   git clone https://github.com/your-username/ core-enterprise-helm-charts.git
   ```

3. **Create a Feature Branch:**

   ```bash
   git checkout -b feature/your-feature-name
   ```

4. **Make Your Changes:**

   Implement your feature or fix issues within the appropriate Helm chart directories.

5. **Commit Your Changes:**

   ```bash
   git commit -m "Add feature: your feature description"
   ```

6. **Push to Your Fork:**

   ```bash
   git push origin feature/your-feature-name
   ```

7. **Create a Pull Request:**

   Navigate to the original repository and create a pull request from your fork.
