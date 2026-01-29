# CSS Unit Converter

A modern, responsive React application for converting CSS units (px, em, percentages) with a beautiful and intuitive UI. Built with React, TypeScript, Tailwind CSS, and Vite.

## 🌟 Features

- **Unit Conversion**: Convert between px, em, and percentages with real-time calculations
- **Theme Support**: Light/Dark mode toggle for comfortable viewing
- **Clipboard Integration**: Copy conversion results with a single click
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Modern Stack**: Built with React 18, TypeScript, and Vite for optimal performance
- **Component Library**: Rich UI components powered by Radix UI
- **Form Validation**: Robust form handling with react-hook-form and Zod validation
- **Charts & Visualization**: Data visualization support with Recharts
- **Testing**: Comprehensive testing with Vitest

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS, PostCSS
- **UI Components**: Radix UI, Shadcn/ui
- **Form Handling**: react-hook-form with Zod validation
- **Routing**: React Router v6
- **State Management**: TanStack React Query
- **Testing**: Vitest, React Testing Library
- **Linting**: ESLint

## 📋 Prerequisites

- **Node.js** 18.0.0 or higher
- **npm** 9.0.0+ or **Bun** (optional, for faster package management)
- **Git** (for cloning the repository)

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/Figma-P2P.git
cd Figma-P2P
```

### 2. Install Dependencies

Using npm:
```bash
npm install
```

Or using Bun (faster):
```bash
bun install
```

### 3. Start Development Server

Using npm:
```bash
npm run dev
```

Or using Bun:
```bash
bun run dev
```

The application will be available at `http://localhost:8080`

## 📦 Available Scripts

### Development
```bash
npm run dev          # Start development server with hot reload
```

### Build
```bash
npm run build        # Build for production
npm run build:dev    # Build for development (debugging enabled)
```

### Preview
```bash
npm run preview      # Preview production build locally
```

### Testing
```bash
npm run test         # Run tests once
npm run test:watch   # Run tests in watch mode
```

### Code Quality
```bash
npm run lint         # Run ESLint to check code quality
```

## 📂 Project Structure

```
src/
├── components/          # Reusable React components
│   ├── UnitConverter.tsx # Main converter component
│   └── ui/              # Radix UI components (auto-generated)
├── hooks/               # Custom React hooks
├── lib/                 # Utility functions
├── pages/               # Page components
│   ├── Index.tsx        # Home page
│   └── NotFound.tsx     # 404 page
├── test/                # Test files
├── App.tsx              # Root component
├── main.tsx             # Application entry point
└── index.css            # Global styles
```

## 🔧 Configuration Files

- `vite.config.ts` - Vite build configuration
- `tsconfig.json` - TypeScript configuration
- `tailwind.config.ts` - Tailwind CSS configuration
- `postcss.config.js` - PostCSS configuration
- `eslint.config.js` - ESLint configuration
- `vitest.config.ts` - Vitest configuration

## 🚢 Deployment

### Build for Production

```bash
npm run build
```

This creates a `dist` folder with optimized production-ready files.

### Deployment Options

1. **Static Hosting** (Vercel, Netlify, GitHub Pages)
   - Simply connect your repository and deploy from the `dist` folder

2. **Docker**
   - Create a `Dockerfile` and use the `dist` folder as static content

3. **Traditional Server** (Apache, Nginx)
   - Copy contents of `dist` folder to your web server

### Environment Variables

Create a `.env.local` file in the root directory for environment-specific variables:

```bash
VITE_API_BASE_URL=https://api.example.com
VITE_APP_NAME=CSS Unit Converter
```

## 🧪 Testing

Run the test suite:

```bash
npm run test
```

Watch mode for development:

```bash
npm run test:watch
```

## 🎨 Styling & Customization

- **Tailwind CSS**: Customize in `tailwind.config.ts`
- **Colors**: Modify CSS variables in `src/index.css`
- **Components**: Edit Radix UI components in `src/components/ui/`

## 📝 Development Guidelines

### Code Quality
- Run `npm run lint` before committing
- Follow ESLint rules defined in `eslint.config.js`
- Use TypeScript for type safety

### Component Creation
- Place new components in `src/components/`
- Use functional components with hooks
- Add proper TypeScript types

### Adding Routes
- Edit `src/App.tsx` to add new routes
- Create page components in `src/pages/`
- Always add new routes before the catch-all "*" route

## 🐛 Troubleshooting

### Port Already in Use
If port 8080 is already in use, Vite will use the next available port.

### Build Fails
- Clear `node_modules` and `package-lock.json`
- Run `npm install` again
- Check Node.js version compatibility

### HMR Issues
- The HMR overlay is disabled by default
- Check Vite server configuration in `vite.config.ts`

## 📚 Additional Resources

- [React Documentation](https://react.dev)
- [Vite Guide](https://vitejs.dev)
- [Tailwind CSS Docs](https://tailwindcss.com)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Radix UI Components](https://radix-ui.com)

## 📄 License

This project is open source. See LICENSE file for details.

## 👥 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📧 Support

For issues or questions, please open an issue on GitHub or contact the maintainers.

---

**Last Updated**: January 2026

## Tech Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Radix UI
- React Router
- React Query
- Sonner (Toasts)

## License

MIT
