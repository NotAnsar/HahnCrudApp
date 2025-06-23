## 🛠️ Setup

### Prerequisites

- Java 17+, Node.js 18+, Docker

### Database

```bash
# Start database
docker-compose up -d

# Stop database
docker-compose down

# Reset database (removes all data)
docker-compose down -v
```

## ⚡ Quick Start

```bash
# 1. Start database
docker-compose up -d

# 2. Start backend
cd backend && ./mvnw spring-boot:run

# 3. Start frontend
cd frontend && npm install && npm run dev
```

**URLs:**

- Frontend: http://localhost:5173
- Backend API: http://localhost:8080/api

## 🔌 API Endpoints

**Auth:**

```
POST /api/auth/signin      # Login
POST /api/auth/signup      # Register
```

**Users:**

```
GET    /api/users          # Get all users
GET    /api/users/{id}     # Get user by ID
POST   /api/users          # Create user
PUT    /api/users/{id}     # Update user
DELETE /api/users/{id}     # Delete user
```

## 🛡️ Security Features

- JWT authentication
- Password hashing with BCrypt
- Protected routes (frontend & backend)
- Username/email uniqueness validation
- Self-deletion prevention

## 📦 Project Structure

```
HahnCrudApp/
├── backend/           # Spring Boot API + Security
├── front/             # React TypeScript
├── docker-compose.yml # PostgreSQL database
└── README.md
```
