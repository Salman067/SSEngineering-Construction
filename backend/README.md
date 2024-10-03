# Blog and User API

## Overview
This project is a blog and user management system built using Go, MySQL, Gin framework, and Docker. The API provides functionality for blog operations (create, read, update, delete) and user management (registration, login, profile management, admin operations).

## Prerequisites
- [Docker](https://www.docker.com/get-started)

## Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/your-repo.git
cd your-repo
```

### 2. Configure environment variables
Create a `.env` file in the project root with the following variables:
```
DB_HOST=your-database-host
DB_USER=your-database-user
DB_PASSWORD=your-database-password
DB_NAME=your-database-name
```

### 3. Build and run Docker containers
Ensure you have a `Dockerfile` and `docker-compose.yml` in your project root, then run:
```bash
docker-compose up --build
```

### 4. Access the API
Once the application is running, access the API at `http://localhost:8080`.

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

\* Requires authentication
\** Requires authentication and admin privileges

## Middleware
- Authentication: Protects routes requiring user authentication
- IsAdmin: Restricts access to admin-only routes

## Development
For local development without Docker, ensure you have Go installed and set up your local MySQL database. Update the `.env` file with your local database credentials.
