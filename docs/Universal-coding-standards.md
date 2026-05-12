# Universal Coding Standards

This document is a portable baseline you can drop into any codebase. Treat it as a starting standard, then customize the placeholders, stack-specific commands, and domain-specific compliance terms for the target project.

## 1. Governance

### Guardrail Contract
- These standards are hard guardrails, not optional suggestions.
- A change is not complete if it violates these guardrails, even if the code "works".
- The stricter rule wins when task docs, plan docs, local patterns, or framework defaults conflict with a general coding rule here.
- If a temporary exception is unavoidable, document the reason, owner, scope, risk, and removal plan in the same change before merge approval.

### Standards Ownership
- This file is the canonical source for cross-cutting coding rules in the codebase where it is installed.
- Domain docs may add domain-specific constraints, but they should reference this file instead of cloning general maintainability rules into multiple places.
- When a new reusable engineering rule is discovered during implementation or review, update this file and then reference it from other docs instead of restating the same rule in parallel.
- Replace project placeholders such as `<project-root>`, `<frontend-root>`, `<security-baseline-command>`, `<regulated-data>`, and `<default-test-command>` with local conventions.

## 2. Core Design Principles

### SOLID
- **SRP:** each module has one clear responsibility.
- **OCP:** extend behavior via composition, not editing core logic.
- **LSP:** keep interfaces stable and predictable.
- **ISP:** avoid forcing consumers to depend on unused methods.
- **DIP:** depend on abstractions, keep infrastructure at edges.

### DRY (Required)
- DRY is mandatory for equivalent behavior, validation rules, formatting rules, policy checks, and contract mapping.
- One behavior, rule, or contract should have one authoritative implementation or definition and one clear owner.
- Before adding new logic, search the codebase for an existing helper, service, component, hook, schema, contract, or constant that already owns that behavior.
- Prefer shared helpers/contracts over copy/paste drift when behavior is equivalent.
- Centralize validation, normalization, error mapping, policy checks, and repeated business rules when they apply in more than one place.
- Extract a shared abstraction only when there is real reuse or a near-certain second consumer; do not replace copy/paste with speculative indirection.
- Do not merge equivalent duplicate logic without an explicit documented exception.

### Maintainability
- Avoid giant methods; keep functions under about 30 lines when practical.
- Prefer explicit names over comments.
- No magic numbers; use constants or config defaults.
- Centralize error responses and validation logic.
- Keep modules focused and decoupled; avoid tight coupling across layers.
- Use interfaces or small adapters when integrating external services.
- Fully implement the intended design instead of leaving partial cutovers, legacy fallbacks, or temporary bridge code behind unless an explicit documented exception is approved.
- Do not cut corners that create hidden maintenance debt; prefer clean completion over fast half-implementation.
- Break work into small, composable modules; avoid god classes, god components, and oversized multipurpose files.
- Before implementing a feature, audit what already exists in the codebase and reuse existing services, shared components, hooks, utilities, contracts, and patterns where they fit cleanly.
- Only add a new component/module/service when the existing building blocks do not support the feature cleanly or would create worse coupling by forcing reuse.
- If requirements are unclear or new implementation questions appear mid-build, stop and get those questions answered before continuing with the affected behavior.
- For any feature being implemented from a task or plan doc, explicitly review that doc's implementation guardrails before coding and again before marking tasks complete.
- Do not bypass stable service ownership, established contracts, or finished foundational systems with feature-specific shortcuts or placeholder data sources.

### Object Calisthenics
- Apply Object Calisthenics as the default refactoring pressure for domain, service, and stateful frontend logic.
- Use these rules deliberately, not mechanically. DTOs, schema definitions, generated code, framework wiring, and external contract shapes may use simpler data carriers when that is the clearer fit, but the underlying goals still apply: strong encapsulation, minimal branching, and clear ownership.
- **1. One indentation level per method:** prefer guard clauses, helper extraction, and small composable functions over nested control flow.
- **2. Avoid `else` when a clearer structure exists:** prefer early returns, lookup tables, strategy objects, Null Object, and polymorphic dispatch. Use `else` only when the alternative is less readable.
- **3. Wrap primitives and strings with meaning:** identifiers, money, status codes, measurement units, and validated domain inputs should not remain anonymous raw values once invariants or behavior exist.
- **4. First-class collections:** if a collection has invariants, filtering rules, normalization, or aggregate behavior, give it a dedicated owner instead of repeating raw array/object manipulation at call sites.
- **5. One dot per line:** avoid deep property or method chains across boundaries. Ask the owning module or object to do the work instead of reaching through its internals.
- **6. Do not abbreviate:** use full names unless the abbreviation is a well-known domain or protocol term already standard in the project, such as `JWT`, `URL`, `ID`, `DOB`, `PHI`, or `PII`.
- **7. Keep entities small:** prefer classes, modules, and components that fit on one screen and hold one responsibility; split files before they become multipurpose dumping grounds.
- **8. Keep instance state small:** non-DTO behavior classes should usually manage one cohesive concept or a very small collaborator set; if a class needs many fields, extract value objects or focused collaborators.
- **9. Prefer behavior over getters/setters:** use commands and intentful queries instead of exposing raw internals. DTOs, serializers, schemas, and boundary mappers are the narrow exceptions.
- Apply "Tell, Don't Ask" when in doubt: push behavior toward the object or module that owns the data and invariants.
- Reference background: Object Calisthenics.

### Refactor Simplicity Gate
- Remove over-engineering signals: speculative abstractions, single-use wrappers, and flag-heavy APIs with unclear ownership.
- Remove duplicate logic when behavior is equivalent; apply the `DRY (Required)` rules above instead of allowing copy/paste drift.
- Keep abstraction cost proportional to real reuse; prefer at least two concrete call sites before extracting shared layers.
- Add explicit verification notes in refactor plans for simplification and dedup outcomes.

## 3. Runtime, Configuration, and Integrations

### Configuration & Feature Flags
- Workflow thresholds, feature flags, provider toggles, retention settings, scheduler settings, and operational limits must be configurable when they can vary by environment, tenant, customer, region, or deployment profile.
- Defaults must be conservative for regulated or data-changing workflows: do not auto-enable data-changing, externally visible, or sensitive-data-affecting behavior without an explicit configuration path.
- Config validation must reject impossible, dangerous, missing, stale, or contradictory settings at startup or at the earliest safe boundary.
- Keep feature flags narrow and temporary. Document the owner, expected removal condition, and affected runtime behavior when a flag is introduced.
- Keep `.env.example`, infrastructure examples, operations docs, and deployment docs aligned when required runtime configuration changes.

### Runtime Architecture & Twelve-Factor Practices
- Keep the codebase, build definitions, dependency manifests, migrations, and admin scripts versioned so the repository clearly defines what can be built and deployed.
- Dependencies must be explicit, pinned, and installed through repo-owned package or build tooling. Do not rely on undeclared machine-global packages or hidden runtime prerequisites.
- Separate config from code. Environment-specific values, provider endpoints, credentials, tenant settings, and operational thresholds must come from configuration, not source edits or baked artifacts.
- Treat backing services such as databases, queues, object storage, email/SMS providers, and external APIs as attached resources addressed through configuration and adapters.
- Keep build, release, and run stages separate: builds create immutable artifacts, releases combine artifacts with configuration, and runtime processes execute a specific release.
- Application processes should be stateless by default. Durable state belongs in an owned datastore or configured backing service, not local memory, local disk, or per-instance files.
- Services that accept traffic must bind to an explicit port and let the runtime, proxy, or platform own routing and request forwarding.
- Scale through process concurrency and additional service instances rather than feature-specific code paths that assume a single running process.
- Processes must start quickly, stop gracefully, drain in-flight work when possible, and tolerate restarts without corrupting data or losing committed work.
- Keep development, test, staging, and production behavior as close as practical. Any intentional environment difference must be represented through explicit configuration or documented infrastructure.
- Application logs should go to stdout/stderr or the platform logger as structured, redacted events so external tooling can route, retain, and analyze them.
- One-off admin jobs, migrations, and repair scripts must run against a specific release and reuse the same repo-owned code, config validation, and safety checks as the main process.
- Long-running services must expose health indicators and telemetry that operators can use to distinguish healthy, degraded, unavailable, and misconfigured states.
- Reference background: The Twelve-Factor App.

### External Providers & Integrations
- Provider clients must stay behind interfaces or adapters owned by the appropriate service boundary.
- Each externally sourced field must have a source-of-truth policy before it drives user, account, document, billing, notification, reporting, or regulated workflow behavior.
- Do not blindly merge, average, or overwrite values from multiple providers. Reconcile through an explicit policy and surface conflicts for review when data quality matters.
- Handle rate limits, retries, timeouts, partial outages, stale data, and malformed provider responses explicitly.
- Log provider mismatches and failures with safe metadata only; never log sensitive data, secrets, credentials, full provider payloads, or raw documents.
- Missing optional provider data must not silently become a regulated, financial, operational, or workflow decision. Use explicit absence states, review queues, or safe fallbacks.

## 4. Kubernetes Standards (Only If Adopted)

These rules apply only if a project introduces Kubernetes manifests, Helm charts, operators, or Kubernetes deployment automation. They do not imply Kubernetes is required.

### Workload Design
- Design Kubernetes-targeted services for horizontal scaling: stateless application processes, network-accessible backing services, idempotent startup, graceful shutdown, and safe behavior during restarts or rescheduling.
- Keep services independently deployable and independently scalable. Do not group unrelated runtime responsibilities into one service, container, or pod for convenience.
- Kubernetes workloads must also satisfy the general `Runtime Architecture & Twelve-Factor Practices` section above.
- Container images must separate build-time tooling from runtime artifacts, preferably through multi-stage builds. Production images should be minimal and contain only what the process needs to run.
- Runtime configuration belongs in Kubernetes ConfigMaps, Secrets, environment variables, or mounted files. Do not bake environment-specific config, credentials, tenant settings, or operational limits into images.
- Kubernetes Secrets must not become a reason to weaken repo secret hygiene. Never commit real secret values, rendered secret manifests containing sensitive data, or decrypted secret bundles.
- Define pod scope by lifecycle and scaling needs. Containers that must be started, stopped, scheduled, and scaled independently belong in separate pods.
- Use multi-container pods only for tightly coupled helpers that extend or adapt the primary container, such as sidecars, ambassadors, or adapters. Do not use a pod as a general deployment bundle.
- Every long-running Kubernetes workload must expose readiness and liveness checks that reflect real serving health. Readiness failures should remove traffic without forcing a restart; liveness failures should be reserved for states where restart is the correct recovery.
- Use Deployments or another appropriate higher-level controller for replicated stateless workloads. Do not manage production pods directly as the durable unit of deployment.
- Route internal traffic through Kubernetes Services instead of direct pod addresses. Public access should be expressed through controlled Service or Ingress configuration with explicit ownership.
- Keep Kubernetes resource definitions declarative, reviewed, and versioned with the application or infrastructure repository. Avoid imperative cluster changes as the source of truth for production state.
- Kubernetes manifests must include explicit resource requests/limits, safe rollout behavior, labels/selectors with stable ownership, and environment-specific values separated from reusable templates.

### Requests, Limits, and QoS
- Every production workload container must define CPU and memory requests and limits. Do not rely on `BestEffort` QoS for production, regulated-data, admin, provider, billing, or user-facing workloads.
- Treat requests as scheduling guarantees and limits as runtime obligations. Applications must be designed and tested to run within their configured memory limit, not merely their requested memory.
- Memory is non-compressible: exceeding a memory limit can terminate the container with OOMKilled. Always set memory limits and monitor real memory usage before finalizing values.
- CPU is compressible: exceeding a CPU limit normally causes throttling rather than termination. Set CPU limits deliberately and watch startup latency, queue processing, and request latency for throttling effects.
- `Guaranteed` QoS (`requests == limits`) is preferred for critical, latency-sensitive, regulated-data-sensitive, admin, migration, and singleton coordination workloads where stability matters more than density.
- `Burstable` QoS may be used for workloads with measured burst patterns and acceptable degradation behavior. The gap between request and limit must be justified by observed metrics, not guesswork.
- Resource values must be based on load testing, production-like telemetry, or measured baseline usage. Revisit values after major runtime, dependency, query, document-processing, or traffic-pattern changes.
- Namespace-level `ResourceQuota` and `LimitRange` policies should be used when Kubernetes is adopted so missing resource declarations fail early and team/service budgets are enforceable.
- Vertical Pod Autoscaler or equivalent recommendations may inform sizing, but automated changes to production resource values need rollout controls and review.

### Kubernetes Storage
- Prefer external managed backing services for durable state when they fit the workload. Running databases or storage providers inside Kubernetes requires an explicit ownership, backup, restore, upgrade, and failure-domain plan.
- Use PersistentVolumeClaims for persistent workload storage. Do not bind application code to specific PersistentVolumes, nodes, host paths, or provider implementation details.
- Avoid `hostPath` for application persistence outside narrow development or node-agent use cases. Production host-path storage requires explicit approval and a documented data-loss/failure-mode rationale.
- StorageClass names should communicate capability tiers clearly, such as `fast`, `standard`, or `archive`, without exposing unnecessary provider internals that invite incorrect selection.
- PVCs must specify the required access mode and storage class intentionally. Do not default to expensive or high-IOPS storage without measured workload need.
- Use `ReadWriteOnce` by default for stateful application data. Use `ReadWriteMany` only when the application coordinates concurrent writes safely and the storage/network impact has been reviewed.
- Do not use shared RWX volumes as a shortcut for service integration. Prefer an owning service API over many scaled pods or services writing the same filesystem directly.
- Retention policy must match data criticality: use `Retain` when data must survive workload deletion, and document the manual cleanup owner; use `Delete` only when deletion of the PVC may safely delete the data.
- Avoid deprecated or destructive recycle-style behavior. No storage cleanup policy may blindly delete a volume root or shared mount path.
- StatefulSets, databases, queues, and document stores running on Kubernetes must include backup, restore, migration, and disaster-recovery verification before production use.
- Storage performance requirements such as IOPS, latency, throughput, and growth rate must be documented for stateful workloads. Critical cluster infrastructure such as etcd requires high-IOPS storage planning.
- Internal storage providers must use anti-affinity, failure-domain separation, and capacity monitoring so one physical host, rack, zone, or disk group failure does not compromise quorum or data integrity.
- Storage migration plans must cover both the storage provider and the consuming application/database. Prefer application-native backup/restore when it provides stronger consistency than raw volume copying.
- Reference background: Architecting Applications for Kubernetes; Understanding Kubernetes Limits and Requests; Kubernetes Requests and Limits: A Practical Guide and Solutions; Kubernetes storage, PV, PVC, and StorageClass concepts.

## 5. Frontend Standards

### Frontend Application Architecture
- Treat frontend architecture as stack-specific. For Next.js/React, use routing, server rendering, server components, client components, and route-level code splitting deliberately. For other stacks, document the equivalent rendering and routing model.
- Keep related files easy to locate: colocate feature components, hooks, tests, schemas, and small helpers near the feature unless they are truly shared.
- File names must identify what the file owns or does. Use conventional suffixes such as `.test`, `.client`, `.server`, `.schema`, or `.adapter` when they clarify runtime or responsibility.
- Keep directory structure as flat as practical. Add subdirectories when a feature area has enough files or distinct responsibilities to justify navigation overhead.
- Avoid redundant names that repeat parent directory context without adding meaning.
- Keep imports organized and readable: external packages first, then repo aliases/shared modules, then relative feature imports. Sort named imports consistently within each group.
- Prefer one primary component, hook, adapter, or service per file. Small private helper components may live beside the primary export when they are not reusable elsewhere.
- Use dynamic imports or client-only boundaries for heavy, rarely used, browser-only, or route-specific UI. Do not lazy-load tiny components just to add abstraction.
- Prefer server-rendered/server-side data access where it reduces client bundle size, protects secrets, or improves first render. Use client-only components only when interactivity, browser APIs, or client state require them.
- State should live at the narrowest useful scope. Use local component state for local UI, URL/search params for navigable state, server data caches for server-owned data, and global client state only for genuinely shared cross-route workflow state.
- Do not introduce Redux or another global state library unless local state, server state, URL state, and existing shared hooks cannot model the workflow cleanly.
- API calls must have one clear owner per workflow. Watch for duplicate calls, redundant polling, and repeated fetches caused by effects, re-renders, or overlapping hooks.
- Coordinate API response shape with backend contracts. Do not compensate for oversized or redundant payloads in the frontend when the API should return a narrower resource.
- Normalize request bodies before submission. Do not send empty strings, placeholder values, or UI-only state fields unless the API contract explicitly defines them.
- Public or SEO-sensitive pages should use the stack's server rendering/static capabilities intentionally. Authenticated operational screens may prioritize correctness, access control, and workflow responsiveness over SEO.

### Reusable Components
- Extract reusable UI patterns into shared components when they appear in multiple places, such as buttons, dropdowns, progress bars, pills, cards, forms, tables, and loading states.
- Prefer composing shared components over duplicating JSX/templates/CSS across pages.
- Keep shared components small, prop-driven, and presentation-focused.
- Keep business logic in feature containers/hooks/services, not inside low-level UI components.
- Use shared loading primitives for async UI. Default to the project's shared loading/skeleton component instead of hand-rolled placeholder markup in page features.

### CSS & Styling Standards
- Keep browser normalization, resets, tokens, and app-wide base styles centralized; do not scatter ad hoc reset rules across page or component styles.
- Use one reset/normalization strategy owned by the app shell or design system. Do not add page-specific resets or component resets that fight the global baseline.
- Structure markup and component boundaries first, then style the real semantic/component shape instead of patching layout with repeated one-off overrides.
- Write semantic markup before adding styling wrappers. If an element can carry the class directly, do not wrap it in an extra `div` or `span` just to target CSS.
- Prefer the existing styling stack and conventions already used by the app; do not introduce an additional CSS framework or competing utility system without an explicit architectural reason.
- Do not introduce Bootstrap, Tailwind, Bulma, Material Design, SASS/LESS/Stylus, or another CSS framework/preprocessor unless it is adopted as an architectural decision with migration scope, ownership, and bundle impact documented.
- Keep handwritten CSS/SCSS/module rules readable: one declaration per line, clear block formatting, and predictable property ordering. Sort properties alphabetically unless the file already follows an established logical grouping convention.
- Use semantic, consistent class names; avoid abbreviations unless they match an existing project convention or a well-known domain acronym.
- Class names should describe the component, role, or state being styled, not incidental colors, spacing, or current visual implementation.
- Prefer shared utility classes, shared components, and multi-class composition over duplicating the same declarations in unrelated selectors.
- Utility classes are acceptable for stable app-wide primitives such as spacing, text treatment, layout helpers, and border radius. Do not let one-off utility piles replace clear component structure for complex UI.
- Combine selectors only when the declarations truly represent shared behavior. Do not group unrelated elements merely because they happen to share one visual value today.
- Keep selectors shallow and resilient. Avoid long descendant chains, ID-heavy selectors, and styling that depends on brittle page structure.
- Avoid styling by IDs except for unavoidable legacy or integration hooks. Prefer classes and component-local selectors.
- Avoid unnecessary wrapper `div`/`span` elements added only for styling when a class on the semantic element or an existing component boundary is enough.
- Use shorthand properties and shortened hex values when they improve clarity without hiding intent; do not compress declarations into unreadable one-line rule blocks.
- Respect block and inline semantics before forcing layout in CSS. Use appropriate HTML elements and layout primitives instead of correcting incorrect markup with styling hacks.
- Keep style ownership separated: global/base styles for app-wide concerns, shared component styles for reusable UI, and page/feature overrides only when the styling is truly page-specific.
- Split styles by ownership, not arbitrary size: global/reset/token styles, shared component styles, feature/page styles, and narrowly scoped overrides should have clear boundaries.
- Avoid monolithic style files that collect unrelated page, component, and utility rules. Also avoid excessive micro-files that make ownership harder to trace.
- Comment non-obvious styling constraints, browser quirks, or design-system exceptions briefly; do not narrate obvious declarations.
- Remove stale selectors during refactors. Do not leave dead CSS, duplicated declarations, or unused class names behind.

## 6. API, HTTP, and JSON Contracts

### API Foundations
- API responses must include a `Request-Id` header with a UUID value, or propagate an existing trusted request ID when one is supplied by the platform boundary.
- Request IDs must be logged as safe metadata by clients, API services, and backing service calls so requests can be traced without logging sensitive data or full payloads.
- Keep request and response concerns separated: use paths for resource identity, request/response bodies for resource representations, and headers for metadata such as request IDs, caching, content negotiation, ranges, and conditional requests.
- Use query parameters for resource filtering, search, sorting, pagination, and sparse field selection. Do not move protocol metadata into query parameters unless a documented client or platform limitation requires it.
- Large collection responses must be divided across requests with a documented pagination or range contract instead of returning unbounded payloads.
- When range-based iteration is used, document the request headers, response headers, status codes, limits, ordering guarantees, and next-range behavior in the API specification.
- Responses that represent cacheable resources should include an `ETag` header for the returned representation version.
- APIs that emit `ETag` values should support conditional requests with `If-None-Match` and return `304 Not Modified` when the client's cached representation is still current.

### API Design & Naming
- Follow API-first discipline for externally consumed APIs and cross-service contracts: define the API contract outside implementation code first, review it with peers and client/frontend consumers early, then implement against the reviewed contract.
- API contracts must focus on domain resources and stable behavior, not implementation details. Replacing the service implementation or storage technology should not require clients to learn a new API shape.
- API specifications are the source of truth for provider/client contracts and must stay aligned with route handlers, BFF adapters, tests, generated clients, and docs.
- API specs may evolve iteratively during development, but do not publish or integrate an API first and request contract review afterward.
- Use lowercase hyphen-separated words for concrete path segments: `/purchase-orders/{purchase-order-id}`.
- Use plural, domain-specific resource names. Prefer `/purchase-orders/{purchase-order-id}/items` over vague or use-case-specific names such as `/items` or verb-based endpoints.
- Keep URLs noun-based and verb-free. Model actions as resources or state transitions when possible instead of adding action names to paths.
- Identify resources and sub-resources through path segments shaped like `/{resources}/{resource-id}/{sub-resources}/{sub-resource-id}`.
- Use nested paths only when the sub-resource lifecycle or access path is tied to its parent. If a resource has a stable globally unique identity, also consider exposing it as a top-level resource.
- Limit API resource breadth through functional segmentation. A well-scoped API should usually expose a small, cohesive resource set; split separate business capabilities into separate APIs instead of one oversized contract.
- Keep sub-resource nesting shallow. More than three nested resource levels requires explicit justification because it increases URL complexity and client coupling.
- Avoid trailing slash semantics. `/resource` and `/resource/` must not represent different behavior.
- Use `snake_case` for query parameters, never `camelCase`; examples include `customer_number`, `order_id`, and `billing_address`.
- Use conventional query parameter names: `q` for default search, `limit` for result count, `cursor` for keyset pagination, `offset` for numeric pagination, `sort` for comma-separated sort fields, `fields` for sparse fieldsets, and `embed` for carefully designed expansions.
- Use hyphenated HTTP header names in documentation and examples, preferably Hyphenated-Pascal-Case such as `Accept-Encoding`, `Original-Message-ID`, and `Disposition-Notification-Options`.
- Separate API request/command DTOs from response/query DTOs and internal domain models. Request types must not extend or contain response types, and response types must not inherit request validation or protocol concerns.
- Name API boundary types by intent, such as `CreateVehicleCommand`, `ApiCreateVehicleRequest`, `ApiVehicle`, or `ApiVehicleResponse`; keep create/update request fields separate from returned resource fields when lifecycle or visibility differs.
- Useful resources should satisfy the common client path without becoming jumbo payloads. Use filtering, pagination, sparse fields, and carefully controlled embedding for less common needs.

### HTTP Method Semantics
- Route handlers, BFF endpoints, and internal service APIs must use standardized HTTP method semantics and must document any narrow exception.
- `GET` reads single resources or filtered/paginated collections, must be safe and idempotent, and must not accept a request body.
- Collection `GET` endpoints should expose filtering and pagination when result sets can grow; missing single-resource reads should normally return `404`.
- `POST` should normally target collection resources for creation, or a clearly documented action endpoint only when the standard CRUD methods do not express the behavior cleanly; treat `POST` as non-idempotent unless an explicit idempotency contract exists.
- `PUT` replaces a full single resource representation at a client-known URI and must be idempotent; use it only when full replacement semantics are true.
- `PATCH` performs partial updates on a single resource only; prefer `PUT` when full replacement is feasible, and document the patch media type or merge semantics.
- `DELETE` removes a single resource and must be idempotent; repeated deletes may still return `404` or `410` after the resource is already gone.
- `HEAD` and `OPTIONS` remain safe and idempotent; `HEAD` mirrors `GET` headers without a body, and `OPTIONS` advertises allowed operations when implemented.
- Status codes must match method semantics: `POST` create -> `201`, async accept -> `202`; `PUT` update/create -> `200`, `204`, or `201`; `PATCH` update -> `200` or `204`; `DELETE` -> `200`, `204`, `404`, or `410`.
- Do not implement state-changing behavior behind safe methods (`GET`, `HEAD`, `OPTIONS`).
- Do not use collection-level `PUT`, `PATCH`, or `DELETE` unless the API contract explicitly defines whole-collection replacement, patching, or deletion and the risk has been reviewed.
- If `POST` is used for a complex query because URL length or query grammar makes `GET` impractical, document the exception and keep the operation read-only in behavior even though the method itself is not safe by default.
- Choose one patch style per endpoint, preferably complete-object `PUT`, then JSON Merge Patch, then JSON Patch only when instruction-level changes are required.
- Reference background: HTTP method semantics and safeness/idempotency.

### JSON Payload Guidelines
- These rules apply to project-owned JSON API payloads, event payloads, OpenAPI schemas, custom JSON media types, and persisted JSON contract fields.
- JSON property names must use `snake_case`, never `camelCase`, unless an external provider contract requires a different shape at the boundary.
- JSON property names must stay within an ASCII-safe identifier subset: start with a letter, `_`, or `$`; subsequent characters may also include numbers.
- Boolean properties must not be `null`. If an unknown or unset state is meaningful, replace the boolean with a string enum such as `yes`, `no`, and `unknown`.
- Date-only values must use RFC 3339 full-date strings such as `2015-05-28`; date-time values must use RFC 3339 date-time strings such as `2015-05-28T14:07:17Z`.
- Store and emit service-owned timestamps in UTC where possible. Prefer `Z` UTC timestamps over numeric timestamps or offset-heavy representations.
- Do not expose ambiguous numeric timestamps in API or event contracts unless an external standard explicitly requires them.
- Use standard codes for international values: ISO 3166-1 alpha-2 for countries, ISO 639-1 or BCP 47 for languages and variants, and ISO 4217 for currencies.
- Avoid JavaScript reserved keywords as JSON property names when a clear domain alternative exists.
- Array property names should be plural, and object property names should be singular.
- Do not remove fields solely because their value is `null` when the field is part of a documented response contract. If a field is intentionally nullable, keep that contract explicit.
- Empty arrays must be represented as `[]`, not `null`.
- Enumerations must be represented as stable strings, not numeric codes, unless an external standard requires numeric values.
- Reference background: JSON RFC 7159 and RFC 3339 date/time profiles.

## 7. Event-Driven Architecture

### Event Design
- Design events at a useful business granularity: prefer one event per completed action, business event, or external system event instead of field-level change events that force subscribers to reconstruct intent.
- Event names and topics must describe facts that already happened (`created`, `updated`, `deleted`, `submitted`, `approved`, `completed`, `failed`) and must be understandable without private knowledge of the producing service.
- Group related event payload data into cohesive objects such as `contactDetails`, `billingAddress`, or `mailingAddress`; do not flatten large payloads into long prefix-based field lists.
- Shared event payloads must include enough context for subscribers to process the event without querying private producer internals or relying on undocumented code tables.
- Keep producers unaware of specific subscribers. Do not shape event payloads for one known downstream consumer when the event stream is shared.
- Emit externally meaningful values instead of internal codes or storage details. For example, prefer `new`, `active`, and `inactive` over internal status codes like `N`, `A`, and `I`.
- Differentiate private coordination streams from shared integration streams. Start internal microservice coordination events as private unless there is a clear downstream contract need.

### Event Evolution and Versioning
- Treat shared events as contracts. Adding optional fields is acceptable, but do not rename fields, delete fields, or change the semantic meaning of an existing property.
- When a correction or clearer name is needed, add the new property alongside the old one, keep the old property populated, and document the deprecation path before any removal is considered.
- If a change cannot remain backward compatible, publish a new event or topic and be prepared to support the old and new streams during subscriber migration.
- Event-sourced systems must keep historical events readable by current software. Prefer additive, weak-schema-compatible payload evolution with defaults for newly added fields.
- Strong schema event versioning requires an explicit compatibility and rollout plan before use, especially when old and new service versions may run at the same time.
- Upcasters or transformation streams are preferred over mutating existing stored events when old event shapes need to be interpreted by newer handlers.
- Do not rewrite existing event history to fix published mistakes or aggregate boundary changes unless there is an explicit migration plan, audit rationale, rollback plan, and approval.
- Reference background: 5 Principles for Designing Evolvable Event Streams; Versioning of Events in Event Sourced Systems.

## 8. Nullability and Data Contracts

### Nullability & Null-Safety
- In project-owned code, do not return `null` when a clearer contract exists. Prefer empty collections, explicit result objects, Null Object, discriminated unions, `Optional`-style wrappers, or well-typed error/absence contracts.
- Treat avoidable `null` returns as a design smell that pushes complexity into every caller through repeated null checks.
- Keep external-library or storage-layer `null` handling at the boundary. Translate nullable external values into project-owned domain contracts as early as possible.
- Use compiler, linter, and IDE nullability checks aggressively where the language/tooling supports them. Do not weaken strict-nullability settings casually.
- If a value is truly nullable by design, mark that contract explicitly with the language-native type or annotation (`T | null`, `@Nullable`, or equivalent) instead of leaving it implicit.
- Use nullable contracts only for narrow, documented exception cases. The default contract for project-owned APIs and helpers should be non-null.
- Do not return `null` for collections, lists, maps, or arrays; return an empty container when absence is the only meaning.
- When a nullable value crosses a boundary intentionally, make the handling obvious at the call site or adapter layer instead of letting `null` drift through unrelated code paths.

## 9. Security and IAM

### Identity & Access Management (IAM)
- Separate authentication from authorization. Central identity systems authenticate principals; each service authorizes access to its own resources and actions.
- Do not create a cross-domain "authorization service" that owns other services' business rules or object permissions. Shared identity is acceptable; service-local authorization remains the responsibility of the owning service.
- Authentication must provide a consistent user experience across services without forcing each microservice to implement its own login, credential handling, or password policy.
- IAM designs must distinguish human users, public clients, confidential clients, and machine/service clients. Do not reuse one client registration or token policy for different trust levels.
- Prefer standardized OAuth 2.0 / OpenID Connect flows. Use OpenID Connect for end-user identity and OAuth delegation for API access and service-to-service communication.
- OAuth is delegation, not authentication. Use OIDC `id_token` validation for user authentication and OAuth access tokens for resource access decisions.
- Prefer Authorization Code + PKCE for user-facing public clients and Client Credentials for machine-to-machine/service-to-service flows. Avoid Implicit and Resource Owner Password flows except for explicit, approved legacy/internal exception cases.
- Distinguish public from confidential clients. Do not assume browser, mobile, or distributed clients can safely hold long-lived secrets.
- Redirect URIs must be pre-registered and validated by the authorization server. Authorization requests must use anti-forgery controls such as `state`, and OIDC login flows must use `nonce` where required.
- Access tokens must be short-lived, sent via the `Authorization: Bearer` header, and never placed in URLs. Use TLS for every token exchange and every protected request.
- Refresh tokens require stricter storage and revocation handling than access tokens. In browser flows, prefer secure server-managed session/cookie patterns over localStorage persistence unless an explicit threat-model-approved exception exists.
- Refresh token rotation, reuse detection, revocation, expiry, and storage rules must be explicitly defined for every client type that receives refresh tokens.
- Bearer tokens are possession-based credentials. Treat leaked access tokens like temporary credentials and design lifetimes, storage, logging, and transport accordingly.
- Validate every bearer token at the resource boundary. At minimum verify token format, signature, issuer, audience, expiration, not-before time, issued-at reasonableness, and any required scopes/claims before authorizing access.
- Locally validate JWT access tokens with trusted JWKS metadata when appropriate. Use token introspection only for opaque tokens or when immediate revocation requirements justify the authorization-server dependency.
- Validate OIDC ID tokens separately from access tokens, including issuer, audience/client ID, signature, expiration, nonce when used, and authentication-time requirements for sensitive workflows.
- JWTs are signed, not encrypted. Do not put passwords, secrets, regulated data, or other sensitive payload data in JWT claims.
- Prefer asymmetric signing keys for JWT issuance/validation, rotate keys, and keep signing material separate per environment. Never reuse staging/dev/prod signing keys.
- Keep JWT claims minimal. Avoid token bloat, stale authorization snapshots, regulated data, full profiles, and large role/group lists that every request must carry.
- Keep scopes coarse for delegation and keep fine-grained or object-level authorization inside the owning microservice using its own data and rules.
- Treat scopes and claims differently: scopes describe delegated access requested by a client; claims describe facts about the principal or token context.
- Object-level permissions must live with the service that owns the resource and its business rules. A service may use validated subject, group, tenant, client, and scope claims as inputs, but final authorization belongs to the resource owner service.
- Privileged, administrative, externally exposed, billing, regulated-data export, credential, and destructive workflows must support stronger assurance such as MFA, step-up authentication, or explicit re-authentication when risk warrants it.
- Identity brokering must decouple applications from external identity providers. Applications should trust the configured broker/issuer contract instead of depending on provider-specific protocols or claims directly.
- Avoid unnecessary per-request calls to the authorization server when locally validated JWT/JWKS verification is sufficient. Use introspection only when token format or revocation requirements require it.
- Document IAM threat model decisions for new auth flows, token storage changes, identity providers, broker integrations, and service-to-service authorization changes.

### Security Baseline
- Keep security headers enabled app-wide for backend APIs and frontend routes.
- Keep session cookie hardening enabled: `HttpOnly`, `SameSite=lax` or stricter where compatible, and `secure=true` in production.
- Keep client-secret leak detection or equivalent guardrails passing if the project includes browser/client code.
- Security-sensitive changes must include threat-model notes covering the protected asset, trust boundaries, attacker capability, failure mode, and mitigation.
- Require TLS for every API, frontend, service-to-service, webhook, provider, and admin connection in deployed environments.
- Do not accept plaintext HTTP as an equivalent API path. Reject non-TLS requests at the platform edge when possible; use `403 Forbidden` only when edge rejection is unavailable.
- Do not rely on HTTP-to-HTTPS redirects for API safety because sensitive request data may already have crossed the network before the redirect.
- Browser-based authentication must define its XSS and CSRF posture. Cookie-based auth needs CSRF protection unless SameSite and route semantics make the risk explicitly inapplicable.
- CORS must be restrictive by default. Do not use wildcard origins with credentials, bearer-token APIs, admin routes, regulated-data routes, or provider callback routes.
- Privileged session, token, MFA, identity-provider, and signing-key events must be auditable with safe metadata.
- Do not bypass dependency findings unless they are allowlisted with reason, owner, scope, and expiry.
- Use deterministic dependency installation commands for routine setup when a lockfile exists, such as `npm ci`, `pnpm install --frozen-lockfile`, `yarn --frozen-lockfile`, `pip install --require-hashes`, or the ecosystem equivalent.
- Save new dependencies as exact versions when the package ecosystem supports it. Keep package adds from introducing caret, tilde, or broad range drift unless the project intentionally allows that policy.
- Do not widen package version ranges, refresh lockfiles, or bump dependencies incidentally during unrelated feature work.
- Treat dependency adds, removals, and upgrades as deliberate changes with rationale, affected files, and verification notes.

### Secrets and Environment Hygiene
- Never commit `.env` files, service account keys, private keys, credentials, or real tokens.
- Keep `.env.example` or equivalent sample configuration files updated whenever required environment variables change.
- Keep docs/examples on placeholders only; never include real IDs, secrets, or key filenames.
- If a new secret-like file pattern is introduced, add it to `.gitignore` or the equivalent ignore mechanism in the same PR.

## 10. Reliability, Errors, Logging, and Audit

### Error Handling
- Return safe messages to clients.
- Log only minimal error metadata; never log sensitive data.
- Use typed error codes for audit and metrics.
- Preserve enough structured metadata for debugging, metrics, and audit without exposing sensitive data.
- Fail closed on critical security, auth, regulated-data storage, provider, billing, migration, and configuration errors.
- Do not swallow provider or service errors that affect safety, financial correctness, access control, or workflow eligibility.

### Logging
- Redact request bodies, params, and headers by default.
- Never log regulated identifiers, personal identifiers, addresses, secrets, credentials, or raw documents.
- Never log `Authorization`, `Cookie`, `Set-Cookie`, access tokens, refresh tokens, ID tokens, authorization codes, client secrets, MFA codes, or raw JWTs.
- Log automated decisions with safe reason codes where they affect intake, document classification, workflow state, billing state, reminders, access control, or admin operations.
- Audit logs must distinguish important workflow states such as skipped, rejected, pending review, applied, completed, archived, and failed when those states drive operations or compliance evidence.

## 11. Testing and Verification

### Testing Standards
- If behavior changes, add or update unit tests in the same change.
- Prefer feature-grouped unit tests under the project's chosen test directory convention.
- Use a shared test directory only for cross-cutting pure helpers or reusable test utilities.
- Prefer deterministic fixtures over live provider calls in tests.
- Run impacted unit tests before each commit and again before opening a PR.
- Do not rewrite unit tests to match a failure until you confirm whether the failure exposes a real bug in runtime code, contracts, or test harness wiring.
- Update a unit test only after that investigation shows the expected behavior intentionally changed and the test is genuinely stale.
- Do not merge changes with failing unit tests unless explicitly approved for a known temporary issue.
- For security, auth, storage, or dependency changes, run the project's security baseline command, such as `<security-baseline-command>`, and include results in PR notes.

## 12. Anti-Patterns to Avoid

- God classes / god functions that do too many things.
- Duplicate logic instead of the shared owner defined by the `DRY (Required)` section.
- Tight coupling between route handlers and database logic.
- Unbounded queries that miss pagination, limits, or backpressure.
- Hard-coded thresholds, operational limits, provider choices, or workflow policies that should be config.
- Excessive `any` types, unchecked casts, or type assertions without justification.
- Dynamic runtime execution in service code, such as `eval` or `new Function`, without explicit security approval.
- Unsafe raw SQL helpers without bounded, validated inputs and review.
- Silent enablement of data-changing or externally visible behavior.
- Logging secrets, regulated data, raw documents, full provider payloads, or credential-bearing responses.
- Catch-all exception handling that converts critical workflow failures into "continue".
- Access tokens, refresh tokens, authorization codes, or session identifiers in URLs.
- Shared JWT signing keys across environments or services without an explicit key ownership and rotation plan.
- Symmetric JWT signing for distributed resource servers unless a threat-model-approved exception exists.
- Storing browser tokens in localStorage/sessionStorage without an explicit XSS threat model and approval.
- Treating OAuth access tokens as proof of user authentication without OIDC ID token validation.
- Centralized authorization logic that requires one service to know every other service's object permissions and business rules.

