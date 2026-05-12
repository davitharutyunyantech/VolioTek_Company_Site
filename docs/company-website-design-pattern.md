# Design Pattern for VolioTek Company Websites

## Purpose

This design pattern describes the visual style, structure, and presentation rules for websites of the company that created the VolioTek product. Its goal is to provide a consistent approach for building public company pages: the main website, product landing pages, service pages, about pages, contact/demo pages, and presentation sections.

This pattern does not describe the internal product interface. It describes only the external company style and website-building rules.

## Core Style Idea

VolioTek should look like a calm, secure, and technically mature B2B product company for healthcare and regulated operations. The site must make clear that the company has already created and operates the VolioTek product; it should not sound like a custom software agency.

Key feeling:

- seriousness
- trust
- privacy
- technical precision
- modernity without unnecessary decoration
- premium enterprise software

The site should not look like a generic SaaS template. It should look like the website of a company behind a complex, reliable product that is already available for regulated healthcare operations.

## Brand Personality

The brand should feel:

- secure
- precise
- calm
- clinical
- operational
- intelligent
- enterprise-ready

It should not feel:

- playful
- noisy
- overly futuristic
- cheap startup
- generic healthcare stock
- decorative without purpose

## Visual Language

Primary visual language:

- dark navy as the base for trust and depth
- aqua/teal as the technology and healthcare accent
- light aqua-tinted sections for cleanliness and space
- glass-like panels with thin borders
- soft shadows
- clean geometric spacing
- restrained icons
- real product visuals or polished interface mockups

The style should stay restrained. Decoration is acceptable only when it strengthens the brand and does not interfere with readability.

## Color Pattern

### Core Colors

- Deep navy: `#071625`
- Ink navy: `#0B1F2C`
- Dark blue panel: `#0B2233`
- Bright teal: `#18D6BD`
- Aqua accent: `#35EAD0`
- Dark teal: `#07988D`
- Pale aqua: `#EDFAFA`
- Near-white aqua: `#F0FFFD`

### Light Mode Pattern

Use for clean, trustworthy, and informational sections:

- background: pale aqua / near-white aqua
- text: deep navy
- accents: teal
- cards: semi-transparent white/aqua
- borders: soft navy/teal opacity

### Dark Mode Pattern

Use for the hero, premium sections, security sections, and strong brand moments:

- background: deep navy
- text: near-white aqua
- accents: bright aqua
- cards: dark translucent panels
- borders: aqua opacity

### Accent Rules

- Teal/aqua is the main brand accent.
- Use red only for risk or security warnings.
- Use green only for success or reliability.
- Use amber only for caution or process states.
- Do not use many bright colors at the same time.

## Typography Pattern

Primary typography style:

- clean modern sans-serif
- strong headlines
- readable body text
- compact labels
- technical accents only where useful

Recommended fonts:

- Primary: Inter
- Technical accent: Roboto Mono

### Headline Style

Headlines should be confident and short.

Good:

- `Secure software for regulated healthcare operations`
- `Built for private, operationally complex workflows`
- `Technology infrastructure for healthcare teams`

Bad:

- `Revolutionizing healthcare with innovation`
- `Unlock the future of productivity`
- `All-in-one magic platform`

### Body Copy Style

Body copy should be specific:

- what product the company has created
- who it serves
- what problem it solves
- why it can be trusted

Do not use abstract marketing fluff.

## Layout Pattern

The site should be built from sections, not from a random collection of cards.

Base layout:

1. Header
2. Hero
3. Trust / positioning strip
4. Product or company value section
5. Capability sections
6. Security / privacy section
7. Product adoption model
8. Proof / fit / use cases
9. CTA section
10. Footer

### Section Rules

- Sections should be full-width.
- Inner content should have a constrained width.
- Use cards only for grouped content, proof points, capabilities, or steps.
- Do not place cards inside cards.
- The first viewport should show a hint of the next section.
- Desktop layout should be spacious but not empty.
- Mobile layout should be single-column and avoid text/visual overlap.

## Hero Pattern

The hero is the main brand moment.

The hero should immediately answer:

- who we are
- what the product does
- who the product is for
- why we can be trusted

### Hero Structure

- Header with logo and CTA
- Large headline
- Short positioning paragraph
- Primary CTA
- Secondary CTA
- Product/interface visual or branded background
- Hint of the next section at the bottom

### Hero Visual Style

Best option:

- dark navy background
- subtle brand background image or geometric texture
- light text
- teal CTA
- clean product/interface mockup

Avoid:

- generic gradient hero
- random abstract illustration
- stock photo hero
- oversized card containing all text
- hero without a logo or brand signal

## Header Pattern

The header should be minimal and confident.

Structure:

- logo / wordmark on the left
- navigation links
- primary CTA on the right
- optional theme toggle, if needed

Style:

- transparent or semi-transparent over the hero
- solid/blurred on scroll
- thin bottom border
- compact height
- clear hover states

The header should not be overloaded with too many links.

## Button Pattern

### Primary Button

Use for the main action:

- background: teal/aqua
- text: dark navy or white, depending on contrast
- shape: medium radius
- hover: subtle lift or brightness change

Example labels:

- `Request Demo`
- `Contact Us`
- `Talk to Team`
- `View Product`

### Secondary Button

Use for the secondary action:

- transparent or soft panel background
- thin border
- muted text
- hover border/accent color

## Card Pattern

Cards should be calm and functional.

Style:

- radius: 8px
- thin border
- soft shadow
- subtle transparency
- enough padding
- no heavy gradients

Use cards for:

- capability items
- process steps
- trust points
- security principles
- product modules
- client fit

Do not use cards as the main decorative background for every section.

## Imagery Pattern

Visuals should communicate technology and reliability.

Suitable visuals:

- product screenshots
- interface close-ups
- abstract workflow diagrams
- secure infrastructure diagrams
- branded geometric backgrounds
- refined mockups

Do not use:

- generic doctors with tablets
- hospital stock photos
- random people smiling at laptops
- abstract 3D shapes without meaning
- blurry dark images behind important text

## Icon Pattern

Use `lucide-react` as the approved icon source for React/Next.js pages.

Icons should be:

- line-based
- thin or medium stroke
- from one consistent family
- simple
- functional

Icon themes:

- security
- workflow
- automation
- data
- compliance
- integration
- support

Do not mix different icon styles.

## Section Patterns

### Trust Strip

A short section immediately after the hero.

It may contain:

- `Private tenant environments`
- `Role-based access`
- `Security-first architecture`
- `Built for regulated workflows`

Style:

- compact
- strong labels
- no long paragraphs

### Capability Section

Describes key company/product capabilities.

Pattern:

- section eyebrow
- strong heading
- short paragraph
- 3-6 capability cards

### Security Section

Should be stricter and more trust-focused.

Pattern:

- dark background
- clear headline
- specific security principles
- minimal visuals
- no exaggerated claims

### Process Section

Shows how the company works.

Pattern:

- numbered steps
- concise copy
- clear outcome per step
- no decorative complexity

### CTA Section

Closes the page.

Pattern:

- strong but short headline
- one paragraph
- primary CTA
- optional secondary CTA
- clean background

## Motion Pattern

Motion should be subtle, polished, and useful. The site should have enough movement to feel premium and responsive, but it should never feel playful, distracting, or animation-led.

Allowed:

- subtle hover lift
- smooth color transitions
- section fade/slide reveal
- header blur on scroll
- soft border or shadow transitions on interactive cards
- short CTA feedback transitions
- CSS/Tailwind-only motion that respects `prefers-reduced-motion`

Avoid:

- heavy parallax
- animated backgrounds that distract
- spinning objects
- excessive transitions
- Framer Motion / Motion or another animation library unless separately approved
- animations that are required to understand content
- looping decorative motion

## Copy Pattern

Copy should be:

- direct
- specific
- confident
- security-aware
- operational

Good formula:

`VolioTek is [type of product/platform] for [audience] who need [business outcome] in [regulated/private environment].`

Example:

`VolioTek is a secure operations platform for healthcare teams that manage sensitive workflows in private, regulated environments.`

## Accessibility Pattern

Required rules:

- high contrast
- readable font sizes
- visible focus states
- semantic headings
- descriptive button text
- alt text for meaningful visuals
- keyboard-friendly navigation
- responsive layout without overlap

## Do

- Use navy and teal consistently.
- Keep the first screen brand-heavy and clear.
- Use real product/interface visuals when possible.
- Keep sections structured and readable.
- Use short, specific copy.
- Make the site feel secure and premium.
- Keep visual effects subtle.

## Do Not

- Do not use generic SaaS gradients.
- Do not use random decorative blobs.
- Do not overuse cards.
- Do not use stock healthcare clichés.
- Do not make the site playful.
- Do not use vague marketing language.
- Do not add visual complexity without purpose.

## Reusable Design Formula

For every new company page, use this formula:

1. Strong brand signal at the top.
2. Clear statement of what the product is and who created it.
3. Calm navy/teal visual system.
4. One primary business action.
5. Specific proof of security, reliability, or operational value.
6. Structured sections with concise copy.
7. Premium but restrained visual treatment.

If a section does not improve trust, clarity, or conversion, remove it.
