# About Little Dhaka

Little Dhaka is a website for a South Asian (Bangladeshi and Indian style) restaurant. It is a single-page React app. Visitors will be able to learn about the restaurant, browse the menu and, later, place orders or book a table.

The project is at an **early, front-end-only stage**. It has no backend, no real data and no ordering logic yet.

---

## Tech stack

| Area | Choice |
|---|---|
| Framework | React 19 (Create React App / `react-scripts` 5) |
| Routing | React Router DOM 7 (`BrowserRouter`) |
| Styling | Tailwind CSS 3 |
| Font | Noto Serif (Google Fonts, loaded in `src/index.css`) |
| Language | Plain JavaScript (no TypeScript) |

### Theme tokens (`tailwind.config.js`)

- `main-bg` is `rgb(255,242,236)`, a warm cream background
- `main-text` is `rgb(9,54,41)`, a dark green text color
- `main-btn-bg` is `rgb(0,93,92)`, a teal button color
- `font-notoserif` is the Noto Serif font family

### Scripts

```bash
npm start      # dev server on http://localhost:3000
npm run build  # production build
npm test       # Jest via react-scripts (no tests exist yet)
```

---

## Project structure

```
src/
├── index.js              # Mounts <App/> inside BrowserRouter
├── index.css             # Tailwind directives + Google Font import
├── App.js                # Navbar, routes, Footer
├── Pages/
│   ├── Home.js           # "/"      (empty)
│   ├── Menu.js           # "/menu"  (hero + lunch & dinner menus)
│   └── Order.js          # "/order" (placeholder text)
└── Components/
    ├── Navbar.js         # Top nav with NavLinks
    ├── Footer.js         # Contact / Navigate / Menu / Social columns
    ├── MenuCard.js       # Titled menu section + "Book a Table" button
    ├── MenuItem.js       # One dish row: image, name, description, price
    └── extra.js          # Empty file
public/
└── f1.jpg, f3.jpg, f4.jpg, fp1–fp3, download.jpeg, …   # Food photos
```

---

## What is done

### Routing and layout
- Three routes are set up: `/` (Home), `/menu` (Menu) and `/order` (Order).
- The `Navbar` and `Footer` show on every page.

### Menu page (`/menu`), the most complete page
- **Hero section:** the heading "Dive Into Delicious Meal Dishes" above a horizontal row of six food photos.
- **Two menu sections** built with the reusable `MenuCard` component:
  - Lunch: 6 dishes (Chicken Nanban, Grilled Paneer, Butter Chicken, Veg Pulao, Spicy Lamb Kebab, Fish Curry Meal)
  - Dinner: 6 dishes (Tandoori Chicken, Paneer Butter Masala, Beef Biryani, Chole Bhature, Mutton Rogan Josh, Egg Fried Rice)
- `MenuItem` shows a thumbnail, name, description and price, with dotted separators and a two-column grid on desktop.
- Each section has a styled **"Book a Table"** button with a calendar icon.
- The layout is responsive (`md:` breakpoints).

### Footer
- **Contact** column with a phone number, address and email, each with an icon.
- **Navigate** links to Home, Menu and Order.
- **Menu** links to Breakfast, Lunch and Dinner.
- **Social** links to Facebook, Instagram and Twitter.
- Uses the theme colors and font, with a responsive 9-column grid.

### Navbar
- Uses `NavLink` so the link for the current page is highlighted.
- Has a "Discover" brand label, Home/Menu/Order links and a "Get Ready" button.

---

## What is not done yet

### Pages
- **Home page content is placeholder.** It has a hero, story, signature dishes, meal times, a guest quote and the reserve band, but the story, stats and quote are invented copy and the photos are stock images that don't show Bangladeshi food.
- **Order page is a placeholder.** It only shows "Hello from the Order!" There is no cart, order form or checkout.
- There is no 404 / not-found route.

### Features
- **Ordering:** no cart, quantity selection, order summary or submission.
- **Table booking:** the "Book a Table" buttons do nothing (no `onClick`, no form, no route).
- **Navbar "Get Ready" button:** has no action.
- **Backend / data:** menu data is hard-coded in `Menu.js`. There is no API, database, auth or payments.
- **Breakfast menu:** the footer links to it, but no breakfast menu exists.

### Styling and polish
- **The Navbar is unstyled.** It still uses debug colors (`bg-red-500`, green/red links) instead of the theme, and has no brand logo or "Little Dhaka" name.
- **The Navbar is not responsive.** There is no mobile hamburger menu.
- **The food photos in the menu hero** overflow horizontally with no carousel or scroll behavior.

### Known bugs and inconsistencies
- The dinner section in `Menu.js` is titled **"Lunch Menu"** (it should be "Dinner Menu").
- `MenuItem` accepts an `imgsrc` prop but ignores it. Every dish shows the same `/download.jpeg`.
- Menu data puts **"Biryani & Polao"** as the description of Chicken Nanban.
- Prices use a **`$`** sign, but the restaurant is Dhaka-themed (should this be ৳ / BDT?).
- **Footer:**
  - Uses plain `<a href>` instead of React Router `<Link>`, so every click reloads the whole page.
  - The Breakfast/Lunch/Dinner links point to `/`, `/menu` and `/order` rather than to the matching menu sections.
  - Typos and placeholder data: "FaceBokk", "BreakFast", phone "O2 3863 3737" (letter O instead of zero), `abc@gmail.com`, and `href="#"` social links.
- `public/index.html` and `manifest.json` still have the Create React App defaults: title "React App", default description, and CRA icons.
- `README.md` is the default Create React App README.
- `src/Components/extra.js` is an empty file.
- Unused images: `f2.webp` and `f6.webp`.
- The images have generic `alt` text ("food-img", "food-image"), which is poor for accessibility.

### Quality
- There are no tests. The CRA test setup was deleted.
- There is no linting or formatting config beyond CRA defaults.
- There is no deployment config.

---

## Suggested next steps

1. Fix the quick bugs: the dinner title, the `imgsrc` prop, footer typos and `<Link>` usage.
2. Restyle the Navbar with the theme tokens and add a mobile menu.
3. Build the Home page.
4. Build the Order page (cart state with React context or `useReducer`).
5. Make "Book a Table" work (a modal or a `/reservation` route).
6. Move menu data into a separate data file or an API.
7. Update the site metadata (title, favicon, manifest) and the README.
