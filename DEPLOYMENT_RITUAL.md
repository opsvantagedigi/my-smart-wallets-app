# OpsVantage Digital Deployment Ritual: Fix & Deploy

## 1. Open the File with the Error
Open in VS Code:
```
/app/components/landing.tsx
```

## 2. Fix the TypeScript Error
Find:
```tsx
const Landing: React.FC<HeroContent> = () => {
```
Replace with:
```tsx
const Landing: React.FC = () => {
```

## 3. Test the Build Locally
In the terminal:
```bash
npm ci
npm run build
```
- ✅ If build succeeds: continue to commit
- ❌ If build fails: copy the error and let me help you fix it

## 4. Commit the Fix
```bash
git add .
git commit -m "🛠️ landing.tsx: Removed missing HeroContent type to fix Netlify build error"
```

## 5. Push to GitHub
```bash
git push origin main
```
(Replace `main` with your branch name if different)

## 6. Confirm Netlify Deployment
- Go to https://app.netlify.com/
- Select your OpsVantage Digital site
- Click **Deploys**
- Confirm latest deploy is **Published**
- If it fails, click “Show all logs” and paste them here

## 7. Verify the Live Site
Visit:  
https://app.opsvantagedigital.online

- Refresh the page
- Confirm layout, navigation, and responsiveness
- Test on mobile, tablet, and desktop

## 8. Celebrate the Fix
You’ve resolved a production-blocking error and pushed a clean, verified update. Legacy secured.
