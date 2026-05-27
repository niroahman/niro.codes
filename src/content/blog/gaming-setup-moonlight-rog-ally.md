---
title: My Living Room Gaming Setup — ROG Ally + Moonlight + Sunshine
description: How I turned a basement gaming PC and a handheld into a seamless couch gaming experience using Moonlight, Sunshine, and Bazzite.
tech: [Moonlight, Sunshine, Bazzite, Playnite, Home Assistant, ROG Ally]
date: 2026-05-25
status: draft
---

# My Living Room Gaming Setup — ROG Ally + Moonlight + Sunshine

I didn't want to choose between a powerful gaming PC and the comfort of playing from the couch. So I didn't.

## The Hardware

**The host: basement gaming PC**

- CPU: AMD Ryzen 5600
- GPU: RTX 3060 12GB
- Display: 42" LG C2 OLED
- OS: Windows

This machine does the heavy lifting. It lives in the basement, stays always-on, and handles everything that needs real GPU horsepower.

**The client: ASUS ROG Ally Z1 Extreme**

- OS: Bazzite (Linux — think SteamOS done right)
- Role: Moonlight streaming client for GPU-intensive games, native for lighter ones
- Steam works seamlessly: pre-compiled shaders, cloud saves, the full experience

The ROG Ally on Bazzite is essentially a Steam Deck done better. Bazzite brings an immutable, gaming-focused Linux base — shaders are pre-built, controller support just works, and Steam feels native.

## The Streaming Layer: Sunshine + Moonlight

[Sunshine](https://github.com/LizardByte/Sunshine) runs on the Windows host. It's an open-source, self-hosted game streaming server — the spiritual successor to NVIDIA GameStream, but not locked to NVIDIA hardware and actively maintained.

[Moonlight](https://moonlight-stream.org/) is the client. It runs on the ROG Ally and connects to Sunshine over the local network (or Tailscale when away from home).

The result: I launch a game on the Ally, it streams from the basement PC at up to 4K/120fps over local WiFi. Input latency is low enough that it's genuinely comfortable for most genres — action games, RPGs, strategy. Not ideal for competitive shooters, but that's not really the point here.

### Virtual Display Driver — the hidden piece

One underrated part of the setup: a [Virtual Display Driver](https://github.com/VirtualDisplay/Virtual-Display-Driver/releases/tag/23.12.2HDR) on the host PC. This creates a virtual monitor that Sunshine streams from, which means:

- The physical LG C2 can be off or showing something else
- The stream gets its own resolution and refresh rate (matched to the Ally's screen)
- HDR passthrough works

Without this, streaming while the physical display is off causes Windows to fall back to a low-res software framebuffer. The virtual driver solves this cleanly.

For setup I used [Sunshine AIO](https://github.com/LeGeRyChEeSe/Sunshine-AIO) which handles installing Sunshine + the virtual display driver + basic config in one go.

## Game Library: Playnite

On the host, [Playnite](https://playnite.link/) unifies every store — Steam, GOG, Epic, Xbox — into one launcher with a clean controller-friendly UI. The SuccessStory plugin pulls achievements from all platforms into a single view.

When I stream to the Ally, Playnite is the first thing I see. It feels like a custom console frontend.

## Bonus: Home Assistant Automation

The basement has Philips Hue lights and a Hue Entertainment Area for bias lighting sync. I added a small automation that:

1. Detects when Hue Sync goes active (theater mode)
2. Checks whether the PC is currently streaming to the ROG Ally
3. If _not_ streaming — dims the ceiling light over 3 seconds
4. If streaming is active — keeps ambient lighting on (no distracting blackout while I'm on the couch)

HASS.Agent on the Windows PC feeds process state and active window info back to Home Assistant, which is how the streaming detection works.

## Why This Stack

The honest answer: I already had the basement PC and the ROG Ally, and I wanted to use both without duplicating games or managing two separate setups. Moonlight + Sunshine gave me that with surprisingly little friction.

The ROG Ally + Bazzite combo is genuinely underrated. It's more open than a Steam Deck, better hardware, and with Bazzite it's just as stable. The streaming client works out of the box.

If you have a capable gaming PC at home and want a couch gaming experience without buying a console, this is probably the most cost-effective path.

---

_Draft — to be expanded with screenshots/diagram of the setup_
