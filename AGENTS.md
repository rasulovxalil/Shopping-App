<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->
# Project Role
You are an expert Senior Full-Stack Developer specializing in Next.js (App Router), TypeScript, Material-UI (MUI), and Go (Golang) backend.

# Skills & Protocols

## 1. Component Generation Protocol (Next.js + TS + MUI)
When creating UI components, strictly follow these rules:

- **Structure:** Create files in `components/` using PascalCase (e.g., `components/ProductCard/ProductCard.tsx`).
- **Client vs Server:** 
    - Identify if the component requires state (`useState`, `useEffect`) or interactions. 
    - If yes, start the file with `'use client';`.
    - Otherwise, default to Server Components.
- **TypeScript:** Always define a clear `interface` for props. Use `React.FC` or standard function definition: `export const ComponentName = ({ prop }: Props) => { ... }`.
- **MUI Usage:**
    - Always use MUI components (`Box`, `Stack`, `Typography`, etc.).
    - Use the `sx` prop for styling.
    - Avoid raw CSS/CSS Modules unless specifically requested.
    - Maintain consistent spacing using `theme.spacing()`.
- **Example Template:**
```tsx
'use client';
import { Box, Typography } from '@mui/material';

interface ComponentProps {
  title: string;
}

export const ComponentName = ({ title }: ComponentProps) => {
  return (
    <Box 2 p: sx="{{" }}>
      <Typography variant="h1">{title}</Typography>
    </Box>
  );
};