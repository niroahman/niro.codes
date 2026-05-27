---
title: 'GDG Tampere: AI & Vibe-coding Meetup — Field Notes'
status: draft
date: 2026-05-25
tags: [meetup, gdg, vibe-coding, ai, tampere, community]
event: 'GDG Tampere AI & Vibe-coding Meetup, 25 May 2026'
---

# GDG Tampere: AI & Vibe-coding Meetup — Field Notes

Monday evening, Peltokatu 34. Gofore's Tampere office. Fifty-odd developers, a warm sauna, and two hours of talks about the thing everyone's been arguing about at work: what does AI actually do to how we write code?

GDG Tampere pulled together a tight lineup — three speakers, three different angles. Here's what I took away.

---

## "I Vibe Coded a Circuit Board" — Jari Timonen, Codento

The one that stuck with me most, mostly because of background: I have a degree in embedded systems.

Jari's talk was about using AI for hardware design — specifically PCB layout with KiCad. The honest summary: **AI can help, but it's still firmly in toddler mode when it comes to demanding hardware design.**

A few gems from the talk:

- **Gemini Deep Research** turned out to be genuinely useful for the research phase — especially when you feed the output of one iteration back as input for the next round. Iterative prompting, not one-shot.
- **KiCad + `kicad-happy` skill** helps with routing paths and design rule checks. Saved real time on the busywork.
- **Custom PCB ordering from China**: JLCPCB will produce 5x 4-layer boards fully assembled for around €150. That's a remarkable number for anyone who remembers what hardware prototyping used to cost.
- **Gemini Gems**: you can create a domain expert persona, load it with your datasheets and specs as a base, and have a consistent specialist to interrogate. Also apparently available through Google Cloud One.

The quote that landed: **"LLMs are like doom scrolling."** The implication being — they're compelling, they keep you engaged, and you might not notice how much time passed or how little signal you extracted. Worth sitting with.

---

## "Slow the F\*\*\* Down" — Pekka Kokkonen, Gofore

The best title of the night. And the most honest talk.

Pekka didn't come with a success story. He came with a post-mortem: a real project that went sideways when vibe-coding too fast, and then a methodical breakdown of how they recovered. That kind of honesty is rarer than it should be at meetups.

Key ideas (links to source talks to be added later):

- **Grill-with-docs**: an AI pattern where the model asks clarifying questions until it has genuine shared understanding before generating anything. Don't skip this step.
- **Create the shared design concept first.** PRD (Product Refinement Document) as the common ground — between humans, between sessions, between agents.
- **Slice vertically, not horizontally.** Instead of building the whole auth layer, then the whole API layer — build a thin slice that's testable end-to-end. This enables TDD. TDD + deep modules.
- **DDD (Domain Driven Design)**: a shared language across human, AI, and code. When the vocabulary is consistent, hand-offs work. When it isn't, things break quietly.
- **Share skills between developers** so different AI implementations don't keep overriding each other's work. The PRD helps anchor this.

---

## MCP, Agent Sandboxing & Other Bits

The third talk touched on MCP (Model Context Protocol) and the practical realities of agent tooling:

- **MCP should return structured results.** That's actually the main thing to get right. ~100 lines of code gets you a working MCP server; production-readiness takes much more, but the core concept is small.
- Wrapping shell commands in MCP makes sense when bash is unavailable to the agent — MCP becomes the only path to an outcome, so the model routes through it naturally.
- **Skills vs. MCP**: skills are things the LLM _can_ use if it chooses. MCP tools are often the _only_ way to reach a certain outcome — so the model is directed toward them. Different affordance.
- **agent-safehouse** (or similar) — mentioned as a concept for sandboxing agents. Worth looking into.
- **Chekov for Terraform** — apparently a must-have. Security/policy validation for IaC.

---

## The Room

52 registered. GDG Tampere crowd is practitioners — people who write code for a living and want to think out loud about where things are going. Good conversations in the hallways. Nice to validate with someone else that agents are genuinely useful in the right context; I've been using them daily and occasionally wonder if I'm in a bubble.

Sauna was open. Water was actually hot this time — no cold shower required. I caught the commuter train home when the schedule ran long. No regrets.

Gofore's new Tampere space is nice. Food was good. Favourite salad photo + composition coming later.

---

## What I'm Thinking About

Nothing fundamentally changed in my worldview — the direction feels right. But the "slow down" framing is a useful corrective. The instinct to vibe forward is strong. The discipline to align first, design the shared concept, then build — that's the actual skill.

_[Links from Pekka's talk to be added.]_

---

_GDG Tampere meetup, May 25 2026. Hosted by Gofore Tampere. Sponsored by Gofore and Reaktor._

---

## Further Reading — Web Research

_Links found after the meetup — pick what's useful._

### Circuit boards & KiCad

- [kicad-happy (GitHub)](https://github.com/aklofas/kicad-happy) — The actual skill Jari mentioned. AI coding agent skills for KiCad: schematic analysis, PCB layout review, EMC pre-compliance, SPICE simulation, datasheets, component sourcing, fab prep. Works with Claude Code and Codex.
- [JLCPCB PCB pricing breakdown](https://jlcpcb.com/blog/pcb-pricing-breakdown) — Official breakdown of what affects JLCPCB pricing. 4-layer boards cost more due to manufacturing complexity but still remarkably cheap at scale.
- [JLCPCB 4-layer PCB discount info](https://jlcpcb.com/news/discount-on-quality-4-layer-pcbs) — Confirmed: 100x 100mm 4-layer boards are competitive price-wise. The ~€150 assembled figure Jari quoted checks out.

### Gemini Deep Research

- [Mastering Deep Research with Gemini (practical guide)](https://duizendstra.com/ai/guides/gemini-prompt-engineering-guide/) — Covers the iterative approach Jari described: architectural prompt design, feeding previous output back as input.
- [Gemini Deep Research overview](https://gemini.google/overview/deep-research/) — Official page. Automatically generates a multi-point research plan and browses the web in multiple passes.

### Checkov for Terraform

- [Checkov (GitHub)](https://github.com/bridgecrewio/checkov) — Open-source static analysis for Terraform, CloudFormation, Kubernetes, Helm, Dockerfiles and more. Catches cloud misconfigurations before deployment.
- [How to use Checkov for Terraform security scanning](https://oneuptime.com/blog/post/2026-02-12-checkov-terraform-security-scanning/view) — Practical intro. Common CLI: `checkov -d .` in your Terraform directory.

### Vertical slicing + TDD + AI

- [Engineering-First AI Development: Why Fundamentals Outperform Vibe Coding](https://earezki.com/ai-news/2026-04-27-building-better-software-with-ai-agents-why-fundamentals-still-matter/) — Directly supports Pekka's talk: vertical slicing (tracer bullets), TDD, and why fundamentals matter more with AI, not less.
- [Cut Your Debugging Time 80% with AI Skills and Vertical Slicing (Medium)](https://medium.com/coding-nexus/cut-your-debugging-time-by-80-with-ai-skills-and-this-workflow-53b06039d2f7) — Concrete workflow combining AI tools with vertical slicing and TDD.
- [AI-Assisted Greenfield Development: Vertical Slices and Implementation Planning](https://www.codemag.com/Blog/AIPractitioner/AIAGSD6) — Detailed breakdown of how to plan vertical slices precisely enough that AI can implement them with low ambiguity.

### PRD & shared design concept

- [How to write PRDs for AI coding agents (Medium)](https://medium.com/@haberlah/how-to-write-prds-for-ai-coding-agents-d60d72efb797) — CLAUDE.md / AGENTS.md as the session-persistent PRD. Resonates with the "common ground agent to agent" idea from Pekka's talk.
- [Design Agents That Build Agent Teams (Maven)](https://maven.com/p/c83a1d/design-agents-that-build-agent-teams) — PRD as the blueprint agents use to define roles and responsibilities in a multi-agent system.

### Agent sandboxing

- [AI Agent Sandbox: How to Safely Run Autonomous Agents in 2026 (Firecrawl)](https://www.firecrawl.dev/blog/ai-agent-sandbox) — Good overview of the sandboxing landscape (Google Antigravity, Claude Code, Codex). Likely what "agent-safehouse" connects to.
- [Practical Security Guidance for Sandboxing Agentic Workflows (NVIDIA)](https://developer.nvidia.com/blog/practical-security-guidance-for-sandboxing-agentic-workflows-and-managing-execution-risk/) — Deep technical guide: secret injection, filesystem isolation, lifecycle management for agent sandboxes.

### From Raindrop reading queue — with counterarguments

- **[Agentic Coding is a Trap](https://larsfaye.com/articles/agentic-coding-is-a-trap)** — The sharpest counter to the meetup's general optimism. Argues that "orchestrator mode" (you define specs, agents implement) creates _cognitive debt_: only a skilled developer can catch the thousands of lines of generated code going wrong — yet that same skill atrophies the less you write code yourself. Also flags vendor lock-in (Claude Code outages have already frozen entire teams) and token cost volatility vs. a fixed employee salary. Directly echoes Pekka's "slow down" argument but goes further: slowing down isn't enough if you stop coding entirely.

- **[Don't Vibe Code; Delegate](https://cheewebdevelopment.com/dont-vibe-code-delegate-responsible-development-with-llms/)** — Argues the vocabulary matters: calling models "copilots" or "collaborators" triggers the ELIZA effect — we're hardwired to trust things that speak to us, which undermines the critical skepticism these tools actually require. "Delegate" is a more honest frame: you give instructions, you verify outputs, you stay responsible. The senior-developer-as-reviewer model only works if the reviewer is genuinely engaged, not rubber-stamping.

- **[The Vertical Codebase](https://tkdodo.eu/blog/the-vertical-codebase)** — TkDodo's architectural take on vertical slicing — but from a pure codebase structure angle, not AI-specific. Group by domain/feature, not by type (no giant `components/` + `hooks/` + `utils/` folders). The interesting AI connection: vertical codebases are dramatically easier for agents to navigate and modify without cross-cutting side effects. Pekka's vertical slicing advice might be even more important as a prerequisite for AI work than it was before.

_Possible angle for the post: the "slow down" and "agentic coding is a trap" arguments aren't contradictions — they're the same warning at different zoom levels. Pekka's version: slow down within a project. Lars Faye's version: slow down across your career._
