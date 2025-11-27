**Summary**
- Upgrades devDependency `eslint-config-next` to `16.0.5`. This resolves transitive vulnerabilities introduced via older versions of the package and updates Next.js linting rules to the 16.x baseline.

**Verification**
- Run:
```bash
npm install eslint-config-next@16.0.5 --save-dev
npm ci && npm audit --production
npm run lint    # or npx eslint .
```
- Fix any lint failures produced by rule changes introduced by the new config.
- Ensure CI lint job passes.

**Impact**
- Linting rules may change; expect a small number of rule-based fixes.
- This change affects development tooling only (no runtime changes), but requires developers to run lint and address autofix/format issues.

**Reviewers**
- @frontend-team @tech-lead @security-lead

**Notes**
- Keep changes in this PR limited to the upgrade and minimal lint fixes. Avoid unrelated refactors.
