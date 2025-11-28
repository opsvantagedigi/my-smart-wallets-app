
# Secrets Audit — chore/remediate/sanity-secrets

This file lists every `${{ secrets.NAME }}` reference found in `.github/workflows/*.yml` and the context where it appears.

| Secret Name | Workflow File | Job / Step Context |
|---|---|---|
| `NEXT_PUBLIC_ALCHEMY_API_KEY` | `.github/workflows/wallet-ci.yml` | `Fail fast if secrets missing` step; also injected as env into `Install dependencies` step |
| `MARZ_MINT_PRIVATE_KEY` | `.github/workflows/wallet-ci.yml` | `Fail fast if secrets missing` step; injected as env into `Install dependencies` step |
| `NEXT_PUBLIC_MARZ_TOKEN_ADDRESS` | `.github/workflows/wallet-ci.yml` | Injected as env into `Install dependencies` step |
| `AZUREAPPSERVICE_CLIENTID_A7C9041F09A34761A277A1041EFA706A` | `.github/workflows/master_sanctuary-portal.yml` | `Login to Azure` step `with.client-id` for `azure/login@v2` |
| `AZUREAPPSERVICE_TENANTID_8F77433F840F4B40B4BD30C7EDE56ACC` | `.github/workflows/master_sanctuary-portal.yml` | `Login to Azure` step `with.tenant-id` for `azure/login@v2` |
| `AZUREAPPSERVICE_SUBSCRIPTIONID_E76D716DB76F48DD96B79CC2C1AAB13D` | `.github/workflows/master_sanctuary-portal.yml` | `Login to Azure` step `with.subscription-id` for `azure/login@v2` |
| `CLOUDFLARE_API_TOKEN` | `.github/workflows/deploy-cloudflare.yml` | Used in `Show Cloudflare secret status`, `Cloudflare debug (whoami)`, and `Deploy (wrangler)` steps; set as env for wrangler commands |
| `CI_RPC_URL` | `.github/workflows/ci-smoke.yml` | Optional RPC URL used in `Export RPC URL for smoke` step; guarded with fallback |
| `NPM_TOKEN` | `.github/workflows/ci-push.yml` | `Configure private registry` step env for setting up `.npmrc` |
| `NPM_REGISTRY_URL` | `.github/workflows/ci-push.yml` | `Configure private registry` step env for setting up `.npmrc` |
| `SANITY_API_TOKEN` | `.github/workflows/ci-push.yml` | `Sanity smoke check` step env; presence checked before running smoke script |
| `SANITY_PROJECT_ID` | `.github/workflows/ci-push.yml` | `Sanity smoke check` step env |
| `SANITY_DATASET` | `.github/workflows/ci-push.yml` | `Sanity smoke check` step env |

**Notes**:
- All secret references are guarded in the workflows (only used in push runs or checked before use). The editor warnings are from VS Code's GitHub Actions schema validator which cannot confirm repository secrets locally.
- To remove editor warnings and allow secret-using jobs to run fully on GitHub, add the listed secrets at: `Settings → Secrets → Actions` in the repository.

Audit generated on branch `chore/remediate/sanity-secrets`.
