# Backend Development Systems

This repository contains two Node.js backend systems built with Express.js and MongoDB, demonstrating modern API development practices.

## Architecture Overview

### Technology Stack
- **Runtime:** Node.js with ES6 modules
- **Framework:** Express.js
- **Database:** MongoDB with Mongoose ODM
- **Authentication:** JWT-based authentication
- **Security:** bcrypt for password hashing
- **Architecture:** MVC pattern with clean separation

### Project Structure
```
├── job-portal-system/          # Job management API (Port 5000)
├── event-management-system/    # Event management API (Port 5001)
└── README.md
```

## Systems Overview

### 1. Job Portal Management System
A comprehensive job portal API enabling job posting, searching, and application management with role-based access control.

**Key Features:**
- Multi-role authentication (jobseeker/employer)
- Advanced job search with filters
- Application lifecycle management
- File upload support for resumes

### 2. Event Management System
An event management platform with user registration, capacity management, and admin approval workflows.

**Key Features:**
- Role-based access (user/admin)
- Event capacity validation
- Registration management
- Admin approval system

## Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MongoDB Atlas account or local MongoDB
- npm or yarn package manager

### Installation

1. **Clone and setup Job Portal System:**
```bash
cd job-portal-system
npm install
cp .env.example .env  # Configure environment variables
npm run dev
```

2. **Clone and setup Event Management System:**
```bash
cd event-management-system
npm install
cp .env.example .env  # Configure environment variables
npm run dev
```

### Environment Configuration

Both systems require MongoDB connection and JWT secrets in their `.env` files:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
CORS_ORIGIN=*
```

### MongoDB Atlas Setup

1. **IP Whitelist**: Add your IP address to MongoDB Atlas Network Access
2. **SSL Configuration**: Both systems include SSL configuration for Atlas connections
3. **Connection Issues**: If experiencing SSL errors, ensure your Atlas cluster allows connections from your IP

## API Documentation

Detailed API documentation and usage instructions are available in each system's README:
- [Job Portal API Documentation](./job-portal-system/README.md)
- [Event Management API Documentation](./event-management-system/README.md)

## Development

### Code Structure
Both systems follow MVC architecture:
- `models/` - Database schemas and models
- `controllers/` - Business logic and request handling
- `routes/` - API endpoint definitions
- `middlewares/` - Authentication and validation
- `utils/` - Helper functions and utilities

### Security Features
- JWT-based authentication
- Password hashing with bcrypt
- Input validation and sanitization
- CORS configuration
- Role-based access control

### Database Design
- Normalized schema design
- Proper indexing for search performance
- Referential integrity with population
- Optimized queries with aggregation

## Testing

Test the APIs using tools like Postman or curl:

```bash
# Job Portal System
curl http://localhost:5000

# Event Management System
curl http://localhost:5001
```

## Production Deployment

1. Set production environment variables
2. Use process managers like PM2
3. Configure reverse proxy (nginx)
4. Enable SSL/TLS certificates
5. Set up monitoring and logging