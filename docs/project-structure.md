# Project Structure

## Overview

StoryForge AI follows a modular and scalable architecture designed for maintainability, readability, and future expansion.

Instead of placing all functionality into a single directory, the application separates responsibilities into independent modules. Each module has a clear purpose, making the codebase easier to understand, test, and extend.

The project currently consists of two major applications:

```
AI-Builders-Challenge/

├── frontend/
├── backend/
└── docs/
```

Each application is responsible for a different part of the overall system.

---

# Root Directory

```
AI-Builders-Challenge
│
├── frontend
│
├── backend
│
├── docs
│
├── assets
│
├── README.md
│
└── .gitignore
```

---

## frontend/

Contains the complete React application.

Responsibilities include:

- User Interface
- Routing
- AI Studio
- Authentication Screens
- Project Management
- Templates
- Dashboard
- Settings
- AI Integration
- Global State

---

## backend/

Prepared for future server-side development.

Future responsibilities include:

- Authentication
- Database
- API
- User Management
- AI Proxy
- Billing
- File Storage

---

## docs/

Contains all project documentation.

Documentation is organized to help both developers and judges understand the project architecture, design decisions, implementation details, and future roadmap.

---

## assets/

Stores branding resources such as logos, presentation assets, screenshots, and marketing materials.

These files are not part of the application runtime but are used for documentation and project presentation.

---

# Frontend Source Structure

The frontend application is located inside:

```

frontend/src

```

The source code is organized into reusable modules rather than large monolithic files.

Current structure:

```

src
│
├── assets
├── components
├── contexts
├── hooks
├── lib
├── services
├── utils
│
├── App.jsx
├── main.jsx
└── index.css

```

Every directory has a single responsibility.

This architecture keeps the application scalable as new features are introduced.

---

# Components Directory

The `components` directory contains all reusable user interface elements and feature-specific components used throughout StoryForge AI.

Instead of storing all components in a single folder, the project organizes them into feature-oriented modules. This approach improves maintainability, scalability, and developer productivity.

Current structure:

```
components
│
├── ai
├── auth
├── common
├── dashboard
├── landing
├── projects
├── settings
├── templates
└── ui
```

Each folder groups components that belong to a specific feature of the application.

---

## components/ai

This module contains all components related to AI-powered content generation.

Responsibilities include:

- Prompt input
- AI generation interface
- Generation history
- Statistics
- Export actions
- Empty states
- AI interaction

This is the most important feature module in the project because it represents the application's primary functionality.

Future improvements may include:

- Streaming responses
- AI chat mode
- Image generation
- Multi-model support
- IBM Granite integration
- IBM watsonx integration

---

## components/auth

Contains authentication-related user interface components.

Responsibilities include:

- Login
- Registration
- Password recovery
- Authentication forms
- Input validation

Although the current project uses demonstration authentication, this module is prepared for future backend integration.

Future integration:

- JWT
- OAuth
- Google Login
- GitHub Login
- IBM Cloud Identity

---

## components/common

Contains reusable application components shared across multiple features.

Examples include:

- Headers
- Section wrappers
- Empty states
- Loading components
- Shared layouts

Keeping common components centralized reduces duplicated code.

---

## components/dashboard

Contains widgets displayed on the user dashboard.

Examples include:

- Statistics cards
- Recent activity
- Project overview
- Quick actions
- AI summary

This module provides users with a high-level overview of their creative workspace.

---

## components/landing

Contains components used only on the public landing page.

Typical responsibilities include:

- Hero section
- Feature cards
- Pricing section
- FAQ
- Footer
- Navigation

Separating landing components prevents unnecessary coupling with authenticated application features.

---

## components/projects

Contains everything related to project management.

Responsibilities include:

- Project cards
- Project lists
- Search
- Filtering
- Sorting
- Project actions

Future versions will support folders, tags, favorites, and collaboration.

---

## components/settings

Contains all user settings interfaces.

Current areas include:

- Profile
- Appearance
- Notifications
- Billing
- Account

Future additions:

- API Keys
- AI Preferences
- Team Management
- Workspace Settings

---

## components/templates

Contains reusable AI template interfaces.

Responsibilities include:

- Template cards
- Template categories
- Prompt presets
- Creative suggestions

Future versions may introduce community templates and custom template creation.

---

## components/ui

Contains low-level reusable UI components.

Examples include:

- Button
- Card
- Badge
- Input
- Modal
- Dropdown
- Tooltip

These components form the project's internal design system and should remain independent from business logic.

---

# Components Design Principles

Every component in StoryForge AI follows these principles:

- Single Responsibility Principle
- Reusability
- Readability
- Accessibility
- Responsive Design
- Low Coupling
- High Cohesion

Business logic should never be embedded directly inside reusable UI components.

Instead, components receive data through props, hooks, or Context API.

---

# Contexts Directory

The `contexts` directory contains the global state management layer of StoryForge AI.

Instead of passing data through multiple component levels (prop drilling), the application uses the React Context API to provide shared state across the entire application.

Current implementation:

```
contexts/
│
└── AIContext.jsx
```

---

## AIContext

`AIContext.jsx` is the central state manager for all AI-related features.

### Responsibilities

- Manage AI generations
- Store generation history
- Handle loading states
- Manage errors
- Store current prompt
- Track generation statistics
- Expose reusable actions to the UI

All AI components communicate with the Context instead of calling services directly.

This architecture significantly improves maintainability and keeps UI components focused only on presentation.

Future Contexts may include:

- AuthContext
- ThemeContext
- NotificationContext
- WorkspaceContext

---

# Hooks Directory

The `hooks` directory contains reusable custom React Hooks.

Current hooks:

```
hooks/
│
├── useAI.js
├── useProjects.js
└── useSettings.js
```

---

## useAI

Provides a simplified interface for AI-related operations.

Responsibilities:

- Access AIContext
- Trigger AI generation
- Read generation history
- Access loading states
- Handle generation errors

The hook prevents repeated Context logic across multiple components.

---

## useProjects

Provides reusable project management functionality.

Responsibilities:

- Retrieve projects
- Update projects
- Delete projects
- Filter projects
- Search projects

Future versions will integrate with the backend database.

---

## useSettings

Provides access to user settings.

Responsibilities:

- Theme preferences
- Appearance
- User profile
- Notification preferences

Future versions will synchronize settings with cloud storage.

---

# Services Directory

The `services` directory contains the business logic layer.

Unlike UI components, services never render anything.

Instead, they perform application logic and communicate with external systems.

Current services:

```
services/
│
├── aiService.js
└── geminiService.js
```

---

## aiService.js

Acts as the application's AI orchestration layer.

Responsibilities:

- Prepare generation requests
- Build standardized response objects
- Calculate text statistics
- Estimate reading time
- Generate metadata
- Format history entries

The UI communicates only with this service.

It never communicates directly with Gemini.

---

## geminiService.js

Responsible only for communication with Google Gemini.

Responsibilities:

- Initialize Gemini SDK
- Authenticate requests
- Select AI model
- Send prompts
- Receive responses
- Handle API errors

This isolation makes replacing Gemini with IBM Granite or watsonx much easier in the future.

---

# Utils Directory

The `utils` directory contains reusable helper functions.

Utilities are completely independent from React.

Typical responsibilities include:

- Text formatting
- Validation
- Statistics calculation
- Date formatting
- Helper methods

Keeping helper functions inside a dedicated directory prevents duplicated logic across the application.

---

# Assets Directory

The `assets` directory stores static resources used throughout the project.

Typical contents include:

- Application logo
- Icons
- Illustrations
- Images
- Branding assets

Assets are imported by components but contain no executable code.

---

# Application Entry Files

The frontend application starts with three core files.

```
main.jsx

↓

App.jsx

↓

React Components
```

---

## main.jsx

Application bootstrap.

Responsibilities:

- Create React root
- Render App component
- Load global styles

---

## App.jsx

Main application container.

Responsibilities:

- Assemble application layout
- Initialize providers
- Render the complete interface

---

## index.css

Contains global styling.

Responsibilities:

- Tailwind base styles
- Global typography
- Utility classes
- Theme customization