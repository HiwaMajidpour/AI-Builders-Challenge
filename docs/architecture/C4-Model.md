# C4 Model

> **Version:** 1.0  
> **Project:** AI Creative Studio  
> **Architecture Type:** C4 Software Architecture Model

---

# Overview

The C4 Model provides a hierarchical view of the AI Creative Studio architecture, enabling developers, reviewers, and IBM AI Builders Challenge judges to understand the system from different levels of abstraction.

The project currently documents the first two C4 levels:

- Level 1 – System Context
- Level 2 – Container Diagram

The architecture has also been prepared for future expansion to Component and Code diagrams.

---

# What is the C4 Model?

The C4 Model is a lightweight software architecture framework created by Simon Brown.

It organizes architecture documentation into four complementary levels:

| Level | Description |
|--------|-------------|
| Level 1 | System Context |
| Level 2 | Container Diagram |
| Level 3 | Component Diagram |
| Level 4 | Code Diagram |

Each level provides a different perspective while maintaining consistency across the architecture.

---

# Level 1 — System Context

The System Context diagram illustrates how AI Creative Studio interacts with external actors and services.

Current context includes:

- End User
- AI Creative Studio
- IBM watsonx.ai
- IBM Granite Foundation Models

Responsibilities

- User Interaction
- AI Content Generation
- Prompt Processing
- AI Response Delivery

Diagram

```
User

↓

AI Creative Studio

↓

IBM watsonx.ai

↓

IBM Granite Foundation Models
```

Related Diagram

```
docs/diagrams/C4-Context.drawio
```

---

# Level 2 — Container Diagram

The Container Diagram illustrates the internal high-level containers that compose the application.

Containers

Presentation

- React
- TypeScript
- Tailwind CSS

Application

- Business Logic
- Prompt Engineering
- Workflow Coordination

AI Services

- IBM watsonx.ai
- Granite Models

Storage

Current

- Browser Local Storage

Future

- PostgreSQL
- Cloud Storage

Diagram

```
User

↓

Frontend

↓

Application Layer

↓

IBM watsonx.ai

↓

Granite Models

↓

Storage
```

Related Diagram

```
docs/diagrams/C4-Container.drawio
```

---

# Level 3 — Component Diagram (Future)

Future component-level documentation will describe the internal structure of the frontend application.

Planned components include

- Landing Page
- Dashboard
- AI Studio
- Prompt Editor
- Template Library
- Settings
- Shared UI Components

Related Documentation

- Component Architecture
- Component Diagram

---

# Level 4 — Code Diagram (Future)

The final C4 level documents implementation details.

Future documentation may include

- React Components
- Hooks
- Context Providers
- Utility Functions
- Services
- API Clients

---

# Relationship Between C4 Levels

```
System Context

↓

Containers

↓

Components

↓

Code
```

Each level provides additional implementation detail while preserving architectural consistency.

---

# Architecture Principles

The C4 documentation follows these principles:

- Separation of Concerns
- Incremental Detail
- Clear Responsibilities
- Enterprise Documentation
- Maintainability

---

# Related Diagrams

| Diagram | Location |
|----------|----------|
| C4 Context | docs/diagrams/C4-Context.drawio |
| C4 Container | docs/diagrams/C4-Container.drawio |
| System Architecture | docs/diagrams/System-Architecture.drawio |
| Component Diagram | docs/diagrams/Component-Diagram.drawio |
| Data Flow Diagram | docs/diagrams/Data-Flow.drawio |
| Deployment Diagram | docs/diagrams/Deployment-Diagram.drawio |

---

# Related Documentation

- System Architecture
- Component Architecture
- Deployment Architecture
- API Architecture
- Security Architecture

---

# Future Roadmap

Future enterprise documentation may include:

- Component-Level C4 Diagram
- Code-Level C4 Diagram
- Infrastructure Context
- Service Interaction Views
- Event Flow Documentation

---

# Conclusion

The C4 Model provides a structured architectural view of AI Creative Studio, from external system interactions to future implementation details.

By documenting multiple abstraction levels, the project aligns with enterprise architecture practices and improves communication among developers, architects, reviewers, and IBM AI Builders Challenge judges.