import React from "react";
import ToastContainer from "./ToastContainer";
import { toastSuccess, toastFail } from "./toastBus";

const POSITIONS = [
  "top-left",
  "top-center",
  "top-right",
  "middle-left",
  "middle-center",
  "middle-right",
  "bottom-left",
  "bottom-center",
  "bottom-right",
];

const EFFECTS = [
  "kissyScatter",
  "sparkleBurst",
  "fireBurst",
  "skullRain",
  "tearRain",
  "heartBurst",
  "moneyRain",
  "iceShatter",
  "explosionBurst",
  "ghostFloat",
  "poopRain",
];

const TEXT_THEMES = [
  "rainbow",
  "fire",
  "ice",
  "neonPulse",
  "glitch",
  "shake",
  "gold",
  "toxic",
  "danger",
  "pastel",
];

const buttonClass =
  "px-3 py-2 rounded-md border border-slate-300 bg-white text-sm font-medium " +
  "hover:bg-slate-50 cursor-pointer";

function FireButtons({ effect, textTheme }) {
  const opts = {};
  if (effect) opts.effect = effect;
  if (textTheme) opts.textTheme = textTheme;
  return (
    <div className="flex flex-wrap gap-3">
      <button className={buttonClass} onClick={() => toastSuccess(undefined, opts)}>
        🎉 Fire success
      </button>
      <button className={buttonClass} onClick={() => toastFail(undefined, opts)}>
        💀 Fire failure
      </button>
    </div>
  );
}

export default {
  title: "ToastContainer",
  component: ToastContainer,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Mount once near the root of your app, then fire toasts imperatively from " +
          "anywhere with `toastSuccess()` / `toastFail()`. These stories fire toasts " +
          "from on-canvas buttons since the container itself renders nothing until a " +
          "toast comes in over the shared bus.",
      },
    },
  },
  argTypes: {
    position: { control: "select", options: POSITIONS },
    className: { control: "text" },
    toastClassName: { control: "text" },
  },
  args: {
    position: "bottom-right",
  },
};

// Single container, fully controlled via the Controls panel below - try
// switching `position` and re-firing a toast to see it land in the new spot.
export const Playground = {
  render: (args) => (
    <div className="min-h-[70vh] p-8 font-sans">
      <p className="mb-4 text-slate-600">
        Fire a toast, then use the Controls panel to change <code>position</code>,{" "}
        <code>className</code>, or <code>toastClassName</code> and fire again.
      </p>
      <FireButtons />
      <ToastContainer {...args} />
    </div>
  ),
};

// All 9 anchors mounted at once. toastSuccess()/toastFail() broadcast to
// every mounted <ToastContainer />, so one click fires a toast in all nine
// spots simultaneously - the fastest way to eyeball every position at once.
export const AllPositions = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="min-h-[100vh] p-8 font-sans">
      <p className="mb-4 text-slate-600">
        One toast bus, nine containers - firing a toast lands it in every corner,
        edge-center, and dead-center of the screen at once.
      </p>
      <FireButtons />
      {POSITIONS.map((position) => (
        <ToastContainer key={position} position={position} />
      ))}
    </div>
  ),
};

// Demonstrates toastClassName/toastStyle - here as a function of the toast,
// so success/failure bubbles get different overrides.
export const CustomStyling = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="min-h-[70vh] p-8 font-sans">
      <p className="mb-4 text-slate-600">
        <code>toastClassName</code> and <code>toastStyle</code> here are functions of the
        toast, ringing success bubbles emerald and failure bubbles rose, plus a bigger
        border radius via <code>toastStyle</code>.
      </p>
      <FireButtons />
      <ToastContainer
        position="top-center"
        toastClassName={(t) => (t.variant === "success" ? "ring-2 ring-emerald-400" : "ring-2 ring-rose-400")}
        toastStyle={{ borderRadius: 12 }}
      />
    </div>
  ),
};

// Runs through every built-in particle effect and text theme against a
// single container - handy for eyeballing the full catalog quickly.
export const EffectsAndThemes = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="min-h-[100vh] p-8 font-sans">
      <div className="mb-6">
        <h3 className="mb-2 font-semibold text-slate-700">Effects</h3>
        <div className="flex flex-wrap gap-2">
          {EFFECTS.map((effect) => (
            <button
              key={effect}
              className={buttonClass}
              onClick={() => toastSuccess(effect, { effect })}
            >
              {effect}
            </button>
          ))}
        </div>
      </div>
      <div>
        <h3 className="mb-2 font-semibold text-slate-700">Text themes</h3>
        <div className="flex flex-wrap gap-2">
          {TEXT_THEMES.map((textTheme) => (
            <button
              key={textTheme}
              className={buttonClass}
              onClick={() => toastSuccess(textTheme, { textTheme })}
            >
              {textTheme}
            </button>
          ))}
        </div>
      </div>
      <ToastContainer position="bottom-right" />
    </div>
  ),
};
