import {
  ToastContainer,
  toastSuccess,
  toastFail,
  addSuccessToast,
  addFailureToast,
  getRandomSuccessToast,
  successToasts,
  type ToastOptions,
} from "dank-toasts";
import "dank-toasts/style.css";

// Bare mount, no props required.
const _app = <ToastContainer />;

// Positioned + custom-styled mount.
const _positioned = (
  <ToastContainer
    position="top-center"
    className="mt-2"
    style={{ zIndex: 999999 }}
    toastClassName={(t) => (t.variant === "success" ? "ring-2 ring-emerald-400" : undefined)}
    toastStyle={{ borderRadius: 12 }}
  />
);

// @ts-expect-error - unknown position should be rejected
const _badPosition = <ToastContainer position="top-outside" />;

// No-arg calls.
toastSuccess();
toastFail();

// Message + options.
toastSuccess("Shipped it.", { emoji: "🚀", effect: "fireBurst", textTheme: "gold" });
toastFail("Broke.", { effect: "skullRain" });

// Registering new pool entries.
addSuccessToast("🐢", "Slow and steady, but a W.");
addFailureToast("🧦", "Lost in the couch cushions.", { textTheme: "text-purple-600" });

// Registering a batch of pool entries.
addSuccessToast([
  { emoji: "🐢", text: "Slow and steady, but a W." },
  { emoji: "🎯", text: "Bullseye.", effect: "sparkleBurst", textTheme: "rainbow" },
]);
addFailureToast([{ emoji: "🧦", text: "Lost in the couch cushions." }]);

const entry = getRandomSuccessToast();
const _text: string = entry.text;
const _emoji: string = entry.emoji;
const _pool: typeof successToasts = successToasts;

// @ts-expect-error - unknown effect name should be rejected
toastSuccess("bad", { effect: "not-a-real-effect" });

// @ts-expect-error - addSuccessToast requires emoji and text
addSuccessToast();

const _opts: ToastOptions = { textTheme: "rainbow" };
