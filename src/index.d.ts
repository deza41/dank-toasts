import type { FC } from "react";

/** Built-in particle effect names registered in hooks/useToastEffects.jsx. */
export type ToastEffectName =
  | "kissyScatter"
  | "sparkleBurst"
  | "fireBurst"
  | "skullRain"
  | "tearRain"
  | "heartBurst"
  | "moneyRain"
  | "iceShatter"
  | "explosionBurst"
  | "ghostFloat"
  | "poopRain";

/**
 * Built-in animated text theme names registered in hooks/useToastTextStyles.jsx.
 * Any other string is also accepted as a plain Tailwind text-color class
 * (e.g. "text-purple-600").
 */
export type ToastTextTheme =
  | "rainbow"
  | "fire"
  | "ice"
  | "neonPulse"
  | "glitch"
  | "shake"
  | "gold"
  | "toxic"
  | "danger"
  | "pastel"
  | (string & {});

export interface ToastOptions {
  /** Image URL shown (small, animated) instead of the plain emoji. */
  image?: string;
  /** Name of a built-in particle effect layered on top. */
  effect?: ToastEffectName;
  /** Built-in animated text theme name, or any Tailwind text-color class. */
  textTheme?: ToastTextTheme;
  /** Overrides the emoji picked from the pool. */
  emoji?: string;
}

export interface ToastPoolEntry extends ToastOptions {
  emoji: string;
  text: string;
}

/** Mount once, near the root of your app. Takes no required props. */
export declare const ToastContainer: FC;

/**
 * Fires a success toast from anywhere in your app. Omit `message` (or any
 * option) to fall back to a random pick from the success pool.
 */
export declare function toastSuccess(message?: string, options?: ToastOptions): void;

/**
 * Fires a failure toast from anywhere in your app. Omit `message` (or any
 * option) to fall back to a random pick from the failure pool.
 */
export declare function toastFail(message?: string, options?: ToastOptions): void;

/** Registers a new entry in the success pool. Duplicate emoji+text pairs are ignored. */
export declare function addSuccessToast(emoji: string, text: string, options?: ToastOptions): void;

/** Registers a new entry in the failure pool. Duplicate emoji+text pairs are ignored. */
export declare function addFailureToast(emoji: string, text: string, options?: ToastOptions): void;

export declare function getRandomSuccessToast(): ToastPoolEntry;

export declare function getRandomFailureToast(): ToastPoolEntry;

export declare const successToasts: ToastPoolEntry[];

export declare const failureToasts: ToastPoolEntry[];
