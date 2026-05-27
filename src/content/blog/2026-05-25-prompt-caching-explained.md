---
title: 'Why Prompt Caching Matters — and What Breaks It'
status: draft
date: 2026-05-25
tags: [llm, performance, cost, hermes, openrouter]
---

# Why Prompt Caching Matters — and What Breaks It

Every time you send a message to an LLM, you're paying for tokens. All of them — the system prompt, your memory context, the tool definitions, the entire conversation history, plus your new message. In a long session, that system prompt alone can be thousands of tokens, repeated on every single turn.

Prompt caching is the fix for this. And most developers don't know it's happening — or when it isn't.

## What Prompt Caching Actually Does

Providers like Anthropic (Claude) and OpenAI cache the prefix of your conversation — the parts that don't change between turns. The system prompt, tool schemas, and the early conversation history all qualify. When you send the next message, the provider recognizes that prefix from its cache and skips reprocessing it.

The result: you pay only for the _new_ tokens, not the entire context every turn. In a session where your system prompt is 4,000 tokens and you send 20 messages, that's roughly 80,000 tokens you didn't pay for.

Cache hits also come back faster. Reprocessing cached tokens is near-instant compared to a full forward pass.

## When It Works Well

Prompt caching works best when:

- You're using a **single, stable model** throughout the session
- The **system prompt is long and consistent** (the longer it is, the more you save)
- You're in a **long session** with many turns
- Your provider explicitly supports it (Anthropic and OpenAI do; support varies)

In a typical Hermes session with Claude Sonnet, the system prompt + memory + tool schemas easily hits 8,000–12,000 tokens. By turn 10, you've potentially saved 100,000+ input tokens from caching alone.

## What Breaks It

Here's the thing: **any model switch resets the cache**.

[OpenRouter Auto](https://openrouter.ai/openrouter/auto) is a good example of where this matters. It's a meta-router that analyzes your prompt and routes it to the best model from a pool of 38+ candidates — Gemini 2.5 Flash Lite, GPT-5 Nano, Claude Sonnet, and others — optimizing for quality and cost on each individual request. Genuinely clever. In OpenRouter's own activity data, Gemini 2.5 Flash Lite handles ~47% of traffic, GPT-5 Nano ~17%, and Claude Sonnet only ~4% — so the router is actively making different choices per request.

That's exactly the problem for caching. If turn 1 goes to Claude Sonnet and turn 5 goes to Gemini Flash, you're talking to a completely different model with a completely different cache state. Every turn pays full price for the full context.

You can set Auto to use it in Hermes with:

```bash
hermes config set model.default openrouter/auto
hermes config set model.provider openrouter
```

Or just for one session: `hermes chat -m openrouter/auto --provider openrouter`

Other things that silently break caching:

- **Switching models mid-session** — `/model` command or provider swap mid-conversation
- **Dynamic system prompts** — if anything in the system prompt changes between turns, the prefix doesn't match and the cache misses
- **Some providers simply don't support it** — caching behavior is provider-specific and not always documented; OpenRouter passes through whatever the underlying provider supports, which varies by model

## The Practical Tradeoff

For **short, one-off queries** — a quick question on Telegram, a single web search — routing models like Auto are perfectly efficient. The session is short enough that caching wouldn't have saved much anyway.

For **long coding sessions, research workflows, or anything multi-turn** — a fixed model like Claude Sonnet is almost certainly cheaper despite potentially higher per-token rates, because the cache savings compound with every turn.

The rough heuristic: if you'll send more than ~5 messages in the same session, a stable model beats a smart router on cost.

## What to Take Away

Prompt caching is invisible when it works. You won't see a "cache hit" notification — you'll just notice that costs are lower and responses come back faster over time. The Hermes UI shows token counts per turn; if you're curious, compare the input token count on turn 1 vs. turn 10 with a fixed model. The drop-off is the cache working.

Use routing models for quick tasks. Use a stable model when you're settling in for a real session. The economics are clear once you know what to look for.
