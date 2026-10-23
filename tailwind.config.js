const v = (name) => `rgb(var(--${name}) / <alpha-value>)`;

export default {content: [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}'
],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)'],
        display: ['var(--font-display)'],
      },
      colors: {
        backdrop: v('backdrop'),
        cream: v('cream'),
        paper: v('paper'),
        ink: v('ink'),
        muted: v('muted'),
        line: {
          DEFAULT: v('line'),
          strong: v('line-strong'),
        },
        cocoa: {
          DEFAULT: v('cocoa'),
          soft: v('cocoa-soft'),
          deep: v('cocoa-deep'),
        },
        butter: {
          DEFAULT: v('butter'),
          soft: v('butter-soft'),
          deep: v('butter-deep'),
        },
        mint: {
          DEFAULT: v('mint'),
          soft: v('mint-soft'),
        },
        blush: {
          DEFAULT: v('blush'),
          soft: v('blush-soft'),
        },
        leaf: {
          DEFAULT: v('leaf'),
          deep: v('leaf-deep'),
        },
        danger: v('danger'),
      },
    },
  },
};
