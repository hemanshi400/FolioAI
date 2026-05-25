# FolioAI API Documentation

## Base URL
```
http://localhost:3000/api (development)
https://folioai.vercel.app/api (production)
```

## Authentication
All API endpoints except public portfolio endpoints require authentication via Clerk JWT token.

## Endpoints

### Portfolio Data

#### Get Public Portfolio
```http
GET /api/portfolio/[username]
```

**Response:**
```json
{
  "name": "Rahul Sharma",
  "headline": "Full Stack Developer",
  "bio": "Passionate about building scalable web applications",
  "skills": ["React", "Next.js", "TypeScript"],
  "projects": [...],
  "experience": [...],
  "education": [...],
  "theme": "minimal"
}
```

### Projects

#### List User Projects
```http
GET /api/projects
```

**Headers:**
```
Authorization: Bearer <clerk-token>
```

**Response:**
```json
[
  {
    "id": "1",
    "userId": "user-123",
    "title": "E-commerce Platform",
    "description": "Full-stack e-commerce platform",
    "imageUrl": "https://...",
    "githubUrl": "https://github.com/...",
    "liveUrl": "https://...",
    "createdAt": "2024-01-01T00:00:00Z"
  }
]
```

#### Create Project
```http
POST /api/projects
Content-Type: application/json

{
  "title": "Project Title",
  "description": "Project description",
  "githubUrl": "https://github.com/...",
  "liveUrl": "https://example.com",
  "imageUrl": "https://..."
}
```

**Response:**
```json
{
  "id": "new-id",
  "userId": "user-123",
  ...
}
```

#### Update Project
```http
PUT /api/projects/[projectId]
Content-Type: application/json

{
  "title": "Updated Title",
  ...
}
```

#### Delete Project
```http
DELETE /api/projects/[projectId]
```

**Response:**
```json
{ "success": true }
```

### AI Features

#### Optimize Content
```http
POST /api/ai/optimize
Content-Type: application/json

{
  "type": "optimize-bio" | "improve-project" | "suggest-headline" | "suggest-skills",
  "content": "Text to optimize"
}
```

**Supported Types:**
- `optimize-bio` - Improve bio/about section
- `improve-project` - Rewrite project description professionally
- `suggest-headline` - Generate portfolio headline/tagline
- `suggest-skills` - Suggest skills based on resume

**Response:**
```json
{
  "result": "Optimized content or suggestions"
}
```

### File Uploads

#### Upload Resume
```http
POST /api/uploads/resume
Content-Type: multipart/form-data

file: <PDF or DOCX file>
```

**Response:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "skills": ["JavaScript", "React", "Node.js"],
  "experience": [
    {
      "company": "Tech Company",
      "position": "Senior Developer",
      "startDate": "2021-01-01",
      "description": "..."
    }
  ],
  "education": [
    {
      "school": "University",
      "degree": "Bachelor of Science",
      "field": "Computer Science",
      "startDate": "2017-09-01",
      "endDate": "2021-05-31"
    }
  ]
}
```

## Error Responses

### 400 Bad Request
```json
{
  "error": "Invalid request data"
}
```

### 401 Unauthorized
```json
{
  "error": "Unauthorized - Authentication required"
}
```

### 404 Not Found
```json
{
  "error": "Resource not found"
}
```

### 500 Internal Server Error
```json
{
  "error": "Internal server error"
}
```

## Rate Limiting

OpenAI API has the following rate limits:
- Requests per minute (RPM): Based on plan
- Tokens per minute (TPM): Based on plan

Cloudinary has the following limits:
- 100 requests per hour for free tier
- Unlimited for paid plans

## Status Codes

| Code | Meaning |
|------|---------|
| 200 | OK - Request succeeded |
| 201 | Created - Resource created |
| 204 | No Content - Successful deletion |
| 400 | Bad Request - Invalid request data |
| 401 | Unauthorized - Authentication required |
| 403 | Forbidden - Permission denied |
| 404 | Not Found - Resource not found |
| 409 | Conflict - Duplicate resource |
| 429 | Too Many Requests - Rate limit exceeded |
| 500 | Internal Server Error |

## Example Usage

### Using Fetch API
```typescript
// Get portfolio
const response = await fetch('/api/portfolio/rahul');
const portfolio = await response.json();

// Create project
const response = await fetch('/api/projects', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    title: 'My Project',
    description: 'Project description',
  }),
});
const project = await response.json();

// Optimize bio
const response = await fetch('/api/ai/optimize', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    type: 'optimize-bio',
    content: 'My current bio text',
  }),
});
const { result } = await response.json();
```

### Using Axios
```typescript
import axios from 'axios';

// Create project
const { data: project } = await axios.post('/api/projects', {
  title: 'My Project',
  description: 'Project description',
});

// Get portfolio
const { data: portfolio } = await axios.get('/api/portfolio/rahul');
```

## CORS

CORS is configured to allow requests from the application domain only. Cross-origin requests from other domains are not allowed.

## Pagination

Some endpoints may support pagination using query parameters:
- `?page=1` - Page number (1-indexed)
- `?limit=10` - Items per page

Example:
```http
GET /api/projects?page=1&limit=10
```

## Webhook Events

In future versions, webhooks will be available for:
- `portfolio.created`
- `portfolio.updated`
- `project.created`
- `project.deleted`
- `resume.uploaded`

## Changelog

### v1.0.0 (Current)
- Initial API release
- Portfolio and project endpoints
- AI optimization features
- Resume upload and parsing

## Support

For API issues or questions, please refer to the README.md or open an issue on GitHub.
