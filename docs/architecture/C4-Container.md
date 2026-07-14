# Enterprise C4 Container Diagram

**Project:** AI Creative Studio  
**Competition:** IBM AI Builders Challenge 2026  
**Version:** 1.0

---

# Overview

The C4 Container Diagram describes the major runtime containers that compose the AI Creative Studio platform.

Unlike the C4 Context Diagram, which focuses on external systems and users, this diagram explains how the internal software containers collaborate to deliver AI-powered content generation using IBM Granite Foundation Models.

---

# Architecture Overview

The platform consists of six primary containers.

```
User
   │
   ▼
React Frontend (SPA)
   │
   ▼
Prompt Engineering Layer
   │
   ▼
IBM Granite Foundation Models
   │
   ▼
AI Response Engine
   │
   ▼
Browser Local Storage
```

---

# Container Descriptions

## 1. User

### Purpose

Represents the end user interacting with the platform through a web browser.

### Responsibilities

- Submit prompts
- Configure AI generation
- Review generated content
- Save generated outputs
- Provide feedback

---

## 2. React Frontend (SPA)

### Technology

- React
- TypeScript
- Vite
- Tailwind CSS

### Responsibilities

- Landing Page
- Dashboard
- AI Studio
- Templates
- Settings
- Authentication UI
- Prompt Editor
- Generated Content Viewer

### Input

User actions

### Output

Structured prompt request

---

## 3. Prompt Engineering Layer

### Purpose

Transforms raw user input into optimized prompts for IBM Granite.

### Responsibilities

- Prompt validation
- Context building
- Prompt optimization
- Instruction formatting
- System prompt injection
- Safety preprocessing

### Input

Raw prompt

### Output

Optimized prompt

---

## 4. IBM Granite Foundation Models

### Provider

IBM watsonx.ai

### Responsibilities

- Natural language generation
- Prompt understanding
- Content generation
- Context reasoning
- Instruction following

### Input

Optimized prompt

### Output

Generated AI response

---

## 5. AI Response Engine

### Purpose

Processes the raw model response before presenting it to users.

### Responsibilities

- Output validation
- Safety filtering
- Response formatting
- Markdown rendering
- Error handling

### Input

Raw AI output

### Output

Clean formatted response

---

## 6. Browser Local Storage

### Current Storage

Browser Local Storage

### Future Storage

PostgreSQL

### Responsibilities

- Prompt history
- User preferences
- Cached responses
- Session persistence

---

# Container Communication

| Source | Destination | Communication |
|----------|------------|---------------|
| User | React Frontend | Browser Interaction |
| React Frontend | Prompt Engineering Layer | Internal Function Calls |
| Prompt Engineering Layer | IBM Granite | watsonx.ai API |
| IBM Granite | AI Response Engine | AI Response |
| AI Response Engine | Browser Local Storage | Local Persistence |
| Browser Local Storage | React Frontend | Data Retrieval |

---

# Technology Stack

| Layer | Technology |
|---------|------------|
| Frontend | React |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Build Tool | Vite |
| AI Platform | IBM watsonx.ai |
| Foundation Models | IBM Granite |
| Storage | Browser Local Storage |
| Future Database | PostgreSQL |

---

# Security Considerations

- HTTPS communication
- Secure API access
- Prompt validation
- Response filtering
- Input sanitization
- Future authentication support

---

# Scalability

The container architecture allows independent scaling of:

- Frontend application
- Prompt engineering services
- AI model integration
- Response processing
- Persistent storage

---

# Future Enhancements

- PostgreSQL database
- Authentication service
- User management
- Template repository
- Prompt versioning
- Analytics service
- Monitoring dashboard
- Multi-model AI support

---

# Alignment with Enterprise Architecture

This container architecture aligns with the following project artifacts:

- C4 Context Diagram
- System Architecture
- Component Architecture
- Sequence Diagram
- Infrastructure Diagram
- Deployment Architecture
- Data Flow Diagram

---

# Diagram Reference

Diagram Source

```
docs/diagrams/C4-Container.drawio
```

Exported Images

```
docs/diagrams/C4-Container.png
docs/diagrams/C4-Container.svg
```

---

**IBM AI Builders Challenge 2026**

**AI Creative Studio**

**Version 1.0**