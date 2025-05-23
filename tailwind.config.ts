import type { Config } from "tailwindcss";
import typography from '@tailwindcss/typography';

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      typography: {
        DEFAULT: {
          css: {
            h1: {
              fontSize: '2rem',
              fontWeight: '700',
              marginBottom: '1rem',
            },
            h2: {
              fontSize: '1.5rem',
              fontWeight: '600',
              marginBottom: '0.75rem',
            },
            h3: {
              fontSize: '1.25rem',
              fontWeight: '600',
              marginBottom: '0.5rem',
            },
            h4: {
              fontSize: '1.125rem',
              fontWeight: '600',
              marginBottom: '0.5rem',
            },
            h5: {
              fontSize: '1rem',
              fontWeight: '600',
              marginBottom: '0.5rem',
            },
            h6: {
              fontSize: '0.875rem',
              fontWeight: '600',
              marginBottom: '0.5rem',
            },
          },
        },
      },
    },
  },
  plugins: [
    typography,
  ],
} satisfies Config;
