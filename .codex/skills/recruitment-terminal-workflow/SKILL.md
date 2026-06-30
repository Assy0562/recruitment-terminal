---
name: recruitment-terminal-workflow
description: Project workflow for the Recruitment Terminal repository. Use when the user asks to resume work, end work, start or stop the local server, check project status, commit, push to GitHub, or perform routine validation for this Next.js portfolio project.
---

# Recruitment Terminal Workflow

Use this skill for routine work on the Recruitment Terminal project.

## Project Location

Default repository path:

`C:\Users\assy0\OneDrive\デスクトップ\公開求人`

If the active workspace differs, locate the repo by checking for `README.md`, `package.json`, and `src/components/RecruitmentApp.tsx`.

## Start Work

When the user says `作業再開`:

1. Start the local dev server with `npm.cmd run dev` from the repo root.
2. Report the local URL as plain text, not in a code block.
3. Prefer `http://localhost:3000` unless Next.js reports another port.
4. If context is needed, read only the smallest useful set:
   - `docs/project-status.md`
   - `docs/file-roles.md`
   - the files directly related to the user request.

## End Work

When the user says `作業終了`:

1. Stop any local dev server started for the project.
2. Check port 3000 only if the server session is unavailable.
3. Do not push automatically unless the user asks or the current task clearly included push.
4. Report whether the server was stopped or already inactive.

## Push Workflow

When the user asks to push:

1. Run `git status --short`.
2. Review changed files and avoid committing unrelated files.
3. If code changed, prefer running `npm.cmd run lint` and `npm.cmd run build` unless already verified after the latest edits.
4. Stage only intended files.
5. Commit with a concise message.
6. Run `git push`.
7. Confirm `git status --short` is clean.

## Validation Defaults

For code or UI changes:

- Run `npm.cmd run lint`.
- Run `npm.cmd run build` when the change can affect production behavior.
- For documentation-only changes, lint/build is usually unnecessary.

## Reporting Style

Report in Japanese with concise sections:

- 実施内容
- 変更ファイル
- 動作確認結果
- 残課題

Mention command results in prose because the user does not see raw terminal output.

## Project Docs

Use these as the minimum source of truth:

- `README.md`: external overview and setup.
- `docs/project-status.md`: current project status and AI collaboration rules.
- `docs/file-roles.md`: file responsibilities and reading order.
- `docs/learning/`: learning materials, only when the task is about study docs.
