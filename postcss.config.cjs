// Lets Storybook's Vite dev server process the @tailwind directives in
// src/style.css on the fly (the published package instead ships the
// pre-built dist/style.css from `npm run build:css`, which doesn't need this).
module.exports = {
  plugins: {
    tailwindcss: {},
  },
};
