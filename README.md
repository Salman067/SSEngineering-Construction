# Blog and User Management System

## Overview

This project is a full-stack blog and user management system built using Go, MySQL, and Gin framework for the backend, and React.js for the frontend. The system provides functionality for blog operations (create, read, update, delete) and user management (registration, login, profile management, admin operations).

## Features

- User authentication (login/logout)
- User registration
- Blog post creation, editing, and deletion
- Blog post viewing and searching
- User profile management
- Admin panel for user management

## Prerequisites

- Docker
- Node.js and npm (for local frontend development)

## Getting Started

### Backend Setup

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/your-repo.git
   cd your-repo
   ```

2. Configure environment variables:
   Create a `.env` file in the project root with the following variables:
   ```
   DB_HOST=your-database-host
   DB_USER=your-database-user
   DB_PASSWORD=your-database-password
   DB_NAME=your-database-name
   ```

3. Build and run Docker containers:
   ```
   docker-compose up --build
   ```

4. The backend API will be accessible at `http://localhost:8080`.

### Frontend Setup

1. Navigate to the frontend directory:
   ```
   cd frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the frontend directory with:
   ```
   VITE_API_HOST=http://localhost:3000
   VITE_API="http://localhost:8080"
   ```

4. Start the development server:
   ```
   npm run dev
   ```

5. The frontend application will be available at `http://localhost:3000`.

## API Routes

### Blog Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET    | /app/list | Fetch all blogs |
| GET    | /app/author/:username | Fetch blogs by author |
| GET    | /app/search/:query | Search blogs |
| POST   | /blog/post | Create a new blog post* |
| GET    | /blog/view/:id | View a specific blog |
| PUT    | /blog/:id | Update a blog post* |
| DELETE | /blog/:id | Delete a blog post* |

### User Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST   | /app/registration | User registration |
| POST   | /app/login | User login |
| PUT    | /user/:id | Update user profile* |
| GET    | /user | Get logged-in user's profile* |
| GET    | /user/profile/:id | Get user profile by ID |
| GET    | /user/users | Admin: Get all users** |
| DELETE | /user/users/:id | Admin: Delete a user** |

*Requires authentication
**Requires authentication and admin privileges

## Technology Stack

### Backend
- Go
- MySQL
- Gin framework
- Docker

### Frontend
- React.js
- Tailwind CSS
- Axios for API integration
- React Context API for state management

## Development

For local development without Docker:
- Ensure you have Go installed for the backend
- Set up a local MySQL database
- Update the `.env` file with your local database credentials

## Available Scripts (Frontend)

In the frontend project directory, you can run:
- `npm run dev`: Runs the app i## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.n development mode

## Styling

The frontend uses a combination of Tailwind CSS for utility classes and CSS Modules for component-specific styling. The Tailwind configuration can be found in `tailwind.config.js` in the frontend project root.

