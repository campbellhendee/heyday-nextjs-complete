# Curation

This folder contains the curation log and any interim exports used during triage.

- `log.csv` columns: `original_path,new_path,decision,reason`
- Decision values: `keep`, `exclude`
- Reasons (examples): `duplicate`, `blurry`, `backlit`, `low-res`, `near-duplicate`

The app never serves content from `_curation/` or `_staging_raw/`. Only curated images under `gallery/*` are referenced in code.
