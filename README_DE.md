# Scrumplex

Scrumplex ist ein Open-Source-Scrum-Management-Tool auf Basis von React, TypeScript und Supabase.  
Es orientiert sich konsequent an den Prinzipien und Begriffen des offiziellen **Scrum Guides**.

Ziel: **Sauberes, transparentes Scrum-Arbeiten unterstützen, nicht nur generelles Projektmanagement.**

---

## Vision

Scrumplex bietet eine digitale Umgebung, in der Teams und Product Owner Scrum so praktizieren können,  
wie es gedacht ist: auf Basis von **Empirie, Transparenz, Inspektion und Adaption**.

Im Mittelpunkt stehen die drei Scrum-Artefakte  
(**Product Backlog, Sprint Backlog, Increment, sowie das Backlog Refinment**)  
und die drei Verantwortlichkeiten sowie die Stakeholder
(**Product Owner, Scrum Master, Developer, Stakeholder**).

---

## Aktueller Stand

Scrumplex befindet sich in aktiver MVP-Entwicklung.  
Das **Minimum Viable Product (MVP)** besteht aus drei Kernmodulen:

| Kernfunktion      | Beschreibung                            | Status         | Version |
| ----------------- | --------------------------------------- | -------------- | ------- |
| Authentifizierung | Supabase Auth mit Profilkontext         | Abgeschlossen  | v0.3.0  |
| Projektverwaltung | Projekte anlegen und auswählen          | Abgeschlossen  | v0.5.0  |
| Product Backlog   | CRUD für User Stories mit Priorisierung | In Entwicklung | v0.6.x  |

**MVP-Ziel:**  
Sobald das Backlog-Modul fertig ist, deckt Scrumplex den gesamten Product-Owner-Workflow ab,
von der Anmeldung über die Projektanlage bis zur Backlog-Verwaltung.

---

## Nächste Meilensteine (Post-MVP)

| Feature            | Ziel                                | Geplante Version |
| ------------------ | ----------------------------------- | ---------------- |
| Sprint Management  | Verwaltung von Sprint Backlogs      | v0.8.x           |
| Teamrollen         | Scrum Master- & Developer-Ansichten | v0.9.x           |
| Velocity & Charts  | Fortschritts- und Velocity-Messung  | v0.9.x           |
| Vollständige Suite | Alle Artefakte, Rollen und Events   | v1.0.0           |

---

## Technologie-Stack

| Ebene            | Technologie                                   |
| ---------------- | --------------------------------------------- |
| Frontend         | React 18, TypeScript, Tailwind CSS, shadcn/ui |
| State Management | Context API + Custom Hooks                    |
| Backend / DB     | Supabase (PostgreSQL + RLS)                   |
| Validierung      | Zod                                           |
| Build & Deploy   | Vite + GitHub Pages                           |
| Versionierung    | Semantic Versioning (MAJOR.MINOR.PATCH)       |

---

## Datenbankstruktur

Scrumplex verwendet **Supabase (PostgreSQL)** als Backend.  
Das Schema bildet zentrale Scrum-Artefakte und Rollen ab und nutzt Row-Level-Security (RLS)  
für sichere, benutzerspezifische Zugriffe.

**Wichtige Tabellen**

- **profiles** - Benutzerprofile, verknüpft mit Supabase Auth
- **projects** - Projekte mit Ziel, Owner und Zeitstempeln
- **project_members** - Zuordnung von Benutzern zu Projekten
- **roles** - Scrum-Rollen (Product Owner, Scrum Master, Developer)
- **userstories** - Backlog-Elemente mit Status, Priorität, Definition of Done
- **invest** - Qualitätsmetriken für Stories (INVEST-Prinzip)

Vollständige Schema-Dokumentation:  
`src/db/SCHEMA_DOCS.md`

---

## Dokumentationsübersicht

| Dokument                | Beschreibung                                |
| ----------------------- | ------------------------------------------- |
| `VISION.md`             | Produktvision und Bezug zum Scrum Guide     |
| `ROADMAP.md`            | Versionen und geplante Feature-Meilensteine |
| `src/db/SCHEMA_DOCS.md` | Datenbankschema, Tabellen und Relationen    |

Diese drei Dokumente bilden die konzeptionelle Struktur:  
**Was** Scrumplex ist (Vision) → **wohin** es geht (Roadmap) → **wie** es aufgebaut ist (Schema).

---

## Hinweise zur Weiterentwicklung

### Aktualisierung der Schema-Dokumentation

Wenn sich in Supabase Änderungen ergeben, sollte `src/db/SCHEMA_DOCS.md` aktualisiert werden:

1. Im Supabase-Dashboard **SQL Editor → New Query** öffnen
2. Die `information_schema`-Abfrage ausführen
3. Ergebnis kopieren und in `SCHEMA_DOCS.md` einfügen
4. Commit mit Klartextbeschreibung (z. B. _docs: update schema after backlog changes_) durchführen

Dadurch bleibt das Repository immer synchron mit der aktuellen Datenbankstruktur.

---

## Lokale Entwicklung

```bash
git clone https://github.com/chris-gr81/scrumplex.git
cd scrumplex
npm install
cp .env.example .env  # Supabase URL und Anon-Key eintragen
npm run dev
```

---

## Autor

**Christian Grimm**  
GitHub: [https://github.com/chris-gr81](https://github.com/chris-gr81)
