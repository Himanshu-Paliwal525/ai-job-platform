# AI Job Platform

A backend platform built with Node.js, Express, TypeScript, and MongoDB. It currently features user authentication (signup and login) with JWT and bcrypt.

## Features

- **User Authentication:** Secure signup and login using JWT (JSON Web Tokens) and bcrypt for password hashing.
- **Refresh Tokens:** Access tokens are short-lived, while refresh tokens are stored securely to maintain user sessions.
- **TypeScript:** Fully typed backend for better developer experience and reliability.
- **MongoDB:** Uses Mongoose for database modeling.

## Prerequisites

- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/) (Local or Atlas)

## Getting Started

Follow these instructions to set up the project locally.

### 1. Clone the repository

```bash
git clone https://github.com/Himanshu-Paliwal525/ai-job-platform.git
cd ai-job-platform
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Variables

Create a `.env` file in the root directory and configure the following variables:

```env
# Server Port
PORT=3000

# Database
MONGODB_URI=your_mongodb_connection_string

# Authentication Secrets (generate secure random strings)
ACCESS_TOKEN_SECRET=your_access_token_secret
REFRESH_TOKEN_SECRET=your_refresh_token_secret
```

### 4. Run the Development Server

To start the server in development mode (using nodemon and ts-node):

```bash
npm run dev
```

The server should now be running on `http://localhost:3000` (or your configured `PORT`).

### 5. Build for Production

To compile TypeScript code to JavaScript:

```bash
npm run build
```

This will output the compiled files to the `dist` directory.

### 6. Start Production Server

To run the compiled project:

```bash
npm run start
```

## Available Scripts

- `npm run dev`: Starts the development server.
- `npm run build`: Compiles the TypeScript code.
- `npm run start`: Runs the compiled output in the `dist` directory.
