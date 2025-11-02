# Scrumplex Roadmap

---

## Version Path

| Version | Milestone              | Description                                               |
| ------- | ---------------------- | --------------------------------------------------------- |
| v0.1.0  | Project Bootstrap      | React + Supabase setup, AuthContext created               |
| v0.3.0  | Authentication MVP     | Register, login, and profile stored in Supabase           |
| v0.5.0  | Project Management MVP | Create and select projects with persistent data           |
| v0.6.0  | Product Backlog MVP    | CRUD for user stories, prioritization, and filtering      |
| v0.7.0  | MVP Completion         | Full Product Owner workflow (Auth + Projects + Backlog)   |
| v0.8.0  | Sprint Management      | Create sprints, link backlog items, and track progress    |
| v0.9.0  | Roles and Velocity     | Scrum Master and Developer roles, velocity metrics        |
| v1.0.0  | Full Scrum Tool        | Product and Sprint Backlog, Increments, artefact overview |

---

## MVP Definition

The Minimum Viable Product (MVP) is achieved with the completion of:

- Authentication and profile handling
- Project creation and selection
- Product Backlog management

At this stage, Scrumplex enables the full Product Owner cycle  
from authentication to backlog maintenance.

---

## Post-MVP Focus Areas

| Area              | Goal                                 | Planned Version |
| ----------------- | ------------------------------------ | --------------- |
| Sprint Management | Define and manage Sprint Backlogs    | v0.8.x          |
| Role System       | Add Scrum Master and Developer roles | v0.9.x          |
| Velocity Metrics  | Measure and visualize team progress  | v0.9.x          |
| Full Scrum Suite  | Implement all artefacts and events   | v1.0.0          |

---

## Error and Validation Feedback System

Scrumplex aims to deliver a user-centered feedback experience  
to support transparency, learning, and continuous inspection.

Planned for versions v0.6.8 – v0.8.x:

| Area                 | Feature                            | Description                                       |
| -------------------- | ---------------------------------- | ------------------------------------------------- |
| Frontend Validation  | Zod-based schemas                  | Real-time validation of all inputs                |
| UI Feedback          | Toasts via Sonner or shadcn Alerts | Clear success and error messages                  |
| Form Hints           | Inline contextual feedback         | Show validation hints directly within the UI      |
| Backend Errors       | Supabase error mapping             | Convert technical errors into user-friendly text  |
| Global Error Context | Centralized error handler          | Unified handling of exceptions and network issues |
| Empty State Design   | Informative placeholders           | Provide helpful empty-state guidance              |

---

## Post-1.0 Enhancements

| Feature                        | Description                                  |
| ------------------------------ | -------------------------------------------- |
| Scaled Scrum support           | Multi-team structure and program-level view  |
| AI-assisted backlog refinement | Suggest user story breakdowns and priorities |
| Integrations                   | GitHub, Jira import/export, external API     |
| API access                     | REST and GraphQL endpoints for external use  |
