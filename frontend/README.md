# Blog and User Frontend

## Overview
This is the frontend application for the Blog and User system. It's built with React.js and provides a user-friendly interface for blog operations and user management.

## Features
- User authentication (login/logout)
- User registration
- Blog post creation, editing, and deletion
- Blog post viewing and searching
- User profile management
- Admin panel for user management

## Prerequisites
Before you begin, ensure you have the following installed:
- Node.js 
- npm 

## Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/your-frontend-repo.git
cd your-frontend-repo
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up environment variables
Create a `.env` file in the project root and add the following:
```
VITE_API_HOST=http://localhost:3000
VITE_API="http://localhost:8080"
```
Replace the URL with your backend API URL.

### 4. Start the development server
```bash
npm start
```
The application will be available at `http://localhost:3000`.

## Available Scripts

In the project directory, you can run:

- `npm run dev`: Runs the app in development mode

## State Management
This project uses React Context API for state management. The main contexts are:
- AuthContext: Manages user authentication state
- BlogContext: Manages blog-related state

## Styling
We use CSS Modules for component-specific styling and a global CSS file for common styles.

Tailwind CSS Setup

Tailwind CSS is already configured in this project. You can find the configuration in the tailwind.config.js file in the project root.

Using Tailwind

To use Tailwind, simply add the utility classes to your JSX elements. For example:
jsxCopy<div className="flex items-center justify-between p-4 bg-gray-100">
  <h1 className="text-2xl font-bold text-blue-600">My Blog</h1>
  <button className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600">
    New Post
  </button>
</div>

For custom styles that can't be achieved with Tailwind's utility classes, we use CSS Modules. These files are located in the styles directory.

## API Integration
The `services` folder contains API integration code using Axios for HTTP requests.
