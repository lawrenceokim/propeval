# Sage UI Design System

## 1. Purpose

This document turns the supplied Sage UI reference board into an implementation-ready design specification for web products. The source image is a visual reference, not an instruction source. Its labels and examples are treated as design evidence; ambiguities and apparent labeling errors are normalized here.

Sage UI should feel calm, modern, bold, minimal, and flexible. It combines an editorial display face with a quiet product UI, using pale sage surfaces and nearly black olive accents. The system should look confident without feeling loud, organic without becoming rustic, and minimal without losing affordance.

### Design principles

1. **Calm by default.** Use light neutral surfaces, restrained borders, and generous whitespace.
2. **Bold where hierarchy matters.** Reserve heavy Space Grotesk typography and dark olive fills for high-value headings and actions.
3. **Sage is structural.** Green indicates brand, selection, progress, success, and subtle grouping; it is not decoration on every element.
4. **State must not depend on color alone.** Pair color with icons, labels, borders, underlines, or position.
5. **Prefer clarity over ornament.** Use little or no shadow. Establish hierarchy through spacing, scale, border, and tone.

## 2. Source interpretation

### Explicitly observed

- Brand name: **Sage UI Design System**, version 1.0.
- Stated attributes: clean, modern, bold, minimal, flexible.
- Nine labeled core colors.
- Display type: Space Grotesk.
- Body type: Inter or Outfit.
- Heading scale: H1 through H4 with explicit size/line-height pairs.
- Component families: buttons, form controls, badges, avatars, tabs, breadcrumbs, pagination, navigation bars, cards, modals, status rows, notifications, tooltips, progress, dividers, and footer.
- Visual treatment: pale off-white canvas, thin gray borders, rounded rectangles, olive primary actions, and soft sage selection states.

### Normalizations and inferences

- Use **Inter** as the default body face. Outfit is an acceptable brand variant, not a simultaneous fallback choice.
- Numbering mistakes in the board (duplicate 13, out-of-order 16, and the apparent “NVIGALS”/“ROLLTIPS” labels) are interpreted as visual artifacts. The intended components are status/list rows and notification/toast patterns.
- Values not printed in the board—spacing, radii, control heights, breakpoints, animation, and several semantic colors—are inferred from proportion and contemporary accessibility conventions. They are marked as system decisions rather than source-exact measurements.
- Several text/color combinations shown in the board are too faint for production. This spec strengthens disabled, error, and secondary text contrast where required.

## 3. Foundations

### 3.1 Color primitives

These values are transcribed directly from the source image.

| Token | Hex | RGB | Intended use |
| --- | --- | --- | --- |
| `sage-100` / Soft Sage | `#ACC8A2` | 172, 200, 162 | Soft emphasis, progress, selected backgrounds |
| `sage-300` / Sage | `#8FB985` | 143, 185, 133 | Brand accent, hover, success-adjacent UI |
| `sage-500` / Muted Sage | `#6B8F6A` | 107, 143, 106 | Active borders, icons, focus support |
| `olive-800` / Deep Olive | `#1A2517` | 26, 37, 23 | Primary surface, brand text, active controls |
| `olive-950` / Dark Olive | `#0F160D` | 15, 22, 13 | Strongest text and pressed states |
| `neutral-900` / Charcoal | `#1F1F1F` | 31, 31, 31 | Default text and icons |
| `neutral-500` / Gray | `#6B7280` | 107, 114, 128 | Secondary text and metadata |
| `neutral-025` / Light | `#F8FAF6` | 248, 250, 246 | Page background and subtle surfaces |
| `white` | `#FFFFFF` | 255, 255, 255 | Cards, fields, reversed text |

### 3.2 Semantic color tokens

| Token | Value | Usage |
| --- | --- | --- |
| `color-bg-canvas` | `#F8FAF6` | App/page background |
| `color-bg-surface` | `#FFFFFF` | Cards, modals, fields |
| `color-bg-subtle` | `#F1F4EF` | Navigation bands, quiet grouping |
| `color-bg-selected` | `#DCEBD8` | Selected rows, soft active states |
| `color-bg-brand` | `#1A2517` | Primary action and brand blocks |
| `color-bg-brand-hover` | `#23311F` | Primary hover |
| `color-bg-brand-pressed` | `#0F160D` | Primary pressed |
| `color-text-primary` | `#1F1F1F` | Default copy |
| `color-text-strong` | `#0F160D` | Headings and strongest emphasis |
| `color-text-secondary` | `#6B7280` | Supporting copy |
| `color-text-brand` | `#1A2517` | Brand labels and active navigation |
| `color-text-inverse` | `#FFFFFF` | Text on dark surfaces |
| `color-text-disabled` | `#777F75` | Disabled text; maintain legibility |
| `color-icon-primary` | `#1F1F1F` | Default icons |
| `color-icon-brand` | `#6B8F6A` | Accent icons |
| `color-border-default` | `#D8DED5` | Cards, fields, separators |
| `color-border-strong` | `#9DA69B` | Hover and emphasized boundaries |
| `color-border-focus` | `#6B8F6A` | Focus ring/supporting border |
| `color-overlay` | `rgba(15, 22, 13, 0.48)` | Modal scrim |

Feedback colors are necessary extensions because the board includes warning, error, and info UI but does not print their exact values.

| Role | Foreground | Soft background | Strong/accent |
| --- | --- | --- | --- |
| Success | `#245C31` | `#E4F2E2` | `#4E8A58` |
| Warning | `#7A4300` | `#FFF0D8` | `#C27A18` |
| Error | `#B4232D` | `#FDE7E8` | `#E34D59` |
| Info | `#245C91` | `#E3EFFA` | `#4A86C5` |

Do not use Soft Sage for small text on white. It is a surface/accent color, not a body-text color.

### 3.3 Typography

Use locally hosted or optimized web fonts where possible.

```css
--font-display: "Space Grotesk", system-ui, sans-serif;
--font-body: "Inter", system-ui, sans-serif;
```

| Style | Family | Size / line height | Weight | Tracking | Usage |
| --- | --- | --- | --- | --- | --- |
| Display/H1 | Space Grotesk | `72px / 80px` | 700 | `-0.03em` | Marketing hero only |
| H2 | Space Grotesk | `48px / 56px` | 700 | `-0.025em` | Page headline |
| H3 | Space Grotesk | `32px / 40px` | 700 | `-0.02em` | Major section |
| H4 | Space Grotesk | `24px / 32px` | 600 | `-0.015em` | Card/section title |
| H5 | Space Grotesk | `20px / 28px` | 600 | `-0.01em` | Added product subheading |
| Body large | Inter | `16px / 24px` | 400 | normal | Introductory body copy |
| Body | Inter | `14px / 20px` | 400 | normal | Default UI copy |
| Body small | Inter | `12px / 18px` | 400 | normal | Supporting copy |
| Label | Inter | `12px / 16px` | 600 | `0.01em` | Field and control labels |
| Caption | Inter | `11px / 16px` | 400 | `0.01em` | Metadata and helper text |
| Overline | Inter | `11px / 16px` | 700 | `0.06em` | Section labels; uppercase |

Rules:

- Use Space Grotesk only for headings, large numerals, and short brand statements.
- Use Inter for controls, navigation, data, help text, and long-form reading.
- Do not set paragraphs in all caps. Limit uppercase to short overlines and labels.
- Prefer sentence case for buttons, field labels, tabs, and messages.
- On screens below 768px, use a fluid type scale: H1 `clamp(40px, 10vw, 56px)`, H2 `36/44`, H3 `28/36`, H4 `22/30`.

### 3.4 Spacing and layout

Use a 4px base grid.

| Token | Value | Typical use |
| --- | --- | --- |
| `space-0` | 0 | Reset |
| `space-1` | 4px | Icon micro-gap |
| `space-2` | 8px | Compact internal gap |
| `space-3` | 12px | Control gap |
| `space-4` | 16px | Standard padding |
| `space-5` | 20px | Large control padding |
| `space-6` | 24px | Card padding |
| `space-8` | 32px | Component grouping |
| `space-10` | 40px | Section inset |
| `space-12` | 48px | Major section gap |
| `space-16` | 64px | Page section gap |
| `space-20` | 80px | Marketing rhythm |

Layout conventions:

- Desktop max content width: `1200px`; reference-board layouts may expand to `1280px`.
- Desktop gutters: 32–48px. Tablet gutters: 24px. Mobile gutters: 16px.
- Use a 12-column desktop grid, 8-column tablet grid, and 4-column mobile grid.
- Keep form fields at no more than 560px unless the content requires a full-width textarea.
- Use vertical whitespace before adding borders. Use borders before adding shadows.

### 3.5 Shape, border, and elevation

| Token | Value | Usage |
| --- | --- | --- |
| `radius-sm` | 6px | Small tags, compact controls |
| `radius-md` | 10px | Inputs and buttons |
| `radius-lg` | 14px | Cards and navigation containers |
| `radius-xl` | 20px | Large branded panels |
| `radius-pill` | 999px | Badges, avatars, toggles |
| `border-default` | `1px solid #D8DED5` | Default boundary |
| `border-strong` | `1px solid #9DA69B` | Hover/emphasis |
| `shadow-sm` | `0 1px 2px rgba(15,22,13,.06)` | Floating menus only |
| `shadow-md` | `0 12px 32px rgba(15,22,13,.12)` | Modal/dialog only |

Avoid visible drop shadows on static cards. A component should not use both a heavy border and a shadow.

### 3.6 Icons

- Use a single outline icon family with rounded joins and 1.75–2px strokes.
- Standard sizes: 16px in text, 20px in controls, 24px in standalone icon buttons.
- Icons inherit current text color.
- Icon-only controls require an accessible name and tooltip when meaning is not universal.
- Directional arrows should remain visually consistent across buttons, pagination, breadcrumbs, and inputs.

### 3.7 Motion

- Default transition: `150ms ease-out` for color, border, opacity, and small transforms.
- Modal enter: 180–220ms fade plus 8px upward movement; exit slightly faster.
- Toast enter: 180ms slide/fade; do not auto-dismiss errors before the user can read them.
- Honor `prefers-reduced-motion`; remove transforms and keep brief opacity changes only.
- Never animate layout continuously or use elastic/bouncy motion in core workflows.

## 4. Component specifications

### 4.1 Buttons

All buttons use the body font at 14/20, weight 600, with an 8px label/icon gap.

| Size | Height | Horizontal padding | Icon |
| --- | --- | --- | --- |
| Large | 48px | 20px | 20px |
| Medium | 40px | 16px | 18–20px |
| Small | 32px | 12px | 16px |

**Primary**

- Default: Deep Olive background, white label.
- Hover: lighten to `color-bg-brand-hover`.
- Pressed: Dark Olive background; optional `translateY(1px)`.
- Focus-visible: 2px Light gap plus 2px Muted Sage outer ring.
- Disabled: `#DCE5D9` background with `color-text-disabled`; no hover response.

**Secondary**

- Default: white/transparent background, strong olive border, dark label.
- Hover: pale sage background.
- Pressed: Soft Sage-tinted background with Muted Sage border.
- Disabled: subtle fill and default border; reduced contrast but readable.

**Tertiary/text**

- Default: transparent, dark label, no persistent container.
- Hover: underline or subtle tinted background, not both when inline.
- Pressed/active: Muted Sage text.
- Maintain at least a 40×40px interactive hit target even when the visual label is smaller.

**Icon button**

- Square, using the same 48/40/32px size tiers.
- Variants: solid brand, neutral subtle, and selected sage.
- Never rely on icon shape alone for destructive actions; use error color and a confirmation pattern.

### 4.2 Text inputs and textareas

- Medium field height: 44px; small: 36px; large: 52px.
- Horizontal padding: 12px; textarea padding: 12px; minimum textarea height: 112px.
- Label sits 6px above field. Helper or error text sits 4px below.
- Placeholder uses secondary text color and must not substitute for a label.

| State | Treatment |
| --- | --- |
| Default | White surface, default border, primary entered text |
| Hover | Strong border |
| Focus | Muted Sage border plus 2px translucent focus ring |
| Error | Error border, error icon if useful, error message below |
| Disabled | Subtle background, disabled text, `not-allowed` cursor |
| Read-only | Subtle background, normal readable text; no disabled opacity |

Search inputs place a 16–20px search icon at the start and may include a clear action when populated. Textareas allow vertical resize unless layout constraints explicitly prevent it.

### 4.3 Select/dropdown

- Closed control follows text-input anatomy with a chevron at the end.
- Menu is at least as wide as the trigger, with an 8px inset and `radius-md`.
- Option rows are 36–40px high.
- Hovered or keyboard-highlighted option uses `color-bg-selected`.
- Selected option includes a checkmark so selection is not communicated only by background.
- Long option labels truncate visually but remain available via accessible text/title.

### 4.4 Checkbox, radio, and toggle

**Checkbox**

- Visual control: 16–18px square, 4px radius.
- Checked: Deep Olive fill and white check.
- Indeterminate: Deep Olive fill and white horizontal mark.
- Label hit area: minimum 40px tall; clicking the label toggles the input.

**Radio**

- Visual control: 16–18px circle.
- Selected: Deep Olive outer ring with solid inner dot.
- Radio options with the same name must support arrow-key navigation.

**Toggle**

- Track: approximately 40×22px; thumb: 18px.
- Off: Gray track, white thumb on the start side.
- On: Muted Sage/Deep Olive track, white thumb on the end side.
- Use a nearby text label. “On/off” should describe a setting, not replace its name.

Disabled controls remain recognizable and cannot receive pointer interaction. Focus styling must remain visible for keyboard users.

### 4.5 Badges

- Pill shape; 24–28px height; 10px horizontal padding.
- Label: 12/16, weight 600.
- Variants: neutral/default, success, warning, error, info, and “new.”
- “New” may include an 8px status dot before the label.
- Badges are informational. Do not make them interactive unless they are explicitly implemented as buttons or removable chips.

### 4.6 Avatars

- Sizes: 24, 32, 40, and 48px; circular crop.
- Image avatars use `object-fit: cover` and meaningful alt text only when identity adds context.
- Initial avatars use two characters maximum with adequate foreground/background contrast.
- Provide a neutral fallback for failed images.
- Add-avatar control uses a dashed border and plus icon; it is an actual button with an accessible label.

### 4.7 Tabs

- Horizontal label row with a 2px active underline in Deep Olive.
- Inactive labels use secondary text; hover shifts to primary text.
- Recommended height: 40–44px; 20–24px gap between tabs.
- Use `tablist`, `tab`, and `tabpanel` semantics with roving keyboard focus.
- On narrow screens, allow horizontal scrolling without wrapping labels.
- Keep the underline aligned to the active label, not the entire equal-width cell, unless tabs are intentionally segmented.

### 4.8 Breadcrumbs

- Body-small typography, 8px gaps, chevron separators.
- Previous segments use secondary text and are links; current page uses primary text and `aria-current="page"`.
- Collapse middle segments into an accessible overflow menu on small screens.
- Do not show breadcrumbs for a single level.

### 4.9 Pagination

- 36–40px square page controls with `radius-sm`.
- Current page uses Deep Olive fill with white text and `aria-current="page"`.
- Non-current controls use white/transparent fill and default border.
- Preserve first/last or previous/next access when compressing the page range with an ellipsis.
- Disabled previous/next buttons must use native disabled behavior.

### 4.10 Navigation bars

**Desktop**

- 64–72px high, subtle background, `radius-lg` when presented as an inset bar.
- Left: SAGE wordmark. Center: Home, Products, Resources, Pricing. Right: search, secondary sign-in, primary “Get Started.”
- Active destination must be indicated through weight, underline, or `aria-current`, not color alone.

**Mobile**

- Bottom navigation is the source-board pattern: five destinations—Home, Search, Create, Notifications, Profile.
- Height: 64–72px plus safe-area inset.
- Icon above an 11–12px label. The central Create action may use a filled circular treatment.
- Keep all targets at least 44×44px and avoid more than five top-level destinations.

### 4.11 Cards

**Post/visual card**

- Image-led tile with `radius-lg`, clipped media, and optional small count badge.
- Text may overlay imagery only with a tested contrast layer.
- The reference uses monochrome sage/olive art direction; product imagery should preserve that quiet tonal treatment where possible.

**Content card**

- White surface, default border, 16–24px padding.
- Anatomy: category badge, overflow menu, title, short description, and tertiary/soft action.
- Whole-card click is allowed only when nested controls remain semantically and behaviorally independent.
- Hover may strengthen the border or add `shadow-sm`, not both dramatically.

### 4.12 Modals

- Centered surface on an olive translucent scrim.
- Width: 480–560px for forms; maximum `calc(100vw - 32px)` on mobile.
- Padding: 24px desktop, 20px mobile; `radius-lg`; `shadow-md`.
- Anatomy: title, optional supporting text, close button, content, action row.
- Default action order: secondary Cancel followed by primary Create/Confirm.
- Success modal may use a large soft-sage circle with check icon, centered message, and full-width Done action.
- Trap focus, close on Escape unless the action is irreversible, restore focus to the trigger, and label the dialog programmatically.
- Destructive confirmations must explicitly name the consequence and use an error treatment.

### 4.13 Status/list rows

The lower source-board pattern appears to represent compact selectable/status rows.

- Row height: 40–44px; 12px padding; `radius-md`.
- Anatomy: leading icon, label, optional trailing dismiss/action icon.
- Neutral, selected/info, and disabled/error variants may use tinted backgrounds.
- A disabled state should not use red unless it represents an actual error; ordinary disabled items use neutral tones.

### 4.14 Notifications/toasts

- Variants: success, info, error; warning is a supported extension.
- Anatomy: semantic icon, concise message, optional action, dismiss button.
- Background is a light semantic tint; icon and key text use the corresponding strong semantic color.
- Width: 320–420px; stack with 8–12px gaps; keep no more than three visible.
- Use an `aria-live="polite"` region for success/info and `role="alert"` sparingly for urgent errors.
- Suggested timeouts: 5–8 seconds for noncritical messages; persistent for errors requiring action.

### 4.15 Tooltips

- Dark Olive/Charcoal surface, white 11–12px text, 6–8px vertical and 8–10px horizontal padding.
- `radius-sm`; small directional arrow.
- Show after 300–500ms on hover/focus; dismiss on Escape and pointer leave/blur.
- Never put essential instructions or interactive content in a tooltip.

### 4.16 Progress

- Track: 6–8px high, light neutral fill, pill radius.
- Indicator: Soft Sage or Sage. Use Deep Olive when stronger contrast is needed.
- Show a numeric percentage when progress is determinate, aligned consistently at the track end.
- Place a short status label such as “Uploading…” below or before the track.
- Expose `aria-valuemin`, `aria-valuemax`, and `aria-valuenow`; for indeterminate progress, omit the current value.

### 4.17 Dividers

- Solid divider: 1px `color-border-default`.
- Dashed divider: 1px with a 4–6px dash rhythm for secondary grouping only.
- Dividers are decorative unless they communicate meaningful document structure.
- Allow 16–24px breathing room on both sides in stacked layouts.

### 4.18 Footer

- White or Light background with a top divider and 32–48px vertical padding.
- Desktop anatomy: wordmark/copyright, grouped product/resource/company links, newsletter field, social icons, closing brand line.
- Newsletter field combines email input and icon submit action; include a visible or accessible label and validation feedback.
- Stack into clear sections on mobile. Keep social controls 40×40px minimum.
- Use current year dynamically; the source-board 2026 date is illustrative, not fixed content.

## 5. Interaction state model

Every interactive component must define these states where relevant:

| State | Requirement |
| --- | --- |
| Rest | Clear affordance and readable label |
| Hover | Subtle tone, border, or underline change; no layout shift |
| Active/pressed | Stronger tone and immediate tactile feedback |
| Focus-visible | High-contrast 2px ring that is not clipped |
| Selected/current | Persistent non-color cue such as check, underline, or `aria-current` |
| Disabled | Recognizable, readable, noninteractive, and omitted from tab order when natively disabled |
| Loading | Preserve dimensions; show progress; prevent duplicate activation |
| Error | Explain what happened and how to recover |

## 6. Accessibility requirements

- Target WCAG 2.2 AA.
- Normal text must reach 4.5:1 contrast; large text and essential UI boundaries must reach at least 3:1.
- Minimum target size: 24×24px under WCAG 2.2; Sage UI’s product default is 40×40px, with 44×44px preferred for primary/mobile actions.
- All functionality must be operable by keyboard with a logical focus order.
- Never remove outlines without supplying an equally visible `:focus-visible` treatment.
- Use native HTML elements before ARIA recreations.
- Inputs require persistent labels and associated error/help text via `aria-describedby`.
- Provide text equivalents for icon-only actions and non-decorative images.
- Respect reduced motion, increased text size, browser zoom to 200%, and reflow at 320 CSS px.
- Status colors must include text/icon cues. Sage green alone cannot mean success because it also carries brand and selection meaning.

## 7. Responsive behavior

| Range | Layout behavior |
| --- | --- |
| `< 640px` | 4-column grid, 16px gutters, stacked forms/cards, bottom navigation, full-width modal actions where helpful |
| `640–1023px` | 8-column grid, 24px gutters, two-column component groups, compact desktop/tablet nav |
| `≥ 1024px` | 12-column grid, 32–48px gutters, full navigation, multi-column card and footer layouts |

Additional rules:

- Components respond to their container where possible; page breakpoints are a fallback.
- Horizontal data or tab groups scroll rather than compress below readable widths.
- Button groups may stack on mobile; preserve primary action prominence.
- Modals become near-full-width sheets only when content density demands it.
- The mobile bottom navigation must account for `env(safe-area-inset-bottom)`.

## 8. Content guidance

- Use short, direct action labels: “Create project,” “Learn more,” “View details.”
- Prefer specific nouns and verbs over generic “Submit” or “Click here.”
- Error messages should state the problem and recovery: “Enter a valid email address.”
- Success messages confirm the completed outcome: “Project created successfully.”
- Tooltips name unfamiliar controls; they do not repeat visible button labels.
- Empty states should explain the absence, then offer one clear next action.

## 9. Suggested design-token contract

Use platform-appropriate aliases, but keep semantic names stable so themes can change without rewriting components.

```css
:root {
  --sage-100: #acc8a2;
  --sage-300: #8fb985;
  --sage-500: #6b8f6a;
  --olive-800: #1a2517;
  --olive-950: #0f160d;
  --neutral-900: #1f1f1f;
  --neutral-500: #6b7280;
  --neutral-025: #f8faf6;
  --white: #ffffff;

  --color-bg-canvas: var(--neutral-025);
  --color-bg-surface: var(--white);
  --color-bg-brand: var(--olive-800);
  --color-text-primary: var(--neutral-900);
  --color-text-secondary: var(--neutral-500);
  --color-text-inverse: var(--white);
  --color-border-default: #d8ded5;
  --color-border-focus: var(--sage-500);

  --font-display: "Space Grotesk", system-ui, sans-serif;
  --font-body: "Inter", system-ui, sans-serif;
  --radius-sm: 6px;
  --radius-md: 10px;
  --radius-lg: 14px;
  --radius-pill: 999px;
  --duration-fast: 150ms;
  --ease-standard: ease-out;
}
```

## 10. Quality checklist

A Sage UI implementation is ready when:

- All components use semantic tokens rather than scattered literal colors.
- Space Grotesk and Inter have deliberate roles and stable fallback stacks.
- Hover, active, focus-visible, disabled, loading, and error states are implemented where applicable.
- Contrast has been measured, especially on pale sage surfaces.
- Icon-only controls have names and keyboard-visible focus.
- Forms have persistent labels, inline errors, and predictable validation timing.
- Layout reflows without horizontal page scrolling at 320px.
- Modals and menus manage focus correctly.
- Motion respects reduced-motion preferences.
- Static cards remain visually quiet; elevation is reserved for floating layers.
- Component examples are tested against white, Light, and Deep Olive contexts.

## 11. Visual acceptance criteria

The finished interface should read as the same family as the reference when viewed without branding:

- The canvas is predominantly warm off-white and white.
- Dark Olive anchors primary actions and high-emphasis brand moments.
- Sage appears as a measured supporting accent, selected state, and progress color.
- Headings are broad, bold, and slightly tight; body UI remains compact and highly readable.
- Corners are consistently soft but not excessively pill-shaped outside badges and toggles.
- Borders and whitespace carry most of the hierarchy; shadows are rare.
- Component states are obvious without becoming visually noisy.
- Desktop layouts feel spacious, while mobile layouts retain the same typography, color, and interaction character.
