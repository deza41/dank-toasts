import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { getRandomSuccessToast, getRandomFailureToast } from "./toastPools";
import { subscribeToasts } from "./toastBus";
import useToastEffects from "./hooks/useToastEffects";
import useToastTextStyles from "./hooks/useToastTextStyles";
import isDarkMode from "./utils/isDarkMode";

const AUTO_DISMISS_MS = 3200;

// Mount once near the root of your app. Fire toasts from anywhere with
// toastSuccess()/toastFail() (see toastBus.js) - no props required.
export default function ToastContainer() {
  const [toasts, setToasts] = useState([]);
  const { buildEffectParticles, renderEffectParticles } = useToastEffects();
  const { renderToastText } = useToastTextStyles();

  function pushToast(toast) {
    const id = `${Date.now()}-${Math.random()}`;
    const particles = buildEffectParticles(toast.effect);
    setToasts((prev) => [...prev, { id, particles, ...toast }]);
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
  }, []);

  return (
    <div className="fixed bottom-4 right-4 z-[100000] flex flex-col items-end gap-3 pointer-events-none">
      <AnimatePresence>
        {toasts.map((t) => (
          <motion.div
            key={t.id}
            layout
            initial={{ opacity: 0, y: 16, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, x: 40, scale: 0.9, transition: { duration: 0.15 } }}
            transition={{ type: "spring", stiffness: 420, damping: 30 }}
            onClick={() => removeToast(t.id)}
            className={`relative pointer-events-auto flex items-center gap-3 rounded-full border shadow-lg px-5 py-3 cursor-pointer select-none ${
              t.variant === "success"
                ? `${isDarkMode() ? "bg-slate-700 border-emerald-800" : "bg-white border-emerald-200"}`
                : `${isDarkMode() ? "bg-slate-700 border-rose-800" : "bg-white border-rose-200"}`
            }`}
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
