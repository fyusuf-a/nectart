/** @type {import('tailwindcss').Config} */
import { fontFamily } from "tailwindcss/defaultTheme";
import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

function typographicScale(octave = 0, note = 0, negative = false) {
  return `calc(${negative ? '-' : ''}1rem * ${Math.pow(2, octave)} * ${Math.pow(2, note / 3)})`;
}

const config: Config = {
  darkMode: ["class"],
  content: ["./src/**/*.{html,js,svelte,ts}"],
  safelist: ["dark"],
        plugins: [
          plugin(function({ addUtilities }) {
            for (let octave = -5; octave < 10; octave++) {
              for (let note = 0; note < 3; note++) {
                addUtilities(
                  {
                    [`.bottom-scale-${octave}-${note}`]: {
                      bottom: typographicScale(octave, note, true),
                    },
                    [`.top-scale-${octave}-${note}`]: {
                      top: typographicScale(octave, note),
                    },
                    [`.border-scale-${octave}-${note}`]: {
                      borderWidth: typographicScale(octave, note),
                    },
                    [`.text-scale-${octave}-${note}`]: {
                      fontSize: typographicScale(octave, note),
                    },
                    [`.w-scale-${octave}-${note}`]: {
                      width: typographicScale(octave, note),
                    },
                    [`.h-scale-${octave}-${note}`]: {
                      height: typographicScale(octave, note),
                    },
                    [`.gap-scale-${octave}-${note}`]: {
                      gap: typographicScale(octave, note),
                    },
                    [`.p-scale-${octave}-${note}`]: {
                      padding: typographicScale(octave, note),
                    },
                    [`.m-scale-${octave}-${note}`]: {
                      margin: typographicScale(octave, note),
                    },
                  },
                );
                for (const side of ["t", "r", "b", "l"]) {
                  const sideName = side === "t" ? "top" : side === "r" ? "right" : side === "b" ? "bottom" : "left";
                  addUtilities(
                    {
                      [`.m${side}-scale-${octave}-${note}`]: {
                        [`margin-${sideName}`]: typographicScale(octave, note),
                      },
                      [`.p${side}-scale-${octave}-${note}`]: {
                        [`padding-${sideName}`]: typographicScale(octave, note),
                      },
                    },
                  );
                }
                for (const side of ["x", "y"]) {
                  const sideNames = side === "x" ? ["left", "right"] : ["top", "bottom"];
                  addUtilities(
                    {
                      [`.m${side}-scale-${octave}-${note}`]: {
                        [`margin-${sideNames[0]}`]: typographicScale(octave, note),
                        [`margin-${sideNames[1]}`]: typographicScale(octave, note),
                      },
                      [`.p${side}-scale-${octave}-${note}`]: {
                        [`padding-${sideNames[0]}`]: typographicScale(octave, note),
                        [`padding-${sideNames[1]}`]: typographicScale(octave, note),
                      },
                    },
                  );
                }
              }
            }
          }),
        ],
  theme: {
    fontFamily: {
      sans: ["Avantt", 'sans-serif'],
      serif: ["Saol Display", 'serif'],
      body: ["Avantt", 'sans-serif'],
    },

    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px"
      }
    },
    extend: {
      colors: {
        border: "hsl(var(--border) / <alpha-value>)",
        input: "hsl(var(--input) / <alpha-value>)",
        ring: "hsl(var(--ring) / <alpha-value>)",
        background: "hsl(var(--background) / <alpha-value>)",
        foreground: "hsl(var(--foreground) / <alpha-value>)",
        primary: {
          DEFAULT: "hsl(0, 0%, 100%)", // White background
          foreground: "hsl(0, 0%, 0%)" // Black text
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary) / <alpha-value>)",
          foreground: "hsl(var(--secondary-foreground) / <alpha-value>)"
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive) / <alpha-value>)",
          foreground: "hsl(var(--destructive-foreground) / <alpha-value>)"
        },
        muted: {
          DEFAULT: "hsl(var(--muted) / <alpha-value>)",
          foreground: "hsl(var(--muted-foreground) / <alpha-value>)"
        },
        accent: {
          DEFAULT: "hsl(var(--accent) / <alpha-value>)",
          foreground: "hsl(var(--accent-foreground) / <alpha-value>)"
        },
        popover: {
          DEFAULT: "hsl(var(--popover) / <alpha-value>)",
          foreground: "hsl(var(--popover-foreground) / <alpha-value>)"
        },
        card: {
          DEFAULT: "hsl(var(--card) / <alpha-value>)",
          foreground: "hsl(var(--card-foreground) / <alpha-value>)"
        }
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "0.375rem", // Adjusted to match the image (6px)
        sm: "calc(var(--radius) - 4px)"
      },
      fontFamily: {
        sans: [...fontFamily.sans]
      }
    }
  },
};

export default config;
