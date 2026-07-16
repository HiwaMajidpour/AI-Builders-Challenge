# Enterprise Routing Diagram

**Project:** AI Creative Studio  
**IBM AI Builders Challenge 2026**  
**Powered by IBM Granite Foundation Models**

Version: **1.0**

---

## Purpose

This diagram documents the complete client-side routing architecture of AI Creative Studio.

It illustrates:

- Application bootstrap flow
- React Router hierarchy
- Public routes
- Authentication routes
- Protected dashboard routes
- Layout composition
- Feature navigation
- Route security

This document represents the routing architecture used throughout the application.

---

# Routing Architecture

```
Browser
    │
    ▼
frontend/src/main.jsx
    │
    ▼
App.jsx
    │
    ▼
AppRouter.jsx
    │
    ├─────────────────────────────────────────────┐
    │                                             │
    │                                             │
    ▼                                             ▼
MainLayout                                   AuthLayout
    │                                             │
    ▼                                             ├── LoginPage
LandingPage                                      ├── RegisterPage
    │                                            └── ForgotPasswordPage
    ▼
NotFound (404)

                    │
                    │
                    ▼
              DashboardLayout
                    │
                    ▼
             ProtectedRoute
                    │
 ┌───────────┬────────────┬────────────┬────────────┬────────────┐
 │           │            │            │            │
 ▼           ▼            ▼            ▼            ▼
Dashboard   AI Studio   Projects    Templates    Settings
 │           │            │            │            │
 │           │            │            │            │
Activity     Prompt       Project      Template     Profile
Recent       Generation   List         Grid         Account
Quick        History      Create       Search       Security
Stats        Export       Edit         Preview      Appearance
                           Delete                    Notifications
```

---

# Application Entry

```
Browser

↓

frontend/src/main.jsx

↓

App.jsx

↓

AppRouter.jsx
```

Responsibilities:

- React initialization
- Context Providers
- Theme initialization
- Router initialization
- Global styles

---

# Public Routes

Layout:

```
MainLayout
```

Routes:

| Route | Component |
|--------|-----------|
| / | LandingPage |
| * | NotFound (404) |

---

# Authentication Routes

Layout:

```
AuthLayout
```

Pages:

- LoginPage
- RegisterPage
- ForgotPasswordPage

These pages are publicly accessible.

---

# Protected Area

All authenticated pages use:

```
DashboardLayout
```

wrapped by

```
ProtectedRoute
```

Responsibilities:

- Authentication verification
- Session validation
- Access control
- Redirect unauthenticated users

---

# Dashboard Routes

## Dashboard

Components

- ActivityPanel
- RecentProjects
- QuickActions
- StatsCard

---

## AI Studio

Components

- PromptInput
- GenerationResult
- AIHistoryPanel
- ExportMenu
- Statistics

---

## Projects

Components

- ProjectList
- ProjectCard
- CreateProject
- EditProject
- DeleteProject

---

## Templates

Components

- TemplateGrid
- TemplateCard
- CategoryTabs
- Search
- Preview

---

## Settings

Components

- ProfileSettings
- AccountSettings
- SecuritySettings
- AppearanceSettings
- NotificationSettings

---

# Route Protection

ProtectedRoute performs:

- Authentication check
- Session validation
- Redirect to LoginPage
- Prevent unauthorized access

---

# Layout Hierarchy

```
MainLayout
    └── LandingPage

AuthLayout
    ├── LoginPage
    ├── RegisterPage
    └── ForgotPasswordPage

DashboardLayout
    └── ProtectedRoute
            ├── Dashboard
            ├── AI Studio
            ├── Projects
            ├── Templates
            └── Settings
```

---

# Navigation Flow

```
Browser

↓

main.jsx

↓

App.jsx

↓

AppRouter

↓

Layout

↓

Route

↓

Feature

↓

Component
```

---

# Design Principles

- Centralized routing
- Layout-based architecture
- Protected dashboard area
- Public authentication pages
- Feature isolation
- Modular navigation
- Scalable route organization

---

# Related Documentation

- Folder-Structure.md
- Frontend-Architecture.md
- Component-Architecture.md
- User-Flow.md
- Navigation.md

---

# Status

| Item | Status |
|------|--------|
| Routing Architecture | Complete |
| Public Routes | Complete |
| Authentication Routes | Complete |
| Protected Routes | Complete |
| Dashboard Navigation | Complete |
| Layout Architecture | Complete |

---

**AI Creative Studio**

IBM AI Builders Challenge 2026

Powered by IBM Granite Foundation Models