# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Inkoo Sublimation landing page — a Spanish-language B2B marketing site for a textile sublimation business. Single-page Astro site deployed on Vercel with SSR enabled for the contact form API endpoint.

## Commands

- `npm run dev` — Start dev server at localhost:4321
- `npm run build` — Production build to `./dist/`
- `npm run preview` — Preview production build locally
- No test runner or linter is configured.

## Architecture

**Framework:** Astro 5 with Tailwind CSS 3, deployed via `@astrojs/vercel` adapter in `output: 'server'` mode.

**Rendering strategy:** Hybrid — the index page uses `export const prerender = true` (static), while `src/pages/api/send.ts` uses `export const prerender = false` (SSR) for the Resend email API.

**Component structure** follows atomic design (atoms → molecules → organisms → sections):
- `src/components/atoms/` — Button, Icon, Input, Logo, Textarea
- `src/components/molecules/` — NavItem, FormField, ValueCard
- `src/components/organisms/` — Navbar, Hero, ContactForm, Footer, ValueProposition, FloatingWhatsApp, ScrollToTop
- `src/components/sections/` — RecentWork, ProcessSteps, GuaranteeBanner, Pricing, FAQ

**Single page:** `src/pages/index.astro` composes all sections. `src/layouts/Layout.astro` handles the HTML shell, SEO meta tags, JSON-LD structured data, and AOS (Animate On Scroll) initialization.

**API:** `src/pages/api/send.ts` — POST endpoint that receives FormData (with file attachments) from the contact form and sends email via Resend. Requires `RESEND_API_KEY` environment variable.

**Styling:** Tailwind with custom brand colors (`inkoo-black`, `inkoo-cyan`, `inkoo-magenta`, etc.) and fonts (Inter for body, Outfit for headings) defined in `tailwind.config.mjs`. Global styles in `src/styles/global.css`.

**Icons:** Uses `@iconify-json/tabler` with `@iconify/tailwind` plugin.

**Animations:** AOS library for scroll animations, plus custom Tailwind keyframes (fadeIn, slideUp, float).

## Key Configuration

- `astro.config.mjs` — `checkOrigin: false` to avoid CSRF 403 errors on Vercel
- Site URL: `https://www.inkoosub.com`
- Language: `es` (Spanish) — all user-facing content is in Spanish
