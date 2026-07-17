# Enterprise State Flow Diagram

## Overview

This document illustrates how application state flows throughout the AI Creative Studio project.

The current architecture uses React Context API, Custom Hooks, Local State, and LocalStorage for state management.

A future enterprise architecture is also illustrated to demonstrate planned scalability improvements.

---

## Current Architecture

```
User
    │
    ▼
React Components
    │
    ▼
Custom Hooks
    │
    ▼
React Contexts
    ├──────────────┐───────────────┐
    ▼              ▼               ▼
Local State   LocalStorage   Service Layer
                                   │
                                   ▼
                           AI / Backend APIs
                                   │
                                   ▼
                           Context Update
                                   │
                                   ▼
                           React Re-render
                                   │
                                   ▼
                              UI Re-render
```

---

## Current State Management

### User

Initiates interactions through the application interface.

---

### React Components

Application pages, reusable UI components, and features consume application state.

---

### Custom Hooks

Business logic is encapsulated inside reusable custom hooks.

Examples include:

- useAuth()
- useProjects()
- useTemplates()
- useEditor()
- useAI()
- useSettings()

---

### React Context API

The project currently manages global state using multiple Context Providers.

Examples:

- ThemeContext
- AuthContext
- ProjectContext
- TemplateContext
- EditorContext
- AIContext
- SettingsContext

---

### Local State

Temporary UI state managed by React hooks.

Examples:

- Modal visibility
- Selected items
- Form state

---

### LocalStorage

Persistent browser storage currently used for:

- Authentication session
- User preferences
- Cached data

---

### Service Layer

All external communication passes through dedicated service modules.

Examples:

- api.js
- authService
- projectService
- templateService
- editorService
- aiService
- geminiService

---

### AI / Backend APIs

Current integrations include:

- IBM Granite Foundation Models
- Gemini API

Future backend APIs are planned.

---

### Context Update

Responses update Context Providers.

---

### React Re-render

Updated Context values trigger automatic component rendering.

---

### UI Re-render

The updated interface is presented to the user.

---

# Future Architecture (Planned)

The following improvements are planned for enterprise scalability.

## Planned Technologies

- Redux Toolkit
- Cloud Database
- WebSocket Synchronization

---

## Planned Improvements

- Global state optimization
- Persistent cloud storage
- Backend synchronization
- Real-time collaboration
- Improved scalability
- Reduced Context complexity

---

## Notes

Current implementation uses React Context API.

Redux Toolkit, Cloud Database, and WebSocket synchronization are future enhancements and are **not implemented** in Version 1.0.

---

**Version**

IBM AI Builders Challenge 2026

AI Creative Studio

Version 1.0