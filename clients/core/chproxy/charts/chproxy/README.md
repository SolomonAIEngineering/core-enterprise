# ClickHouse Proxy Helm Chart

![Version: 0.1.0](https://img.shields.io/badge/Version-0.1.0-informational?style=flat-square) ![Type: application](https://img.shields.io/badge/Type-application-informational?style=flat-square) ![AppVersion: 1.0.0](https://img.shields.io/badge/AppVersion-1.0.0-informational?style=flat-square)

A Helm chart for the ClickHouse Proxy service that provides buffering and batching capabilities for ClickHouse inserts

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

## Values

| Key | Type | Default | Description |
|-----|------|---------|-------------|
| affinity | object | `{}` |  |
| autoscaling.annotations | object | `{}` |  |
| autoscaling.customMetrics | list | `[]` |  |
| autoscaling.enabled | bool | `false` |  |
| autoscaling.maxReplicas | int | `5` |  |
| autoscaling.minReplicas | int | `2` |  |
| autoscaling.scaleDown.maxScaleDown | int | `10` |  |
| autoscaling.scaleDown.periodSeconds | int | `60` |  |
| autoscaling.scaleDown.stabilizationWindowSeconds | int | `300` |  |
| autoscaling.scaleUp.maxPods | int | `4` |  |
| autoscaling.scaleUp.maxScaleUp | int | `100` |  |
| autoscaling.scaleUp.periodSeconds | int | `30` |  |
| autoscaling.scaleUp.stabilizationWindowSeconds | int | `60` |  |
| autoscaling.targetCPUUtilizationPercentage | int | `80` |  |
| autoscaling.targetMemoryUtilizationPercentage | int | `80` |  |
| config.flushIntervalSeconds | int | `2` |  |
| config.maxBatchSize | int | `10000` |  |
| config.maxBufferSize | int | `50000` |  |
| deploymentAnnotations | object | `{}` |  |
| env.BASIC_AUTH | string | `""` |  |
| env.CLICKHOUSE_URL | string | `""` |  |
| env.PORT | string | `"7123"` |  |
| extraEnvVars | list | `[]` |  |
| fullnameOverride | string | `""` |  |
| image.pullPolicy | string | `"IfNotPresent"` |  |
| image.repository | string | `"unkeyed/chproxy"` |  |
| image.tag | string | `""` |  |
| imagePullSecrets | list | `[]` |  |
| ingress.annotations | object | `{}` |  |
| ingress.className | string | `""` |  |
| ingress.enabled | bool | `false` |  |
| ingress.hosts[0].host | string | `"chart-example.local"` |  |
| ingress.hosts[0].paths[0].path | string | `"/"` |  |
| ingress.hosts[0].paths[0].pathType | string | `"ImplementationSpecific"` |  |
| ingress.tls | list | `[]` |  |
| livenessProbe.httpGet.path | string | `"/v1/liveness"` |  |
| livenessProbe.httpGet.port | string | `"http"` |  |
| livenessProbe.initialDelaySeconds | int | `10` |  |
| livenessProbe.periodSeconds | int | `30` |  |
| maxSurge | string | `"25%"` |  |
| maxUnavailable | int | `0` |  |
| nameOverride | string | `""` |  |
| nodeSelector | object | `{}` |  |
| podAnnotations | object | `{}` |  |
| podDisruptionBudget.enabled | bool | `true` |  |
| podDisruptionBudget.minAvailable | int | `1` |  |
| podLabels | object | `{}` |  |
| podSecurityContext | object | `{}` |  |
| priorityClassName | string | `""` |  |
| readinessProbe.httpGet.path | string | `"/v1/liveness"` |  |
| readinessProbe.httpGet.port | string | `"http"` |  |
| readinessProbe.initialDelaySeconds | int | `5` |  |
| readinessProbe.periodSeconds | int | `10` |  |
| replicaCount | int | `1` |  |
| resources.limits.cpu | string | `"500m"` |  |
| resources.limits.memory | string | `"512Mi"` |  |
| resources.requests.cpu | string | `"200m"` |  |
| resources.requests.memory | string | `"256Mi"` |  |
| revisionHistoryLimit | int | `3` |  |
| securityContext | object | `{}` |  |
| service.port | int | `7123` |  |
| service.type | string | `"ClusterIP"` |  |
| serviceAccount.annotations | object | `{}` |  |
| serviceAccount.automount | bool | `true` |  |
| serviceAccount.create | bool | `true` |  |
| serviceAccount.name | string | `""` |  |
| terminationGracePeriodSeconds | int | `60` |  |
| tolerations | list | `[]` |  |
| volumeMounts | list | `[]` |  |
| volumes | list | `[]` |  |

----------------------------------------------
Autogenerated from chart metadata using [helm-docs v1.11.0](https://github.com/norwoodj/helm-docs/releases/v1.11.0)