# Images Directory

Place your photo assets here. The structure below is recognized by the app and our curation workflow.

```text
public/
  images/
    hero/               # hero images referenced by pages
    services/           # service card images
    blog/               # blog card thumbnail images
    gallery/
      weddings/         # curated, sequentially named gallery images
      corporate/
      private/
      daily/
    _staging_raw/       # drop original, uncurated sets here (input only)
      weddings/
      corporate/
      private/
      daily/
    _curation/
      log.csv           # curation decisions (keep/exclude, reasons), auto-appended
```

## Naming rules

- Heroes/Services/Blog: kebab-case, descriptive (e.g., `home-hero.jpg`, `weddings.jpg`).
- Galleries: category prefix + 3-digit sequence (e.g., `weddings-001.jpg`).
- Lowercase, hyphens only; no spaces; prefer `.jpg` unless there’s a reason for `.webp`.

## Workflow

1. Drop originals into `_staging_raw/<category>/`.
2. We’ll triage, dedupe, and generate a rename plan.
3. After approval, we move curated images into `gallery/<category>/` with clean names.
4. App gallery arrays reference the curated paths (not staging).
