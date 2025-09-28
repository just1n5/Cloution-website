# Repository Guidelines

## Project Structure & Module Organization
Keep the React app inside `src/`. Route entry lives in `src/main.jsx`, while reusable UI belongs in `src/components/`, view-level screens in `src/pages/`, shared data in `src/data/`, runtime helpers in `src/hooks/`, visual assets in `src/icons/`, and cross-cutting utilities in `src/utils/`. Use `src/config/` for client settings rather than hard-coding. Store public-facing assets under `public/`, project notes in `docs/` (review `docs/ARCHITECTURE.md` before reshaping flows), and compliance paperwork in `legal_docs/`.

## Build, Test, and Development Commands
- `npm install`: sync dependencies after cloning or package updates.
- `npm run dev`: start Vite with hot reload at the local host.
- `npm run build`: create the production bundle in `dist/`; treat warnings as blockers.
- `npm run preview`: serve the latest build for a smoke test.
- `npm run lint`: run ESLint across the workspace.
- `npm run clean` then `npm run reinstall`: reset tooling if node modules behave unexpectedly.
- `npm run deploy:preview|staging|production`: push builds to the corresponding Firebase targets.

## Coding Style & Naming Conventions
Use functional React with hooks, two-space indentation, and single quotes for strings. Preserve trailing commas in multiline literals. Compose Tailwind utility classes in the order layout > spacing > color > motion. Name components, pages, and icons with PascalCase (for example `HeroSection.jsx`); hooks use the `use` prefix (`useFormState`), and helpers stay camelCase.

## Testing Guidelines
No automated suite ships yet, so describe the manual checks you performed in each PR. When adding coverage, colocate Vitest files beside the component (for example `src/components/Hero.test.jsx`) and rely on React Testing Library. Until a `test` script is added, run targeted suites with `npx vitest run` or `npx vitest watch`.

## Commit & Pull Request Guidelines
Follow Conventional Commits such as `feat: add hero animation` or `fix: correct form validation`, keeping each commit focused. Before opening a PR, run `npm run build` and `npm run lint`, and resolve all warnings. PR descriptions should explain the change, flag affected routes or components, link tickets, and include before/after screenshots for UI shifts.

## Security & Configuration Tips
Never commit real secrets. Copy `.env.example` to `.env` for local runs and update both the example file and `docs/DEPLOYMENT.md` if configuration variables change. Coordinate with stakeholders before editing anything in `legal_docs/`, and centralize shared graphics under `utils/` to avoid duplication.
