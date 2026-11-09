# Design OS

Design OS is a lean operating method for starting, designing, documenting, and improving digital products with AI assistance.

This repository is not an app and it is not a giant knowledge base. It is a reusable toolkit for your product workflow. Its job is to help you make the same core decisions in the same order every time you start a product, then capture the reusable lessons after the product ships or matures.

## The Methodology

Design OS has one loop:

```text
Start project -> inherit framework -> build product -> extract reusable lessons -> improve Design OS
```

Every project should answer the same questions:

1. What problem are we solving?
2. What is the brand or product point of view?
3. Which tokens, components, and patterns can we reuse?
4. What should AI help generate, review, or synthesize?
5. What belongs back in Design OS when the project teaches us something reusable?

If the answer is reusable across two or more unrelated products, it belongs here. If it only serves one product, it belongs in that product repository.

## First Test Project

Plantasia is the first real test of Design OS.

Plantasia should expose which parts of this framework are useful and which parts are just documentation theater. If a workflow, token, component, pattern, prompt, or template helps Plantasia and would also help Signal 9, Nate Thousand, or client work, it can graduate into Design OS.

## Required Project Artifacts

Every project starts with only three required artifacts:

- `PROJECT_BRIEF.md`: problem, audience, goals, constraints, and success criteria.
- `DESIGN_SYSTEM_MAP.md`: inherited tokens, components, patterns, and gaps.
- `PROJECT_RETRO.md`: reusable lessons to promote back into Design OS.

More documents are allowed only when the project needs them. They are not required by default.

## Repository Structure

```text
.cursor/          Cursor rules, prompts, and commands
foundation/       Design OS principles, workflow, and naming
design-system/    Tokens, components, and patterns
ai/               Prompts, agents, and AI rules
templates/        The three required project artifacts plus reusable documentation templates
examples/         Product examples, starting with Plantasia
```

## Pillars

### Foundation

`foundation/` explains the Design OS methodology: principles, workflow, naming, and the rule for promoting reusable work back into the framework.

### Design System

`design-system/` holds only reusable design system decisions: tokens, components, and patterns. It should not collect one-off visual ideas.

### AI

`ai/` holds reusable prompts, agent roles, and rules for AI collaboration. AI should help make decisions repeatable, not generate clutter.

### Templates

`templates/` holds project-start and project-close artifacts. Templates should be short enough that you actually use them.

## Promotion Rule

> If it is reusable across two or more unrelated products, it belongs in Design OS. Otherwise, it belongs in the product repository.

Use the Signal 9 test: would you copy this into Signal 9? If yes, consider promoting it. If no, keep it in Plantasia or the relevant product.

## Update Ritual

At the end of a project or major milestone, extract reusable lessons:

1. What did the project reuse from Design OS?
2. What did the project invent that could help another product?
3. What should stay product-specific?
4. What one token, pattern, prompt, or template should be promoted?

The framework gets valuable only if it gets better every time you build something.
