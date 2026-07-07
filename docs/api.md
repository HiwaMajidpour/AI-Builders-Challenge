# StoryForge AI API Documentation

## Overview

StoryForge AI currently uses a frontend-first architecture with Google Gemini as its AI provider.

The application communicates directly with the Google Gemini API through a dedicated service layer. This abstraction isolates provider-specific implementation details from the rest of the application and prepares the platform for future backend integration.

This document describes the current API architecture, request lifecycle, response processing, security considerations, and the planned evolution toward a backend-powered multi-provider AI platform.

---

# API Architecture

The current API architecture is intentionally layered.

```
React Components

↓

Context Providers

↓

Custom Hooks

↓

Business Services

↓

Provider Services

↓

Google Gemini API
```

Every layer has a single responsibility.

No React component communicates directly with Google Gemini.

---

# Architectural Goals

The API layer has been designed to achieve the following objectives:

- Provider independence
- Separation of concerns
- Maintainability
- Scalability
- Testability
- Secure configuration
- Future backend compatibility

These goals reduce coupling between the user interface and external AI providers.

---

# Current API Provider

StoryForge AI currently uses Google Gemini.

Current production model:

```
gemini-2.5-flash
```

Provider capabilities include:

- Story generation
- Character creation
- Dialogue generation
- Script generation
- World building
- Creative writing assistance

Future releases may support multiple providers through a provider router.

---

# Service Layer

The application separates business logic from provider communication.

Current services include:

```
src/services/

activityService.js
aiService.js
api.js
authService.js
editorService.js
gemini.js
geminiService.js
projectService.js
settingsService.js
templateService.js
```

Each service has a focused responsibility.

---

# API Responsibilities

## aiService

Application business logic.

Responsibilities include:

- Preparing generation requests
- Building metadata
- Calculating statistics
- Formatting responses
- Standardizing output

This service does not communicate directly with Google Gemini.

---

## geminiService

External provider communication.

Responsibilities include:

- Initializing the Gemini SDK
- Authenticating requests
- Selecting the AI model
- Building prompts
- Executing requests
- Returning generated content

All Google-specific implementation remains isolated inside this service.

---

# Request Lifecycle

Every AI request follows the same execution flow.

```
PromptInput

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

aiService

↓

AIContext

↓

React UI
```

This predictable lifecycle simplifies debugging and future maintenance.

---

# API Flow Diagram

```
User

↓

Prompt

↓

Business Logic

↓

Provider Service

↓

Google Gemini

↓

Response

↓

Metadata

↓

Statistics

↓

History

↓

UI
```

---

# Current Request Data

Each generation request contains information collected from the user interface.

Typical request properties include:

- Prompt
- Story type
- Tone
- Length
- Creativity level

Additional metadata may be attached internally before the request is sent to the AI provider.

---

# Request Preparation

Before calling Google Gemini, the application performs several preparation steps.

These include:

- Prompt validation
- Prompt normalization
- Metadata creation
- Instruction composition
- Provider formatting

Only fully prepared requests are forwarded to the provider service.

---

# Prompt Engineering

StoryForge AI augments user prompts with application-level instructions.

The generated prompt typically contains:

- AI role definition
- Writing instructions
- Story type
- Tone
- Length guidance
- User prompt

This approach produces more consistent AI-generated output while preserving user creativity.

---

# Request Object

Before a request is sent to Google Gemini, the application constructs a standardized request object.

Typical fields include:

```json
{
  "prompt": "Create a fantasy story...",
  "type": "Story",
  "tone": "Fantasy",
  "length": "Medium",
  "creativity": 65
}
```

This object is independent of the AI provider.

Additional provider-specific formatting occurs inside `geminiService`.

---

# Prompt Assembly

The request object is transformed into a complete prompt before transmission.

Example:

```
You are an expert creative writing assistant.

Generate a medium-length fantasy story.

Tone:
Fantasy

Prompt:
Create a fantasy story about...

Return only the generated text.
```

Prompt assembly is handled entirely by the service layer.

---

# Gemini SDK Integration

StoryForge AI uses the official Google Generative AI SDK.

Responsibilities include:

- SDK initialization
- API authentication
- Model creation
- Request execution
- Response retrieval
- Exception handling

All SDK-specific code remains isolated inside `geminiService`.

---

# Environment Configuration

Sensitive configuration values are stored using environment variables.

Current configuration includes:

```
VITE_GEMINI_API_KEY
```

Configuration values are never committed to version control.

Production deployments provide these variables through the hosting platform.

---

# Authentication

Current authentication with Google Gemini is API key based.

```
Environment Variable

↓

Gemini SDK

↓

Authenticated Request

↓

Google Gemini
```

Future backend implementations will remove API keys from the client entirely.

---

# Response Object

After successful generation, Google Gemini returns generated text.

The application converts this response into a standardized structure.

Typical response object:

```json
{
  "id": "...",
  "title": "...",
  "content": "...",
  "type": "Story",
  "tone": "Fantasy",
  "wordCount": 1083,
  "characterCount": 6967,
  "readingTime": 6,
  "createdAt": "2025-01-01T12:00:00Z"
}
```

All feature components consume this unified format.

---

# Metadata Generation

After receiving the generated text, additional metadata is calculated.

Current metadata includes:

- Word count
- Character count
- Reading time
- Timestamp
- Content identifier

Future metadata may include:

- Readability score
- AI confidence
- Estimated speaking time
- Language detection

---

# Error Handling

The API layer handles errors centrally.

Possible failure scenarios include:

- Missing API key
- Invalid model
- Authentication failure
- Network interruption
- Rate limiting
- Invalid responses
- Service unavailability

Errors are propagated upward through the service layer until they reach AIContext.

---

# Error Flow

```
Google Gemini

↓

geminiService

↓

aiService

↓

AIContext

↓

React Components

↓

User Notification
```

Centralized error handling ensures consistent behavior across the application.

---

# Loading States

Generation requests are asynchronous.

Loading state transitions:

```
Generate Request

↓

Loading = true

↓

Display Spinner

↓

Wait for Response

↓

Loading = false

↓

Display Result
```

This state is managed centrally inside AIContext.

---

# Sequence Diagram

```
User

│

▼

PromptInput

│

▼

AIContext

│

▼

useAI

│

▼

aiService

│

▼

geminiService

│

▼

Google Gemini API

│

▲

Generated Text

│

▲

aiService

│

▲

Statistics

│

▲

AIContext

│

▲

GenerationResult

│

▲

User
```

The sequence illustrates the complete lifecycle of a successful generation request.

---

# API Example

Example request:

```text
Prompt:
Write a sci-fi story about humanity's first contact with an alien civilization living inside a black hole.

Type:
Story

Tone:
Sci-Fi

Length:
Long

Creativity:
65
```

Example response:

```text
A cinematic science-fiction story generated by Google Gemini, enriched with application metadata and writing statistics.
```

---

# Current Limitations

The current API implementation intentionally focuses on frontend integration.

Known limitations include:

- Direct client communication
- No backend validation
- Single AI provider
- No request persistence
- No usage analytics
- No server-side logging

These limitations are expected for the current project scope.

---

# Security Considerations

Security practices currently implemented include:

- Environment variable configuration
- Git exclusion for secrets
- Service abstraction
- Controlled error reporting

Future backend integration will further improve security by storing credentials server-side.

---

# Future Backend Architecture

The current implementation communicates directly with Google Gemini from the frontend.

A future production architecture will introduce a dedicated backend service between the client and external AI providers.

```
React Frontend

↓

REST API

↓

Authentication

↓

Business Logic

↓

Provider Router

↓

AI Providers
```

This architecture improves security, scalability, monitoring, and maintainability.

---

# REST API Design

Future backend endpoints may include:

| Endpoint | Method | Purpose |
|----------|--------|---------|
| /api/generate | POST | Generate AI content |
| /api/projects | GET | Retrieve projects |
| /api/projects | POST | Create project |
| /api/projects/{id} | PUT | Update project |
| /api/projects/{id} | DELETE | Delete project |
| /api/templates | GET | Retrieve templates |
| /api/history | GET | Generation history |
| /api/settings | GET | User settings |
| /api/settings | PUT | Update settings |

The frontend architecture already aligns with this future API structure.

---

# Provider Router

One of the primary design goals is provider independence.

Future backend architecture may include a provider router responsible for selecting the appropriate AI service.

```
Generate Request

↓

Provider Router

├── Google Gemini

├── IBM Granite

├── IBM watsonx.ai

├── OpenAI GPT

└── Anthropic Claude
```

The router enables AI providers to be replaced or combined without modifying frontend components.

---

# Multi-Provider Support

Future releases may allow users to choose their preferred AI provider.

Possible configuration:

```
Provider

↓

Model

↓

Generation

↓

Standardized Response
```

Regardless of provider, every response will be converted into the same internal object format.

---

# IBM Granite Integration

The service layer has been designed to support IBM Granite with minimal architectural changes.

Future integration flow:

```
Frontend

↓

Backend

↓

IBM Granite

↓

Generated Text

↓

Standardized Response
```

Only the provider implementation changes.

No feature components require modification.

---

# IBM watsonx.ai Integration

Future enterprise deployments may use IBM watsonx.ai.

Potential capabilities include:

- Enterprise authentication
- Organization workspaces
- Model governance
- AI monitoring
- Usage analytics
- Secure deployments

The modular service architecture simplifies future integration.

---

# OpenAI Support

Future OpenAI integration may support:

- Creative writing
- Editing assistance
- Translation
- Summarization
- Prompt refinement

The provider router isolates implementation details from application features.

---

# Anthropic Claude Support

Future Claude integration may provide:

- Long-form writing
- Reasoning tasks
- Structured generation
- Content refinement

Again, only the provider layer changes.

---

# API Versioning

Future backend releases should introduce API versioning.

Example:

```
/api/v1/generate

/api/v1/projects

/api/v2/generate
```

Versioning allows new functionality without breaking existing clients.

---

# Rate Limiting

Production APIs should implement request limits.

Possible strategies:

- Per-user quotas
- Daily limits
- Monthly usage
- Organization quotas
- Burst protection

Rate limiting protects both the platform and AI providers.

---

# Logging

Future backend services should log:

- Requests
- Errors
- Response times
- AI provider usage
- Authentication events

Logs assist with monitoring and debugging while avoiding storage of sensitive prompt data.

---

# Monitoring

Production deployments should monitor:

- API availability
- Request latency
- Error rates
- Provider health
- Usage trends
- Cost metrics

Monitoring supports proactive maintenance and operational visibility.

---

# Best Practices

Current API implementation follows several engineering best practices.

These include:

- Layered architecture
- Service abstraction
- Standardized responses
- Environment-based configuration
- Centralized error handling
- Reusable business logic
- Provider independence

These principles simplify future expansion and reduce maintenance costs.

---

# API Evolution Roadmap

Planned API improvements include:

- Backend REST services
- Authentication tokens
- User accounts
- Cloud persistence
- Multi-provider AI
- Streaming responses
- Request history
- Team collaboration
- Organization management
- Enterprise analytics

The current frontend architecture already supports these future enhancements through its modular service design.

---

# API Summary

The StoryForge AI API layer separates user interface components from external AI providers through a dedicated service architecture.

Current implementation provides:

- Google Gemini integration
- Centralized business logic
- Standardized request lifecycle
- Unified response objects
- Metadata generation
- Statistics calculation
- Error management

Future versions will extend this foundation with backend services, enterprise authentication, provider routing, and support for additional AI platforms such as IBM Granite, IBM watsonx.ai, OpenAI, and Anthropic Claude.

---

# Conclusion

The API architecture has been intentionally designed for long-term scalability.

By separating presentation, state management, business logic, and provider communication, StoryForge AI remains maintainable, testable, and adaptable.

This modular approach enables seamless migration from a frontend-first implementation to a secure backend-powered platform while preserving compatibility with existing application features.

The API layer is therefore positioned not only to support the current Google Gemini integration but also to accommodate future enterprise requirements, cloud deployments, and multiple AI providers with minimal architectural change.