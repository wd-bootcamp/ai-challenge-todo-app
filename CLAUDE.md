# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Common Commands

```bash
# Development
npm run dev          # Start Vite dev server (http://localhost:5173)

# Building & Preview
npm run build        # Create optimized production build
npm run preview      # Preview production build locally

# Testing
npm test             # Run test suite once
npm test:ui          # Run tests with interactive UI dashboard

# Running a single test
npm test -- App.test.jsx
```

## Project Architecture

### Core Structure
- **App.jsx** — Main todo component. Manages todos state with React hooks (useState, useEffect, useCallback). Handles add, delete, and toggle operations.
- **App.test.jsx** — Comprehensive test suite using Vitest + React Testing Library. 11 tests covering CRUD operations and user interactions.
- **utils.js** — Utility functions for date formatting and todo statistics (currently unused in App.jsx).
- **main.jsx** — React entry point that mounts App into DOM.
- **vite.config.js** — Vite build configuration with jsdom for testing.

### Tech Stack
- React 18.2.0 with hooks
- Vite 4.4.0 (build tool)
- Vitest + React Testing Library (testing)
- jsdom (DOM simulation in tests)

## Known Issues & Context

This is a **demo/learning project** intentionally containing bugs and code quality issues for teaching purposes in the Claude Code workshop:

### Bugs
1. **App.jsx:18** — ID generation uses `Math.random()` instead of proper ID generation (nanoid is available)
2. **App.jsx:39** — `useEffect` missing dependency array causes infinite console logs

### Code Quality
- **App.jsx:2** — Unused import: `formatDate` from utils
- **App.jsx:12** — Unused variable: `debugVar`
- **utils.js** — Contains dead code (`oldAddTodo`) and unused exports (`calculateStats`)
- **App.jsx:48** — Accessibility issue: input lacks associated `<label>`

### Design Limitations
- No persistence (state resets on page refresh)
- No todo filtering or search
- Inline styles (no CSS file organization)

## Working with Tests

The test suite is comprehensive and should be your guide for expected behavior. When making changes:

```bash
# Watch mode during development
npm test -- --watch

# Run with coverage
npm test -- --coverage

# Run specific test
npm test -- --grep "adds a new todo"
```

Tests use React Testing Library best practices: query by user-visible elements (text, placeholders, roles) rather than implementation details.

## Important Notes for Contributors

- **This is a workshop demo** — bugs are educational. Don't fix them unless explicitly asked.
- **Avoid premature optimization** — keep code simple for learning purposes.
- **Maintain test coverage** — any new features should have corresponding tests.
- **Use the utils** — the `calculateStats` function in utils.js is available but unused (good teaching opportunity).
