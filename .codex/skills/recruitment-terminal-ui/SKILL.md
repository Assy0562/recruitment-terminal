---
name: recruitment-terminal-ui
description: UI design guidance for the Recruitment Terminal project. Use when changing or reviewing the app's visual design, layout, theme colors, card density, buttons, shadows, Arknights-inspired terminal style, responsive behavior, or result-card readability.
---

# Recruitment Terminal UI

Use this skill for UI decisions in the Recruitment Terminal project.

## Design Direction

Aim for an Arknights-inspired interface without copying the official UI exactly.

Core mood:

- Tactical terminal
- Industrial control panel
- Military HUD
- CAD / measurement-device feel in light mode
- Dense but readable search tool

Dark mode should feel like a tactical terminal.
Light mode should feel like design documents or a control panel.

## Prefer

- Dark gray / neutral gray surfaces.
- Thin borders and clear panel hierarchy.
- Orange as the main accent, used sparingly.
- Cyan only for system/status accents.
- Flat buttons with minimal depth.
- Shape, spacing, border, and typography as the main hierarchy tools.
- Compact result cards for search efficiency.
- Responsive layouts that preserve smartphone readability.

## Avoid

- Strong neon glow.
- Glassmorphism.
- Apple-like soft UI.
- Cute or rounded-heavy styling.
- Heavy drop shadows on many elements.
- Decorative elements that do not communicate state or structure.
- Overusing diagonal cut lines, dots, or background effects.
- Reducing character image or text readability for decoration.

## Current UI Rules

- Result cards should prioritize list readability over luxury card presentation.
- Candidate result grids should use available width naturally.
- Use `auto-fit` / `minmax` when card columns should respond to actual available width.
- Keep smartphone layouts single-column unless specifically requested.
- Keep side filter readability; do not shrink tag buttons too far.
- Shadows are exceptional. Prefer borders, panels, and surface color changes.
- Theme toggle should stay small, flat, and terminal-like.

## Common Files

Read only the relevant files for the task:

- `src/app/globals.css`: shared colors, surfaces, buttons, panels.
- `src/components/Header.tsx`: header and theme toggle placement.
- `src/components/RecruitmentApp.tsx`: top layout and sidebar/result proportions.
- `src/components/TagGroup.tsx`: tag buttons.
- `src/components/SelectedTags.tsx`: selected tag control panel.
- `src/components/CombinationCandidates.tsx`: candidate groups, responsive result grid, expand/collapse.
- `src/components/OperatorCard.tsx`: compact operator result cards.
- `src/app/operators/[id]/page.tsx`: operator detail layout.
- `src/components/OperatorSdModel.tsx`: SD model and combat info card.

## UI Change Workflow

1. Inspect the relevant component and CSS before editing.
2. Preserve existing data structures and behavior unless the user asks otherwise.
3. Prefer small scoped changes.
4. Check mobile impact for layout changes.
5. Run `npm.cmd run lint` and `npm.cmd run build` after implementation unless the change is docs-only.
6. Report what changed and why in Japanese.
