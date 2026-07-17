# Frontend Guide

> **Project:** AI Creative Studio
> **Challenge:** IBM AI Builders Challenge 2026
> **Version:** 1.0

---

# Overview

AI Creative Studio is built as a modern Single Page Application (SPA) using React and Vite.

The frontend architecture follows enterprise software engineering principles including modular design, feature-based organization, reusable UI components, centralized state management, and scalable project structure.

---

# Technology Stack

## Core Framework

- React 19
- Vite
- JavaScript (ES2023)

---

## UI Framework

- Tailwind CSS
- shadcn/ui
- Lucide Icons

---

## Routing

- React Router

---

## State Management

Current

- React Context API

Future

- Redux Toolkit (Planned)

---

## AI Integration

Current

- IBM Granite Foundation Models
- IBM watsonx.ai

---

# Project Structure

```
frontend/

public/

src/

assets/
components/
config/
constants/
contexts/
features/
hooks/
routes/
services/
styles/
utils/

App.jsx
main.jsx
```

---

# Folder Responsibilities

## assets/

Stores static resources.

Contents:

- Images
- Icons
- Logos
- Illustrations

---

## components/

Reusable UI components.

Structure:

```
components/

common/
layout/
ui/
```

Responsibilities:

- Shared UI
- Layout components
- Generic controls
- Application shell

---

## config/

Application configuration.

Examples:

- Global settings
- Environment configuration
- Constants initialization

---

## constants/

Centralized application constants.

Examples:

- Routes
- Theme values
- Global configuration

---

## contexts/

Application state management.

Current contexts include:

- AIContext
- AuthContext
- EditorContext
- ProjectContext
- SettingsContext
- TemplateContext
- ThemeContext

Responsibilities:

- Global state
- Shared business logic
- Context providers

---

## features/

Feature-based architecture.

Current modules:

- AI
- Authentication
- Dashboard
- Editor
- Landing
- Projects
- Settings
- Templates

Each feature contains:

- Pages
- Components
- Mock data
- Business logic

---

## hooks/

Reusable custom React hooks.

Current hooks:

- useAI
- useAuth
- useEditor
- useProjects
- useTemplates
- useTheme
- useSettings
- useLocalStorage
- useDebounce

---

## routes/

Application routing.

Current implementation:

AppRouter.jsx

Responsibilities:

- Route configuration
- Protected routes
- Navigation

---

## services/

Service layer.

Current services:

- aiService
- authService
- projectService
- templateService
- settingsService
- editorService
- activityService

Responsibilities:

- API communication
- AI requests
- Business services
- Data access

---

## styles/

Global styles.

Includes:

- Design tokens
- Animations
- Shared styling

---

## utils/

Utility functions.

Current utilities:

- Validators
- Formatters
- Export helpers
- Statistics
- Storage
- Common helpers

---

# Feature-Based Architecture

The application follows Feature-Based Organization.

```
Feature

↓

Components

↓

Context

↓

Hooks

↓

Services

↓

Utilities
```

Benefits:

- High cohesion
- Easy scalability
- Better maintainability

---

# Component Architecture

The UI is organized into three layers.

## Common Components

Reusable infrastructure components.

Examples:

- ErrorBoundary
- PageLoader
- ProtectedRoute

---

## Layout Components

Responsible for page layout.

Examples:

- Navbar
- Sidebar
- Footer
- Dashboard Layout

---

## UI Components

Reusable design system.

Examples:

- Button
- Card
- Input
- Modal
- Badge
- Avatar

---

# State Management

Current implementation:

React Context API

Contexts communicate with:

- Services
- Hooks
- UI Components

Future:

Redux Toolkit (Planned)

---

# Routing Architecture

Navigation uses React Router.

Current routes include:

- Landing
- Login
- Register
- Dashboard
- Projects
- Editor
- Templates
- Settings

Protected routes are managed through:

ProtectedRoute.jsx

---

# AI Module

Current AI module contains:

- Prompt Input
- AI Studio
- Export Menu
- AI Statistics
- History Panel
- Generation Result

Responsibilities:

- Prompt management
- AI requests
- Response rendering
- Export

---

# Services Layer

Services abstract business logic from UI.

Current responsibilities:

- AI communication
- Authentication
- Project management
- Settings
- Editor operations

Future:

Backend REST API integration

---

# Design Principles

The frontend follows:

- Separation of Concerns
- Reusable Components
- Modular Architecture
- Feature Isolation
- Clean Code
- Responsive Design

---

# Current Architecture

Current frontend architecture supports:

- AI-assisted writing
- Project management
- Prompt templates
- Responsive interface
- Local persistence

---

# Future Improvements

Planned enhancements:

- Redux Toolkit
- Backend API
- JWT Authentication
- Cloud Database
- WebSocket Synchronization
- Offline Support
- Progressive Web App (PWA)

---

# Architecture Characteristics

| Characteristic | Status |
|---------------|--------|
| Modular | ✅ |
| Component-Based | ✅ |
| Feature-Based | ✅ |
| Responsive | ✅ |
| AI-first | ✅ |
| Cloud Ready | ✅ |
| Enterprise Ready | ✅ |

---

# Conclusion

The frontend architecture of AI Creative Studio has been designed to support enterprise-scale applications through modular organization, reusable components, feature-based development, and AI-first workflows.

Its structure enables future expansion toward cloud-native services, enterprise authentication, and advanced collaboration while maintaining a clean and maintainable codebase.