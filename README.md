# VyomAi Solutions Pvt Ltd - Professional Website

A modern, professional Node.js-powered website for VyomAi Solutions, featuring AI services, automation, and corporate solutions with an enhanced navigation experience.

## 🚀 Features

- **Professional Enhanced Navbar**: Sticky header with smooth scroll effects, mobile-responsive menu, polished hover interactions
- **Modern Design**: Glass-morphism cards, gradient accents, smooth animations
- **Fully Responsive**: Optimized for desktop, tablet, and mobile devices
- **Interactive Map**: Global locations showcase with Leaflet.js integration
- **Node.js Backend**: Express-powered professional server setup

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm or yarn

## 🛠️ Installation

1. Install dependencies:
```bash
npm install
```

## ▶️ Running the Application

Start the server:
```bash
npm start
```

The website will be available at: **http://localhost:3000**

## 📁 Project Structure

```
shukla/
├── server.js              # Express server with professional setup
├── package.json           # Node.js dependencies and scripts
├── views/
│   └── index.html        # Main website with enhanced navbar
├── public/               # Static assets (future CSS/JS/images)
├── public/images/logo-vyom.jpeg  # Company logo
└── README.md             # This file
```

## ✨ Navbar Enhancements

The professional navbar includes:
- **Sticky positioning** with smooth scroll-triggered styling changes
- **Modern hover effects** with gradient backgrounds and animated underlines
- **Mobile-responsive menu** with smooth slide-in animation
- **Glass-morphism design** with backdrop blur for premium feel
- **Smooth scroll navigation** to page sections
- **Auto-close mobile menu** when clicking links or outside

## 🎨 Customization

- Update contact details in `views/index.html` (email, phone)
- Replace logo at: `public/images/logo-vyom.jpeg`
- Modify colors in CSS `:root` variables for brand consistency

## 🌐 Deployment

For production deployment:
1. Set `PORT` environment variable
2. Use a process manager like PM2:
   ```bash
   npm install -g pm2
   pm2 start server.js --name vyomai-website
   ```

## 📝 Notes

- All HTML, CSS, and JavaScript are contained in `views/index.html` for simplicity
- Server handles static file serving and includes health check endpoint at `/health`
- Logo and assets served from root directory