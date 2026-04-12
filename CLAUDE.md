# Movie Mate Match Maker

## Project Overview

A full-stack movie matching application built with:
- **Backend**: Rust + [Loco](https://loco.rs) framework (v0.14.0) — Rails-like web framework for Rust
- **Database**: SeaORM with SQLite (dev) and PostgreSQL (prod/CI)
- **Frontend**: React + TypeScript, bundled separately in `./frontend/`
- **Auth**: JWT-based authentication (Loco SaaS starter)

## Architecture

```
src/
  bin/main.rs          # Entry point
  lib.rs               # Module declarations
  controllers/         # HTTP route handlers (movies.rs, auth.rs)
  models/              # SeaORM entity logic (movies.rs, users.rs)
  models/_entities/    # Auto-generated SeaORM entities (do not edit)
  views/               # View rendering
  mailers/             # Email templates
  workers/             # Background job workers
  tasks/               # CLI tasks
  initializers/        # App startup hooks
migration/             # SeaORM migrations
frontend/              # React/TypeScript frontend (separate build)
assets/                # Static assets, i18n (Fluent), HTML views
config/                # YAML config files per environment
tests/                 # Integration and model tests with insta snapshots
```

## Common Commands

### Backend
```sh
cargo loco start          # Run the server (port 5150)
cargo loco generate       # Generate models, controllers, etc.
cargo test --all-features --all  # Run all tests
cargo fmt --all           # Format code
cargo clippy --all-features -- -D warnings  # Lint
```

### Frontend (in ./frontend/)
```sh
npm install && npm run build   # Build frontend
```

## Code Conventions

### Rust
- Max line width: 100 chars (`.rustfmt.toml`)
- Clippy: pedantic + nursery + rust-2018-idioms warnings treated as errors in CI
- Controllers use `#[debug_handler]` from axum
- Routes follow pattern: `Routes::new().prefix("api/<resource>/").add(...)`
- Models: business logic in `impl Model {}`, write logic in `impl ActiveModel {}`, queries in `impl Entity {}`
- `_entities/` files are auto-generated — never edit directly

### Frontend
- Biome for linting and formatting (spaces, not tabs)
- TypeScript strict mode enabled
- React with JSX transform (`react-jsx`)

## Testing
- Uses `insta` for snapshot testing (`tests/*/snapshots/`)
- `serial_test` for tests requiring sequential execution
- `rstest` for parameterized tests
- Test helpers in `tests/requests/prepare_data.rs`
- CI requires Redis (6379) and PostgreSQL (5432) services

## CI Pipeline
Three jobs: `rustfmt` (style check), `clippy` (lint), `test` (full suite with services)

## Key Dependencies
- `loco-rs = "0.14.0"` — framework
- `sea-orm = "1.1.0"` — ORM
- `axum = "0.8.1"` — HTTP
- `fluent-templates` — i18n
