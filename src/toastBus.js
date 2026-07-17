// Minimal pub/sub so toastSuccess()/toastFail() can be called from anywhere
// (event handlers, thunks, utils) without threading state through props.
// <ToastContainer /> is the only subscriber; if it hasn't mounted yet,
// events queue up and flush to it once it subscribes.
const listeners = new Set();
let queue = [];

export function subscribeToasts(listener) {
  listeners.add(listener);
  if (queue.length) {
    queue.forEach((event) => listener(event));
    queue = [];
  }
  return () => listeners.delete(listener);
}

function emit(event) {
  if (listeners.size === 0) {
    queue.push(event);
    return;
  }
  listeners.forEach((listener) => listener(event));
}

// message is optional - omit it (or any field) to fall back to a random
// pick from the success/failure pool. options: { emoji, image, effect, textTheme }
export function toastSuccess(message, options = {}) {
  emit({ variant: "success", message, ...options });
}

export function toastFail(message, options = {}) {
  emit({ variant: "failure", message, ...options });
}
