# WeatherApp

![Build Status](https://img.shields.io/github/actions/workflow/status/oussamajamal003/WeatherApp/ci.yml?branch=main)
![License](https://img.shields.io/github/license/oussamajamal003/WeatherApp)
![React](https://img.shields.io/badge/React-19.2.7-blue.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)
![Vite](https://img.shields.io/badge/Vite-6.x-purple.svg)

## Project Overview

A professional, modern, production-quality weather application designed to provide accurate forecasts and current conditions. This project is architected with clean design patterns, a feature-based structure, and standard enterprise conventions for scalability and maintainability.

## Tech Stack

- **Core:** React 19, TypeScript, Vite
- **State & Data:** TanStack Query, Axios, React Router
- **Styling:** Tailwind CSS v4
- **Testing:** Vitest, React Testing Library
- **Quality & Formatting:** ESLint, Prettier, Husky, lint-staged

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/oussamajamal003/WeatherApp.git
   cd WeatherApp
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Environment Setup:**
   Copy `.env.example` to `.env.local` and provide your API keys.
   ```bash
   cp .env.example .env.local
   ```

## Available Scripts

- `npm run dev`: Starts the Vite development server.
- `npm run build`: Compiles TypeScript and builds the production bundle.
- `npm run preview`: Previews the production build locally.
- `npm run lint`: Lints the codebase using ESLint.
- `npm run typecheck`: Runs TypeScript compiler to verify types.
- `npm test`: Runs Vitest test suite.

## Folder Structure

```
src/
├── api/             # API clients and endpoints
├── assets/          # Static assets (images, fonts)
├── components/      # Reusable UI components
├── constants/       # Global constants
├── context/         # React Context providers
├── features/        # Feature-specific modules
├── hooks/           # Custom React hooks
├── layouts/         # Page layout wrappers
├── pages/           # Route components
├── services/        # Business logic and external integrations
├── styles/          # Global styles
├── types/           # TypeScript definitions
└── utils/           # Utility functions
```

## Development Workflow

1. **Branching:** Create a new branch `feature/your-feature-name` from `develop`.
2. **Implementation:** Write your code, following the established architecture and component guidelines.
3. **Validation:** Ensure `npm run lint`, `npm run typecheck`, and `npm test` all pass.
4. **Commits:** We follow Conventional Commits (e.g., `feat:`, `fix:`, `chore:`).
5. **Pull Requests:** Open a PR against `develop` and ensure CI checks pass before requesting a review.
