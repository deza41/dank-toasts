import React from "react";
import { motion } from "motion/react";

// Registry of extra particle decorations a toast entry can opt into via its
// `effect` field in toastPools.js (e.g. { emoji, text, effect: "kissyScatter" }).
// To add a new one, add a key here - CornerToast doesn't need to change.
const EFFECTS = {
  kissyScatter: {
    glyphs: ["💋"],
    count: 6,
    spawn: { leftRange: [-10, 110], topRange: [-70, 20] },
    sizeRange: [1.1, 1.8],
    durationRange: [1.3, 2.1],
    delayRange: [0, 0.6],
    animate: {
      opacity: [0, 1, 1, 0],
      scale: [0, 1, 1, 0.7],
      y: [0, -14, -26],
      rotate: [0, -12, 12, 0],
    },
  },
  sparkleBurst: {
    glyphs: ["✨", "⭐", "🌟"],
    count: 7,
    spawn: { leftRange: [-15, 115], topRange: [-60, 30] },
    sizeRange: [0.9, 1.5],
    durationRange: [0.9, 1.5],
    delayRange: [0, 0.7],
    animate: {
      opacity: [0, 1, 1, 0],
      scale: [0, 1.2, 1, 0],
      rotate: [0, 90, 180],
    },
  },
  fireBurst: {
    glyphs: ["🔥"],
    count: 6,
    spawn: { leftRange: [0, 100], topRange: [-10, 30] },
    sizeRange: [1.1, 1.7],
    durationRange: [1, 1.6],
    delayRange: [0, 0.5],
    animate: {
      opacity: [0, 1, 1, 0],
      scale: [0.4, 1, 0.8],
      y: [10, -30, -50],
    },
  },
  skullRain: {
    glyphs: ["💀"],
    count: 6,
    spawn: { leftRange: [-10, 110], topRange: [-80, -20] },
    sizeRange: [1.1, 1.7],
    durationRange: [1.2, 1.9],
    delayRange: [0, 0.7],
    animate: {
      opacity: [0, 1, 1, 0],
      scale: [0, 1, 1, 0.8],
      y: [0, 24, 46],
      rotate: [0, 15, -15, 0],
    },
  },
  tearRain: {
    glyphs: ["💧", "😭"],
    count: 5,
    spawn: { leftRange: [-5, 105], topRange: [-60, -10] },
    sizeRange: [0.9, 1.4],
    durationRange: [1.1, 1.8],
    delayRange: [0, 0.6],
    animate: {
      opacity: [0, 1, 1, 0],
      scale: [0, 1, 1, 0.8],
      y: [0, 22, 40],
    },
  },
  heartBurst: {
    glyphs: ["❤️", "💖", "💕"],
    count: 6,
    spawn: { leftRange: [-10, 110], topRange: [-60, 20] },
    sizeRange: [1, 1.6],
    durationRange: [1.1, 1.8],
    delayRange: [0, 0.6],
    animate: {
      opacity: [0, 1, 1, 0],
      scale: [0, 1, 1, 0.7],
      y: [0, -16, -30],
    },
  },
  moneyRain: {
    glyphs: ["💸", "💰"],
    count: 6,
    spawn: { leftRange: [-10, 110], topRange: [-70, -10] },
    sizeRange: [1.1, 1.6],
    durationRange: [1.2, 1.9],
    delayRange: [0, 0.7],
    animate: {
      opacity: [0, 1, 1, 0],
      scale: [0, 1, 1, 0.8],
      y: [0, 26, 48],
      rotate: [0, 20, -20, 0],
    },
  },
  iceShatter: {
    glyphs: ["❄️", "🧊"],
    count: 7,
    spawn: { leftRange: [-15, 115], topRange: [-50, 30] },
    sizeRange: [0.9, 1.5],
    durationRange: [0.9, 1.5],
    delayRange: [0, 0.6],
    animate: {
      opacity: [0, 1, 1, 0],
      scale: [0, 1.1, 1, 0.6],
      rotate: [0, 60, 120],
    },
  },
  explosionBurst: {
    glyphs: ["💥", "⚡"],
    count: 6,
    spawn: { leftRange: [0, 100], topRange: [-10, 20] },
    sizeRange: [1.2, 1.8],
    durationRange: [0.7, 1.1],
    delayRange: [0, 0.4],
    animate: {
      opacity: [0, 1, 1, 0],
      scale: [0, 1.4, 0.9],
    },
  },
  ghostFloat: {
    glyphs: ["👻"],
    count: 4,
    spawn: { leftRange: [0, 100], topRange: [-60, -10] },
    sizeRange: [1.2, 1.7],
    durationRange: [1.6, 2.2],
    delayRange: [0, 0.8],
    animate: {
      opacity: [0, 1, 1, 0],
      scale: [0, 1, 1, 0.8],
      y: [0, -10, 0, -10],
      x: [0, 8, -8, 0],
    },
  },
  poopRain: {
    glyphs: ["💩"],
    count: 5,
    spawn: { leftRange: [-10, 110], topRange: [-70, -10] },
    sizeRange: [1.1, 1.6],
    durationRange: [1.1, 1.7],
    delayRange: [0, 0.6],
    animate: {
      opacity: [0, 1, 1, 0],
      scale: [0, 1, 1, 0.8],
      y: [0, 24, 44],
      rotate: [0, -20, 20, 0],
    },
  },
};

function randomBetween([min, max]) {
  return min + Math.random() * (max - min);
}

function pickGlyph(glyphs) {
  return glyphs[Math.floor(Math.random() * glyphs.length)];
}

export default function useToastEffects() {
  function buildEffectParticles(effectName) {
    const effect = EFFECTS[effectName];
    if (!effect) return undefined;
    return Array.from({ length: effect.count }).map((_, i) => ({
      id: i,
      glyph: pickGlyph(effect.glyphs),
      left: randomBetween(effect.spawn.leftRange),
      top: randomBetween(effect.spawn.topRange),
      size: randomBetween(effect.sizeRange),
      duration: randomBetween(effect.durationRange),
      delay: randomBetween(effect.delayRange),
    }));
  }

  function renderEffectParticles(effectName, particles) {
    const effect = EFFECTS[effectName];
    if (!effect || !particles) return null;
    return particles.map((p) => (
      <motion.span
        key={p.id}
        className="absolute pointer-events-none select-none"
        style={{ left: `${p.left}%`, top: `${p.top}%`, fontSize: `${p.size}rem` }}
        initial={{ opacity: 0, scale: 0 }}
        animate={effect.animate}
        transition={{
          duration: p.duration,
          delay: p.delay,
          repeat: Infinity,
          repeatDelay: 0.3,
          ease: "easeInOut",
        }}
      >
        {p.glyph}
      </motion.span>
    ));
  }

  return { buildEffectParticles, renderEffectParticles };
}
