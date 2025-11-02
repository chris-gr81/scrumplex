# Scrumplex Vision

Scrumplex is built to embody the principles of the Scrum Guide:  
empiricism, self-management, and transparency.  
It is not "Scrum-inspired software"; it is Scrum-faithful software.

---

## Purpose

Scrumplex helps teams and Product Owners apply Scrum correctly,  
not just manage tasks or tickets.  
The goal is to make core Scrum artefacts and events transparent, accessible,  
and aligned with the original intent of the Scrum framework.

---

## Guiding Principles

Scrumplex is designed around the three pillars of empiricism:

1. **Transparency** Artefacts and their states are visible to all participants.
2. **Inspection** Data, backlog, and progress can be reviewed easily and regularly.
3. **Adaptation** Teams can adjust their process and priorities based on inspection results.

These principles are reflected in the structure of the application:  
clear backlog management, lightweight feedback loops, and contextual user guidance.

---

## Core Features (Aligned with the Scrum Guide)

| Area            | Purpose                                              | Implementation Focus                       |
| --------------- | ---------------------------------------------------- | ------------------------------------------ |
| Product Backlog | Single source of truth for what is valuable          | CRUD, prioritization, filtering            |
| Sprint Backlog  | The team’s selected work for the Sprint              | Tasks, Definition of Done tracking         |
| Increment       | The sum of completed backlog items                   | Version tagging, progress visualization    |
| Roles           | Product Owner, Scrum Master, Developers, Stakeholder | Role-based access and contextual views     |
| Events          | Sprint Planning, Daily Scrum, Review, Retrospective  | Structural and scheduling support (future) |

---

## UX Philosophy

Scrumplex emphasizes clarity, transparency, and informative feedback.  
Every user interaction produces a clear and contextual response:

- Validation hints when input is missing or incomplete
- Error notifications when actions fail
- Success messages when tasks are completed
- Empty-state placeholders when no data is available

The feedback system aims to support inspection and adaptation on the user level.  
In short: _good Scrum requires visibility, and so does good UX._

---

## MVP Scope

The MVP focuses entirely on the Product Owner workflow:

1. Authentication and user profiles
2. Project creation and selection
3. Product Backlog management (User Stories)

Once the Product Backlog module is complete, Scrumplex reaches MVP status.  
This version allows a Product Owner to define, refine, and maintain the Product Backlog  
within a transparent and minimal interface.

---

## Long-Term Vision (Post 1.0)

After the MVP, Scrumplex will evolve toward a complete Scrum management suite:

- Sprint creation and backlog linkage
- Definition of Done templates
- Role-based dashboards for PO, SM, and Developers
- Velocity tracking and burndown visualization
- Retrospective documentation
- Exportable Scrum artefacts (Backlog snapshots, Increments)
