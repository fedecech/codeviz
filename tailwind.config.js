module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      typography: (theme) => ({
        DEFAULT: {
          css: {
            pre: {
              backgroundColor: theme("colors.gray.100")
            },
            code: {
              backgroundColor: theme("colors.gray.100"),
            },
          }
        },
        dark: {
          css: {
            pre: {
              backgroundColor: theme("colors.gray.500"),
            },
            code: {
              backgroundColor: theme("colors.gray.500"),
              color: theme('colors.primary'),
            },
            color: theme('colors.primary'),
            a: {
              color: theme('colors.green.500'),
              '&:hover': {
                color: theme('colors.green.500'),
              },
            },

            h1: {
              color: theme('colors.primary'),
            },
            h2: {
              color: theme('colors.primary'),
            },
            h3: {
              color: theme('colors.primary'),
            },
            h4: {
              color: theme('colors.primary'),
            },
            h5: {
              color: theme('colors.primary'),
            },
            h6: {
              color: theme('colors.primary'),
            },

            strong: {
              color: theme('colors.primary'),
            },
            figcaption: {
              color: theme('colors.gray.500'),
            },
          },
        },
      }),
    },
  },
  variants: {
    extend: {
      typography: ['dark']
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
