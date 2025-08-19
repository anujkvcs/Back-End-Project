# Job Portal Management System

A comprehensive REST API for job portal management built with Node.js, Express.js, and MongoDB.

## Features

### User Management
- **Multi-role Registration:** Support for jobseeker and employer roles
- **Secure Authentication:** JWT-based login system with token refresh
- **Profile Management:** User profile creation and updates

### Job Management
- **Job Creation:** Employers can post job listings with detailed requirements
- **Advanced Search:** Text-based search with filters (location, experience, salary)
- **Job Listings:** Paginated job listings with sorting options
- **Job Details:** Comprehensive job information retrieval

### Application Management
- **Job Applications:** Users can apply for jobs with resume upload
- **Application Tracking:** View and manage submitted applications
- **Application Deletion:** Remove applications when needed

## API Endpoints

### Authentication
```http
POST /api/v1/users/register
POST /api/v1/users/login
```

### Jobs
```http
GET    /api/v1/jobs              # List jobs with search/filter
POST   /api/v1/jobs              # Create job (employer only)
GET    /api/v1/jobs/:id          # Get job details
DELETE /api/v1/jobs/:id          # Delete job (employer only)
```

### Applications
```http
POST   /api/v1/applications/apply/:jobId        # Apply for job
GET    /api/v1/applications/my-applications     # Get user applications
DELETE /api/v1/applications/:id                # Delete application
```

## Installation & Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Configuration
Create `.env` file:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/job-portal
ACCESS_TOKEN_SECRET=your-secret-key
ACCESS_TOKEN_EXPIRY=7d
CORS_ORIGIN=*
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
curl -X POST http://localhost:5000/api/v1/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "role": "jobseeker"
  }'
```

### Login
```bash
curl -X POST http://localhost:5000/api/v1/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Create Job (Employer)
```bash
curl -X POST http://localhost:5000/api/v1/jobs \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "title": "Software Developer",
    "company": "Tech Corp",
    "description": "Full-stack developer position",
    "requirements": ["JavaScript", "Node.js", "React"],
    "skills": ["JavaScript", "Node.js"],
    "experience": 2,
    "salary": 75000,
    "location": "remote",
    "vacancy": 3
  }'
```

### Search Jobs
```bash
curl "http://localhost:5000/api/v1/jobs?search=developer&location=remote&experience=2"
```

### Apply for Job
```bash
curl -X POST http://localhost:5000/api/v1/applications/apply/JOB_ID \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -F "resume=@resume.pdf"
```

## Database Schema

### User Model
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  role: ['jobseeker', 'employer'],
  profile: {
    phone: String,
    skills: [String],
    experience: Number,
    resume: String
  }
}
```

### Job Model
```javascript
{
  title: String,
  company: String,
  description: String,
  requirements: [String],
  skills: [String],
  experience: Number,
  salary: Number,
  location: ['remote', 'hybrid', 'onsite'],
  vacancy: Number,
  status: ['active', 'closed', 'draft']
}
```

### Application Model
```javascript
{
  job: ObjectId (ref: Job),
  applicant: ObjectId (ref: User),
  resume: String,
  coverLetter: String,
  status: ['pending', 'accepted', 'rejected'],
  appliedAt: Date
}
```

## Error Handling

The API returns consistent error responses:
```json
{
  "success": false,
  "message": "Error description",
  "data": null
}
```

## Security Features

- **Password Hashing:** bcrypt with salt rounds
- **JWT Authentication:** Secure token-based auth
- **Input Validation:** Request data validation
- **CORS Protection:** Configurable CORS policy
- **File Upload Security:** Multer with file type validation

## Development

### Project Structure
```
src/
├── controllers/     # Request handlers
├── models/         # Database schemas
├── routes/         # API routes
├── middlewares/    # Auth & validation
├── utils/          # Helper functions
├── app.js          # Express app setup
└── server.js       # Server entry point
```

### Available Scripts
- `npm run dev` - Start development server with nodemon
- `npm start` - Start production server
- `npm test` - Run tests (if configured)