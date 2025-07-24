# Nirvana Project Implementation Guide
## Working Directory: /Users/zachwieder/Documents/CODING MAIN/nirvana-final

### CRITICAL REMINDERS:
- **ALWAYS** work in small chunks and stop after each chunk
- **NEVER** create a new folder - we're working in nirvana-final
- **ALWAYS** enter . (dot) when Astro asks for project directory
- **UPDATE** this guide after each chunk completion
- **RE-READ** this guide before starting each chunk
- **WAIT** for user confirmation after each chunk
- **PORT**: Use port 3333 (not 4321) to avoid conflicts with other projects
- **SIMPLE**: Just run `npm run dev` - don't overcomplicate server management

---

## CHUNK 1: Scaffold Astro + Core Integrations

### Goal: 
Create Astro project with TypeScript (strict), Tailwind, React islands, and Image optimization.

### Steps:
1. **Run Astro create command:**
   ```bash
   npm create astro@latest
   ```
   - **CRITICAL**: When asked "Where should we create your new project?", type: `.` (single dot)
   - Choose: TypeScript (strict)
   - Choose: Yes to ESLint
   - DO NOT let it create a subfolder

2. **Add integrations one by one:**
   ```bash
   npx astro add tailwind
   npx astro add react  
   npx astro add image
   ```
   - Accept all prompts with default options

3. **Verify these files exist:**
   - astro.config.mjs
   - tsconfig.json
   - tailwind.config.cjs
   - postcss.config.cjs

### Output to show user:
- Directory structure (use `ls -la`)
- Contents of: astro.config.mjs, tsconfig.json, tailwind.config.cjs, postcss.config.cjs

### STOP POINT: Show configs and wait for next instruction

**Completion Notes:** 
- ✅ Created Astro project with TypeScript strict mode
- ✅ Added ESLint with v9 flat config format (eslint.config.js)
- ✅ Installed Tailwind CSS v4 using @tailwindcss/vite plugin
- ✅ Added React integration with React 19
- ℹ️ Image optimization is built-in to Astro v5 (no separate integration needed)
- ℹ️ Tailwind v4 doesn't use config files - configuration is CSS-based
- ✅ All core files created and verified

---

## CHUNK 2: Tailwind Token Scales & Base Layout

### Goal:
Set up design system tokens and create base layout structure.

### Steps:
1. **Update tailwind.config.cjs with custom scales:**
   ```javascript
   // Add to theme.extend:
   spacing: {
     '0': '0',
     '1': '0.25rem',
     '2': '0.5rem',
     '3': '0.75rem',
     '4': '1rem',
     '5': '1.25rem',
     '6': '1.5rem',
     '8': '2rem',
     '10': '2.5rem',
     '12': '3rem',
     '16': '4rem',
     '20': '5rem',
     '24': '6rem',
   },
   fontSize: {
     'xs': ['0.75rem', { lineHeight: '1rem' }],
     'sm': ['0.875rem', { lineHeight: '1.25rem' }],
     'base': ['1rem', { lineHeight: '1.5rem' }],
     'lg': ['1.125rem', { lineHeight: '1.75rem' }],
     'xl': ['1.25rem', { lineHeight: '1.75rem' }],
     '2xl': ['1.5rem', { lineHeight: '2rem' }],
     '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
     '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
   },
   colors: {
     brand: {
       50: '#f0f9ff',
       100: '#e0f2fe',
       500: '#3b82f6',
       600: '#2563eb',
       700: '#1d4ed8',
     }
   },
   borderRadius: {
     'none': '0',
     'sm': '0.125rem',
     'md': '0.375rem',
     'lg': '0.5rem',
     'xl': '0.75rem',
     '2xl': '1rem',
     'full': '9999px',
   },
   boxShadow: {
     'sm': '0 1px 2px 0 rgb(0 0 0 / 0.05)',
     'md': '0 4px 6px -1px rgb(0 0 0 / 0.1)',
     'lg': '0 10px 15px -3px rgb(0 0 0 / 0.1)',
     'xl': '0 20px 25px -5px rgb(0 0 0 / 0.1)',
   }
   ```

2. **Create src/styles/tailwind.css:**
   ```css
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
   ```

3. **Create src/layouts/Base.astro:**
   ```astro
   ---
   export interface Props {
     title: string;
   }
   const { title } = Astro.props;
   ---
   <!DOCTYPE html>
   <html lang="en">
   <head>
     <meta charset="UTF-8" />
     <meta name="viewport" content="width=device-width, initial-scale=1.0" />
     <title>{title}</title>
   </head>
   <body>
     <main class="container mx-auto px-4">
       <slot />
     </main>
   </body>
   </html>
   ```

4. **Create src/pages/index.astro:**
   ```astro
   ---
   import Base from '../layouts/Base.astro';
   ---
   <Base title="Nirvana">
     <h1 class="text-4xl font-bold text-brand-600 mt-8">Welcome to Nirvana</h1>
   </Base>
   ```

### Output to show user:
- Updated tailwind.config.cjs
- New files: tailwind.css, Base.astro, index.astro

### STOP POINT: Show files and wait for next instruction

**Completion Notes:** 
- ✅ Configured Tailwind v4 with CSS-based @theme tokens
- ✅ Created src/styles/global.css with custom design tokens
- ✅ Created Base.astro layout with proper CSS import
- ✅ Updated index.astro to use Base layout
- ✅ Successfully tested on http://localhost:3333/
- 📝 Created CLAUDE.md with important dev notes
- ⚠️ Learned: Port 4321 often conflicts, use 3333 instead

---

## CHUNK 3: Content Collections

### Goal:
Set up astro:content with Zod schemas for services and testimonials.

### Steps:
1. **Create src/content/config.ts:**
   ```typescript
   import { defineCollection, z } from 'astro:content';

   const services = defineCollection({
     schema: z.object({
       title: z.string(),
       short: z.string(),
       price: z.string(),
       duration: z.string(),
     }),
   });

   const testimonials = defineCollection({
     schema: z.object({
       author: z.string(),
       rating: z.number().min(1).max(5),
       date: z.date(),
     }),
   });

   export const collections = { services, testimonials };
   ```

2. **Create sample content files:**
   - src/content/services/pressure-washing.md
   - src/content/testimonials/john-doe.md

3. **Update homepage to query and display services:**
   ```astro
   ---
   import { getCollection } from 'astro:content';
   const services = await getCollection('services');
   ---
   ```

### Output to show user:
- src/content/config.ts
- Sample MD files
- Updated homepage with dynamic content

### STOP POINT: Show content setup and wait

**Completion Notes:** 
- ✅ Created src/content/config.ts with Zod schemas for services and testimonials
- ✅ Created sample content: pressure-washing.md and john-doe.md
- ✅ Updated homepage to query and display services dynamically
- ✅ Added styled service cards with title, description, price, and duration
- ✅ Tested content collections working on http://localhost:3333/
- ✅ Services have working links to /services/[slug] pages

---

## CHUNK 4: React Islands with Radix UI

### Goal:
Add interactive React component using Radix UI.

### Steps:
1. **Install Radix Dialog:**
   ```bash
   npm i @radix-ui/react-dialog
   ```

2. **Create src/components/islands/Modal.tsx:**
   ```tsx
   import * as Dialog from '@radix-ui/react-dialog';
   
   export default function Modal() {
     return (
       <Dialog.Root>
         <Dialog.Trigger className="bg-brand-600 text-white px-4 py-2 rounded-md">
           Open Modal
         </Dialog.Trigger>
         <Dialog.Portal>
           <Dialog.Overlay className="fixed inset-0 bg-black/50" />
           <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg">
             <Dialog.Title className="text-xl font-bold mb-4">Welcome</Dialog.Title>
             <Dialog.Description>This is a Radix UI modal</Dialog.Description>
             <Dialog.Close className="mt-4 px-4 py-2 bg-gray-200 rounded">Close</Dialog.Close>
           </Dialog.Content>
         </Dialog.Portal>
       </Dialog.Root>
     );
   }
   ```

3. **Import in index.astro with client:visible**

### Output to show user:
- Modal.tsx code
- Updated index.astro with component

### STOP POINT: Show React island implementation

**Completion Notes:** 
- ✅ Installed @radix-ui/react-dialog package
- ✅ Created Modal.tsx component with Radix Dialog primitives
- ✅ Added Tailwind classes for styling (including hover states)
- ✅ Imported Modal in index.astro with client:visible directive
- ✅ Verified React hydration working - button has aria attributes
- ✅ Modal component successfully rendered as Astro island
- ℹ️ The modal opens/closes interactively in the browser

---

## CHUNK 5: Testing Setup

### Goal:
Add Vitest for unit tests and Playwright for E2E with screenshots.

### Steps:
1. **Install testing dependencies:**
   ```bash
   npm i -D vitest @testing-library/astro @testing-library/react jsdom
   npm i -D @playwright/test axe-core @axe-core/playwright
   npx playwright install
   ```

2. **Create vitest.config.ts**

3. **Create tests/unit/setup.ts**

4. **Create tests/e2e/home.spec.ts with:**
   - Visit homepage
   - Assert H1 text
   - Take screenshot
   - Run axe-core accessibility check

5. **Update package.json scripts**

### Output to show user:
- Config files
- Test files
- Updated package.json

### STOP POINT: Show test setup

**Completion Notes:** [TO BE FILLED AFTER COMPLETION]

---

## CHUNK 6: CI Pipeline + Lighthouse

### Goal:
GitHub Actions CI with tests and Lighthouse performance budgets.

### Steps:
1. **Create .github/workflows/ci.yml:**
   - Checkout code
   - Setup Node
   - npm ci
   - Build project
   - Run tests
   - Run Lighthouse CI

2. **Create lighthouserc.json:**
   - Performance score: min 0.9
   - Accessibility score: min 0.9
   - Best practices: min 0.9
   - SEO: min 0.9

### Output to show user:
- ci.yml workflow
- lighthouserc.json

### STOP POINT: Show CI configuration

**Completion Notes:** [TO BE FILLED AFTER COMPLETION]

---

## FINAL NOTES:
- Each chunk builds on the previous one
- Always verify file paths and imports
- Test incrementally
- Update this guide with completion notes after each chunk