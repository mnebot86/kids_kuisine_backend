# Express MongoDB Template

This is a backend template using **Node.js**, **Express**, **TypeScript**, **Mongoose**, and **Passport** for authentication. It is organized to be scalable, with a clean structure and includes ready-to-use configurations for **linting**, **prettier**, **logging**, **testing**, and **environment management**.

## Features

-   **Authentication**: Passport with JWT authentication.
-   **Environment Configuration**: Configured with environment variables for secure setup.
-   **Modular Structure**: Separation of concerns with organized folder structure.
-   **Logging**: Using **Winston** to log errors and requests.
-   **Linting and Formatting**: ESLint and Prettier for consistent code quality.
-   **Testing**: Jest and Supertest for unit and integration tests.

## Folder Structure

-   **src/config** - Configuration files for database, Passport, and environment variables.
-   **src/controllers** - Controller files for handling API requests.
-   **src/middleware** - Middleware for authentication and error handling.
-   **src/models** - Mongoose models for MongoDB collections.
-   **src/routes** - Route definitions for API endpoints.
-   **src/services** - Business logic and service layer for data manipulation.
-   **src/utils** - Utility functions, including logger setup.
-   **tests** - Test files for controllers and other components.
-   **logs** - Contains `combined.log` and `error.log` for logging.

## Getting Started

### Prerequisites

-   **Node.js** v16 or higher
-   **MongoDB** (local or hosted)

### Installation

1. **Clone the repository**:

    ```bash
    git clone <your-repo-url>
    cd express-mongodb-template

    ```

2. Install dependencies:

bash ```
npm install

````

3.	Set up environment variables:
	Create a .env file in the root directory and add your configurations. For example:
	bash ```
	PORT=5000
	MONGO_URI=mongodb://localhost:27017/mydatabase
	JWT_SECRET=your_jwt_secret
````

Running the Application

    •	Development:

    bash ```
    npm run dev
    ```

    •	Production (after building):

    bash ```
    npm run build
    npm start
    ```

Scripts

    •	npm run dev - Starts the server in development mode with TypeScript and nodemon.
    •	npm run build - Compiles TypeScript into JavaScript.
    •	npm start - Runs the compiled JavaScript in production mode.
    •	npm test - Runs tests using Jest.
    •	npm run lint - Lints the code using ESLint.
    •	npm run lint:fix - Fixes linting issues automatically.
    •	npm run clean-up - Runs both lint fix and Prettier formatting.

API Documentation

Authentication Routes

    •	POST /api/v1/register - Register a new user.
    •	POST /api/v1/login - Login with email and password to receive a JWT token.

User Routes

    •	GET /api/v1/users - Fetch all users (authenticated route).

Error Handling

All errors are centrally handled using a custom error-handling middleware in src/middleware/errorHandler.ts.

Testing

    •	Unit and Integration Tests: This project uses Jest and Supertest.
    •	Run tests:

    	bash ```
    	npm run test
    	```

Logging

Logs are stored in the logs folder:
• combined.log - All logs.
• error.log - Only errors.

GitHub Actions & Workflows

This template includes GitHub workflows for:
• Linting - Checks code formatting and linting on pull requests.
• Testing - Runs Jest tests on pull requests.
• End-to-End (E2E) Testing - Runs Cypress tests (if configured) for integration testing.

Contribution Guidelines

Pull Request Checklist

    •	My code follows the style guidelines of this project.
    •	I have performed a self-review of my code.
    •	I have commented my code where necessary.
    •	I have added tests that prove my fix is effective or that my feature works.
    •	All tests pass locally and in CI.
