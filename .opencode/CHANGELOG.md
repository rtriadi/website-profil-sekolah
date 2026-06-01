# Changelog

## 2026-06-01

- Initialized project planning workspace for `website-profil-sekolah`.
- Added `.planning/config.json` with workflow preferences:
  - mode: yolo
  - granularity: standard
  - parallelization: true
  - commit_docs: true
  - model_profile: balanced
  - workflow agents enabled: research, plan_check, verifier, nyquist_validation
  - PR body sections enabled: User Stories & Acceptance Criteria, Risks & Dependencies, Success Metrics & Release Criteria, Stakeholder Review & Approval
- Added `.planning/PROJECT.md` with:
  - project definition and core value
  - initial active requirements and explicit out-of-scope boundaries
  - constraints and key decisions
  - evolution policy section
- Added research artifacts under `.planning/research/`:
  - `STACK.md`
  - `FEATURES.md`
  - `ARCHITECTURE.md`
  - `PITFALLS.md`
  - `SUMMARY.md`
- Added `.planning/REQUIREMENTS.md` with REQ IDs, v1/v2 scope, out-of-scope table, and full traceability.
- Added `.planning/ROADMAP.md` with 3 phases and complete v1 requirement coverage.
- Added `.planning/STATE.md` with current focus and next command.
- Generated/updated `AGENTS.md` from planning artifacts via `gsd-sdk query generate-claude-md`.
- Initialized git repository (`git init`) because workspace had no existing `.git`.
