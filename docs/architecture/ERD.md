# Enterprise Entity Relationship Diagram (ERD)

## Overview

This document describes the Enterprise Entity Relationship Diagram (ERD) for the AI Creative Studio platform.

The ERD defines the logical database structure and relationships between the core entities that support user management, prompt engineering, AI-generated content, and reusable templates.

This architecture follows enterprise database design principles and supports scalability, maintainability, and future feature expansion.

---

## Database Entities

### User

Stores registered platform users.

| Field | Type | Description |
|-------|------|-------------|
| user_id (PK) | UUID | Unique user identifier |
| name | String | User full name |
| email | String | User email |
| created_at | Timestamp | Account creation date |

---

### Project

Represents a collection of prompts and generated content.

| Field | Type | Description |
|-------|------|-------------|
| project_id (PK) | UUID | Project identifier |
| user_id (FK) | UUID | Owner of the project |
| title | String | Project title |
| description | Text | Project description |
| created_at | Timestamp | Creation date |

---

### Prompt

Stores original and optimized prompts.

| Field | Type | Description |
|-------|------|-------------|
| prompt_id (PK) | UUID | Prompt identifier |
| project_id (FK) | UUID | Related project |
| prompt_text | Text | Original prompt |
| optimized_prompt | Text | AI optimized prompt |
| status | String | Draft / Optimized / Generated |
| created_at | Timestamp | Creation date |

---

### GeneratedContent

Stores AI-generated outputs.

| Field | Type | Description |
|-------|------|-------------|
| content_id (PK) | UUID | Content identifier |
| prompt_id (FK) | UUID | Source prompt |
| template_id (FK) | UUID | Selected template |
| model_name | String | IBM Granite model used |
| content_type | String | Blog, Email, Social Media, etc. |
| content | Text | Generated output |
| created_at | Timestamp | Generation date |

---

### Template

Reusable content templates.

| Field | Type | Description |
|-------|------|-------------|
| template_id (PK) | UUID | Template identifier |
| category | String | Template category |
| title | String | Template title |
| description | Text | Template description |

---

# Relationships

| Parent | Child | Relationship |
|---------|-------|--------------|
| User | Project | One-to-Many (1:N) |
| Project | Prompt | One-to-Many (1:N) |
| Prompt | GeneratedContent | One-to-Many (1:N) |
| Template | GeneratedContent | One-to-Many (1:N) |

---

# Design Principles

- Normalized relational database design
- Primary Key (PK) and Foreign Key (FK) constraints
- One-to-Many relationships
- Enterprise-ready schema
- Supports AI content generation workflows
- Extensible for future AI models and content types

---

# ERD Diagram

![Enterprise ERD](../images/ERD.png)

---

## Legend

- PK = Primary Key
- FK = Foreign Key
- 1:N = One-to-Many Relationship

---

## Technologies

- PostgreSQL
- IBM Granite Foundation Models
- React Frontend
- REST API
- Prompt Engineering Layer

---

## Version

**Project:** AI Creative Studio

**Competition:** IBM AI Builders Challenge 2026

**Version:** 1.0

**Status:** Final