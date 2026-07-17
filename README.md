# 🍞✨ dank-toasts

[![npm version](https://img.shields.io/npm/v/dank-toasts.svg?color=e879f9&label=npm)](https://www.npmjs.com/package/dank-toasts)
[![npm downloads](https://img.shields.io/npm/dm/dank-toasts.svg?color=38bdf8)](https://www.npmjs.com/package/dank-toasts)
[![bundle size](https://img.shields.io/bundlephobia/minzip/dank-toasts?color=34d399&label=gzip)](https://bundlephobia.com/package/dank-toasts)
[![types](https://img.shields.io/npm/types/dank-toasts.svg?color=fbbf24)](./src/index.d.ts)
[![license](https://img.shields.io/npm/l/dank-toasts.svg?color=f472b6)](./LICENSE)

**Brainrot-flavored corner toast notifications for React.** 💅🔥💀

A little emoji + text bubble pops up bottom-right, plays a particle effect,
and dismisses itself — a less-invasive alternative to a full-screen
success/failure overlay.

```
                                          ╭──────────────────────────────╮
                                    ✨ ⭐  │  🎉   Serving excellence.    │
                                          ╰──────────────────────────────╯
                                                     ╭───────────────────────╮
                                               💀 💀 │  💀  Big oof.         │
                                                     ╰───────────────────────╯
```

Animated with [Motion](https://motion.dev) 🎞️ (`motion/react`) and styled
with Tailwind CSS utility classes 🎨. Written in plain JS/JSX and works
as-is in JavaScript projects; TypeScript projects get full types 🔷 out of
the box.

## 📦 Install

```bash
npm install dank-toasts motion
```

> `motion`, `react`, and `react-dom` are peer dependencies — install them
> alongside the package.

## ⚙️ Setup

1. Mount `<ToastContainer />` once, near the root of your app. It takes no
   required props.
2. Import the stylesheet once, anywhere in your app's entry point:

   ```js
   import "dank-toasts/style.css";
   ```

   This ships pre-built utility CSS (no Tailwind config required on your
   end). If your app *already* uses Tailwind, you can skip this import and
   instead add this package to your own `content` globs so Tailwind's JIT
   picks up the same classes from source:

   ```js
   // tailwind.config.js
   content: [
     "./src/**/*.{js,jsx,ts,tsx}",
     "./node_modules/dank-toasts/dist/**/*.{js,mjs}",
   ],
   ```

## 🚀 Usage

Works like `react-toastify`: mount the container once, then fire toasts
imperatively from anywhere — event handlers, thunks, utils, wherever —
with `toastSuccess()` / `toastFail()`. No state, no props, no plumbing. 🙌

```jsx
import { ToastContainer, toastSuccess, toastFail } from "dank-toasts";
import "dank-toasts/style.css";

export default function App() {
  return (
    <div>
      <button onClick={() => toastSuccess()}>Notify success! 🎉</button>
      <button onClick={() => toastFail()}>Notify failure! 💀</button>

      <ToastContainer />
    </div>
  );
}
```

Called with no arguments, each fires a random emoji/message pair from the
built-in pools. Pass a message and/or override any part of it:

```js
toastSuccess("Shipped it.");
toastFail("That broke.");

toastSuccess("Shipped it.", {
  emoji: "🚀",          // override the emoji
  effect: "fireBurst",  // override the particle effect
  textTheme: "gold",    // override the text theme
});
```

Toasts fired before `<ToastContainer />` mounts are queued and flushed as
soon as it mounts, so it's safe to call `toastSuccess()`/`toastFail()` at
any point in your app's lifecycle. 📬

## ➕ Adding your own toasts

The success/failure pools are plain arrays you can extend at runtime, from
anywhere in your app (e.g. once at startup):

```js
import { addSuccessToast, addFailureToast } from "dank-toasts";

addSuccessToast("🐢", "Slow and steady, but a W.");
addFailureToast("🧦", "Lost in the couch cushions.");

// with optional extras — image, particle effect, text theme:
addSuccessToast("🎯", "Bullseye.", {
  effect: "sparkleBurst",
  textTheme: "rainbow",
});
```

`addSuccessToast(emoji, text, options?)` / `addFailureToast(emoji, text, options?)`
append to the shared pool (duplicates of the same emoji+text pair are
ignored). `options` is optional and accepts:

| Option      | Type   | Description                                                             |
| ----------- | ------ | ------------------------------------------------------------------------ |
| `image`     | string | 🖼️ An image URL shown (small, animated) instead of the plain emoji.     |
| `effect`    | string | 🎆 Name of a built-in particle effect layered on top, see below.        |
| `textTheme` | string | 🌈 A built-in animated text theme name, or any Tailwind text-color class. |

**Built-in `effect` names:** `kissyScatter` 💋, `sparkleBurst` ✨,
`fireBurst` 🔥, `skullRain` 💀, `tearRain` 😭, `heartBurst` ❤️,
`moneyRain` 💸, `iceShatter` ❄️, `explosionBurst` 💥, `ghostFloat` 👻,
`poopRain` 💩.

**Built-in `textTheme` names:** `rainbow` 🌈, `fire` 🔥, `ice` 🧊,
`neonPulse` 💠, `glitch` 📺, `shake` 〰️, `gold` 🥇, `toxic` ☣️, `danger` 🚨,
`pastel` 🍬.

You can also read `getRandomSuccessToast()` / `getRandomFailureToast()` or
the raw `successToasts` / `failureToasts` arrays directly if you want to
build your own picking logic.

## 🔷 TypeScript

Type declarations ship with the package — no `@types/dank-toasts` needed.
Everything above works the same in `.tsx`, with autocomplete and checking
for `effect`/`textTheme` names:

```tsx
import { ToastContainer, toastSuccess, toastFail, type ToastOptions } from "dank-toasts";
import "dank-toasts/style.css";

const options: ToastOptions = { effect: "fireBurst", textTheme: "gold" };
toastSuccess("Shipped it.", options);
```

`effect` is typed as the union of built-in effect names (`ToastEffectName`).
`textTheme` accepts the union of built-in theme names (`ToastTextTheme`) or
any other string, since a plain Tailwind class is also valid there. JS
consumers are unaffected — the library's runtime code is plain JS/JSX and
doesn't require a TypeScript build step.

## 🌙 Dark mode

The bubble checks `localStorage.theme === "dark"` to decide its
background/border colors. Set `localStorage.theme = "dark"` in your app
when dark mode is active (or ignore this if you always render in light
mode — it falls back to light styling everywhere else, including during
server-side rendering).

## 🛠️ Development

```bash
npm install
npm run build   # builds dist/ (JS bundles via Rollup + CSS via Tailwind)
```

- `npm run build:js` — bundles `src/index.js` into CJS (`dist/dank-toasts.cjs.js`)
  and ESM (`dist/dank-toasts.mjs`) with Rollup, treating `react`,
  `react-dom`, and `motion` as external peer dependencies.
- `npm run build:css` — compiles `src/style.css` with the Tailwind CLI,
  scanning `src/**/*.{js,jsx}` for the utility classes actually used, into
  `dist/style.css`.
- `npm run build:types` — copies the hand-written `src/index.d.ts` and
  `src/style.css.d.ts` into `dist/`.
- `npm run typecheck` — type-checks `test-types/smoke.tsx` against the
  built declarations (via `dist`), as a regression check that the shipped
  types still match the public API.

## 📄 License

MIT — see [LICENSE](./LICENSE). 💛
