
import { initializeIcons } from '@fluentui/react';

import '../src/index.css';

initializeIcons();

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}