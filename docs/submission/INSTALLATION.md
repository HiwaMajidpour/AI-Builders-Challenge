# Installation Guide

> **Project:** AI Creative Studio  
> **Challenge:** IBM AI Builders Challenge 2026  
> **Version:** 1.0

---

# Overview

This guide explains how to install, configure, build, and run AI Creative Studio locally.

The application is a modern React-based frontend powered by **IBM Granite Foundation Models** through **IBM watsonx.ai**.

---

# System Requirements

Before installing the project, ensure the following software is available.

## Required

- Node.js 20 or later
- npm 10 or later
- Git

## Recommended

- Visual Studio Code
- Google Chrome
- GitHub Desktop (optional)

---

# Clone Repository

Clone the repository using Git.

```bash
git clone <repository-url>

cd ai-creative-studio
```

---

# Install Dependencies

Install all required packages.

```bash
npm install
```

---

# Environment Variables

Create a local environment file.

```
.env.local
```

Configure the required variables.

Example

```env
VITE_WATSONX_API_KEY=your_api_key

VITE_WATSONX_PROJECT_ID=your_project_id

VITE_WATSONX_REGION=your_region
```

> Replace the example values with your IBM watsonx.ai credentials.

---

# Run Development Server

Start the development server.

```bash
npm run dev
```

The application will be available at

```
http://localhost:5173
```

---

# Build for Production

Create a production build.

```bash
npm run build
```

Production files will be generated in

```
dist/
```

---

# Preview Production Build

Run the production preview.

```bash
npm run preview
```

---

# Project Structure

```
src/

components/

pages/

hooks/

contexts/

services/

lib/

docs/

architecture/

business/

technical/

ibm/

ai-engineering/

submission/
```

---

# Technology Stack

Frontend

- React 19
- TypeScript
- Vite

UI

- Tailwind CSS
- shadcn/ui
- Lucide Icons

AI

- IBM Granite Foundation Models
- IBM watsonx.ai

Development

- Git
- GitHub
- Draw.io
- Markdown

---

# Deployment

Current deployment

- Vercel

Future deployment

- IBM Cloud
- Docker
- Kubernetes

---

# Troubleshooting

## npm install fails

Try

```bash
rm -rf node_modules

rm package-lock.json

npm install
```

---

## Environment variables are not detected

Verify

- `.env.local` exists
- Variable names start with `VITE_`
- Restart the development server

---

## Build errors

Run

```bash
npm run build
```

Review the reported TypeScript or dependency errors before deployment.

---

# Current Implementation

The current application includes:

- React frontend
- IBM Granite integration
- IBM watsonx.ai
- Local Storage persistence
- Responsive UI

---

# Planned Enhancements

Future releases may include:

- JWT Authentication
- PostgreSQL
- Backend API
- IBM Cloud deployment
- Retrieval-Augmented Generation (RAG)
- AI Agents
- Multi-model AI support

These features are documented as planned architecture and are not included in the current implementation.

---

# Support

For project documentation, refer to the following directories:

```
docs/architecture/

docs/business/

docs/technical/

docs/ibm/

docs/ai-engineering/

docs/submission/
```

---

# Conclusion

Following the steps in this guide will allow developers and reviewers to install, configure, and run AI Creative Studio locally.

The project has been designed with a modular architecture and is ready for future enterprise expansion while maintaining compatibility with IBM Granite Foundation Models and IBM watsonx.ai.