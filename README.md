# dank-toasts

Brainrot-flavored corner toast notifications for React. A little emoji + text
bubble pops up bottom-right, plays a particle effect, and dismisses itself —
a less-invasive alternative to a full-screen success/failure overlay.

Animated with [Motion](https://motion.dev) (`motion/react`) and styled with
Tailwind CSS utility classes.

## Install

```bash
npm install dank-toasts motion react react-dom
```

`motion`, `react`, and `react-dom` are peer dependencies — install them
alongside the package.

## Setup

1. Mount `<CornerToast />` once, near the root of your app, and hold its two
   trigger props (`successPing` / `failurePing`) in state.
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

## Usage

```jsx
import { useState } from "react";
import { CornerToast } from "dank-toasts";
import "dank-toasts/style.css";

export default function App() {
  const [successPing, setSuccessPing] = useState(null);
  const [failurePing, setFailurePing] = useState(null);

  function onSave() {
    setSuccessPing({ id: Date.now() });
  }

  function onError() {
    setFailurePing({ id: Date.now() });
  }

  return (
    <>
      <button onClick={onSave}>Save</button>
      <button onClick={onError}>Break something</button>

      <CornerToast successPing={successPing} failurePing={failurePing} />
    </>
  );
}
```

Bump `successPing`/`failurePing` to a **new object** (any object with a
unique `id`) each time you want to fire a toast — `CornerToast` watches for
`id` changes, not the prop reference itself.

By default it picks a random emoji/message pair from the built-in pools. You
can override any part of it per-fire:

```js
setSuccessPing({
  id: Date.now(),
  emoji: "🚀",       // override the emoji
  message: "Shipped it.", // override the text
  effect: "fireBurst",    // override the particle effect
  textTheme: "gold",      // override the text theme
});
```

## Adding your own toasts

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

| Option      | Type   | Description                                                          |
| ----------- | ------ | --------------------------------------------------------------------- |
| `image`     | string | An image URL shown (small, animated) instead of the plain emoji.      |
| `effect`    | string | Name of a built-in particle effect layered on top, see below.         |
| `textTheme` | string | A built-in animated text theme name, or any Tailwind text-color class. |

Built-in `effect` names: `kissyScatter`, `sparkleBurst`, `fireBurst`,
`skullRain`, `tearRain`, `heartBurst`, `moneyRain`, `iceShatter`,
`explosionBurst`, `ghostFloat`, `poopRain`.

Built-in `textTheme` names: `rainbow`, `fire`, `ice`, `neonPulse`, `glitch`,
`shake`, `gold`, `toxic`, `danger`, `pastel`.

You can also read `getRandomSuccessToast()` / `getRandomFailureToast()` or
the raw `successToasts` / `failureToasts` arrays directly if you want to
build your own picking logic.

## Dark mode

The bubble checks `localStorage.theme === "dark"` to decide its
background/border colors. Set `localStorage.theme = "dark"` in your app
when dark mode is active (or ignore this if you always render in light
mode — it falls back to light styling everywhere else, including during
server-side rendering).

## Development

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

## License

MIT
