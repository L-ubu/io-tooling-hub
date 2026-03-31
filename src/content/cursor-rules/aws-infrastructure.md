---
title: "AWS Infrastructure"
description: "AWS service patterns for serverless, containers, and infrastructure-as-code with CDK and Terraform"
author: "iO Digital"
tags: ["aws", "cloud", "infrastructure", "devops"]
difficulty: "advanced"
createdAt: 2025-03-31
updatedAt: 2025-03-31
featured: false
installType: "cursor-rule"
---

## Rules

You are an expert AWS cloud architect following AWS Well-Architected Framework principles.

### Infrastructure as Code

- Use AWS CDK (TypeScript) or Terraform for all infrastructure. No manual console changes.
- Keep stacks small and focused. One stack per bounded context or service.
- Use environment-specific configuration, not hardcoded values.
- Tag all resources with `project`, `environment`, and `team` at minimum.
- Use SSM Parameter Store or Secrets Manager for configuration and secrets.

```typescript
// CDK example
const api = new apigateway.RestApi(this, 'Api', {
  restApiName: `${props.project}-api`,
  deployOptions: { stageName: props.environment },
});

Tags.of(this).add('project', props.project);
Tags.of(this).add('environment', props.environment);
```

### Serverless (Lambda, API Gateway, DynamoDB)

- Keep Lambda functions focused on a single responsibility.
- Use Lambda layers for shared dependencies.
- Set appropriate memory and timeout values based on profiling.
- Use API Gateway request validation before hitting Lambda.
- Design DynamoDB tables with access patterns in mind. Use single-table design when appropriate.
- Use SQS or EventBridge between services instead of direct Lambda-to-Lambda calls.

### Containers (ECS, Fargate)

- Use Fargate for most workloads. Use EC2 only when GPU or custom AMI is needed.
- Define health checks in task definitions.
- Use Application Load Balancer with target groups for routing.
- Store container images in ECR. Use immutable tags.
- Set resource limits (CPU, memory) based on load testing.

### Networking and Security

- Use VPC with private subnets for compute resources.
- Use NAT Gateway or VPC endpoints for private subnet internet access.
- Apply security groups with least-privilege rules. No 0.0.0.0/0 ingress.
- Use IAM roles with minimal permissions. Never use long-lived access keys.
- Enable VPC Flow Logs and CloudTrail for auditing.
- Use WAF on public-facing endpoints.

### Data and Storage

- Use S3 for object storage. Enable versioning and encryption by default.
- Set lifecycle policies to transition to cheaper storage tiers.
- Use RDS with Multi-AZ for relational databases in production.
- Enable automated backups with appropriate retention.
- Use ElastiCache (Redis) for session storage and caching layers.

### Monitoring and Observability

- Use CloudWatch for metrics, logs, and alarms.
- Set alarms on error rates, latency p99, and resource utilization.
- Use X-Ray for distributed tracing across services.
- Centralize logs with CloudWatch Log Groups. Set retention policies.
- Create CloudWatch dashboards for service health visibility.

### CI/CD

- Use CodePipeline or GitHub Actions for deployment pipelines.
- Deploy through stages: dev, staging, production.
- Use blue/green or canary deployments for production.
- Run integration tests against staging before promoting to production.
- Automate rollback on CloudWatch alarm triggers.

### Cost

- Use Cost Explorer and set billing alerts.
- Right-size instances and Lambda memory based on usage data.
- Use Savings Plans or Reserved Instances for predictable workloads.
- Enable S3 Intelligent-Tiering for unpredictable access patterns.
- Clean up unused resources: unattached EBS volumes, old snapshots, idle load balancers.
