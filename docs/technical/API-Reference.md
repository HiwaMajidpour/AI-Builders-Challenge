# API Reference

> **Project:** AI Creative Studio
> **Challenge:** IBM AI Builders Challenge 2026
> **Version:** 1.0

---

# Overview

This document describes the current and planned API architecture of AI Creative Studio.

Although the current implementation is frontend-focused, the project has been designed to support a scalable REST API architecture for future backend integration.

The API layer follows enterprise software engineering principles including modularity, security, versioning, and maintainability.

---

# Architecture

Current Architecture

```
React Frontend

↓

Service Layer

↓

IBM watsonx.ai

↓

IBM Granite
```

Future Architecture

```
React Frontend

↓

REST API

↓

Authentication

↓

Business Services

↓

Database

↓

IBM watsonx.ai
```

---

# Current Services

The frontend currently communicates through service modules.

Location

```
src/services/
```

Current services

```
activityService.js
aiService.js
api.js
authService.js
editorService.js
gemini.js
geminiService.js
projectService.js
settingsService.js
templateService.js
```

---

# AI API

## Generate Content

Current

Frontend Service

```
generateContent(prompt)
```

Future REST Endpoint

```
POST /api/v1/ai/generate
```

Request

```json
{
  "prompt": "Create a project summary",
  "template": "documentation"
}
```

Response

```json
{
  "success": true,
  "content": "...generated text..."
}
```

---

## Prompt Templates

Future

```
GET /api/v1/prompts
```

Returns

- Available templates
- Categories
- Metadata

---

# Authentication API

Current

Mock Authentication

Future

```
POST /api/v1/auth/login

POST /api/v1/auth/register

POST /api/v1/auth/logout

GET /api/v1/auth/profile
```

Authentication

JWT (Planned)

---

# Projects API

Future endpoints

```
GET /api/v1/projects

POST /api/v1/projects

PUT /api/v1/projects/{id}

DELETE /api/v1/projects/{id}
```

---

# Templates API

```
GET /api/v1/templates

GET /api/v1/templates/{id}

POST /api/v1/templates
```

---

# Settings API

```
GET /api/v1/settings

PUT /api/v1/settings
```

---

# Editor API

```
GET /api/v1/documents

POST /api/v1/documents

PUT /api/v1/documents/{id}

DELETE /api/v1/documents/{id}
```

---

# Response Format

Successful response

```json
{
  "success": true,
  "data": {}
}
```

Error response

```json
{
  "success": false,
  "error": {
    "code": "INVALID_REQUEST",
    "message": "Invalid input."
  }
}
```

---

# HTTP Status Codes

| Code | Description |
|------|-------------|
| 200 | OK |
| 201 | Created |
| 400 | Bad Request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |
| 500 | Internal Server Error |

---

# Security

Current

- HTTPS
- Client Validation

Future

- JWT Authentication
- API Gateway
- Rate Limiting
- RBAC
- Secret Management

---

# Versioning

Future API versioning

```
/api/v1/
/api/v2/
```

---

# Error Handling

Standardized error responses include:

- Validation errors
- Authentication failures
- Authorization failures
- AI service errors
- Server errors

---

# Enterprise API Principles

The API architecture follows:

- RESTful Design
- Stateless Communication
- Versioning
- Modular Services
- Secure Authentication
- Consistent Responses
- Scalable Endpoints

---

# Planned Backend Stack

Backend

- Node.js
- Express.js

Database

- PostgreSQL
- IBM Cloud Databases

Authentication

- JWT
- IBM IAM (Future)

Deployment

- IBM Cloud
- Docker
- Kubernetes

---

# API Lifecycle

```
Client

↓

REST API

↓

Authentication

↓

Business Logic

↓

Database

↓

IBM watsonx.ai

↓

IBM Granite

↓

JSON Response
```

---

# Current vs Future

| Feature | Current | Future |
|----------|----------|--------|
| REST API | Mock Services | ✅ |
| Authentication | Mock | JWT |
| Database | Local Storage | PostgreSQL |
| AI Requests | Frontend | Backend API |
| Monitoring | Basic | Enterprise |
| Versioning | Planned | ✅ |

---

# Conclusion

The API architecture has been intentionally designed for future enterprise deployment.

Although the current implementation relies on frontend service modules, the project can evolve into a scalable REST-based platform with secure authentication, persistent storage, and cloud-native deployment while remaining fully compatible with IBM watsonx.ai and IBM Granite Foundation Models.