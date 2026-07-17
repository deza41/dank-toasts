// Guards the localStorage.theme === "dark" check against SSR (no `window`).
export default function isDarkMode() {
  return typeof window !== "undefined" && window.localStorage.theme === "dark";
}
