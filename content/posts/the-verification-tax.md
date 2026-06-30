---
title: "I Wrote a Paper About AI Making Us Worse at Our Jobs"
date: "2026-05-20"
excerpt: "It's called The Verification Tax. The short version: the tools that make expert work faster quietly eat the judgment those tools depend on, and you can either pay for verification on purpose or pay way more for skipping it."
category: "Research"
tags: ["ai", "research", "verification-tax", "work"]
---

So I've been writing a research paper. On nights and weekends, like a normal person. It's called *The Verification Tax*, and it's about something I keep watching happen at work and couldn't stop thinking about.

## The Thing That Started It

Picture an experienced tech wiring a general-purpose AI model up to a manufacturer's actual service manual and asking it to write a repair procedure for a piece of equipment. The kind of step-by-step you'd hand someone so they can fix the thing themselves. It came back looking *perfect*. Clean, confident, reads like the real manual.

It was also fiction. It walked you into a settings menu that doesn't exist and called for a replacement part with a number that was never made. The steps that mattered led nowhere. The real manual was connected the entire time — the model just answered from its training instead and nobody could tell, because wrong AI output and right AI output read exactly the same on the page.

If someone had actually followed it, the error wouldn't have surfaced while reading. It would've surfaced an hour in, halfway through a teardown, staring at a machine that has no such menu and a part that doesn't exist.

## Why This Isn't a New Problem

Here's the part I find genuinely unsettling. This is the same pattern as the power loom and the assembly line. A tool makes the work faster and wears down the skill that built the judgment behind it. The loom took generations. Scientific management took about a career. Computing moved it from your hands to your head.

Generative AI does both at once — it runs in *months*, fast enough to erode a working expert mid-project, and it goes after judgment itself, the part that decides whether an answer is even correct. That's the worst possible layer to lose, because checking the machine's judgment takes the exact attention the machine just offered to handle for you.

## The Actual Argument

The research is brutal and consistent: people apply *less* scrutiny the more confident the AI seems, devs worked 19% slower with AI while being sure they were faster, and the one fix that works — friction that forces you to engage before accepting an answer — people just turn off because they hate it.

So my claim is that you can't solve this with willpower or training alone. You have to do two things together:

- **Train the judgment** so someone can recognize what good skepticism looks like.
- **Encode it into the system** — a source hierarchy that grounds answers in real docs, and a refusal threshold that lets the tool say "I can't confirm that" instead of inventing something.

The negative case in the paper is what happens with neither. The most striking part is how someone can name that exact failure mode *out loud*, swear they'll watch for it, and still walk right back into it twice in the following two months. That's not a bad afternoon. That's what fighting a stochastic tool with sheer discipline looks like under deadline.

I called it the verification tax because that's the honest framing. The friction is a real cost a leader chooses to pay. The alternative isn't free — it's just invisible, paid in garbage output and quietly evaporating expertise, and it's bigger.

## Why I Bothered

I disclosed the obvious conflict up front: I built two of the three systems I'm studying, which is a problem, and I spent most of the methodology section treating it like one. But I couldn't let the idea go. The question underneath it is the one that actually keeps me up: if AI-augmented work wears down the practice that makes experts, *where does the next expert come from?*

I don't fully answer that. But I'm pretty sure naming the tax is the first step to deciding whether you want to pay it.
