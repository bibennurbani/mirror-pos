* * *

Budgeting App
=============

A React + TypeScript + Vite + Mobx project focused on delivering a seamless budgeting tool. This application leverages the power of MobX for state management, structured around `AppStore`, `ApiStore`, and `PageStore` for a clean and scalable architecture.

State Management
----------------

This project uses a three-tiered state management strategy to ensure a clear separation of concerns and maintainability:

*   **AppStore**: Manages the core business logic and state of the application.
*   **ApiStore**: Handles interactions with external APIs and data fetching.
*   **PageStore**: Manages UI-specific state and logic for individual pages or components.

This architecture supports complex user interactions, efficient data management, and synchronization between the UI and application state.

Key Dependencies
----------------

*   React and React DOM for UI development.
*   MobX and MobX Keystone for state management.
*   MUI for React components that implement Google's Material Design.
*   React Router for navigation between pages.
*   Supabase for easy integration with the Supabase backend.
*   Axios for promise-based HTTP client.
*   Yup for value parsing and validation.
*   Vite as a build tool for a faster and leaner development experience.

Getting Started
---------------

### Prerequisites

Ensure you have Node.js installed on your machine to use npm commands.

### Installation

1.  Clone the repository:
    
    shCopy code
    
    `git clone https://github.com/bibennurbani/budgeting-app.git`
    
2.  Navigate to the project directory:
    
    shCopy code
    
    `cd budgeting-app`
    
3.  Install NPM packages:
    
    shCopy code
    
    `npm install`
    

### Available Scripts

*   `npm run dev`: Starts the development server.
*   `npm run build:dev`: Builds the app for development.
*   `npm run build:prod`: Builds the app for production.
*   `npm run lint`: Lints and fixes files.
*   `npm run preview`: Preview the production build.
*   `npm run serve`: Serve the development build.
*   `npm run serve:dev`: Serve the development build.
*   `npm run serve:prod`: Serve the production build.

### Running the Project

To start the development server:

shCopy code

`npm run dev`

Open [http://localhost:5173/](http://localhost:5173/) to view it in your browser. The page will reload when you make changes.

Contributing
------------

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

License
-------

Distributed under the MIT License. See `LICENSE` for more information.

* * *