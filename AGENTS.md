# AGENTS.md - Guidelines for AI Coding Agents

## Build, Lint, and Test Commands

### Core Commands
- `bun run dev` - Start Vite development server
- `bun run build` - Build for production (TypeScript + Vite)
- `bun run lint` - Run ESLint on the entire codebase
- `bun run preview` - Preview production build

### Test Commands
This project does not have a test framework configured. Tests should be added if required.

## Code Style Guidelines

### Import Organization
1. **React imports first**: `import { useState } from 'react'`
2. **Local imports second**: `import reactLogo from './assets/react.svg'`
3. **Third-party imports third**: `import something from 'package'`
4. **Styles last**: `import './App.css'`
5. Group imports logically with blank lines between categories

### File Structure
- Use `.tsx` for React components
- Use `.ts` for TypeScript utilities and configs
- Components should be PascalCase (e.g., `App.tsx`)
- Utilities should be snake_case or kebab-case

### TypeScript Usage
- Strict type checking enabled via `tsconfig.json`
- Use TypeScript for all new code
- Define explicit types for function parameters and return values
- Use `interface` for object shapes, `type` for unions/tuples

### Component Style
- Use function components with arrow function syntax
- Hooks should be at the top of the component
- Use descriptive variable names: `const [count, setCount] = useState(0)`
- Export components as default: `export default App`

### Naming Conventions
- **Components**: PascalCase (`MyComponent.tsx`)
- **Variables**: camelCase (`userCount`, `isLoading`)
- **Constants**: UPPER_SNAKE_CASE (`MAX_ITEMS = 100`)
- **Files**: Match component name (e.g., `Button.tsx`)

### Error Handling
- Use try-catch blocks for async operations
- Handle errors gracefully with user feedback
- Avoid silent failures; log errors appropriately

### Code Formatting
- Follow ESLint rules defined in `eslint.config.js`
- Use 2-space indentation (default from Prettier/ESLint)
- Single quotes for strings
- No trailing commas in single-line arrays/objects
- Curly braces for all control structures

### React Best Practices
- Keep components small and focused
- Use React hooks (`useState`, `useEffect`, `useMemo`, `useCallback`)
- Avoid inline functions in JSX when possible
- Use memoization for expensive calculations

## Important Notes

### Dev Server
- **DO NOT run `bun run dev`** - User already runs it on port 5173. Running it will crash the existing server and stop the coding session.
- Test changes by checking the browser at http://localhost:5173 and looking at console errors.

### Package Manager
- Use `bun add` instead of `npm install` for consistency with project setup.

### Common Issues
- **gray-matter in browser**: Use `js-yaml` for parsing YAML frontmatter in the browser. The `gray-matter` package requires Node.js `buffer` module and won't work in the browser.
- **import.meta.glob with markdown**: Use `{ eager: true, query: '?raw' }` to get raw markdown content as a string.
- **Vite plugins**: The `vite-plugin-markdown` plugin may interfere with glob imports; use raw query instead.

## Cursor/Copilot Rules
No Cursor rules (`.cursor/rules/`) or Copilot rules (`.github/copilot-instructions.md`) found.