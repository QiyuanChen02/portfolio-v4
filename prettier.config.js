/**
 * @see https://prettier.io/docs/configuration
 * @type {import("prettier").Config}
 */
const config = {
  trailingComma: "es5",
  useTabs: true,
  tabWidth: 4,
  semi: false,
  singleQuote: false,
  plugins: ["prettier-plugin-astro", "prettier-plugin-tailwindcss"],
};

export default config;