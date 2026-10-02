# From Data to the Ground

An interactive, dependency-free research archive for the B.Sc. Data Science field project *Analysis of Seasonal Disease Patterns Using Government Health Data*.

## Run locally

Requires Node.js 18 or newer. From this folder, run:

```sh
node server.mjs
```

Then open <http://127.0.0.1:8000>. Stop the server with `Ctrl+C`. The local server supports direct loading of every client-side route and serves the project Markdown and CSV files to the instrument explorers.

## Build

There is no compile or package-install step. The app uses browser-native HTML, CSS, SVG and JavaScript. `server.mjs` provides local hosting and route fallback; for another static host, configure unknown paths to serve `index.html` while leaving the supplied Markdown and CSV files accessible at the site root.

## Routes

- `/` — archive entry and animated five-series signal
- `/research` — question, scope and evidence boundaries
- `/data` — selectable data-lineage stages
- `/seasonality` — interactive monthly event-count comparison
- `/diseases` — five disease profiles
- `/diseases/dengue`
- `/diseases/acute-diarrheal-disease`
- `/diseases/malaria`
- `/diseases/food-poisoning`
- `/diseases/chikungunya`
- `/fieldwork` — field plan and field-to-data pipeline
- `/fieldwork/questionnaire` — source-driven questionnaire explorer
- `/fieldwork/interviews` — seven respondent profile explorer
- `/fieldwork/observation` — source-driven observation notebook
- `/evidence` — provenance classes and register explorer
- `/methodology`
- `/ethics`
- `/timeline`
- `/references`
- `/about`

## Data and evidence notes

- The monthly series on the seasonality and disease pages reproduces event-record counts from the supplied project brief. They are not incidence values. Case counts, deaths, district coverage and stability statistics were not supplied and are labeled unavailable.
- The project brief requests a 53-question explorer. `01_FIELD_WORK_QUESTIONNAIRE_FULL.md` contains 50 top-level numbered entries; the explorer preserves the supplied document and displays this discrepancy.
- The evidence CSV supplied to the project contains its header row only. No interviews, survey responses, observations or photographs are claimed as collected.
- Reference items remain marked as reference material, not primary field evidence. Planned instruments remain separately labeled.

## Verification

JavaScript syntax was checked with `node --check`. The local server returned HTTP 200 for all 20 app routes and both source documents used by the archive. Browser QA covered all routes at desktop size, all major sections at a 390 px mobile width, chart isolation/comparison/reset, questionnaire extraction, evidence filtering, and the mobile navigation overlay.
