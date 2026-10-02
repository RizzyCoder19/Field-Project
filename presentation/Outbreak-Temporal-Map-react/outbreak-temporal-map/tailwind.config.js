import containerQueries from "@tailwindcss/container-queries";
import typography from "@tailwindcss/typography";

/** @type {import("tailwindcss").Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {"editorial":["var(--font-editorial)","sans-serif"],"body":["var(--font-body)","sans-serif"],"mono":["var(--font-mono)","sans-serif"]},
      colors: {"border":"rgb(from var(--border) r g b / <alpha-value>)","input":"rgb(from var(--input) r g b / <alpha-value>)","ring":"rgb(from var(--ring) r g b / <alpha-value>)","background":"rgb(from var(--background) r g b / <alpha-value>)","foreground":"rgb(from var(--foreground) r g b / <alpha-value>)","primary":{"DEFAULT":"rgb(from var(--primary) r g b / <alpha-value>)","foreground":"rgb(from var(--primary-foreground) r g b / <alpha-value>)"},"secondary":{"DEFAULT":"rgb(from var(--secondary) r g b / <alpha-value>)","foreground":"rgb(from var(--secondary-foreground) r g b / <alpha-value>)"},"destructive":{"DEFAULT":"rgb(from var(--destructive) r g b / <alpha-value>)","foreground":"rgb(from var(--destructive-foreground) r g b / <alpha-value>)"},"muted":{"DEFAULT":"rgb(from var(--muted) r g b / <alpha-value>)","foreground":"rgb(from var(--muted-foreground) r g b / <alpha-value>)"},"accent":{"DEFAULT":"rgb(from var(--accent) r g b / <alpha-value>)","foreground":"rgb(from var(--accent-foreground) r g b / <alpha-value>)"},"popover":{"DEFAULT":"rgb(from var(--popover) r g b / <alpha-value>)","foreground":"rgb(from var(--popover-foreground) r g b / <alpha-value>)"},"card":{"DEFAULT":"rgb(from var(--card) r g b / <alpha-value>)","foreground":"rgb(from var(--card-foreground) r g b / <alpha-value>)"},"bone":"rgb(from var(--bone) r g b / <alpha-value>)","ink":"rgb(from var(--ink) r g b / <alpha-value>)","petrol":"rgb(from var(--petrol) r g b / <alpha-value>)","ember":"rgb(from var(--ember) r g b / <alpha-value>)","gold":"rgb(from var(--gold) r g b / <alpha-value>)","chartreuse":"rgb(from var(--chartreuse) r g b / <alpha-value>)","rule":"rgb(from var(--rule) r g b / <alpha-value>)","rule-strong":"rgb(from var(--rule-strong) r g b / <alpha-value>)","bone-deep":"rgb(from var(--bone-deep) r g b / <alpha-value>)"},
      borderRadius: {
        sm: "calc(var(--radius) - 6px)",
        DEFAULT: "calc(var(--radius) - 4px)",
        md: "calc(var(--radius) - 2px)",
        lg: "var(--radius)",
        xl: "calc(var(--radius) + 4px)",
        "2xl": "calc(var(--radius) + 8px)",
        "3xl": "calc(var(--radius) + 12px)",
      },
    },
  },
  plugins: [containerQueries, typography],
};
