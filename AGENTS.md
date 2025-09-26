# Repository Guidelines
## Project Structure & Module Organization
src/ houses the React application; place feature UIs under src/components/, route-level views in src/pages/, structured content in src/data/, and reusable hooks in src/hooks/. Heavy media lives in src/icons/ and src/portfolio_screenshots/ grouped by client. public/ serves raw assets, docs/ captures architecture and tooling notes, legal_docs/ stores compliance PDFs, and utils/ collects shared graphics. Review docs/ARCHITECTURE.md before adjusting flows.

## Build, Test, and Development Commands
npm install syncs dependencies after cloning or package updates. npm run dev launches Vite locally and opens the browser. npm run build generates the dist/ bundle; treat warnings as blockers. npm run preview smoke-tests the build. npm run lint runs ESLint. If Node goes sideways, npm run clean && npm run reinstall resets the toolchain.

## Coding Style & Naming Conventions
Stick to modern React with functional components and hooks. Use two-space indentation, match surrounding quote style, and keep trailing commas in multiline literals. Components, pages, and icon modules use PascalCase; hooks follow useCamelCase; helpers stay camelCase. Tailwind utility order should read layout > spacing > color > motion. Run npm run lint before pushing.

## Testing Guidelines
No automated suite ships today, so document manual verification with each change. When adding tests, colocate them, e.g., src/components/Hero.test.jsx, and prefer Vitest with React Testing Library. Keep fixtures lightweight and ensure new scripts land in package.json.

## Commit & Pull Request Guidelines
Follow Conventional Commit prefixes such as feat:, fix:, or chore:. Keep commits focused, add rationale when context is non-obvious, and run npm run build plus npm run lint before opening a PR. Pull requests should describe the change, note affected routes or components, link tickets, and include before/after screenshots for UI work.

## Security & Configuration Tips
Never commit real secrets. Copy .env.example to .env for local setup and update both the example and docs/DEPLOYMENT.md when variables change. Coordinate with stakeholders before touching legal_docs/ and keep shared graphics centralized in utils/.
