# 311 Agent - Progressive Web App

This directory contains the source code for the 311 Agent Progressive Web App (PWA). It's a modern React application built with Vite, TypeScript, and TanStack Router.

For a high-level overview of the entire project, please see the [**root README.md**](../README.md).

## 🚀 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

*   Node.js (v18 or higher recommended)
*   npm, pnpm, or yarn

### Installation & Setup

1.  **Navigate to the PWA directory:**
    ```sh
    cd pwa
    ```

2.  **Install dependencies:**
    ```sh
    npm install
    ```

3.  **Run the development server:**
    ```sh
    npm run dev
    ```
    The application will be available at `http://localhost:5173/311-Agent/`.

## 🧠 A Note on the AI Model

The first time you load the application, it will download the `Moondream2` AI model, which is approximately **250MB**. This is a one-time process. The model will be stored in your browser's cache for instant access on subsequent visits.

## 📜 Available Scripts

*   `npm run dev`: Starts the Vite development server with Hot Module Replacement (HMR).
*   `npm run build`: Compiles and bundles the application for production.
*   `npm run lint`: Lints the codebase using ESLint.
*   `npm run preview`: Serves the production build locally for testing.
*   `npm run generate-pwa-assets`: Generates the necessary icons and splash screens for the PWA from `public/logo.svg`.