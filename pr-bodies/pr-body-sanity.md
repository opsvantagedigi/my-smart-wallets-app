**Summary**
- Upgrades `sanity` to `^3.95.0`.
- This upgrade targets high-severity advisories reported by `npm audit` and brings the Sanity CLI/studio packages to a patched release.

**Verification**
- Run:
```bash
npm install sanity@^3.95.0
npm ci && npm audit --production
npx sanity build   # or the project-specific Sanity build script
```
- Confirm the audit no longer reports the previously identified vulnerabilities caused by older `sanity` releases.
- Confirm the studio (if present) builds successfully and linting/tests pass.

**Impact**
- CLI/studio behavior changes are possible between minor Sanity versions; review local studio run and CI builds.
- If the project uses Sanity Studio, test authoring flows locally and CI pipelines.

**Reviewers**
- @tech-lead @security-lead @product-owner

**Notes**
- This PR is intentionally small and focused. If any compatibility issues appear, we can revert and apply a narrower patch or follow-up with migration fixes.
