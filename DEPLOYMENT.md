# Deployment & Hosting Guide

## 🚀 Quick Deploy (Vercel - Recommended)

Vercel is the creator of Next.js and offers the best experience.

### Step 1: Push to GitHub

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial portfolio commit"

# Rename branch to main
git branch -M main

# Add remote (replace with your repo)
git remote add origin https://github.com/YOUR_USERNAME/portfolio.git

# Push to GitHub
git push -u origin main
```

### Step 2: Deploy on Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "Sign Up" or "Log In"
3. Click "New Project"
4. Select "Import Git Repository"
5. Paste your GitHub repo URL
6. Click "Import"
7. Vercel auto-detects Next.js
8. Click "Deploy"
9. **Done!** Your site is live! 🎉

Your portfolio is now available at: `https://portfolio-123456.vercel.app`

### Custom Domain on Vercel

1. After deployment, go to Project Settings
2. Click "Domains"
3. Add your custom domain
4. Follow DNS setup instructions
5. Your site is now at: `https://yourdomain.com`

---

## 🌐 Alternative Hosting Options

### Netlify

**Pros:** Easy drag-and-drop, great for static sites

1. Build locally:
   ```bash
   npm run build
   ```

2. Go to [netlify.com](https://netlify.com)
3. Sign in / Create account
4. Drag and drop the `.next` folder
5. Done!

### GitHub Pages

**Pros:** Free, integrated with GitHub

**Cons:** Requires static export

1. Edit `next.config.js`:
   ```javascript
   const nextConfig = {
     output: 'export',
   };
   ```

2. Build:
   ```bash
   npm run build
   ```

3. Push `out` folder to `gh-pages` branch
4. Repository Settings → Pages → Select `gh-pages` branch

### DigitalOcean App Platform

1. Connect GitHub account
2. Create new app
3. Select your repository
4. Vercel auto-configures
5. Deploy

**Cost:** ~$5/month

### AWS Amplify

1. Go to [AWS Amplify](https://amplify.aws)
2. Connect GitHub repository
3. Configure build settings (auto-detected)
4. Deploy
5. Get custom domain

**Cost:** Free tier available, then pay-as-you-go

### Heroku

1. Install Heroku CLI
2. Create `Procfile`:
   ```
   web: npm start
   ```

3. Deploy:
   ```bash
   heroku create your-app-name
   git push heroku main
   ```

**Cost:** Paid plans start at $5/month

---

## 🔒 Environment Variables

### Setup Local (.env.local)

Create `.env.local` in project root:

```bash
GROQ_API_KEY=your_groq_key_here
# Optional
GROQ_MODEL=llama-3.3-70b-versatile

# OR use OpenAI instead of Groq
OPENAI_API_KEY=your_openai_key_here
OPENAI_MODEL=gpt-4o-mini

NEXT_PUBLIC_EMAIL=your-email@example.com
```

### Setup on Vercel

1. After deployment, go to Project Settings
2. Click "Environment Variables"
3. Add each variable:
   - Key: `GROQ_API_KEY` (or `OPENAI_API_KEY`)
   - Value: `your_key_here`
4. Click "Save"
5. Redeploy

### Setup on Other Platforms

Most platforms have similar settings:
- Netlify: Site Settings → Build & Deploy → Environment
- DigitalOcean: App → Settings → Environmental Variables
- AWS Amplify: App → Environment Variables

---

## 🔄 Continuous Deployment

### Auto-Deploy on Git Push (Vercel/Netlify)

By default, every push to GitHub automatically deploys:

```bash
# Make changes
git add .
git commit -m "Update portfolio"
git push origin main
# Deployment starts automatically!
```

Monitor deployments:
- **Vercel:** Dashboard → Deployments
- **Netlify:** Deploys → Recent Deployments

---

## ✅ Pre-Deployment Checklist

Before going live:

```
□ All data in cvData.js is updated
□ Profile image is in public/profile.jpg
□ Project builds successfully: npm run build
□ No console errors (F12 → Console)
□ Mobile responsive (tested with DevTools)
□ All links work
□ Social media links are correct
□ Email link works
□ Chatbot responds correctly
□ Animations are smooth
□ Load time is reasonable
□ Meta tags are updated
```

---

## 📊 Post-Deployment

### Add Analytics (Optional)

#### Google Analytics

1. Create account at [analytics.google.com](https://analytics.google.com)
2. Get tracking ID
3. Add to `tailwind.config.js` or next.config.js

#### Vercel Analytics (Built-in)

Goes to Vercel Dashboard → Analytics tab

### Monitor Performance

- Vercel: Dashboard → Analytics
- Netlify: Analytics tab
- Google Analytics: Custom dashboard

### Track Errors

Vercel automatically tracks errors:
- Dashboard → Deployments → Click deployment
- Check Edge Functions & Logs

---

## 🔐 Security Best Practices

1. **Never commit secrets:**
   ```bash
   # Good
   NEXT_PUBLIC_API_KEY=your_key
   # Bad - don't hardcode in code
   const API_KEY = "your_key"
   ```

2. **Keep dependencies updated:**
   ```bash
   npm update
   npm audit
   ```

3. **Use HTTPS** (automatic on Vercel/Netlify)

4. **Secure sensitive data:**
   - Only use public variables for CLIENT-SIDE
   - Use private vars for backend secrets

---

## 🆘 Deployment Troubleshooting

### Build Fails on Deployment

**Problem:** Works locally but fails on Vercel/Netlify

**Solutions:**
1. Check error logs on platform
2. Ensure `package.json` has all dependencies
3. Clear cache and rebuild:
   ```bash
   npm install
   npm run build
   ```

### Site Shows Old Version

**Problem:** Changes don't appear after deployment

**Solutions:**
1. Wait 5-10 minutes for deployment to finish
2. Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
3. Clear browser cache
4. Check deployment status in platform

### Image Not Showing on Live Site

**Problem:** Image works locally but not live

**Solutions:**
1. Ensure image is in `public/` folder
2. Check `next.config.js` has correct path
3. Image path should be: `/profile.jpg`

### Environment Variables Not Working

**Problem:** API calls fail on live site

**Solutions:**
1. Verify environment variables are set on platform
2. Use `NEXT_PUBLIC_` prefix for client-side
3. Clear cache and redeploy
4. Check variable names match exactly

### Performance Issues

**Problem:** Site is slow on live

**Solutions:**
1. Enable Vercel Analytics to identify bottlenecks
2. Optimize images (use WebP)
3. Check if missing environment variables cause errors
4. Enable edge functions to reduce latency

---

## 💰 Cost Comparison

| Platform | Cost | Pros |
|----------|------|------|
| **Vercel** | Free (generous limits) | Best for Next.js, auto-scaling |
| **Netlify** | Free (limited) | Easy deployment, great CMS |
| **GitHub Pages** | Free | Simple, integrated |
| **AWS Amplify** | Free tier + pay-as-you-go | Scalable, many features |
| **DigitalOcean** | $5-12/month | Droplets, simple VPS |
| **Heroku** | $7+/month | Easy deployment |

**Recommendation:** Start with Vercel Free, upgrade only if needed.

---

## 📈 Scale & Growth

### When to Upgrade

1. Exceeding free tier limits
2. Need more concurrent users
3. Want faster response times
4. Need database access

### Scaling on Vercel

1. Add more Edge Functions
2. Enable Pro/Enterprise features
3. Upgrade compute resources
4. Add database (PostgreSQL/MongoDB)

### Database Integration (Optional)

```bash
# Install Prisma ORM
npm install @prisma/client
npm install -D prisma
```

Connect to databases:
- PostgreSQL
- MySQL
- MongoDB
- Firebase Firestore

---

## 🎓 Learning Resources

- [Next.js Deployment Docs](https://nextjs.org/docs/deployment)
- [Vercel Docs](https://vercel.com/docs)
- [Netlify Docs](https://docs.netlify.com)
- [GitHub Pages Guide](https://pages.github.com)

---

## 📞 Support URLs

- **Vercel Support:** support.vercel.com
- **Netlify Support:** support.netlify.com
- **GitHub Support:** github.com/support
- **AWS Support:** aws.amazon.com/support

---

**Your portfolio is now ready to deploy! Choose your platform and go live! 🚀**

---

*Last updated: 2025*
