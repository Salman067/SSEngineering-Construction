### Backend
Blog and User API
Overview
This project is a blog and user management system built using Go, MySQL, Gin framework, and Docker. The API provides functionality for blog operations (create, read, update, delete) and user management (registration, login, profile management, admin operations).

Prerequisites
Docker
Getting Started
1. Clone the repository
git clone https://github.com/yourusername/your-repo.git
cd your-repo
2. Configure environment variables
Create a .env file in the project root with the following variables:

DB_HOST=your-database-host
DB_USER=your-database-user
DB_PASSWORD=your-database-password
DB_NAME=your-database-name
3. Build and run Docker containers
Ensure you have a Dockerfile and docker-compose.yml in your project root, then run:

docker-compose up --build
4. Access the API
Once the application is running, access the API at http://localhost:8080.

API Routes
Blog Routes
Method	Endpoint	Description
GET	/app/list	Fetch all blogs
GET	/app/author/:username	Fetch blogs by author
GET	/app/search/:query	Search blogs
POST	/blog/post	Create a new blog post*
GET	/blog/view/:id	View a specific blog
PUT	/blog/:id	Update a blog post*
DELETE	/blog/:id	Delete a blog post*
User Routes
Method	Endpoint	Description
POST	/app/registration	User registration
POST	/app/login	User login
PUT	/user/:id	Update user profile*
GET	/user	Get logged-in user's profile*
GET	/user/profile/:id	Get user profile by ID
GET	/user/users	Admin: Get all users**
DELETE	/user/users/:id	Admin: Delete a user**
* Requires authentication ** Requires authentication and admin privileges

Middleware
Authentication: Protects routes requiring user authentication
IsAdmin: Restricts access to admin-only routes
Development
For local development without Docker, ensure you have Go installed and set up your local MySQL database. Update the .env file with your local database credentials.

##  Frontend
Blog and User Frontend
Overview
This is the frontend application for the Blog and User system. It's built with React.js and provides a user-friendly interface for blog operations and user management.

Features
User authentication (login/logout)
User registration
Blog post creation, editing, and deletion
Blog post viewing and searching
User profile management
Admin panel for user management
Prerequisites
Before you begin, ensure you have the following installed:

Node.js
npm
Getting Started
1. Clone the repository
git clone https://github.com/yourusername/your-frontend-repo.git
cd your-frontend-repo
2. Install dependencies
npm install
3. Set up environment variables
Create a .env file in the project root and add the following:

VITE_API_HOST=http://localhost:3000
VITE_API="http://localhost:8080"
Replace the URL with your backend API URL.

4. Start the development server
npm start
The application will be available at http://localhost:3000.

Available Scripts
In the project directory, you can run:

npm run dev: Runs the app in development mode
State Management
This project uses React Context API for state management. The main contexts are:

AuthContext: Manages user authentication state
BlogContext: Manages blog-related state
Styling
We use CSS Modules for component-specific styling and a global CSS file for common styles.

Tailwind CSS Setup

Tailwind CSS is already configured in this project. You can find the configuration in the tailwind.config.js file in the project root.

Using Tailwind

To use Tailwind, simply add the utility classes to your JSX elements. For example: jsxCopy

My Blog
New Post
For custom styles that can't be achieved with Tailwind's utility classes, we use CSS Modules. These files are located in the styles directory.

API Integration
The services folder contains API integration code using Axios for HTTP requests.
