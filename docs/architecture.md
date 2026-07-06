# StoryForge AI Architecture

## Overview

StoryForge AI follows a modern feature-based frontend architecture built with React and Vite.

The project separates presentation, state management, business logic, and external integrations into dedicated layers, making the codebase scalable, maintainable, and easy to extend.

The application is designed around reusable components, centralized state management using React Context API, custom hooks for business logic abstraction, and a dedicated service layer responsible for external API communication.

Current deployment targets a frontend-only architecture powered by Google Gemini, while the overall design intentionally supports future backend integration, IBM Granite models, IBM watsonx.ai, authentication providers, databases, and collaborative workspaces.

---

# Architecture Goals

The architecture was designed with the following objectives:

- Scalability
- Maintainability
- Reusability
- Separation of Concerns
- Modular Development
- Easy Testing
- Cloud Readiness
- Future IBM AI Integration
- Backend Independence
- Developer Productivity

---

# High-Level Architecture

```
                 User
                   │
                   ▼
          React User Interface
                   │
                   ▼
            Feature Components
                   │
                   ▼
             React Context API
                   │
                   ▼
              Custom Hooks
                   │
                   ▼
             Service Layer
                   │
                   ▼
        Google Gemini API
                   │
                   ▼
         Generated AI Content
                   │
                   ▼
             Statistics Engine
                   │
                   ▼
          UI Update + History
```

---

# Technology Stack

| Layer | Technology |
|---------|------------|
| Frontend | React 19 |
| Build Tool | Vite |
| Styling | Tailwind CSS |
| Routing | React Router |
| State Management | React Context API |
| AI Integration | Google Gemini |
| Package Manager | npm |
| Deployment | Vercel |
| Version Control | Git + GitHub |

---

# Architectural Style

StoryForge AI adopts a Feature-Based Architecture.

Instead of grouping files by type only, major application functionality is organized into independent feature modules.

Each feature owns its components, mock data, and feature-specific logic.

Current feature modules include:

- Landing
- Authentication
- Dashboard
- AI Studio
- Editor
- Projects
- Templates
- Settings

This architecture improves long-term scalability and reduces coupling between unrelated application features.

---

# Frontend Architecture

The frontend application is organized into multiple architectural layers, each with a clearly defined responsibility.

This layered approach improves maintainability, encourages code reuse, and prevents tight coupling between user interface components and business logic.

The overall flow follows this direction:

```
Presentation Layer
        │
        ▼
Feature Components
        │
        ▼
React Context API
        │
        ▼
Custom Hooks
        │
        ▼
Service Layer
        │
        ▼
External APIs
```

Each layer communicates only with the layer directly beneath it.

This separation keeps responsibilities clear and simplifies future development.

---

# Project Layers

The application is divided into the following logical layers.

## Presentation Layer

Responsible for rendering the user interface.

Contains:

- Layouts
- Shared UI Components
- Feature Components
- Navigation

Location:

```
src/components
src/features
```

This layer never communicates directly with external APIs.

---

## State Management Layer

Responsible for storing shared application state.

Location:

```
src/contexts
```

Current Context Providers include:

- AIContext
- AuthContext
- EditorContext
- ProjectContext
- SettingsContext
- TemplateContext
- ThemeContext

Contexts expose reusable state and actions to every feature.

---

## Business Logic Layer

Contains reusable custom React hooks.

Location:

```
src/hooks
```

Current Hooks include:

- useAI
- useAuth
- useEditor
- useProjects
- useSettings
- useTemplates
- useTheme
- useDebounce
- useLocalStorage

Hooks isolate business logic from presentation components.

---

## Service Layer

Responsible for all application services.

Location:

```
src/services
```

Current Services include:

- aiService
- geminiService
- authService
- projectService
- templateService
- editorService
- settingsService
- activityService
- api

Services contain no user interface.

Instead, they communicate with external systems and return structured data.

---

## Utility Layer

Contains framework-independent helper functions.

Location:

```
src/utils
```

Examples include:

- Validation
- Statistics
- Export helpers
- Formatters
- Storage helpers

Utility functions remain reusable across the entire application.

---

# Real Project Structure

The frontend source code follows the structure below.

```
src
│
├── assets
├── components
│     ├── common
│     ├── layout
│     └── ui
│
├── config
├── constants
├── contexts
├── features
│     ├── ai
│     ├── auth
│     ├── dashboard
│     ├── editor
│     ├── landing
│     ├── projects
│     ├── settings
│     └── templates
│
├── hooks
├── routes
├── services
├── styles
├── utils
│
├── App.jsx
├── main.jsx
└── index.css
```

This organization keeps feature-specific code isolated while allowing common functionality to remain reusable.

---

# Dependency Direction

To keep the architecture maintainable, dependencies always flow in one direction.

```
UI Components

↓

Feature Components

↓

Context Providers

↓

Custom Hooks

↓

Services

↓

External APIs
```

Lower layers never depend on upper layers.

For example:

- Services never import React components.
- Utility functions never depend on Context.
- Hooks never render UI.
- Components never call Gemini directly.

This architecture minimizes coupling and simplifies testing.

---

# Feature-Based Organization

StoryForge AI groups code according to application features rather than only by technical type.

Current feature modules include:

- Landing
- Authentication
- Dashboard
- AI Studio
- Editor
- Projects
- Templates
- Settings

Each feature contains its own pages, reusable components, and supporting data where appropriate.

This structure improves discoverability and makes future expansion significantly easier.

---

# Shared Components

Reusable interface elements are separated from feature modules.

Current shared component groups include:

## Common

Application-wide reusable components such as:

- Error Boundary
- Page Loader
- Protected Route
- Theme Toggle

---

## Layout

Application layouts including:

- Root Layout
- Main Layout
- Dashboard Layout
- Authentication Layout
- Navbar
- Sidebar
- Footer

---

## UI

Reusable design system components including:

- Button
- Card
- Badge
- Input
- Modal
- Spinner
- Avatar

These components contain presentation logic only and remain independent from business logic.

---

# AI Architecture

Artificial Intelligence is the core capability of StoryForge AI.

The AI subsystem has been intentionally isolated from the user interface to ensure flexibility, maintainability, and future extensibility.

Instead of allowing UI components to communicate directly with Google Gemini, every AI request passes through multiple architectural layers.

This design enables future replacement of the AI provider without requiring changes to the presentation layer.

Current AI provider:

- Google Gemini 2.5 Flash

Future supported providers:

- IBM Granite
- IBM watsonx.ai
- OpenAI
- Anthropic Claude
- Local LLMs

---

# AI Request Flow

Every generation request follows the same lifecycle.

```
User

↓

PromptInput Component

↓

AIContext

↓

useAI Hook

↓

aiService

↓

geminiService

↓

Google Gemini API

↓

Generated Response

↓

Statistics Generator

↓

Generation History

↓

React UI
```

Every layer has a single responsibility.

---

# Prompt Lifecycle

## Step 1

The user writes a prompt inside the AI Studio.

Examples include:

- Stories
- Characters
- Scripts
- Dialogue
- World Building

The prompt is validated before submission.

---

## Step 2

The PromptInput component forwards the request to AIContext.

AIContext becomes the central coordinator of the generation process.

Responsibilities include:

- Loading state
- Error handling
- History management
- Statistics updates

---

## Step 3

AIContext delegates the request to the AI Hook.

The hook provides a reusable interface for AI operations.

UI components never communicate directly with services.

---

## Step 4

The hook calls aiService.

The service prepares the generation request.

Responsibilities include:

- Prompt preparation
- Metadata generation
- Reading time calculation
- Word counting
- Character counting
- Response formatting

---

## Step 5

The request is forwarded to geminiService.

geminiService is responsible only for communication with Google Gemini.

Responsibilities include:

- API initialization
- Authentication
- Model selection
- Request execution
- Response retrieval
- Error propagation

No user interface code exists inside this layer.

---

## Step 6

Google Gemini generates the requested content.

Current production model:

```
gemini-2.5-flash
```

The application receives a structured response.

---

## Step 7

The response returns to aiService.

Additional metadata is generated.

Examples include:

- Reading time
- Character count
- Word count
- Estimated paragraphs
- Generated title
- Creation timestamp

---

## Step 8

AIContext stores the completed generation.

The context updates:

- Generation history
- Current generation
- Statistics
- Loading state

React automatically refreshes the interface.

---

# AI Context Responsibilities

AIContext serves as the central coordinator for all AI-related operations.

Responsibilities include:

- Managing generation requests
- Managing loading states
- Error recovery
- Generation history
- Current generation
- Statistics synchronization
- Export coordination

This architecture prevents duplicated AI logic across components.

---

# Service Responsibilities

## aiService

Application orchestration layer.

Responsibilities:

- Prepare requests
- Normalize responses
- Calculate statistics
- Generate metadata
- Create history objects
- Maintain application-specific business logic

---

## geminiService

External AI communication layer.

Responsibilities:

- Initialize SDK
- Authenticate requests
- Select AI model
- Execute prompt
- Handle API failures
- Return generated text

This isolation allows AI providers to be replaced without changing application components.

---

# Error Handling

Errors may occur at several stages.

Examples include:

- Missing API key
- Network interruption
- Invalid prompt
- Rate limiting
- AI provider failure

Errors are propagated back through the service layer and handled centrally inside AIContext.

The user interface displays friendly messages while preserving application stability.

---

# Future AI Providers

The architecture intentionally supports multiple AI providers.

Future implementations may include:

- IBM Granite
- IBM watsonx.ai
- OpenAI GPT
- Anthropic Claude
- Local inference servers

Because the UI communicates only with aiService, switching providers requires minimal architectural changes.

---

# AI Architecture Benefits

The current architecture provides several advantages.

- Loose coupling
- Clear separation of concerns
- Easier testing
- Provider independence
- Scalable service layer
- Centralized state management
- Simplified maintenance
- Future cloud compatibility

These principles ensure that StoryForge AI can evolve without major architectural refactoring.

---

# Security Architecture

Although the current implementation is frontend-only, the architecture follows security best practices and is prepared for future backend integration.

## Current Security Measures

- Environment variables are used to store API keys.
- Sensitive configuration is excluded from version control using `.gitignore`.
- Error messages are sanitized before being displayed to users.
- Authentication logic is isolated from AI functionality.
- Services never expose implementation details to UI components.

## Future Security Enhancements

Planned improvements include:

- JWT Authentication
- OAuth 2.0
- Role-Based Access Control (RBAC)
- API Gateway
- Secure backend proxy for AI requests
- Request rate limiting
- Audit logging
- Encrypted user data storage

---

# Performance Strategy

The application is optimized to provide a responsive user experience.

Current optimizations include:

- Feature-based project organization
- Reusable UI components
- Context-based state sharing
- Lazy route loading where applicable
- Component reusability
- Service abstraction
- Lightweight data flow

Future optimizations may include:

- React.lazy for all feature modules
- Code splitting
- Response caching
- Request batching
- Streaming AI responses
- Virtualized rendering for long histories

---

# Scalability Strategy

The project has been designed with long-term scalability in mind.

Current architecture supports independent evolution of:

- AI providers
- Authentication
- Project management
- Templates
- Editor
- User settings

Future backend services can be added without requiring major frontend refactoring.

Potential future integrations include:

- REST APIs
- GraphQL
- WebSockets
- Cloud Storage
- Team collaboration
- Real-time synchronization

---

# Deployment Architecture

Current deployment pipeline:

```
Developer

↓

Git

↓

GitHub Repository

↓

Vercel

↓

Build Process

↓

Production Deployment

↓

StoryForge AI
```

Deployment is fully automated.

Every push to the `main` branch triggers a new production build.

Environment variables are securely managed through Vercel.

---

# Backend Evolution

The current version operates as a frontend-first application.

Future architecture may introduce:

```
React Frontend

↓

REST API

↓

Authentication Service

↓

AI Service

↓

Database

↓

Object Storage
```

Potential backend technologies include:

- Node.js
- Express
- PostgreSQL
- MongoDB
- Redis
- IBM Cloud Services

The frontend architecture has been intentionally designed to support this transition with minimal changes.

---

# IBM AI Integration Strategy

StoryForge AI has been architected to support additional enterprise AI providers.

Planned IBM integrations include:

- IBM Granite foundation models
- IBM watsonx.ai
- IBM Cloud Object Storage
- IBM Identity and Access Management
- IBM Code Engine

Because AI communication is isolated inside the service layer, replacing or extending the current provider will require only service-level modifications.

No UI components will need to change.

---

# Architecture Decisions

The following architectural decisions guided the implementation of StoryForge AI.

| Decision | Reason |
|----------|--------|
| Feature-Based Architecture | Improves scalability and organization |
| React Context API | Lightweight global state management |
| Custom Hooks | Reusable business logic |
| Service Layer | Separation between UI and external services |
| Google Gemini | Fast and capable text generation |
| Vite | Modern development workflow |
| Tailwind CSS | Rapid and consistent UI development |
| Vercel | Automated deployment pipeline |

Each decision prioritizes maintainability, extensibility, and developer productivity.

---

# Architectural Principles

StoryForge AI follows the following engineering principles.

- Separation of Concerns
- Single Responsibility Principle
- Reusability
- Loose Coupling
- High Cohesion
- Modular Design
- Feature Isolation
- Scalability
- Cloud Readiness
- Maintainability

These principles provide a strong foundation for future growth while keeping the current implementation simple and approachable.

---

# Conclusion

The StoryForge AI architecture has been intentionally designed to balance simplicity with extensibility.

The current implementation delivers a clean frontend-first application powered by Google Gemini while remaining prepared for future enterprise capabilities such as backend services, IBM AI integration, cloud storage, authentication, and collaborative workspaces.

This layered architecture ensures that new features and technologies can be introduced incrementally without disrupting the existing codebase, making StoryForge AI well-positioned for continued evolution.