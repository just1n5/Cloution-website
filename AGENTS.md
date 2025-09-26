# Repository Guidelines

## Project Structure & Module Organization
- src/ hosts the React app; keep feature components in src/components/, route views in src/pages/, structured copy in src/data/, and shared hooks in src/hooks/.
- Heavy visuals belong in src/icons/ or src/portfolio_screenshots/ (group per client), while reusable graphics stay under utils/.
- Place raw assets in public/, keep architectural notes in docs/, and store compliance PDFs in legal_docs/.
- Review docs/ARCHITECTURE.md before reshaping flows or adding new sections.

## Build, Test, and Development Commands
- 
pm install aligns local dependencies after cloning or package updates.
- 
pm run dev launches Vite with hot reload and opens the preview.
- 
pm run build generates dist/; treat warnings as blockers and address them before merging.
- 
pm run preview smoke-tests the build artifact.
- 
pm run lint runs ESLint; pair with 
pm run clean && npm run reinstall if Node tooling misbehaves.

## Coding Style & Naming Conventions
- Stick to functional React with hooks, two-space indentation, and the surrounding quote style.
- Maintain trailing commas in multiline literals; Tailwind utilities read layout ? spacing ? color ? motion.
- Components, pages, and icons use PascalCase (HeroSection.jsx), hooks use useCamelCase, helpers stay camelCase.

## Testing Guidelines
- No automated suite ships yet; document manual verification steps in PR descriptions.
- When adding tests, colocate files (e.g., src/components/Hero.test.jsx) using Vitest with React Testing Library.
- Keep fixtures lightweight and ensure any new scripts are added to package.json.

## Commit & Pull Request Guidelines
- Use Conventional Commit prefixes (eat:, ix:, chore:); keep commits focused and include rationale when context is non-obvious.
- Run 
pm run build and 
pm run lint before opening a PR.
- PRs should describe the change, note affected routes or components, link tickets, and include before/after screenshots for UI work.

## Security & Configuration Tips
- Never commit real secrets; copy .env.example to .env for local runs and update both the example and docs/DEPLOYMENT.md if variables change.
- Coordinate with stakeholders before editing legal_docs/ and keep shared graphics centralized under utils/.
