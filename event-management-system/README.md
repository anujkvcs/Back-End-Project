# Event Management System

A robust REST API for event management platform built with Node.js, Express.js, and MongoDB, featuring user registration, event creation, and admin approval workflows.

## Features

### User Management
- **User Registration:** Account creation with role assignment
- **Authentication:** Secure JWT-based login system
- **Role-based Access:** User and admin role management

### Event Management
- **Event Creation:** Users can create events with detailed information
- **Event Listing:** Browse events with filtering capabilities
- **Event Details:** Comprehensive event information retrieval
- **Admin Approval:** Admin-only event approval system

### Registration Management
- **Event Registration:** Users can register for events
- **Capacity Validation:** Automatic capacity limit enforcement
- **Registration Cancellation:** Users can cancel their registrations
- **Registration Tracking:** View registered events

## API Endpoints

### Authentication
```http
POST /api/auth/register          # User registration
POST /api/auth/login             # User login
```

### Events
```http
POST   /api/events               # Create event
GET    /api/events               # List events (with filters)
GET    /api/events/:id           # Get event details
POST   /api/events/:id/register  # Register for event
DELETE /api/events/:id/register  # Cancel registration
PATCH  /api/events/:id/approve   # Approve event (admin only)
```

## Installation & Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Configuration
Create `.env` file:
```env
PORT=5001
MONGODB_URI=mongodb://localhost:27017/event-management
JWT_SECRET=your-jwt-secret-key
```

### 3. Start Development Server
```bash
npm run dev
```

### 4. Start Production Server
```bash
npm start
```

## API Usage Examples

### Register User
```bash
curl -X POST http://localhost:5001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Alice Johnson",
    "email": "alice@example.com",
    "password": "password123",
    "role": "user"
  }'
```

### Login
```bash
curl -X POST http://localhost:5001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "alice@example.com",
    "password": "password123"
  }'
```

### Create Event
```bash
curl -X POST http://localhost:5001/api/events \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "title": "Tech Conference 2024",
    "description": "Annual technology conference",
    "date": "2024-09-15T00:00:00.000Z",
    "time": "09:00 AM",
    "location": "Convention Center",
    "capacity": 500
  }'
```

### List Events with Filters
```bash
curl "http://localhost:5001/api/events?location=Convention Center&date=2024-09-15"
```

### Register for Event
```bash
curl -X POST http://localhost:5001/api/events/EVENT_ID/register \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### Approve Event (Admin Only)
```bash
curl -X PATCH http://localhost:5001/api/events/EVENT_ID/approve \
  -H "Authorization: Bearer ADMIN_JWT_TOKEN"
```

## Database Schema

### User Model
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  role: ['user', 'admin'],
  registeredEvents: [ObjectId] (ref: Event)
}
```

### Event Model
```javascript
{
  title: String,
  description: String,
  date: Date,
  time: String,
  location: String,
  capacity: Number,
  registeredUsers: [ObjectId] (ref: User),
  createdBy: ObjectId (ref: User),
  status: ['pending', 'approved', 'rejected']
}
```

## Query Parameters

### Event Filtering
- `location` - Filter by event location
- `date` - Filter by event date (YYYY-MM-DD)
- `status` - Filter by approval status
- `limit` - Limit number of results
- `page` - Pagination support

Example:
```
GET /api/events?location=New York&date=2024-09-15&status=approved&limit=10&page=1
```

## Response Format

### Success Response
```json
{
  "success": true,
  "message": "Operation successful",
  "data": { ... }
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error description",
  "data": null
}
```

## Authentication

### JWT Token Usage
Include JWT token in request headers:
```
Authorization: Bearer YOUR_JWT_TOKEN
```

### Role-based Access
- **User Role:** Can create events, register for events, cancel registrations
- **Admin Role:** All user permissions + approve/reject events

## Validation Rules

### Event Creation
- Title: Required, minimum 3 characters
- Description: Required, minimum 10 characters
- Date: Required, must be future date
- Time: Required, valid time format
- Location: Required, minimum 3 characters
- Capacity: Required, minimum 1, maximum 10000

### User Registration
- Name: Required, minimum 2 characters
- Email: Required, valid email format, unique
- Password: Required, minimum 6 characters
- Role: Optional, defaults to 'user'

## Error Codes

- `400` - Bad Request (validation errors)
- `401` - Unauthorized (invalid/missing token)
- `403` - Forbidden (insufficient permissions)
- `404` - Not Found (resource not found)
- `409` - Conflict (duplicate registration, capacity exceeded)
- `500` - Internal Server Error

## Security Features

- **Password Hashing:** bcrypt with salt rounds
- **JWT Authentication:** Secure token-based authentication
- **Input Validation:** Comprehensive request validation
- **CORS Protection:** Cross-origin request handling
- **Role-based Authorization:** Admin and user role separation

## Development

### Project Structure
```
src/
├── controllers/     # Request handlers
├── models/         # Database schemas  
├── routes/         # API routes
├── middlewares/    # Auth & validation
├── app.js          # Express app setup
└── server.js       # Server entry point
```

### Available Scripts
- `npm run dev` - Start development server with nodemon
- `npm start` - Start production server

### Testing
Test the API endpoints using curl, Postman, or any HTTP client:

```bash
# Health check
curl http://localhost:5001

# Expected response
{
  "message": "Event Management System API",
  "endpoints": {
    "auth": "/api/auth",
    "events": "/api/events"
  }
}
```