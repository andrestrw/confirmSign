# ConfirmSign Technical Test - React Frontend

## Overview

This repository contains the frontend implementation for the ConfirmSign technical test. It is built as a Single Page Application (SPA) focusing on clean architecture, strong typing, and strict separation of concerns, which are essential for a scalable Full Stack environment.

## Technical Stack & Decisions

- **React 18 & TypeScript:** Core foundation of the application, ensuring a robust, maintainable, and type-safe codebase.
- **@tanstack/react-router:** Chosen over traditional alternatives like `react-router-dom` to provide 100% type-safe routing. In a full TypeScript stack, maintaining strict typing across route definitions, loaders, and navigation is essential for architectural coherence and adopting modern ecosystem standards.
- **Vite:** Used as the build tool to leverage fast HMR (Hot Module Replacement) and optimized production builds.
- **SASS (SCSS):** Utilized for component-scoped and modular styling, maintaining a clean design system without forcing dependencies on heavy external UI frameworks.
- **Axios:** For handling dynamic HTTP requests and interceptors.

## Architecture & Clean Code

A primary focus of this project is maintaining a clear separation of responsibilities to ensure the architecture scales cleanly.

- **Business Logic Decoupling:** The application strictly separates business logic from React views.
  - **`api/threadService.ts`**: Encapsulates all direct API communications, isolating HTTP logic from the rest of the application.
  - **`hooks/useThread.ts`**: A custom React hook that acts as an intermediary controller. It manages local state, loading indicators, and error handling, keeping complex data fetching logic entirely out of UI components like `AgreementForm` or `HistoryTable`.
- **Domain Modeling (`types.ts`):** Centralized DTOs and interfaces representing the backend architecture. This ensures absolute consistency across network responses, component properties, and state management.

## Technical Challenges

### Legacy API Integration: Handling CORS, 302 Redirects, & HTML Parsing

One of the most notable engineering challenges was executing the `POST` request triggered when a user accepts a thread. The target endpoint was not designed as a standard REST API for SPAs, which presented three significant combined challenges: CORS blocks, `302 Found` redirects, and non-JSON (HTML) responses.

To overcome this and maintain architectural integrity, an engineering solution was implemented using an orchestrating proxy and DOM parsing:

1. **Bypassing Browser CORS via Relative URLs:**
   Instead of calling the absolute URL (`https://sandbox.confirmsign.com/...`) directly from the frontend, the `threadService.ts` executes the request using a relative path (`/veremail/...`). This tricks the browser into believing the request is directed at the same origin, completely bypassing any CORS preflight errors or security blocks.

2. **Vite Reverse Proxy (`vite.config.ts`):**
   A proxy was configured to act as an invisible bridge. It intercepts any frontend request starting with `/veremail` and forwards it to the true backend server.
   - `changeOrigin: true`: Modifies the request header so the destination server believes the request originates from itself rather than a local development environment.
   - `followRedirects: true`: This is crucial. When the endpoint attempts a `302` redirect, a standard client like Axios running on a different origin would fail. Vite handles this redirect internally on the Node.js server layer and simply returns the final result to the client.

3. **DOM Parsing for Non-Standard Responses:**
   Because the endpoint returns a full HTML document instead of a standard JSON object, a simple `response.data.success` check is not possible. To accurately identify a successful post operation, the raw HTML string is parsed using `DOMParser`. The service analyzes the Document Object Model, extracts the `<title>` tag, and deduces the state (i.e. if the title is "Confirmsign Dove", it validates as a success).

This setup creates a highly robust solution for interacting with legacy web services from a modern, strictly-typed SPA environment without breaking the user experience.

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm

### Installation

1. Clone the repository and navigate into the folder:

   ```bash
   git clone <repository-url>
   cd confirm-sign
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. **No `.env` File required:**
   Thanks to the Vite proxy and TanStack Router parameter setup, you don't need to configure a messy `.env` file before running the application locally. Simply navigate to the corresponding app route with valid query tokens in the URL when the server is running.

4. Run the development server:

   ```bash
   npm run dev
   ```

5. Build for production:
   ```bash
   npm run build
   ```

## Folder Structure

```text
src/
├── api/             # API services and configurations (threadService.ts, axiosInstance.ts)
├── components/      # Reusable React components (AgreementForm, HistoryTable, etc.)
├── hooks/           # Custom React hooks containing business rules (useThread.ts)
├── styles/          # Global SASS files and variables
├── types.ts         # Global TypeScript interfaces and types
├── App.tsx          # Main application component routing
├── main.tsx         # Application entry point
└── router.tsx       # TanStack Router configuration
```
