# Outbreak Temporal Map

This is your Faces project exported as a standalone React app (Vite + Tailwind CSS).

## Getting started

```bash
npm install
npm run dev
```

Then open the printed local URL. `npm run build` creates a production build in `dist/`.

## Project structure

- `src/faces/<faceId>/face.tsx`: one React component per slide ("face"), with its content in `face.content.json` and styling controls in `face.controls.json`.
- `src/app/page.tsx`: the generated entry that stacks your faces into the presentation layout.
- `src/components` and `src/utils`: the runtime that renders layouts, navigation, and slide scaling.
- `src/index.css`: base styles and design tokens; Tailwind utility classes are generated from your face code.

## Notes

- Interactive plugins that relied on hosted services (form submissions, AI presenter) are stubbed out and will not function.
- Some npm packages used by your faces are installed at their latest versions; pin them in `package.json` if needed.
