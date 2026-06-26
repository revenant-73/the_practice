# Repository Guidelines

## Project Structure & Module Organization
**The Practice** is an adaptive movement system built as a React-based Progressive Web Application (PWA).

- **`.\src\App.jsx`**: The central orchestrator managing application state, screen navigation, and `localStorage` persistence.
- **`.\src\components\`**: Screen-level components (e.g., `.\src\components\CheckInScreen.jsx`, `.\src\components\PracticeScreen.jsx`) representing distinct phases of the user journey.
- **`.\src\utils\readinessLogic.js`**: Core business logic for calculating movement recommendations based on user inputs.
- **`.\public\`**: Static assets and PWA icons.

The application follows a modular, screen-based architecture where navigation is handled via conditional rendering in the root component.

## Build, Test, and Development Commands
The project uses **Vite** as the build tool and development server.

- **`npm run dev`**: Starts the local development server.
- **`npm run build`**: Builds the application for production (outputs to `dist/`).
- **`npm run lint`**: Runs ESLint to check for code quality and style issues.
- **`npm run preview`**: Serves the production build locally for testing.

## Coding Style & Naming Conventions
- **React**: Functional components using Hooks (`useState`, `useEffect`).
- **Styling**: Utility-first CSS using **Tailwind CSS**.
- **Dynamic Classes**: Uses `clsx` and `tailwind-merge` (typically abstracted in a `cn` utility if present, or used directly).
- **Icons**: Provided by **Lucide React**.
- **ESLint**: Enforced via `.\.eslintrc.cjs` (or standard Vite config) targeting `.js` and `.jsx` files.

## Testing Guidelines
There is currently no automated testing framework (e.g., Vitest or Jest) configured in the repository. Manual verification of screen transitions and readiness logic is required.

## Commit & Pull Request Guidelines
Commit history follows a concise, descriptive tagging pattern rather than strict Conventional Commits (e.g., "pwa", "update", "v0.3"). Keep messages short and representative of the primary change.
