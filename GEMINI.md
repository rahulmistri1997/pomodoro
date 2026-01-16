# Gemini Project Context: tmp-pomodoro

## Project Overview

This is a web application bootstrapped with the Vite React + TypeScript template. Based on the project name, the goal is likely to build a Pomodoro timer application.

- **Package Manager**: [Bun](https://bun.sh/)
- **Framework**: [React](https://react.dev/) 19
- **Build Tool**: [Vite](https://vite.dev/) (using `rolldown-vite`)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Compiler**: The new [React Compiler](https://react.dev/learn/react-compiler) is enabled via `babel-plugin-react-compiler`.
- **Linting**: [ESLint](https://eslint.org/) is configured with basic rules.

The project follows a standard Vite structure, with the main entry point at `src/main.tsx` rendering the root `App` component from `src/App.tsx`.

## Building and Running

To install dependencies:
```bash
bun install
```

Key commands are defined in `package.json`:

- **To run the development server:**
  ```bash
  bun run dev
  ```

- **To build the application for production:**
  ```bash
  bun run build
  ```
  This command first runs the TypeScript compiler (`tsc -b`) and then uses Vite to build the project into the `dist/` directory.

- **To preview the production build locally:**
  ```bash
  bun run preview
  ```

- **To run the linter:**
  ```bash
  bun run lint
  ```

## Development Conventions

- **Code Style**: The project uses ESLint for code quality and style. The configuration is in `eslint.config.js`. The README suggests expanding this for type-aware linting in a production setting.
- **Typing**: TypeScript is used for static typing. The main configurations are `tsconfig.app.json` for the application code and `tsconfig.node.json` for build-related files.
- **Component Structure**: The main application component is `src/App.tsx`. New components should be created within the `src/` directory, likely in a `src/components/` sub-directory.
- **Assets**: Static assets like images and SVGs are stored in `src/assets/` or the `public/` directory.
