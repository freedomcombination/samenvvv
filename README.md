## Getting Started

First, run the development server:

```bash
yarn dev
```

> Make sure your backend server is running under [http://localhost:1337](http://localhost:1337)
> Set environment variable in `.env.local` as `NEXT_PUBLIC_ADMIN_URL=http://localhost:1337`

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Types

All global declared types in `types` folder correspond Strapi data models

> If your data model is changed in Strapi backend make sure you change types in the frontend project in order to keep type safety.

### Naming Conventions

#### Commits

Valid commit types:

- feature
- chore
- feat
- fix
- refactor
- style
- lint
- test
- translation

Examples:

```
fix: solved dynamic import
test(utils): added util function test
```

#### Branches

Valid branch names:

- feature
- feat
- fix
- chore
- hotfix
- ui
- translation

Examples:

```
feat/slider-component
ui/theme-colors
translation/common
```
