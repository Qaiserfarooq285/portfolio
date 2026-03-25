# Qaiser Farooq - AI Engineer Portfolio

A modern, responsive portfolio website built with Next.js, Tailwind CSS, and Framer Motion. Features a sleek black & white design with smooth animations, an AI chatbot assistant, and fully responsive layout.

## Features

✨ **Premium Design**
- Black & White Apple-style minimal design
- Smooth animations and transitions using Framer Motion
- Fully responsive (mobile, tablet, desktop)
- Clean typography with optimal spacing

🎯 **Core Sections**
- **Hero** - Typewriter effect with section navigation
- **About** - Professional bio with quick stats
- **Experience** - Timeline of work experience
- **Projects** - Showcase of AI/ML projects
- **Education** - Educational background
- **Skills** - Technical skills and proficiency levels
- **Chat** - AI assistant to answer questions

🤖 **AI Chatbot**
- Groq LLM API integration via secure server route
- Fallback knowledge base powered by CV data
- Quick question buttons
- Real-time typing indicator

## Tech Stack

- **Framework**: Next.js 14
- **Styling**: Tailwind CSS 3
- **Animations**: Framer Motion 10
- **Font**: Inter (Google Fonts)
- **Deployment**: Vercel (recommended)

## Project Structure

```
portfolio-website/
├── src/
│   ├── app/
│   │   ├── layout.jsx          # Root layout
│   │   ├── page.jsx            # Home page
│   │   └── favicon.ico
│   ├── components/
│   │   ├── Navbar.jsx          # Navigation bar
│   │   ├── Hero.jsx            # Hero section
│   │   ├── Typewriter.jsx      # Typewriter effect
│   │   ├── About.jsx           # About section
│   │   ├── Experience.jsx      # Experience timeline
│   │   ├── Projects.jsx        # Projects showcase
│   │   ├── Education.jsx       # Education timeline
│   │   ├── Skills.jsx          # Skills section
│   │   ├── Chatbot.jsx         # AI Chatbot
│   │   └── Footer.jsx          # Footer with social links
│   ├── data/
│   │   └── cvData.js           # CV data & chatbot knowledge base
│   └── styles/
│       └── globals.css         # Global styles
├── public/
│   ├── profile.jpg             # Add your profile image here
│   └── favicon.ico
├── package.json
├── next.config.js
├── tailwind.config.js
├── postcss.config.js
├── .env.example
└── .gitignore
```

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

1. **Navigate to the project directory**
   ```bash
   cd portfolio-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
  # Edit .env.local and add your Groq API key
   ```

  Required variable (choose one provider):
  ```env
  GROQ_API_KEY=your_groq_api_key_here
  # Optional
  GROQ_MODEL=llama-3.3-70b-versatile

  # OR use OpenAI instead of Groq
  OPENAI_API_KEY=your_openai_api_key_here
  OPENAI_MODEL=gpt-4o-mini
  ```

4. **Add your profile image**
   - Place your profile picture as `profile.jpg` in the `public/` folder
   - Image dimensions: 800x800px (or any square size)
   - Supported formats: JPG, PNG, WebP

5. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

6. **Open browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Customization

### Update Your Profile Information

Edit `src/data/cvData.js` to update:

```javascript
export const cvData = {
  personal: {
    name: "Your Name",
    title: "Your Title",
    email: "your.email@example.com",
    phone: "+1 234 567 8900",
    // ... more fields
  },
  experience: [...],
  education: [...],
  projects: [...],
  skills: { ... },
};
```

### Change Typewriter Text

In `src/data/cvData.js`, modify the text in the Hero section:

```javascript
const typewriterTexts = [
  'Your first text',
  'Your second text',
  'Your third text',
];
```

### Customize Colors & Theme

Edit `tailwind.config.js` to change the color scheme:

```javascript
colors: {
  // Modify or add custom colors
  primary: '#your-color',
  secondary: '#your-color',
}
```

### Update Social Links

Modify the social links in `src/data/cvData.js`:

```javascript
social: {
  github: "https://github.com/yourprofile",
  linkedin: "https://linkedin.com/in/yourprofile",
  whatsapp: "https://wa.me/1234567890",
  instagram: "https://instagram.com/yourprofile",
}
```

### Modify Chatbot Responses

Update chatbot knowledge base in `src/data/cvData.js`:

```javascript
export const chatbotKnowledge = {
  availability: "Your response here",
  skills_summary: "Your response here",
  // ... more responses
};
```

### LLM Chat API Setup (Groq)

- Chat endpoint is implemented at `src/app/api/chat/route.js`
- Frontend chat calls this route from `src/components/Chatbot.jsx`
- If API key is missing or request fails, chat automatically falls back to local rule-based responses

## Building for Production

### Build the project
```bash
npm run build
```

### Test production build locally
```bash
npm start
```

## Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Go to [Vercel Dashboard](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Vercel will auto-detect Next.js and configure it
6. Click "Deploy"

### Environment Variables on Vercel
- Add your server-side variables in Vercel Project Settings > Environment Variables
- Use `GROQ_API_KEY` (recommended for this setup) or `OPENAI_API_KEY`
- Do not use `NEXT_PUBLIC_*` for secret AI keys

### Deploy to Other Platforms

The project can be deployed to any platform that supports Next.js:
- **Netlify**: Use Next.js adapter
- **AWS Amplify**: Supports Next.js
- **DigitalOcean**: App Platform
- **Heroku**: With buildpack configuration

## Performance Optimization

- ✅ Image optimization with Next.js Image component
- ✅ CSS-in-JS with Tailwind (zero runtime)
- ✅ Font optimization with Google Fonts
- ✅ Lazy loading sections with Framer Motion
- ✅ Smooth scrolling behavior

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Features Explained

### Typewriter Effect
The Hero section features a typewriter effect that:
- Types text letter by letter
- Pauses briefly
- Deletes and cycles to next text
- Loops continuously

### Smooth Scrolling
- Enabled globally with CSS `scroll-behavior: smooth`
- Section-based navigation with anchor links
- Sticky navbar for quick access

### Animations
All sections include:
- Fade-in animations on scroll
- Hover effects on interactive elements
- Staggered animations for list items
- Smooth transitions (300-800ms)

### Responsive Design
- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Optimized touch targets for mobile
- Flexible grid layouts

### Dark Mode
- Pure black background (#000)
- White text with gray shades
- Subtle white/gray borders and hovers
- Optimized for eye comfort

## Troubleshooting

### Profile Image Not Showing
1. Ensure image is in `public/profile.jpg`
2. Check file format (JPG, PNG, WebP supported)
3. Clear browser cache (Ctrl+Shift+Delete)
4. Check browser console for errors

### Chatbot Not Responding
1. Check that `cvData.js` is properly imported
2. Verify `chatbotKnowledge` object is defined
3. Check browser console for errors
4. Ensure JavaScript is enabled

### Animations Not Working
1. Verify Framer Motion is installed: `npm install framer-motion`
2. Check for browser extensions blocking animations
3. Try different browser
4. Check Console for errors

### Build Errors
```bash
# Clear cache and reinstall
rm -rf node_modules .next
npm install
npm run build
```

## Performance Tips

1. **Optimize Images**: Use WebP format for profile image
2. **Minify CSS**: Tailwind automatically minifies in production
3. **Code Splitting**: Next.js automatically splits code by route
4. **Lazy Loading**: Sections load animations on viewport scroll

## GitHub

To push to GitHub:

```bash
git init
git add .
git commit -m "Initial portfolio commit"
git branch -M main
git remote add origin https://github.com/username/portfolio.git
git push -u origin main
```

## License

This Portfolio Template is free to use for personal projects. Feel free to customize and deploy!

## Support

For issues or questions:
1. Check the troubleshooting section
2. Review the code comments in components
3. Check browser console for errors
4. Verify all data is properly formatted in `cvData.js`

## Future Enhancements

Potential features to add:
- Dark/Light mode toggle
- Blog section
- Contact form with email integration
- Project filters by technology
- Resume download button
- Animation preferences (reduced motion)
- Multi-language support
- Analytics integration

---

**Built with ❤️ using Next.js, Tailwind CSS & Framer Motion**

Happy coding! 🚀
