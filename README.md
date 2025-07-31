# JMGames

JMGames is a modern web-based hub featuring several classic games, built with Vue 3 and Vite. The project showcases a collection of interactive games, including Tetris, Hangman, Blackjack and Pokémon Guess, all accessible from a single responsive interface.

## Project Overview

JMGames provides a fun and educational environment for users to play and learn. Each game is implemented as a separate view, with shared UI components and a consistent design. The project supports both English and Spanish languages, allowing users to switch seamlessly.

## Technologies Used

- **Frontend:** Vue 3, Vite, TypeScript
- **State Management:** Pinia
- **Routing:** Vue Router
- **Styling:** Tailwind CSS
- **Linting/Formatting:** ESLint, Prettier
- **Internationalization:** Custom i18n plugin (English/Spanish)
- **API Integration:** Axios
- **Utilities:** Underscore.js

## Project Structure

- `src/views/` — Game views (Tetris, Hangman, Blackjack, Pokémon)
- `src/components/` — Reusable UI components (GameCard, LanguageSelector, PageHeader, PageFooter, etc.)
- `src/api/` — API integrations (e.g., Pokémon, word API)
- `src/plugins/` — Plugins (e.g., i18n for language support)
- `src/stores/` — Pinia stores for game state
- `src/composables/` — Custom composable functions
- `public/` — Static assets (images, icons, game graphics)

## Features

- Multiple classic games in one hub
- Language selector (English/Spanish)
- Responsive design with Tailwind CSS
- Game instructions and scoring
- Modern UI/UX

## How to Run

Install dependencies:

```sh
pnpm install
```

Start development server:

```sh
pnpm dev
```

Build for production:

```sh
pnpm build
```

Run unit tests:

```sh
pnpm test:unit
```

Lint and format code:

```sh
pnpm lint
pnpm format
```

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
pnpm install
```

### Compile and Hot-Reload for Development

```sh
pnpm dev
```

### Type-Check, Compile and Minify for Production

```sh
pnpm build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
pnpm test:unit
```

### Lint with [ESLint](https://eslint.org/)

```sh
pnpm lint
```
