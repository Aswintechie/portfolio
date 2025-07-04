# Aswin's Portfolio - React Version

A modern, responsive portfolio website built with React, Vite, and Tailwind CSS. This portfolio showcases cloud engineering expertise, professional experience, and technical skills with beautiful animations and modern design.

## 🚀 Features

### ✨ Modern Tech Stack
- **React 18** - Latest React with hooks and modern patterns
- **Vite** - Ultra-fast development server and build tool  
- **Tailwind CSS** - Utility-first CSS framework for rapid styling
- **Framer Motion** - Smooth animations and transitions
- **Lucide React** - Beautiful, customizable icons
- **Intersection Observer** - Scroll-triggered animations
- **Express.js Backend** - Secure contact form handling with Gmail SMTP
- **Gmail SMTP** - Professional email delivery and auto-replies

### 🎨 Design Features
- **Responsive Design** - Works perfectly on all devices
- **Modern UI/UX** - Clean, professional interface
- **Smooth Animations** - Framer Motion powered transitions
- **Glass Morphism** - Modern glass-like effects
- **Gradient Backgrounds** - Eye-catching color schemes
- **Dark/Light Optimized** - Optimized for both themes

### 🔧 Functionality
- **Dynamic Experience Calculation** - Automatically updates employment duration
- **Smooth Scrolling** - Seamless navigation between sections
- **Professional Contact Form** - Gmail SMTP integration with auto-replies
- **Security Features** - Rate limiting, input validation, CORS protection
- **Email Templates** - Beautiful HTML emails for notifications and auto-replies
- **Performance Optimized** - Fast loading and smooth interactions
- **SEO Friendly** - Optimized meta tags and structure

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Steps

#### Frontend Setup
1. **Clone or download the project files**
2. **Install dependencies**
   ```bash
   npm install
   ```
3. **Start the development server**
   ```bash
   npm run dev
   ```

#### Backend Setup (for Contact Form)
4. **Install backend dependencies**
   ```bash
   cd server
   npm install
   ```
5. **Configure Gmail SMTP** (Required for contact form)
   - Follow the detailed setup guide: [📧 Gmail SMTP Setup](setup-gmail.md)
   - Create `.env` file with your Gmail credentials
6. **Start the backend server**
   ```bash
   npm run dev
   ```

#### Access Your Portfolio
7. **Open your browser**
   - Visit `http://localhost:3000` for the React app
   - Backend API runs on `http://localhost:3001`
   - Contact form will now send real emails!

## 🛠️ Development

### Available Scripts
```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

### Project Structure
```
src/
├── main.jsx          # React entry point
├── App.jsx           # Main App component with all sections
├── index.css         # Global CSS with Tailwind imports
└── components/       # Individual React components
    ├── Navigation.jsx
    ├── HeroSection.jsx
    ├── AboutSection.jsx
    ├── ExperienceSection.jsx
    ├── SkillsSection.jsx
    ├── ContactSection.jsx
    └── Footer.jsx
```

## 🎯 Customization

### Personal Information
Edit the following in `src/App.jsx`:
- Name and title in `HeroSection`
- About text in `AboutSection`
- Experience details in `ExperienceSection`
- Skills in `SkillsSection`
- Contact information in `ContactSection`

### Styling
- **Colors**: Modify `tailwind.config.js` for custom color schemes
- **Fonts**: Change font family in `tailwind.config.js`
- **Animations**: Customize animations in `src/index.css`

### Experience Calculation
The portfolio automatically calculates experience from June 2023. To change the start date:
```javascript
const startDate = new Date('2023-06-01'); // Change this date
```

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Popular Platforms
- **Vercel**: Connect your GitHub repo and deploy automatically
- **Netlify**: Drag and drop the `dist` folder
- **GitHub Pages**: Use GitHub Actions for automated deployment
- **Firebase Hosting**: Use Firebase CLI

## 📱 Responsive Design

The portfolio is fully responsive and tested on:
- ✅ Desktop (1920px+)
- ✅ Laptop (1024px - 1919px)
- ✅ Tablet (768px - 1023px)
- ✅ Mobile (320px - 767px)

## 🎨 Design System

### Color Palette
- **Primary**: Blue tones (#3b82f6, #2563eb, #1d4ed8)
- **Secondary**: Purple accent (#8b5cf6, #7c3aed)
- **Neutral**: Gray scale for text and backgrounds

### Typography
- **Font Family**: Inter (modern, clean sans-serif)
- **Headings**: Bold weights (600-800)
- **Body**: Regular weight (400-500)

## 🔧 Technical Details

### Performance Optimizations
- **Code Splitting**: Automatic with Vite
- **Lazy Loading**: Images and components
- **Tree Shaking**: Unused code elimination
- **Minification**: CSS and JavaScript compression

### Accessibility
- **Semantic HTML**: Proper HTML structure
- **ARIA Labels**: Screen reader support
- **Keyboard Navigation**: Full keyboard accessibility
- **Focus Management**: Visible focus indicators

## 🆚 Comparison with Vanilla Version

| Feature | Vanilla HTML/CSS/JS | React Version |
|---------|-------------------|---------------|
| **Bundle Size** | Smaller | Larger but optimized |
| **Development Speed** | Slower | Faster with hot reload |
| **Component Reusability** | Limited | Excellent |
| **State Management** | Manual | React hooks |
| **Animations** | CSS + JS | Framer Motion |
| **Maintenance** | Harder | Easier |
| **Scalability** | Limited | Excellent |

## 🐛 Troubleshooting

### Common Issues
1. **Port 3000 already in use**
   ```bash
   # Use different port
   npm run dev -- --port 3001
   ```

2. **Dependencies not installing**
   ```bash
   # Clear cache and reinstall
   npm cache clean --force
   rm -rf node_modules package-lock.json
   npm install
   ```

3. **Build errors**
   ```bash
   # Check for linting errors
   npm run lint
   ```

## 📧 Contact

For questions or suggestions about this portfolio:
- **Email**: contact@aswinlocal.in
- **Location**: Pondicherry, India

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

**Built with ❤️ using React, Vite, and Tailwind CSS** 