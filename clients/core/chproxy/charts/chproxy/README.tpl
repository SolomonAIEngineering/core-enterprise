# ClickHouse Proxy Helm Chart

{{ template "chart.deprecationWarning" . }}

{{ template "chart.badgesSection" . }}

{{ template "chart.description" . }}

## TL;DR 

```bash
helm repo add solomon-ai https://solomon-ai.github.io/helm-charts
helm install chproxy solomon-ai/chproxy
```

## Introduction

This chart bootstraps a ClickHouse Proxy deployment on a Kubernetes cluster using the Helm package manager. The proxy provides buffering and batching capabilities for ClickHouse inserts, improving write performance and reducing load on the database.

## Prerequisites

- Kubernetes 1.19+
- Helm 3.2.0+
- ClickHouse instance

## Installing the Chart

To install the chart with the release name `my-release`:

```bash
helm install my-release solomon-ai/chproxy
```

The command deploys ClickHouse Proxy on the Kubernetes cluster with default configuration. The [Parameters](#parameters) section lists the parameters that can be configured during installation.

## Uninstalling the Chart

To uninstall/delete the `my-release` deployment:

```bash
helm delete my-release
```

## Parameters

### Global parameters

| Name                | Description                                  | Value |
|--------------------|----------------------------------------------|-------|
| `nameOverride`     | String to partially override common.names.name | `""` |
| `fullnameOverride` | String to fully override common.names.fullname| `""` |

### Image parameters

| Name               | Description                        | Value |
|--------------------|------------------------------------|-------|
| `image.repository` | ClickHouse Proxy image repository  | `unkeyed/chproxy` |
| `image.tag`        | ClickHouse Proxy image tag         | `""` |
| `image.pullPolicy` | ClickHouse Proxy image pull policy | `IfNotPresent` |

### Application parameters

| Name                    | Description                          | Value |
|------------------------|--------------------------------------|-------|
| `env.CLICKHOUSE_URL`   | ClickHouse server URL (required)     | `""` |
| `env.BASIC_AUTH`       | Basic auth credentials (required)    | `""` |
| `env.PORT`             | Proxy listen port                    | `7123` |
| `config.maxBufferSize` | Maximum number of rows to buffer     | `50000` |
| `config.maxBatchSize`  | Maximum batch size for inserts       | `10000` |
| `config.flushInterval` | Flush interval in seconds            | `2` |

### Deployment parameters

| Name                                 | Description                    | Value |
|--------------------------------------|--------------------------------|-------|
| `replicaCount`                       | Number of replicas             | `1` |
| `resources.limits.cpu`               | CPU resource limits            | `500m` |
| `resources.limits.memory`            | Memory resource limits         | `512Mi` |
| `resources.requests.cpu`             | CPU resource requests          | `200m` |
| `resources.requests.memory`          | Memory resource requests       | `256Mi` |
| `autoscaling.enabled`                | Enable autoscaling             | `false` |
| `autoscaling.minReplicas`           | Minimum number of replicas     | `2` |
| `autoscaling.maxReplicas`           | Maximum number of replicas     | `5` |

{{ template "chart.requirementsSection" . }}

{{ template "chart.valuesSection" . }}

{{ template "helm-docs.versionFooter" . }}