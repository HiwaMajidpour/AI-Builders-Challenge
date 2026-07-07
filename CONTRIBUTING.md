# Contributing to StoryForge AI

Thank you for your interest in contributing to StoryForge AI.

This document explains how contributors should work with the repository to maintain a clean, consistent, and maintainable codebase.

---

# Development Philosophy

StoryForge AI emphasizes:

- Clean architecture
- Readable code
- Reusable components
- Comprehensive documentation
- Small, focused commits

Every contribution should align with these principles.

---

# Getting Started

Clone the repository.

```bash
git clone <repository-url>
```

Navigate to the frontend.

```bash
cd frontend
```

Install dependencies.

```bash
npm install
```

Run the development server.

```bash
npm run dev
```

---

# Branch Strategy

Do not develop directly on the main branch.

Create a feature branch.

Example:

```text
feature/editor-improvements
```

Bug fixes:

```text
fix/login-validation
```

Documentation:

```text
docs/update-api-guide
```

---

# Commit Messages

Use descriptive commit messages.

Examples:

```text
feat: add AI export menu

fix: resolve editor scrolling issue

docs: update architecture guide

refactor: simplify project service

style: improve button spacing
```

---

# Coding Standards

Contributors should:

- Use descriptive names.
- Keep components small.
- Avoid duplicated logic.
- Prefer reusable utilities.
- Keep business logic inside services.
- Keep UI components presentation-focused.

---

# Pull Requests

Before opening a Pull Request:

- Run the project.
- Check for console errors.
- Verify routing.
- Update documentation if necessary.
- Keep changes focused.

---

# Documentation

Documentation is considered part of the project.

Whenever architecture or behavior changes:

- Update README if required.
- Update technical documentation.
- Keep examples accurate.

---

# Reporting Issues

When reporting an issue include:

- Expected behavior
- Actual behavior
- Steps to reproduce
- Screenshots (if applicable)
- Browser information

Clear issue reports help maintain project quality.

---

# Code Reviews

Reviews focus on:

- Readability
- Maintainability
- Architecture
- Performance
- Documentation
- Consistency

Constructive feedback is encouraged.

---

# Thank You

Every contribution helps improve StoryForge AI.

Thank you for helping maintain a clean and scalable project.