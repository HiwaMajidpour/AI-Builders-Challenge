# Coding Standards

> **Project:** AI Creative Studio
> **Challenge:** IBM AI Builders Challenge 2026
> **Version:** 1.0

---

# Overview

This document defines the coding standards and best practices followed throughout AI Creative Studio.

The objective is to maintain a clean, consistent, maintainable, and scalable codebase that aligns with enterprise software engineering practices.

---

# General Principles

The project follows these principles:

- Readability over cleverness
- Simplicity over complexity
- Reusability over duplication
- Consistency across the codebase
- Documentation-first development

---

# JavaScript Standards

Use modern ECMAScript syntax.

Preferred:

- const by default
- let only when reassignment is required
- Avoid var

Example

```javascript
const project = {};

let counter = 0;
```

---

# Naming Conventions

## Variables

camelCase

```javascript
userProfile

projectTitle

generatedContent
```

---

## Functions

camelCase

```javascript
generateContent()

saveProject()

loadTemplates()
```

---

## React Components

PascalCase

```text
Dashboard.jsx

EditorPanel.jsx

PromptCard.jsx

ProjectList.jsx
```

---

## Context Providers

PascalCase

```text
AIContext

ThemeContext

AuthContext
```

---

## Custom Hooks

Prefix with

```
use
```

Examples

```javascript
useAI()

useProjects()

useTheme()

useEditor()
```

---

## Constants

UPPER_SNAKE_CASE

```javascript
MAX_PROJECTS

DEFAULT_THEME

API_TIMEOUT
```

---

# Folder Organization

Follow feature-based architecture.

```
features/

components/

hooks/

contexts/

services/

utils/
```

Each folder should have a single responsibility.

---

# Component Guidelines

Components should:

- Be small
- Be reusable
- Have one responsibility
- Receive data via props
- Avoid unnecessary state

---

# State Management

Current

React Context API

Guidelines

- Keep state localized
- Avoid deeply nested providers
- Share only necessary state

Future

Redux Toolkit (Planned)

---

# Services

Business logic belongs in

```
services/
```

Avoid API calls directly inside UI components.

Preferred

```
Component

↓

Hook

↓

Service

↓

IBM watsonx.ai
```

---

# Utility Functions

Shared logic belongs inside

```
utils/
```

Examples

- Validators
- Formatters
- Export helpers
- Date utilities

---

# Styling

Current

Tailwind CSS

Guidelines

- Utility-first approach
- Avoid duplicated classes
- Prefer reusable UI components

---

# Comments

Write comments only when necessary.

Good

```javascript
// Validate prompt before AI request
```

Avoid

```javascript
// Increment counter
counter++;
```

---

# Error Handling

Always handle expected errors.

Preferred

```javascript
try {

} catch (error) {

}
```

Never ignore exceptions.

---

# Imports

Order imports as follows:

1.

React

2.

Third-party libraries

3.

Internal modules

4.

Styles

Example

```javascript
import React from "react";

import { useNavigate } from "react-router-dom";

import { useAI } from "@/hooks/useAI";

import "./Editor.css";
```

---

# File Size

Recommended

Component

< 250 lines

Hook

< 200 lines

Service

< 250 lines

Utility

< 150 lines

Large files should be refactored.

---

# Documentation

Public functions should include documentation when appropriate.

Example

```javascript
/**
 * Generates AI content.
 */
```

---

# Git Commits

Use Conventional Commits.

Examples

```
feat(ai): add prompt history

fix(editor): resolve export bug

docs(api): update reference

refactor(services): simplify AI service
```

---

# Code Quality

The project uses

- ESLint

Future

- Prettier
- Husky
- lint-staged

---

# Best Practices

Always

- Prefer composition
- Reuse components
- Validate inputs
- Keep components focused
- Remove unused code

Avoid

- Deep nesting
- Large components
- Duplicate logic
- Magic numbers
- Hardcoded strings

---

# Enterprise Principles

The codebase follows:

- SOLID
- DRY
- KISS
- Separation of Concerns
- Feature-Based Organization

---

# Current vs Future

| Area | Current | Future |
|------|---------|--------|
| ESLint | ✅ | Enhanced Rules |
| Formatting | Manual | Prettier |
| Git Hooks | Planned | Husky |
| Type Checking | JavaScript | TypeScript (Planned) |
| Code Coverage | Manual | Automated |

---

# Conclusion

The coding standards ensure that AI Creative Studio remains readable, maintainable, and scalable as the project evolves.

Following these conventions allows contributors to work efficiently while preserving a consistent enterprise-quality codebase.