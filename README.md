# Scrumplex

Scrumplex is an open-source Scrum management tool built with React, TypeScript, and Supabase.  
It is designed to align closely with the principles and terminology of the Scrum Guide.

Goal: Support clean, transparent Scrum practice, not just generic project management.

---

## Vision

Scrumplex provides a digital environment that helps teams and Product Owners practice Scrum as intended.  
It emphasizes empiricism, transparency, inspection, and adaptation, focusing on the three Scrum artefacts  
(Product Backlog, Sprint Backlog, Increment) and the three accountabilities (Product Owner, Scrum Master, Developers).

"Scrumplex does not redefine Scrum, it enables you to do Scrum right."

---

## Current Status

Scrumplex is currently in active MVP development.  
The Minimum Viable Product (MVP) consists of three fully functional core modules:

| Core Feature       | Description                                      | Status         | Version |
| ------------------ | ------------------------------------------------ | -------------- | ------- |
| Authentication     | Supabase Auth integration with profile context   | Complete       | v0.3.0  |
| Project Management | Create and select projects                       | Complete       | v0.5.0  |
| Product Backlog    | CRUD for user stories, prioritization, filtering | In development | v0.6.x  |

**MVP Target:**  
When the Product Backlog module is finished, Scrumplex reaches full MVP status.  
At that point, the tool covers the complete Product Owner workflow,
from authentication, to project setup, to backlog management.

---

### Upcoming Post-MVP Milestones

| Feature             | Goal                                       | Planned Version |
| ------------------- | ------------------------------------------ | --------------- |
| Sprint Management   | Define and manage Sprint Backlogs          | v0.8.x          |
| Team Roles          | Introduce Scrum Master and Developer views | v0.9.x          |
| Velocity and Charts | Measure progress, burndown and velocity    | v0.9.x          |
| Full Scrum Suite    | All artefacts, roles and events            | v1.0.0          |

---

### Summary

0.7 MVP = Auth + Projects + Backlog  
1.0 First stable = MVP + Sprints + Roles + Metrics

---

## Tech Stack

| Layer            | Technology                                    |
| ---------------- | --------------------------------------------- |
| Frontend         | React 18, TypeScript, Tailwind CSS, shadcn/ui |
| State Management | Context API + Custom Hooks                    |
| Backend / DB     | Supabase (PostgreSQL + RLS)                   |
| Validation       | Zod                                           |
| Build & Deploy   | Vite + GitHub Pages                           |
| Versioning       | Semantic Versioning (MAJOR.MINOR.PATCH)       |

---

## Database Structure

Scrumplex uses Supabase (PostgreSQL) as its backend.  
The schema mirrors the structure of core Scrum artefacts and roles while maintaining relational integrity and row-level security.

**Main Tables**

- **profiles** - User profiles linked to Supabase Auth
- **projects** - Scrum projects containing goal, owner, timestamps and status
- **project_members** - Assigns users and roles to projects
- **roles** - Defines Scrum roles (Product Owner, Scrum Master, Developer)
- **userstories** - Product Backlog items with priority, status and Definition of Done
- **priority** - Backlog item priority levels
- **status** - Story workflow states (e.g. Open, In Progress, Done)
- **invest** - Quality metrics per story (Independent, Negotiable, Valuable, Estimable, Small, Testable)

The full schema documentation including table definitions, data types and relationships  
is maintained under:

`src/db/SCHEMA_DOCS.md`

## Documentation Overview

Scrumplex provides a structured documentation stack that connects concept, strategy and implementation.

| Document                | Description                                                    |
| ----------------------- | -------------------------------------------------------------- |
| `VISION.md`             | Explains the product vision and connection to Scrum principles |
| `ROADMAP.md`            | Outlines version goals and feature milestones                  |
| `src/db/SCHEMA_DOCS.md` | Describes the database schema, tables and foreign keys         |

Together, these documents describe what Scrumplex is, where it is going, and how it is built.

## Development Notes

### Updating the database documentation

When database changes occur in Supabase, the local schema documentation (`src/db/SCHEMA_DOCS.md`) must be updated to remain consistent with the actual backend.

1. Open your Supabase project in the browser.
2. Navigate to **SQL Editor** → **New Query**.
3. Run the information schema queries to list all tables and columns.
4. Copy the resulting Markdown or SQL output.
5. Paste the updated content into `src/db/SCHEMA_DOCS.md`.
6. Commit the change with a clear message (e.g. _docs: update schema after backlog changes_).

This ensures that your repository always reflects the current database design  
without needing local CLI tools or direct database access.

---

## Local Development

```bash
git clone https://github.com/chris-gr81/scrumplex.git
cd scrumplex
npm install
cp .env.example .env  # Insert your Supabase URL and anon key
npm run dev
```

## Author

Christian Grimm  
GitHub: [https://github.com/chris-gr81](https://github.com/chris-gr81)
