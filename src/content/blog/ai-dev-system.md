---
title: ai-dev-system
description: A multi-agent AI development pipeline — specialized roles (Claude + Gemini) that investigate tickets, implement fixes, and review code in isolated git worktrees, orchestrated from the terminal.
image: /projects/ai-dev-system.png
tech: [Claude Code, Gemini CLI, Shell, Git Worktrees, tmux, MCP]
github: https://github.com/niroahman/ai-dev-system
demo:
date: 2026-05-01
featured: true
---

Most AI coding tools are drop-in assistants. This is something different — a pipeline where specialized agents hand work off to each other, each scoped to exactly what it needs to do.

The idea came from a simple frustration: a single AI session trying to investigate a bug, fix it, and review the fix is context-bloated and unfocused. Breaking that into distinct roles with distinct contexts produces better output at every stage.

## The roster

Each agent runs in its own git worktree — a full checkout on a dedicated branch — so nothing ever touches your working tree mid-session.

```
ticket
  └─▶ Watson   maps relevant files → CONTEXT.md       (Gemini Flash)
        └─▶ Nikke  investigates root cause → INVESTIGATION.md  (Claude)
              └─▶ Pat / Mat  implements on a branch        (Claude / Gemini)
                    └─▶ Poirot  reviews, writes REVIEW.md      (Claude)
```

**Watson** (Gemini Flash) is intentionally cheap and fast — its only job is codebase reconnaissance. It finds relevant files and writes a CONTEXT.md before any expensive model touches the ticket.

**Nikke** (Claude) investigates root cause only. No implementation, no suggestions — just a forensic INVESTIGATION.md that Pat and Mat can actually use.

**Pat and Mat** are the workers. Pat runs Claude, Mat runs Gemini Flash. They can run independently or in a duel where Poirot compares both outputs and gives a verdict — useful for catching model-specific blind spots.

**Poirot** (Claude) reviews code in the current worktree or compares Pat vs Mat side-by-side.

## Why worktrees

Git worktrees let multiple agents work in parallel without branch-switching overhead. Each worktree gets its own `.claude/settings.json` written at dispatch time, scoping permissions to exactly what that role needs — no more, no less.

## Context assembly

`build-context` auto-detects the project stack and assembles a `.agent-context.md` from layered skill files (`skills/_global/`, `skills/frontend/`, `skills/backend-go/`, etc.). Agents load this at session start so stack-specific conventions are always in scope without polluting global prompts.

## Daily workflow

```bash
# Standard bug flow
nikke -t PROJ-123-bug-name     # investigate + map context
pat -n bug/PROJ-123-bug-name   # implement from Nikke's findings
goto pat && poirot             # review
wt-clean pat nikke             # clean up after merge

# Pat vs Mat duel
duel -n fix/PROJ-123-branch
poirot --compare               # verdict
```

## What makes it interesting

The `duel` command is the thing people find surprising. Spinning two different models on the exact same task and then having a third model compare them surfaces disagreements that would otherwise be invisible. It has caught real bugs where Claude and Gemini diverged on edge case handling — and the divergence itself was the signal.

The git hook that strips AI co-authorship lines from commits is a small detail that says something about the philosophy: the output is yours, the models are tools.
