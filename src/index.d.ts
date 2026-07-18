import type { CSSProperties, FC } from "react";

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

/**
 * One of the 9 screen positions a `<ToastContainer />` stack can be
 * anchored to - `{row}-{col}` where row is `top` | `middle` | `bottom` and
 * col is `left` | `center` | `right`. `middle-center` sits at the exact
 * center of the screen.
 */
export type ToastPosition =
  | "top-left"
  | "top-center"
  | "top-right"
  | "middle-left"
  | "middle-center"
  | "middle-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";

/** The live toast entry passed to `toastClassName`/`toastStyle` callbacks. */
export interface ToastEntry extends ToastOptions {
  id: string;
  variant: "success" | "failure";
  text: string;
  emoji: string;
}

export interface ToastContainerProps {
  /** Where the toast stack is anchored on screen. @default "bottom-right" */
  position?: ToastPosition;
  /** Extra classes merged onto the outer stack wrapper. */
  className?: string;
  /** Inline style merged onto the outer stack wrapper. */
  style?: CSSProperties;
  /** Extra classes merged onto each toast bubble, or a function of the toast. */
  toastClassName?: string | ((toast: ToastEntry) => string | undefined);
  /** Inline style merged onto each toast bubble, or a function of the toast. */
  toastStyle?: CSSProperties | ((toast: ToastEntry) => CSSProperties | undefined);
}

/** Mount once, near the root of your app. All props are optional. */
export declare const ToastContainer: FC<ToastContainerProps>;

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
/** Registers a batch of entries in the success pool. Duplicate emoji+text pairs are ignored. */
export declare function addSuccessToast(entries: ToastPoolEntry[]): void;

/** Registers a new entry in the failure pool. Duplicate emoji+text pairs are ignored. */
export declare function addFailureToast(emoji: string, text: string, options?: ToastOptions): void;
/** Registers a batch of entries in the failure pool. Duplicate emoji+text pairs are ignored. */
export declare function addFailureToast(entries: ToastPoolEntry[]): void;

export declare function getRandomSuccessToast(): ToastPoolEntry;

export declare function getRandomFailureToast(): ToastPoolEntry;

export declare const successToasts: ToastPoolEntry[];

export declare const failureToasts: ToastPoolEntry[];
