import { Config } from "tailwindcss";

import * as daisyui from "daisyui";
import tailwindTypography from "@tailwindcss/typography";

export default <Config>{
  content: [
    `components/**/*.{vue,js}`,
    `layouts/**/*.vue`,
    `pages/**/*.vue`,
    `composables/**/*.{js,ts}`,
    `plugins/**/*.{js,ts}`,
    `App.{js,ts,vue}`,
    `app.{js,ts,vue}`,
  ],
  theme: {
    extend: {},
  },
  plugins: [tailwindTypography, daisyui],
};
