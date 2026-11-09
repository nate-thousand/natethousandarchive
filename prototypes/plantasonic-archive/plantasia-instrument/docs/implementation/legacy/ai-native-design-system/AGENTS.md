# AGENTS.md

## Repository Purpose

This repository contains Design OS: a lean reusable method for starting products, applying shared design system decisions, collaborating with AI, and extracting reusable lessons back into the framework.

## Prime Directive

Keep this repository useful. Do not turn it into a documentation warehouse.

AI should protect the core loop:

```text
Start project -> inherit framework -> build product -> extract reusable lessons -> improve Design OS
```

## How AI Should Navigate

1. Read `README.md` first.
2. Read `foundation/WORKFLOW.md` before changing process or project flow.
3. Read `foundation/PRINCIPLES.md` before adding standards.
4. Read `foundation/NAMING.md` before naming files, tokens, components, patterns, prompts, or agents.
5. Read `design-system/` before changing tokens, components, or patterns.
6. Read `ai/` before creating prompts, agents, or AI rules.
7. Read `templates/project-starter/` before starting a project.

## Promotion Rule

Only add something to Design OS when it is reusable across two or more unrelated products.

Belongs in Design OS:

- Project brief template
- Design system map template
- Project retro template
- Reusable tokens
- Reusable component guidance
- Reusable patterns
- Reusable prompts
- AI agent responsibilities
- Cursor rules

Belongs in a product repository:

- Product-specific illustrations
- Product-specific brand assets
- Product-specific UI metaphors
- Product-specific implementation code
- Product-specific content
- Product-specific experiments that have not repeated elsewhere

## Required Project Artifacts

Every inherited project should start with exactly three required artifacts:

- `PROJECT_BRIEF.md`
- `DESIGN_SYSTEM_MAP.md`
- `PROJECT_RETRO.md`

Do not add more required artifacts without a clear reason.

## Documentation Expectations

- Write short documents that answer recurring questions.
- Prefer checklists, rules, and templates over vague best-practice essays.
- Remove or collapse stale placeholders.
- Avoid sections called `Miscellaneous`, `Resources`, `Ideas`, or `Notes` unless they support an active workflow.
- Update `README.md` only when the framework-level model changes.

## Naming Conventions

- Use kebab-case for folders.
- Use `README.md` for folder entry points.
- Use `SCREAMING_SNAKE_CASE.md` for core framework artifacts.
- Use semantic names for tokens, components, patterns, prompts, and agents.

## AI Collaboration Rules

- Ask clarifying questions when product scope is unclear.
- Keep generated artifacts reusable and concise.
- Do not generate application code unless explicitly requested.
- When adding a prompt or agent, explain what recurring workflow it supports.
- When reviewing, prioritize usefulness, reuse, accessibility, and maintenance cost.

## Design System Rules

- Add tokens, components, and patterns only when they support repeated product needs.
- Document accessibility expectations for reusable components and patterns.
- Keep product-specific design language in the product repository until it repeats.

## Plantasia Test

Plantasia is the first test project. Use it to prove whether Design OS saves time. Promote only the parts of Plantasia that would also help another unrelated product.
