# Database Design

## Users

| Field | Type |
|--------|------|
| id | UUID |
| name | String |
| email | String |
| password | String |
| avatar | String |
| createdAt | Date |

---

## Projects

| Field | Type |
|--------|------|
| id | UUID |
| userId | UUID |
| title | String |
| description | Text |
| category | String |
| createdAt | Date |

---

## AI Sessions

| Field | Type |
|--------|------|
| id | UUID |
| projectId | UUID |
| prompt | Text |
| response | Text |
| model | String |
| createdAt | Date |

---

## Moodboards

| Field | Type |
|--------|------|
| id | UUID |
| projectId | UUID |
| title | String |
| images | Array |

---

## Assets

| Field | Type |
|--------|------|
| id | UUID |
| projectId | UUID |
| type | String |
| url | String |

---

## Comments

| Field | Type |
|--------|------|
| id | UUID |
| userId | UUID |
| projectId | UUID |
| message | Text |
| createdAt | Date |