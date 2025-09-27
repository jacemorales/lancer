# Deployment and CI/CD Guidelines

This document provides a set of guidelines and best practices for setting up Continuous Integration/Continuous Deployment (CI/CD), managing deployment environments, and handling application secrets.

---

## 1. Environments

We will maintain three distinct environments to ensure a stable and predictable release process.

1.  **Development (`development`):**
    - **Purpose:** For local development on engineers' machines.
    - **Database:** Local PostgreSQL instance, often running in Docker.
    - **Services:** May use local emulators (e.g., MinIO for S3, Stripe CLI for webhooks) or connect to shared development services.

2.  **Staging (`staging`):**
    - **Purpose:** A production-like environment for final testing and QA before release.
    - **Trigger:** Automatically deployed from the `main` branch after all tests pass.
    - **Infrastructure:** Should mirror production as closely as possible (e.g., same cloud provider, similar instance sizes).
    - **Database:** A separate, dedicated database seeded with realistic (but anonymized) data.
    - **Services:** Connects to the `test` mode of external services (e.g., Stripe test keys).

3.  **Production (`production`):**
    - **Purpose:** The live environment for real users.
    - **Trigger:** Manual deployment or promotion from `staging` (e.g., via a Git tag or a manual approval step in the CI/CD pipeline).
    - **Infrastructure:** Scalable, resilient, and monitored infrastructure.
    - **Database:** The production database with real user data.
    - **Services:** Connects to the `live` mode of all external services.

---

## 2. CI/CD Pipeline (using GitHub Actions)

We will use GitHub Actions to automate our build, test, and deployment process. A sample workflow file (`.github/workflows/main.yml`) would look like this:

```yaml
name: CI/CD Pipeline

on:
  push:
    branches:
      - main
  pull_request:
    branches:
      - main

jobs:
  test:
    name: Run Tests
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install dependencies
        run: npm ci

      - name: Run unit and integration tests
        run: npm test

      - name: Run E2E tests
        run: npm run test:e2e # This would run Playwright/Cypress tests

  deploy_staging:
    name: Deploy to Staging
    needs: test
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    steps:
      # ... checkout, setup, build steps ...
      - name: Deploy to Staging Host (e.g., Vercel, Render)
        # Use a GitHub Action from the provider or a custom script
        # Example for Vercel:
        # uses: amondnet/vercel-action@v20
        # with:
        #   vercel-token: ${{ secrets.VERCEL_TOKEN }}
        #   vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
        #   vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID_STAGING }}

  deploy_production:
    name: Deploy to Production
    needs: deploy_staging
    # This job is triggered manually after staging is verified
    environment: production
    runs-on: ubuntu-latest
    steps:
      # ... steps to deploy to production ...
      # This step should be protected by an environment rule in GitHub settings,
      # requiring manual approval from a designated person or team.
```

---

## 3. Secrets and Environment Variable Management

**Never commit secrets directly to your repository.**

### Recommended Approach:
1.  **Environment Variables:** Store all configuration that varies between environments (e.g., database URLs, API keys) in environment variables.
2.  **GitHub Secrets:**
    - For each environment (Staging, Production), create corresponding environments in your GitHub repository settings (`Settings > Environments`).
    - Add secrets (like `DATABASE_URL`, `STRIPE_API_KEY`, `STRIPE_WEBHOOK_SECRET`) to these GitHub environments.
    - In the CI/CD pipeline, these secrets are securely injected into the deployment process.
3.  **`.env` files:**
    - Use `.env` files for local development only.
    - **Crucially, add `.env` to your `.gitignore` file.**
    - Provide a `.env.example` file in the repository with placeholder values so other developers know what variables are required.

### Example `.env.example` file:
```
# Application Configuration
NODE_ENV=development
PORT=3000

# Database
DATABASE_URL="postgresql://user:password@localhost:5432/marketplace_dev"

# External Services
STRIPE_API_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
S3_BUCKET_NAME="your-dev-bucket"
AWS_ACCESS_KEY_ID="..."
AWS_SECRET_ACCESS_KEY="..."

# JWT
JWT_SECRET="a-long-random-secret-string-for-local-dev"
```

---

## 4. Deployment Checklist

### Before First Deployment:
- [ ] Set up hosting accounts (e.g., Vercel for frontend, Render for backend, Neon/RDS for database).
- [ ] Configure DNS records for your domain.
- [ ] Create separate databases for `staging` and `production`.
- [ ] Set up GitHub environments for `staging` and `production` with all required secrets.
- [ ] Ensure the CI/CD pipeline is fully configured and tested.

### For Each Release:
- [ ] All tests in the CI/CD pipeline are passing.
- [ ] E2E tests have run successfully against the `staging` environment.
- [ ] A manual QA check has been performed on `staging` (see `08_testing_qa_plan.md`).
- [ ] (For production) Required approvers have signed off on the deployment in GitHub.
- [ ] Monitor the application closely after deployment for any new errors or performance degradation.
- [ ] Be prepared to roll back to a previous version if a critical issue is discovered. (Hosting providers like Vercel and Render make rollbacks very simple).