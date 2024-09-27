// tailwind-plugins.ts
import plugin from 'tailwindcss/plugin';

const customPlugins = plugin(function({ addUtilities }) {
  const newUtilities = {
    '.unset-all': {
      all: 'unset',
    },
  };
  addUtilities(newUtilities);
});

export default customPlugins;
