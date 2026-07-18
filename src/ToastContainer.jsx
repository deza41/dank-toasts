import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { getRandomSuccessToast, getRandomFailureToast } from "./toastPools";
import { subscribeToasts } from "./toastBus";
import useToastEffects from "./hooks/useToastEffects";
import useToastTextStyles from "./hooks/useToastTextStyles";
import isDarkMode from "./utils/isDarkMode";

const AUTO_DISMISS_MS = 3200;

// Anchor + alignment classes for each of the 9 screen positions. Middle-row
// entries are translated by 50% of their own size so the stack stays
// centered on its anchor point as toasts are added/removed, growing
// symmetrically outward instead of drifting off-center.
const POSITION_CLASSES = {
  "top-left": "top-4 left-4 items-start",
  "top-center": "top-4 left-1/2 -translate-x-1/2 items-center",
  "top-right": "top-4 right-4 items-end",
  "middle-left": "top-1/2 left-4 -translate-y-1/2 items-start",
  "middle-center": "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 items-center",
  "middle-right": "top-1/2 right-4 -translate-y-1/2 items-end",
  "bottom-left": "bottom-4 left-4 items-start",
  "bottom-center": "bottom-4 left-1/2 -translate-x-1/2 items-center",
  "bottom-right": "bottom-4 right-4 items-end",
};

// Top-anchored stacks prepend new toasts (newest ends up nearest the top
// anchor); middle/bottom stacks append (newest nearest the bottom anchor,
// or nearest the center for middle - see POSITION_CLASSES comment above).
function isTopAnchored(position) {
  return position.startsWith("top-");
}

// Direction each position's toasts slide out toward on dismiss - away from
// center, toward whichever screen edge that position is anchored to.
const EXIT_OFFSETS = {
  "top-left": { x: -40 },
  "top-center": { y: -30 },
  "top-right": { x: 40 },
  "middle-left": { x: -40 },
  "middle-center": { y: -30 },
  "middle-right": { x: 40 },
  "bottom-left": { x: -40 },
  "bottom-center": { y: 30 },
  "bottom-right": { x: 40 },
};

function resolveDynamic(value, toast) {
  return typeof value === "function" ? value(toast) : value;
}

// Mount once near the root of your app. Fire toasts from anywhere with
// toastSuccess()/toastFail() (see toastBus.js) - no props required.
//
// Props (all optional):
//   position        - one of the POSITION_CLASSES keys above, default "bottom-right"
//   className       - extra classes merged onto the outer stack wrapper
//   style           - inline style merged onto the outer stack wrapper
//   toastClassName  - extra classes merged onto each toast bubble; string or (toast) => string
//   toastStyle      - inline style merged onto each toast bubble; object or (toast) => object
export default function ToastContainer({
  position = "bottom-right",
  className = "",
  style,
  toastClassName,
  toastStyle,
}) {
  const [toasts, setToasts] = useState([]);
  const { buildEffectParticles, renderEffectParticles } = useToastEffects();
  const { renderToastText } = useToastTextStyles();

  function pushToast(toast) {
    const id = `${Date.now()}-${Math.random()}`;
    const particles = buildEffectParticles(toast.effect);
    const entry = { id, particles, ...toast };
    setToasts((prev) => (isTopAnchored(position) ? [entry, ...prev] : [...prev, entry]));
    setTimeout(() => removeToast(id), AUTO_DISMISS_MS);
  }

  function removeToast(id) {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }

  useEffect(() => {
    const unsubscribe = subscribeToasts((event) => {
      const picked =
        event.variant === "success" ? getRandomSuccessToast() : getRandomFailureToast();
      pushToast({
        variant: event.variant,
        emoji: event.emoji || picked.emoji,
        text: event.message || picked.text,
        image: event.image || picked.image,
        effect: event.effect || picked.effect,
        textTheme: event.textTheme || picked.textTheme,
      });
    });
    return unsubscribe;
  }, [position]);

  const positionClasses = POSITION_CLASSES[position] || POSITION_CLASSES["bottom-right"];
  const exitOffset = EXIT_OFFSETS[position] || EXIT_OFFSETS["bottom-right"];

  return (
    <div
      className={`fixed z-[100000] flex flex-col gap-3 pointer-events-none ${positionClasses} ${className}`}
      style={style}
    >
      <AnimatePresence>
        {toasts.map((t) => (
          <motion.div
            key={t.id}
            layout
            initial={{ opacity: 0, y: 16, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, ...exitOffset, transition: { duration: 0.15 } }}
            transition={{ type: "spring", stiffness: 420, damping: 30 }}
            onClick={() => removeToast(t.id)}
            className={`relative pointer-events-auto flex items-center gap-3 rounded-full border shadow-lg px-5 py-3 cursor-pointer select-none ${
              t.variant === "success"
                ? `${isDarkMode() ? "bg-slate-700 border-emerald-800" : "bg-white border-emerald-200"}`
                : `${isDarkMode() ? "bg-slate-700 border-rose-800" : "bg-white border-rose-200"}`
            } ${resolveDynamic(toastClassName, t) || ""}`}
            style={resolveDynamic(toastStyle, t)}
          >
            {renderEffectParticles(t.effect, t.particles)}
            {t.image ? (
              <motion.img
                src={t.image}
                alt=""
                animate={{ rotate: [-8, 8, -8] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                draggable={false}
              />
            ) : (
              <span className="text-3xl leading-none">{t.emoji}</span>
            )}
            {renderToastText(t)}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
