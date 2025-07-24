# Claude Development Notes for Nirvana Project

## Important: Port Configuration
- **Default Astro port 4321 is often occupied by other projects**
- This project uses **port 3333** to avoid conflicts
- Server URL: http://localhost:3333/

## Common Issues & Solutions

### 1. Localhost Not Working
If localhost doesn't load:
- Check if another process is using the port: `lsof -ti:3333`
- Kill any conflicting processes: `lsof -ti:3333 | xargs kill -9`
- Ensure the dev server is actually running: `ps aux | grep "astro dev"`

### 2. Starting the Dev Server
**Simple method that works:**
```bash
cd /Users/zachwieder/Documents/CODING\ MAIN/nirvana-final && npm run dev
```

**Do NOT overcomplicate with:**
- Multiple background processes
- Complex process management
- Constant killing and restarting

### 3. Port Conflicts
If you see 404 errors for files that don't exist in this project (like Signal fonts, Sarah images), it means another project is running on that port.

## Project Setup
- Astro v5 with TypeScript (strict)
- Tailwind CSS v4 (using @tailwindcss/vite)
- React 19 for interactive components
- ESLint with flat config (eslint.config.js)

## Key Files
- `astro.config.mjs` - Port 3333 configured here
- `src/styles/global.css` - Tailwind v4 with custom design tokens
- `src/layouts/Base.astro` - Base layout with CSS import

## Development Commands
- Start dev server: `npm run dev` (runs on port 3333)
- Lint: `npm run lint`
- Build: `npm run build`