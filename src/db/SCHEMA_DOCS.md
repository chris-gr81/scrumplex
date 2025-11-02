# Scrumplex Database Schema

This document provides an overview of the database structure used in Scrumplex.  
It describes the current MVP-level schema implemented in Supabase and designed  
for scalable Scrum project management (based on the Scrum Guide 2020).

---

## 1. Overview

| Table           | Purpose                                                               |
| --------------- | --------------------------------------------------------------------- |
| profiles        | User data synced with Supabase Auth                                   |
| projects        | Core Scrum projects with goal and ownership                           |
| project_members | Team assignments, roles and permissions                               |
| roles           | Role definitions (Product Owner, Scrum Master, Developer)             |
| userstories     | Product Backlog items (User Stories)                                  |
| status          | Generic status list for stories (e.g., Open, In Progress, Done)       |
| priority        | Priority levels for backlog items                                     |
| invest          | INVEST-quality attributes for stories                                 |
| —               | —                                                                     |
| **Relations**   | Userstories link to projects, priority, status, and invest attributes |

---

## 2. Table Details

### profiles

| Column           | Type        | Nullable | Default | Description                         |
| ---------------- | ----------- | -------- | ------- | ----------------------------------- |
| id               | uuid        | no       | –       | Supabase Auth user ID               |
| created_at       | timestamptz | no       | now()   | Creation timestamp                  |
| first_name       | text        | no       | –       | User’s given name                   |
| last_name        | text        | no       | –       | User’s family name                  |
| profile_complete | boolean     | no       | false   | Marks if user finished onboarding   |
| current_project  | uuid        | yes      | null    | References current selected project |

**Purpose:**  
Stores all user profiles connected to Supabase Auth.  
`current_project` allows quick context switching for the frontend.

---

### projects

| Column     | Type        | Nullable | Default           | Description                      |
| ---------- | ----------- | -------- | ----------------- | -------------------------------- |
| id         | uuid        | no       | gen_random_uuid() | Project identifier               |
| created_at | timestamptz | no       | now()             | Creation date                    |
| name       | text        | no       | –                 | Project name                     |
| goal       | text        | yes      | null              | Overall project goal or mission  |
| finished   | boolean     | no       | false             | Whether the project is completed |
| updated_at | timestamptz | no       | now()             | Auto-updated timestamp           |
| owner_id   | uuid        | no       | auth.uid()        | References the Product Owner     |

**Purpose:**  
Central project table. Each project belongs to a Product Owner (profile).  
Used to group user stories and team memberships.

---

### project_members

| Column     | Type        | Nullable | Default           | Description                       |
| ---------- | ----------- | -------- | ----------------- | --------------------------------- |
| id         | uuid        | no       | gen_random_uuid() | Member record ID                  |
| created_at | timestamptz | no       | now()             | When added to the project         |
| project_id | uuid        | yes      | null              | References the project            |
| profile_id | uuid        | yes      | null              | References the user profile       |
| role_id    | uuid        | yes      | null              | References the role (roles table) |

**Purpose:**  
Mapping table for assigning users to projects with a defined role.  
Used for RLS authorization (only project members can view project content).

---

### roles

| Column     | Type        | Nullable | Default           | Description                                        |
| ---------- | ----------- | -------- | ----------------- | -------------------------------------------------- |
| id         | uuid        | no       | gen_random_uuid() | Role ID                                            |
| created_at | timestamptz | no       | now()             | Creation date                                      |
| name       | text        | no       | –                 | Role name (Product Owner, Scrum Master, Developer) |

**Purpose:**  
Defines available roles in the Scrum context.  
Each member in `project_members` links to exactly one role.

---

### userstories

| Column             | Type        | Nullable | Default           | Description                 |
| ------------------ | ----------- | -------- | ----------------- | --------------------------- |
| id                 | uuid        | no       | gen_random_uuid() | Story ID                    |
| created_at         | timestamptz | no       | now()             | Creation time               |
| project_id         | uuid        | no       | null              | References project          |
| priority_id        | uuid        | no       | null              | References priority level   |
| status_id          | uuid        | yes      | null              | References current status   |
| name               | text        | no       | –                 | Short title of the story    |
| story_as           | text        | yes      | null              | Role part ("As a...")       |
| story_like         | text        | yes      | null              | Action part ("I want...")   |
| story_cause        | text        | yes      | null              | Benefit part ("so that...") |
| updated_at         | timestamptz | yes      | null              | Last modification time      |
| definition_of_done | text        | yes      | null              | Definition of Done text     |

**Purpose:**  
Represents Product Backlog items.  
Follows the user story format and optionally links to an INVEST evaluation.

---

### status

| Column     | Type        | Nullable | Default           | Description                            |
| ---------- | ----------- | -------- | ----------------- | -------------------------------------- |
| id         | uuid        | no       | gen_random_uuid() | Status ID                              |
| created_at | timestamptz | no       | now()             | Creation date                          |
| name       | text        | no       | –                 | Status label (e.g., Open, Doing, Done) |

**Purpose:**  
Standardizes the possible workflow states of user stories.

---

### priority

| Column     | Type        | Nullable | Default           | Description                              |
| ---------- | ----------- | -------- | ----------------- | ---------------------------------------- |
| id         | uuid        | no       | gen_random_uuid() | Priority ID                              |
| created_at | timestamptz | no       | now()             | Creation date                            |
| level      | smallint    | no       | –                 | Numeric level (e.g., 1–5)                |
| name       | text        | no       | –                 | Priority label (e.g., High, Medium, Low) |

**Purpose:**  
Used to order and classify backlog items.

---

### invest

| Column            | Type    | Nullable | Default           | Description                   |
| ----------------- | ------- | -------- | ----------------- | ----------------------------- |
| id                | uuid    | no       | gen_random_uuid() | INVEST entry ID               |
| userstory_id      | uuid    | yes      | null              | References related user story |
| independent_check | boolean | yes      | false             | Whether story is independent  |
| independent_rate  | integer | yes      | null              | Score for independence        |
| negotiable_check  | boolean | yes      | false             | Whether story is negotiable   |
| negotiable_rate   | integer | yes      | null              | Score for negotiability       |
| valuable_check    | boolean | yes      | false             | Whether story is valuable     |
| valuable_rate     | integer | yes      | null              | Score for value               |
| estimable_check   | boolean | yes      | false             | Whether story is estimable    |
| estimable_rate    | integer | yes      | null              | Score for estimability        |
| small_check       | boolean | yes      | false             | Whether story is small enough |
| small_rate        | integer | yes      | null              | Score for size                |
| testable_check    | boolean | yes      | false             | Whether story is testable     |
| testable_rate     | integer | yes      | null              | Score for testability         |

**Purpose:**  
Supports the INVEST principle — ensures each story is  
Independent, Negotiable, Valuable, Estimable, Small, and Testable.  
Used for quality scoring and story refinement.

---

## 3. Foreign Key Relationships

| Source Table    | Source Column   | Target Table | Target Column | Description                                    |
| --------------- | --------------- | ------------ | ------------- | ---------------------------------------------- |
| invest          | userstory_id    | userstories  | id            | Each INVEST evaluation belongs to a user story |
| profiles        | current_project | projects     | id            | User’s active project selection                |
| project_members | project_id      | projects     | id            | Member’s associated project                    |
| project_members | profile_id      | profiles     | id            | Member’s linked profile                        |
| project_members | role_id         | roles        | id            | Assigned role                                  |
| userstories     | priority_id     | priority     | id            | Priority reference                             |
| userstories     | status_id       | status       | id            | Workflow status reference                      |
| userstories     | project_id      | projects     | id            | Story belongs to project                       |

---

## 4. Row-Level Security (RLS)

All tables are protected by Row-Level Security policies in Supabase.  
Typical access rules:

- Users can view and modify their own profile (`auth.uid() = profiles.id`)
- Projects are visible only to their members
- User stories can be accessed only within a member’s project
- INVEST entries can only be viewed if user has access to the related story

---

## 5. Notes

- All IDs are generated using `gen_random_uuid()`
- All timestamps use `now()` as default
- All boolean fields default to `false`
- The schema follows PostgreSQL conventions and Supabase best practices
- The design mirrors Scrum artefacts and quality principles (INVEST + DoD)

---

**Last updated:** November 2025  
**Maintainer:** Christian Grimm
