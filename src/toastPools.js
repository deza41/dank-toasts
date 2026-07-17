// Pools of emoji+message pairs used by the corner toasts (successToast/failureToast).
// Each entry pairs a specific emoji with its specific message, so add new ones
// via addSuccessToast(emoji, text, options)/addFailureToast(emoji, text, options) -
// the pools are shared, mutable arrays. `options` is optional and can carry:
//   - image: an imported image shown (small, animated) instead of the plain emoji
//   - effect: name of an extra particle animation to layer on, e.g. "kissyScatter"
//     (see hooks/useToastEffects.jsx to add more)
//   - textTheme: either a registered animated theme name (e.g. "rainbow") or a
//     plain Tailwind class string to color the message text
//     (see hooks/useToastTextStyles.jsx to add more themes)

export const successToasts = [
  { emoji: "💅", text: "Slay queen!", effect: "kissyScatter", textTheme: "rainbow" },
  { emoji: "✨", text: "Absolutely iconic." },
  { emoji: "👑", text: "You ate that." },
  { emoji: "🎉", text: "Serving excellence.", effect: "sparkleBurst" },
  { emoji: "🥳", text: "Main character energy." },
  { emoji: "🔥", text: "Nailed it.", effect: "fireBurst", textTheme: "fire" },
  { emoji: "💯", text: "Chef's kiss." },
  { emoji: "😎", text: "No notes." },
  { emoji: "🙌", text: "Ate and left no crumbs." },
  { emoji: "🎊", text: "Certified banger.", effect: "sparkleBurst" },
  { emoji: "🧑‍🍳", text: "Let him cook.", textTheme: "shake" },
  { emoji: "🚽", text: "Skibidi rizz activated." },
  { emoji: "🗿", text: "Certified sigma grindset." },
  { emoji: "🍔", text: "That's bussin fr fr." },
  { emoji: "🧢", text: "No cap, straight fire." },
  { emoji: "🏆", text: "That's a dub.", textTheme: "neonPulse" },
  { emoji: "📝", text: "Understood the assignment." },
  { emoji: "🎬", text: "It's giving main character." },
  { emoji: "😼", text: "Rizzler behavior." },
  { emoji: "🥶", text: "Sheeeesh.", textTheme: "ice" },
  { emoji: "🐐", text: "Goated with the sauce." },
  { emoji: "🏠", text: "Living rent free in my head." },
  { emoji: "✅", text: "That's a certified W." },
  { emoji: "🧠", text: "Big brain move." },
  { emoji: "🌽", text: "Ohio final boss energy... in a good way." },
  { emoji: "🦍", text: "Gorilla grindset unlocked." },
  { emoji: "🛞", text: "Absolute unit." },
  { emoji: "💸", text: "Bag secured.", effect: "moneyRain", textTheme: "gold" },
  { emoji: "💰", text: "Big W energy.", textTheme: "gold" },
  { emoji: "❤️", text: "Real ones only.", effect: "heartBurst" },
  { emoji: "💖", text: "Wholesome W.", effect: "heartBurst" },
  { emoji: "❄️", text: "Ice in my veins.", effect: "iceShatter", textTheme: "ice" },
  { emoji: "💥", text: "Absolutely obliterated it.", effect: "explosionBurst" },
  { emoji: "⚡", text: "Zero to hero." },
  { emoji: "🍀", text: "Lucky sigma." },
  { emoji: "🐍", text: "Sneaky big brain." },
  { emoji: "🦾", text: "Built different." },
  { emoji: "🌈", text: "Vibes immaculate.", textTheme: "pastel" },
  { emoji: "🥇", text: "Gold standard.", textTheme: "gold" },
];

export const failureToasts = [
  { emoji: "😭", text: "It's not fair!", effect: "tearRain" },
  { emoji: "💀", text: "Big oof.", effect: "skullRain" },
  { emoji: "😩", text: "That ain't it." },
  { emoji: "😬", text: "Not the vibe." },
  { emoji: "🫠", text: "Rough one." },
  { emoji: "😞", text: "Yikes..." },
  { emoji: "🥲", text: "Send help.", effect: "tearRain" },
  { emoji: "😵", text: "Well, that happened." },
  { emoji: "😨", text: "This is not it chief." },
  { emoji: "🚽", text: "Skibidi toilet moment." },
  { emoji: "🌽", text: "This is so Ohio.", textTheme: "glitch" },
  { emoji: "📉", text: "L + ratio.", textTheme: "shake" },
  { emoji: "🤨", text: "That's sus." },
  { emoji: "🤡", text: "Goofy ahh moment." },
  { emoji: "🚫", text: "Zero rizz detected." },
  { emoji: "🤖", text: "NPC energy fr." },
  { emoji: "✂️", text: "Low taper fade energy." },
  { emoji: "🍗", text: "Fanum taxed my hopes and dreams." },
  { emoji: "🗿", text: "Sigma has left the chat.", effect: "skullRain" },
  { emoji: "😵‍💫", text: "Delulu is not the solulu.", textTheme: "glitch" },
  { emoji: "🧠", text: "Brainrot took the wheel." },
  { emoji: "📸", text: "Caught in 4K being mid." },
  { emoji: "😐", text: "Mid. Just mid." },
  { emoji: "⚖️", text: "Ratio'd by reality." },
  { emoji: "🥋", text: "L take, ratio incoming." },
  { emoji: "🧊", text: "Cooked. Absolutely cooked.", textTheme: "ice" },
  { emoji: "👻", text: "Sigma has left the chat... again.", effect: "ghostFloat" },
  { emoji: "💩", text: "That's a whole mess.", effect: "poopRain" },
  { emoji: "☠️", text: "Absolutely deceased.", effect: "skullRain" },
  { emoji: "🧟", text: "Brain rot final form.", textTheme: "toxic" },
  { emoji: "🐌", text: "Slower than dial-up." },
  { emoji: "🚨", text: "Code red fr.", textTheme: "danger" },
  { emoji: "🥴", text: "That's not it, chief." },
  { emoji: "🫥", text: "Ghosted by success.", effect: "ghostFloat" },
  { emoji: "📵", text: "No signal, no rizz." },
  { emoji: "🪦", text: "RIP to that plan.", effect: "skullRain" },
];

function pickRandom(pool) {
  return pool[Math.floor(Math.random() * pool.length)];
}

function addPair(pool, emoji, text, options = {}) {
  if (!emoji || !text) return;
  if (pool.some((pair) => pair.emoji === emoji && pair.text === text)) return;
  pool.push({ emoji, text, ...options });
}

// options: { image, effect, textTheme } - all optional, see file header.
export function addSuccessToast(emoji, text, options) {
  addPair(successToasts, emoji, text, options);
}

export function addFailureToast(emoji, text, options) {
  addPair(failureToasts, emoji, text, options);
}

export function getRandomSuccessToast() {
  return pickRandom(successToasts);
}

export function getRandomFailureToast() {
  return pickRandom(failureToasts);
}
