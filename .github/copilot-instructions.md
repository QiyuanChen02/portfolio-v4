# Portfolio Codebase Guide

## Architecture

This is an **Astro + Preact + Tailwind CSS v4** portfolio site with a hybrid component approach:
- **Astro components** (`.astro`) for static layouts and page structure
- **Preact components** (`.tsx`) for interactive UI with state management
- **Tailwind v4** using the new `@theme` directive for color tokens

### Project Structure
```
src/
├── pages/          # Route pages (index.astro)
├── layout/         # Page sections (Hero, About, Experience, Contact)
├── components/     # Reusable UI components
│   └── text/       # Typography components (H1-H3, P, Li)
├── helpers/        # Shared data/constants (links, socials)
├── icons/          # SVG icon components
└── styles/         # Global CSS with theme tokens
```

## Component Patterns

### Astro ↔ Preact Integration
Interactive Preact components MUST use `client:load` directive in Astro:
```astro
<ExperienceTabs experiences={data} client:load />
```

### When to Use Each Framework
- **Astro**: Static content, layouts, SSR pages, simple UI without state
- **Preact**: Interactive features (tabs, drawers, forms), state management, event handlers

### Preact Specifics
- Import hooks from `preact/hooks` not `react`
- Use `class` not `className` in JSX (Astro convention carried over)
- TypeScript: `jsxImportSource: "preact"` in tsconfig.json

## Styling Conventions

### Tailwind v4 Theme System
Define semantic color tokens in `src/styles/global.css`:
```css
@theme {
    --color-accent: var(--color-green-400);
    --color-background: var(--color-gray-900);
    --color-text: var(--color-white);
    --color-muted: var(--color-stone-400);
}
```

Use semantic names in classes: `text-accent`, `bg-background`, `text-muted`

### Component Styling Patterns
1. **Numbered sections**: Use `H3` component with number prop for consistent section headers
   ```astro
   <H3 number={2} className="mb-12">Where I've Worked</H3>
   ```

2. **3D button effect**: `Button.astro` uses layered absolute positioning for shadow effect

3. **Animated indicators**: Transform-based animations (see `ExperienceTabs` border transitions)
   - Desktop: `translateY` for vertical tabs
   - Mobile: `translateX` for horizontal scrollable tabs
   - Set exact widths/heights for smooth calculations

## Development Workflows

### Commands
```bash
npm run dev       # Dev server at localhost:4321
npm run build     # Production build
npm run preview   # Preview production build
```

### Code Formatting
Prettier configured with:
- Tabs (4 spaces)
- No semicolons
- Double quotes
- Plugins: `prettier-plugin-astro`, `prettier-plugin-tailwindcss`

Auto-formats on save with these settings.

## Key Design Decisions

### Why Hybrid Components?
- **Performance**: Astro components ship zero JS by default
- **Interactivity**: Preact hydrates only where needed (partial hydration)
- **DX**: Keep Astro's simplicity for static content, React-like ergonomics for dynamic UI

### State Management
- No global state library needed (site is simple)
- Component-level `useState` for local interactions
- Pass data via props from Astro frontmatter to Preact components

### Responsive Strategy
- Mobile-first Tailwind breakpoints (`md:`, `lg:`)
- Horizontal scrolling for overflow (tabs, navigation)
- Layout switches: flex-row → flex-col with breakpoints

## Common Pitfalls

1. **Forgetting `client:load`**: Preact components won't hydrate without it
2. **Using `className`**: Use `class` in both Astro and Preact (project convention)
3. **Wrong import paths**: Hooks come from `preact/hooks`, not `react`
4. **Hardcoded dimensions**: Use exact px values for transform animations (e.g., tab borders)
5. **Tailwind v4 syntax**: Use `@theme` not `theme()` function

## File Naming Conventions
- Astro components: PascalCase (e.g., `Hero.astro`, `MainWrapper.astro`)
- Preact components: PascalCase with `.tsx` (e.g., `ExperienceTabs.tsx`)
- Helpers: lowercase (e.g., `links.astro`, `socials.astro`)
