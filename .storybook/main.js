import { dirname, join } from "path";
module.exports = {
  "stories": ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],

  "addons": [
    getAbsolutePath("@storybook/addon-links"),
    getAbsolutePath("@storybook/addon-essentials"),
    getAbsolutePath("@storybook/addon-interactions"),
    getAbsolutePath("@storybook/preset-create-react-app")
  ],

  "framework": getAbsolutePath("@storybook/react"),

  "core": {
    "builder": getAbsolutePath("@storybook/builder-webpack5")
  },

  docs: {
    autodocs: true
  }
}

function getAbsolutePath(value) {
  return dirname(require.resolve(join(value, "package.json")));
}