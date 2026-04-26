# Federated Archives Alliance

**Federated Archives Alliance** is a Bonfire flavour that connects and empowers public media archives worldwide. The instance enables archives to maintain their autonomy while participating in a collaborative network, allowing their collections to be discoverable and accessible across the fediverse.
The goal is to facilitate seamless sharing of movie catalogs between participating archives, with granular permission controls that respect each organization's policies. Curators, researchers, and authorized users can search across the entire federated network, create curated collections, and contribute to the curation of metadata while preserving the provenance of each item.

## Extensions
Federated Archives bundles essential extensions from [Social](https://github.com/bonfire-networks/social) and adds the following:

- [Bonfire.Pandora](https://github.com/bonfire-networks/bonfire_pandora): Integration with the [pan.do/ra](https://code.0x2620.org/0x2620/pandora) API to load, search, filter, curate, annotate movies (*You must have a working pandora instance to use this extension*)
- [Bonfire.Open.Id](https://github.com/bonfire-networks/bonfire_open_id)

### Frontend (Plyr, hooks, CSS)

- **LiveView hooks** are wired via `config/current_flavour/deps.hooks.js` (see `bonfire_live.js`), not `config/deps.hooks.js`.
- **`yarn` JS deps**: run `config/current_flavour/deps.js.sh` (includes `bonfire_pandora`) and `yarn install` in `extensions/bonfire_pandora` (root `package.json` provides `plyr` for esbuild + CSS).
- **CSS (flavour bundle)**: `assets/css/federated_archives_plyr.css` is a **generated, flat** file (no nested `@import`) so Tailwind’s `build.css` keeps Plyr + PanDoRa rules. **Regenerate** after changing Plyr version or `pandora_plyr.css`:
  - `yarn install` in `extensions/bonfire_pandora`
  - `./extensions/federated_archives/assets/css/build-federated_archives_plyr.sh`
  - Commit the updated `federated_archives_plyr.css` in this repo.
  The umbrella only needs **one** line in `assets/css/app.css`: `@import "../../extensions/federated_archives/assets/css/federated_archives_plyr.css";` — adjust the path if the extension lives under `deps/` (e.g. `../../../../deps/federated_archives/...` from `deps/bonfire_ui_common/assets/css/`).

- **Design note (Italian, bonfire_lab):** `docs_custom/bonfire_pandora/FEED_PLYR_CSS_E_INDIPENDENZA_UMBRELLA.md` — CSS feed + Typography, indipendenza delle estensioni dall’umbrella, e **`config/current_flavour/assets/hooks/Bonfire.UI.Common.PreviewContentLive.hooks.js`** (deve contenere le esclusioni click PanDoRa; il file solo sotto `extensions/federated_archives/assets/hooks/` non basta se il bundle importa il flavour).

## Releases

*No public releases yet*

## Maintainers

- @cranio_is_thinking - @faa.etna.foundation
- @ivanminutillo - @bernini@social.coop
- @mayel - @mayel@sunbeam.city

## News
- ...

## Thanks
To Jan Gerber of [0x2620.org](https://0x2620.org)

## Copyright and License

Copyright (c) 2025 Bonfire Contributors

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.

This program is distributed in the hope that it will be useful, but
WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public
License along with this program.  If not, see <https://www.gnu.org/licenses/>.
