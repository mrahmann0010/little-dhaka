# Little Dhaka Design System

These are the design tokens and reusable classes behind the Little Dhaka site. Use them for every new page so that everything looks like it belongs together.

The look is warm cream paper, deep forest-green ink, a teal action color and a single brass highlight. All text is set in Noto Serif. The **arch** is the signature shape, a nod to the Mughal-era architecture of old Dhaka.

## Where the tokens live

| Layer | File | What it holds |
|---|---|---|
| Raw values | [src/index.css](../src/index.css) (`:root`) | CSS variables (`--ld-*`): color channels, gutter and section spacing |
| Tailwind tokens | [tailwind.config.cjs](../tailwind.config.cjs) | Semantic colors, type scale, radii, widths, spacing, motion |
| Component classes | [src/index.css](../src/index.css) (`@layer components`) | `.btn-primary`, `.chip`, `.rule`, `.frame-arch`, and so on |

**Rules**
1. Components use **semantic** tokens (`text-ink`, `bg-surface`, `border-line`). Use primitives (`forest`, `cream`) only when no semantic token fits.
2. Never hard-code hex or `rgb()` values, or arbitrary font sizes, in components.
3. If a combination of classes appears in three or more places, add it to `@layer components`.

---

## Color

### Primitives

| Token | Value | Used for |
|---|---|---|
| `cream` | `rgb(255 242 236)` | Page ground |
| `forest` | `rgb(9 54 41)` | Text, dark surfaces |
| `teal` | `rgb(0 93 92)` | Actions and brand marks |
| `brass` | `rgb(176 124 52)` | The one highlight color: times and small details |

Every primitive supports opacity modifiers, for example `bg-cream/90`.

### Semantic tokens

| Token | Resolves to | Use for |
|---|---|---|
| `surface` | cream | Page and section backgrounds |
| `surface-inverse` | forest | Dark bands (such as the reservation block) |
| `ink` | forest | Headings, primary text |
| `ink-muted` | forest at 75% | Descriptions, secondary text, resting links |
| `ink-subtle` | forest at 60% | Captions, meta text, inactive tabs |
| `ink-inverse` / `-muted` / `-subtle` | cream at 100%, 80% and 60% | Text on `surface-inverse` |
| `line` | forest at 30% | Soft dividers between list rows |
| `line-strong` | forest at 60% | Dotted section rules |
| `line-faint` | forest at 10% | Hairlines under the nav and footer bars |
| `brand` | teal | Primary buttons, active tabs, icons |
| `brand-hover` | forest | Hover state for `brand` |
| `accent` | brass | Serving hours and other small highlights. Use sparingly. |

**Contrast:** `ink`, `ink-muted` and `brand` on `surface` all pass WCAG AA for body text. Use `ink-subtle` only for captions of 14px or larger. Don't use `accent` for long paragraphs.

---

## Typography

The only family is **Noto Serif** (`font-serif`), set as the body default. Weights: 300 (light) for italic notes, 400 for headings and body, and 500 (medium) for dish names and prices.

The type scale is fluid: sizes grow smoothly with the screen, so you don't need `md:` size modifiers.

| Token | Size (min to max) | Line height | Use for |
|---|---|---|---|
| `text-hero` | 44px to 96px | 1.02 | The home page `h1` only |
| `text-display` | 36px to 60px | 1.1 | One page title (`h1`) per page |
| `text-heading` | 30px to 48px | 1.15 | Section titles (`h2`) |
| `text-lead` | 17px to 20px | 1.65 | Intro paragraphs, serving hours |
| `text-title` | 18px to 20px | 1.4 | Item names (`h3`), nav links, footer headings |
| `text-wordmark` | 20px to 24px | 1.2 | The "Little Dhaka" name |
| `text-body` | 16px | 1.65 | Default body text |
| `text-caption` | 14px | 1.5 | Meta text, copyright line |
| `text-tag` | 12px | 1.4 | Chips |

### Text style classes

| Class | Result |
|---|---|
| `.lead` | `text-lead` in light italic, `ink-muted`. Use for page intros. |
| `.text-note` | Light italic, `ink-muted`. Use for dish descriptions and section notes. |
| `.eyebrow` | Small italic `accent` label with a short leading line. Use above section titles. |

**Bengali:** `font-bengali` (Noto Serif Bengali) is for short Bengali words used as decoration or greeting, such as স্বাগতম. Mark them `lang="bn"`, and add `aria-hidden="true"` when an English equivalent sits beside them.

**Voice in type:** headings are upright and regular weight. Supporting copy is light italic. Avoid all-caps labels, and avoid bold or colored words inside headings.

---

## Layout and spacing

| Token or class | Value | Use for |
|---|---|---|
| `px-gutter` / `.page-x` | 20px, then 48px at `md`, then 80px at `lg` | Side padding on every full-width row |
| `py-section` | 48px, then 56px at `md` | Vertical rhythm between sections |
| `.section` | `py-section` + `px-gutter` | Standard content section wrapper |
| `max-w-page` / `.container-page` | 72rem, centered | Content width inside a section |
| `max-w-prose` | 36rem | Paragraph measure, kept under 80 characters |

The layout pattern is: section title and note on the left, meta information (such as hours) on the right, a dotted rule below, and content in a two-column grid from `md` up.

---

## Shape

| Token or class | Value | Use for |
|---|---|---|
| `rounded-arch` / `.frame-arch` | Full semicircle on top, 1rem at the bottom | Feature photos |
| `rounded-arch-lg` / `.band-arch` | 8–16rem on top (fluid), 1.5rem at the bottom, plus a forest background | Large call-to-action bands |
| `rounded-full` | Pill | Buttons, chips, tabs |
| `.frame-round` | Circle with a faint ring offset from the cream background | Dish thumbnails |

Cards and boxes don't get shadows. Hierarchy comes from dotted rules, spacing and the arch shape.

---

## Rules and dividers

| Class | Style | Use for |
|---|---|---|
| `.rule` | 2px dotted `line-strong`, bottom | Under section headers and the hero |
| `.rule-top` | 2px dotted `line-strong`, top | Top of the footer |
| `.rule-soft` | 1px dotted `line`, bottom | Between list rows |
| `.leader` | 1px dotted, stretches to fill the gap | Between a name and a price inside a flex row |

---

## Components

### Buttons

```jsx
<button className="btn-primary">Book a Table</button>          // teal on cream
<button className="btn-outline btn-lg">Book a Table</button>   // secondary, beside a primary
<button className="btn-inverse btn-lg">Book a Table</button>   // cream on forest band
```

`.btn` is the shared base (pill shape, icon gap, color transition). `.btn-lg` makes it larger.

Disabled buttons fade to 50% and ignore the pointer.

### Form fields

```jsx
<label className="block">
  <span className="field-label">Phone</span>
  <input type="tel" className="field" />
</label>
```

`.field` works on `input`, `select` and `textarea`. It keeps the global focus outline.

### Chips

```jsx
<li className="chip">Vegetarian</li>
```

Chips carry dietary or feature labels only: `Vegetarian`, `Spicy`, `Chef's pick`.

### Tabs

```jsx
<a className={`tab ${active ? 'tab-active' : ''}`}>Lunch</a>
```

### Links

| Class | Use for |
|---|---|
| `.link-quiet` | Footer and inline links: `ink-muted`, turns `ink` on hover |
| `.link-underline` + `.link-underline-active` | Main nav: an underline grows in on hover and stays when active |

### Menu row pattern

```jsx
<li className="flex items-center gap-4 py-5 rule-soft">
  <img className="frame-round size-16 md:size-20" />
  <div className="flex-1 min-w-0">
    <div className="flex items-baseline gap-3">
      <h3 className="text-title font-medium">Name</h3>
      <span className="leader" aria-hidden="true" />
      <p className="text-title font-medium tabular-nums">৳420</p>
    </div>
    <p className="mt-1 text-note">Description</p>
  </div>
</li>
```

---

## Motion

| Token | Value | Use for |
|---|---|---|
| `ease-soft` | `cubic-bezier(0.2, 0.7, 0.2, 1)` | All transitions |
| `animate-rise` | 900ms fade and rise | Page-load entrance only |

- Use **one** entrance moment per page, such as the staggered hero arches (90ms apart). Don't animate every section as it scrolls into view.
- Always use the `motion-safe:` prefix on animations. Smooth scrolling is already turned off for people who prefer reduced motion.
- Hover and state changes are color transitions only, with no scaling or lifting.

---

## Accessibility

- A global `:focus-visible` outline is drawn in `brand`, 2px wide with a 2px offset. Don't remove it.
- Decorative images use `alt=""`. Dish photos use the dish name as their `alt` text.
- Icons inside text or buttons get `aria-hidden="true"`.
- Space for the scrollbar is always reserved (`scrollbar-gutter: stable`), so the layout doesn't shift between pages.

---

## Adding a new page

```jsx
<main>
  <section className="section">
    <div className="container-page">
      <header className="pb-6 rule">
        <h1 className="text-display">Page title</h1>
        <p className="mt-4 lead max-w-prose">Short intro.</p>
      </header>
      {/* content */}
    </div>
  </section>
</main>
```
