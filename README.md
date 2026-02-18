# Hospital Management System (HMS) - Enterprise Architecture

This project is a full-stack Hospital Management System designed with a professional, scalable, and decoupled **Enterprise Architecture**.

---

## 🏛️ Project Hierarchy (3-Tier Multi-Module Maven)

The project is organized into three main tiers to ensure clean separation of concerns and parallel development.

```text
hospital/ (Master Root)
│
├── backend/ (Backend Building)
│   ├── hms-common/    # Exceptions, POJOs, and Shared Utilities
│   ├── hms-dao/       # Database Entities & JPA Repositories
│   ├── hms-service/   # Business Logic Implementations
│   ├── hms-config/    # Security (Spring Security) & Global Config
│   ├── hms-ws/        # REST Controllers & API Entry Point
│   ├── hms-oas/       # Swagger/OpenAPI Definitions
│   └── hms-dist/       # Final Packaging and Distribution
│
└── frontend/ (Frontend Building)
    ├── hms-client/    # Main Angular Application (Shell)
    ├── hms-service/   # Angular API Interaction Services
    ├── hms-comm/      # Shared Design System (Reusable Components)
    ├── hms-config/    # Frontend Security (Guards/Interceptors)
    ├── hms-rs/        # Frontend Data Models (Type Safety)
    └── hms-oas/       # Auto-generated API Clients
```

---

## 🚀 Key Features

- **Symmetrical Design**: Frontend modules mirror Backend modules for predictable data flow.
- **Modularity**: Every component is a specialized Maven module, allowing for independent testing and reuse.
- **Enterprise Standards**: Follows the `DAO -> Service -> Controller` pattern on the backend and `Service -> Component -> Page` pattern on the frontend.
- **Seamless Integration**: Automated API proxying for local development without CORS issues.

---

## 🛠️ Tech Stack

- **Backend**: Java 17, Spring Boot 4.0.2, Spring Data JPA, Spring Security, PostgreSQL.
- **Frontend**: Angular 18+, TypeScript, CSS (Vanilla Design).
- **Build Tool**: Maven (Multi-Module).
