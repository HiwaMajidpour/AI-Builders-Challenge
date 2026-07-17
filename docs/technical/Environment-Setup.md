# Environment Setup

> **Project:** AI Creative Studio
> **Challenge:** IBM AI Builders Challenge 2026
> **Version:** 1.0

---

# Overview

This document explains how to set up the AI Creative Studio development environment.

The setup process is intentionally simple to allow contributors and reviewers to quickly run the project locally.

---

# System Requirements

Minimum requirements

- Node.js 20+
- npm 10+
- Git
- Modern Web Browser

Recommended

- Visual Studio Code
- GitHub Desktop
- Postman
- Draw.io Desktop

---

# Clone Repository

```bash
git clone https://github.com/USERNAME/ai-creative-studio.git

cd ai-creative-studio
```

---

# Install Dependencies

```bash
npm install
```

---

# Environment Variables

Create

```
.env
```

Example

```env
VITE_APP_NAME=AI Creative Studio

VITE_WATSONX_API_KEY=your_api_key

VITE_WATSONX_URL=https://...

VITE_PROJECT_ID=your_project_id

VITE_MODEL_ID=ibm/granite
```

---

# Start Development Server

```bash
npm run dev
```

Application

```
http://localhost:5173
```

---

# Build Production

```bash
npm run build
```

Output

```
dist/
```

---

# Preview Production Build

```bash
npm run preview
```

---

# Project Structure

```
frontend/

src/
components/
contexts/
features/
hooks/
routes/
services/
styles/
utils/

public/

package.json

vite.config.js
```

---

# Recommended VS Code Extensions

- ESLint
- Prettier
- Tailwind CSS IntelliSense
- GitLens
- Error Lens
- Markdown All in One
- Draw.io Integration

---

# Development Scripts

Development

```bash
npm run dev
```

Build

```bash
npm run build
```

Preview

```bash
npm run preview
```

Lint

```bash
npm run lint
```

---

# AI Configuration

Current AI Provider

IBM Granite Foundation Models

Through

IBM watsonx.ai

Configuration

```
API Key

Project ID

Model ID
```

---

# Current Storage

- Browser Local Storage

Future

- PostgreSQL
- IBM Cloud Databases

---

# Browser Support

Supported

- Chrome
- Edge
- Firefox
- Safari

---

# Troubleshooting

If dependencies fail

```bash
rm -rf node_modules

npm install
```

If cache issues occur

```bash
npm cache clean --force
```

Restart

```bash
npm run dev
```

---

# Future Environment

Planned additions

- Backend API
- Docker
- Kubernetes
- PostgreSQL
- IBM Cloud
- CI/CD

---

# Development Checklist

Before starting development

- Install Node.js
- Clone repository
- Install dependencies
- Configure .env
- Run development server
- Verify IBM AI connection

---

# Conclusion

Following this setup guide ensures that contributors can quickly configure their local environment and begin developing AI Creative Studio using the same architecture and tooling as the primary project.