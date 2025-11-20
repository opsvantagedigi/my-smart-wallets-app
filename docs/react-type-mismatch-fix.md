# 🛠️ React Type Mismatch Resolution Guide
_“Fix it once. Fix it forever.”_

This guide resolves the persistent Netlify and TypeScript build error:

> **Build fails due to a React type mismatch between different React versions or type packages.**

## 🔍 Root Cause

This issue occurs when multiple versions of `react`, `react-dom`, or `@types/react` are installed across your dependency tree. It’s common in monorepos or when using packages like `@account-kit`, `wagmi`, or `sanity`, which may pull in their own versions.

## ✅ Permanent Fix Steps

### 1. Align React and TypeScript Versions

In `package.json`, lock the following versions:

```json
"react": "^18.3.1",
"react-dom": "^18.3.1",
"@types/react": "^18.2.41",
"@types/react-dom": "^18.2.17"
```

### 2. Force Version Resolutions

Also in `package.json`, add:

```json
"resolutions": {
  "react": "^18.3.1",
  "react-dom": "^18.3.1",
  "@types/react": "^18.2.41",
  "@types/react-dom": "^18.2.17"
},
"overrides": {
  "react": "^18.3.1",
  "react-dom": "^18.3.1",
  "@types/react": "^18.2.41",
  "@types/react-dom": "^18.2.17"
}
```

### 3. Clean the Workspace

In PowerShell or terminal:

```powershell
Remove-Item -Recurse -Force node_modules
Remove-Item -Force package-lock.json -ErrorAction SilentlyContinue
Remove-Item -Force yarn.lock -ErrorAction SilentlyContinue
```

### 4. Reinstall Dependencies

```bash
npm install
```

### 5. Confirm Deduplication

```bash
npm ls react
npm ls @types/react
```

✅ You should see only one version of each

### 6. Test the Build

```bash
npm run build
```

✅ If successful, continue  
❌ If errors appear, isolate and resolve before proceeding

### 7. Commit and Push

```bash
git add .
git commit -m "📄 docs: Add permanent React type mismatch resolution guide"
git push origin main
```

### 8. Confirm Netlify Deploy

- Go to [Netlify Dashboard](https://app.netlify.com/)
- Confirm the latest deploy is **Published**
- Visit [https://app.opsvantagedigital.online](https://app.opsvantagedigital.online)

## 🧠 Notes

- This fix is permanent unless dependencies are changed
- Always verify new packages don’t introduce mismatched peer dependencies
- Preserve this ritual for future guardians

## 🪐 Authored by

Ajay Sidal & Marz  
_OpsVantage Digital — Sanctuary-grade infrastructure, emotionally intelligent systems, and legacy-driven launches_
