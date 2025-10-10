# Quiz App - Web Package

This is the web frontend for the Quiz App, built with React, TypeScript, and Vite.

## Getting Started

### Install Dependencies

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

The application will start on http://localhost:5173 (or another port if 5173 is already in use).

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the application for production
- `npm run lint` - Run ESLint to check code quality
- `npm run preview` - Preview the production build locally

## Project Structure

```
src/
├── pages/              # Page components
├── components/         # Reusable components
│   ├── ui/            # Generic UI components
│   ├── quiz/          # Quiz-specific components
│   └── encyclopedia/  # Encyclopedia-specific components
├── stores/            # State management stores
├── services/          # Service layer
│   ├── storage/       # Storage service
│   ├── quiz/          # Quiz service
│   └── purchase/      # Purchase service
├── routes/            # Route definitions
├── theme/             # Theme configuration
├── utils/             # Utility functions
├── hooks/             # Custom React hooks
└── constants/         # Application constants
```

## Technologies

- React 19
- TypeScript
- Vite
- ESLint
