import React from "react";
import { motion } from "motion/react";
import isDarkMode from "../utils/isDarkMode";

// Registry of rich animated text themes a toast entry can opt into via its
// `textTheme` field in toastPools.js (e.g. { textTheme: "rainbow" }). To add
// a new one, add a key here - CornerToast doesn't need to change. Set
// `useVariantColor: true` on a theme (e.g. "shake") to keep the default
// success/failure text color instead of supplying your own.
const TEXT_THEMES = {
  rainbow: {
    className: "font-extrabold tracking-wide bg-clip-text text-transparent",
    style: {
      backgroundImage:
        "linear-gradient(90deg, #ff0000, #ff9a00, #d0de21, #4fdc4a, #3fdad8, #2fc9e2, #1c7fee, #5f15f2, #ba0cf8, #fb07d9, #ff0000)",
      backgroundSize: "200% 100%",
    },
    animate: { backgroundPosition: ["0% 50%", "200% 50%"] },
    transition: { duration: 2.5, repeat: Infinity, ease: "linear" },
  },
  fire: {
    className: "font-extrabold tracking-wide bg-clip-text text-transparent",
    style: {
      backgroundImage: "linear-gradient(90deg, #ffe259, #ffa751, #ff5f6d, #ff2e63, #ffa751, #ffe259)",
      backgroundSize: "200% 100%",
    },
    animate: { backgroundPosition: ["0% 50%", "200% 50%"] },
    transition: { duration: 1.6, repeat: Infinity, ease: "linear" },
  },
  ice: {
    className: "font-extrabold tracking-wide bg-clip-text text-transparent",
    style: {
      backgroundImage: "linear-gradient(90deg, #e0f7fa, #4dd0e1, #0288d1, #4dd0e1, #e0f7fa)",
      backgroundSize: "200% 100%",
    },
    animate: { backgroundPosition: ["0% 50%", "200% 50%"] },
    transition: { duration: 3, repeat: Infinity, ease: "linear" },
  },
  neonPulse: {
    className: "font-extrabold tracking-wide text-cyan-400",
    animate: {
      textShadow: [
        "0 0 4px #22d3ee, 0 0 10px #22d3ee",
        "0 0 12px #22d3ee, 0 0 26px #22d3ee",
        "0 0 4px #22d3ee, 0 0 10px #22d3ee",
      ],
    },
    transition: { duration: 1.2, repeat: Infinity, ease: "easeInOut" },
  },
  glitch: {
    className: "font-extrabold tracking-wide text-slate-900",
    animate: {
      textShadow: [
        "2px 0 #ff004c, -2px 0 #00fff9",
        "-2px 0 #ff004c, 2px 0 #00fff9",
        "2px 0 #ff004c, -2px 0 #00fff9",
      ],
      x: [0, -1, 1, 0],
    },
    transition: { duration: 0.25, repeat: Infinity, ease: "linear" },
  },
  shake: {
    useVariantColor: true,
    className: "font-bold tracking-wide",
    animate: { x: [0, -3, 3, -2, 2, 0] },
    transition: { duration: 0.5, repeat: Infinity, repeatDelay: 0.4, ease: "easeInOut" },
  },
  gold: {
    className: "font-extrabold tracking-wide bg-clip-text text-transparent",
    style: {
      backgroundImage: "linear-gradient(90deg, #fceabb, #f8b500, #fceabb, #f8b500)",
      backgroundSize: "200% 100%",
    },
    animate: { backgroundPosition: ["0% 50%", "200% 50%"] },
    transition: { duration: 2, repeat: Infinity, ease: "linear" },
  },
  toxic: {
    className: "font-extrabold tracking-wide text-lime-400",
    animate: {
      textShadow: [
        "0 0 4px #a3e635, 0 0 10px #a3e635",
        "0 0 14px #a3e635, 0 0 28px #a3e635",
        "0 0 4px #a3e635, 0 0 10px #a3e635",
      ],
    },
    transition: { duration: 1.4, repeat: Infinity, ease: "easeInOut" },
  },
  danger: {
    className: "font-extrabold tracking-wide text-red-500",
    animate: {
      textShadow: [
        "0 0 4px #ef4444, 0 0 8px #ef4444",
        "0 0 14px #ef4444, 0 0 22px #ef4444",
        "0 0 4px #ef4444, 0 0 8px #ef4444",
      ],
      scale: [1, 1.04, 1],
    },
    transition: { duration: 0.9, repeat: Infinity, ease: "easeInOut" },
  },
  pastel: {
    className: "font-extrabold tracking-wide bg-clip-text text-transparent",
    style: {
      backgroundImage: "linear-gradient(90deg, #fbc2eb, #a6c1ee, #fbc2eb)",
      backgroundSize: "200% 100%",
    },
    animate: { backgroundPosition: ["0% 50%", "200% 50%"] },
    transition: { duration: 3.5, repeat: Infinity, ease: "linear" },
  },
};

const DEFAULT_COLORS = {
  success: { light: "text-emerald-700", dark: "text-emerald-300" },
  failure: { light: "text-rose-700", dark: "text-rose-300" },
};

function defaultColorClass(variant, isDark) {
  const colors = variant === "success" ? DEFAULT_COLORS.success : DEFAULT_COLORS.failure;
  return isDark ? colors.dark : colors.light;
}

export default function useToastTextStyles() {
  // `textTheme` is either a key in TEXT_THEMES (rich/animated) or any plain
  // Tailwind class string (e.g. "text-purple-600") to use as a flat override.
  // Falls back to the default success/failure color when unset.
  function renderToastText({ variant, text, textTheme }) {
    const theme = TEXT_THEMES[textTheme];
    const isDark = isDarkMode();

    if (theme) {
      const colorClass = theme.useVariantColor ? defaultColorClass(variant, isDark) : "";
      return (
        <motion.span
          className={`text-lg whitespace-nowrap ${theme.className} ${colorClass}`}
          style={theme.style}
          animate={theme.animate}
          transition={theme.transition}
        >
          {text}
        </motion.span>
      );
    }

    const colorClass = textTheme || defaultColorClass(variant, isDark);

    return (
      <span className={`text-lg font-medium whitespace-nowrap ${colorClass}`}>
        {text}
      </span>
    );
  }

  return { renderToastText };
}
