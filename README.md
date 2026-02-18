# Hospital Management System - Enterprise Structure

This repository follows a multi-module enterprise architecture for scalability and maintainability.

## Directory Structure

### [backend/](file:///backend)
Contains the Spring Boot REST API. This handles business logic, database persistence, and security.

### [frontend/](file:///frontend)
Contains the UI application (Target: React/Next.js).
- `components/`: Reusable UI elements.
- `pages/`: View components and layouts.
- `services/`: API integration and business logic for the UI.
- `assets/`: Images, icons, and global styles.
- `routes/`: Client-side routing configuration.
- `api/`: Endpoint definitions and request axios/fetch wrappers.

### [database/](file:///database)
Contains database management files.
- SQL scripts for schema creation.
- Flyway/Liquibase migration files.
- ER Diagrams and data models.

### [docs/](file:///docs)
Project documentation.
- Architecture diagrams.
- API documentation (Swagger/OpenAPI).
- User manuals and setup guides.

### [devops/](file:///devops)
Infrastructure and deployment configuration.
- Dockerfiles and Docker Compose.
- CI/CD pipelines (GitHub Actions/Jenkins).
- Kubernetes manifests.
