# WebExtension Vite Starter

A [Vite](https://vitejs.dev/) powered WebExtension ([Chrome](https://developer.chrome.com/docs/extensions/reference/), [FireFox](https://addons.mozilla.org/en-US/developers/), etc.) starter template.

<p align="center">
<sub>Popup</sub><br/>
<img width="655" src="https://user-images.githubusercontent.com/11247099/126741643-813b3773-17ff-4281-9737-f319e00feddc.png"><br/>
<sub>Options Page</sub><br/>
<img width="655" src="https://user-images.githubusercontent.com/11247099/126741653-43125b62-6578-4452-83a7-bee19be2eaa2.png"><br/>
<sub>Inject React App into the Content Script</sub><br/>
<img src="https://user-images.githubusercontent.com/11247099/130695439-52418cf0-e186-4085-8e19-23fe808a274e.png">
</p>

## Features

- ⚡️ **Instant HMR** - use **Vite** on dev (no more refresh!)
- ⚛️ React - via [`preact/compat`](https://preactjs.com/guide/v10/switching-to-preact)
- 💬 Effortless communications - powered by [`webext-bridge`](https://github.com/antfu/webext-bridge)
- 🍃 [Tailwind CSS](https://tailwindcss.com/) - on-demand CSS utilities
- 🦾 [TypeScript](https://www.typescriptlang.org/) - type safe
- 🖥 Content Script - Use React even in content script
- 🌍 WebExtension - isomorphic extension for Chrome, Firefox, and others
- 📃 Dynamic `manifest.json` with full type support

## Pre-packed

### WebExtension Libraries

- [`webextension-polyfill`](https://github.com/mozilla/webextension-polyfill) - WebExtension browser API Polyfill with types
- [`webext-bridge`](https://github.com/antfu/webext-bridge) - effortlessly communication between contexts

### Vite Plugins

- [`unplugin-auto-import`](https://github.com/antfu/unplugin-auto-import) - Directly use `browser` without importing
- [`unplugin-icons`](https://github.com/antfu/unplugin-icons) - icons as components
  - [Iconify](https://iconify.design) - use icons from any icon sets [🔍Icônes](https://icones.netlify.app/)

### UI Frameworks

- [Tailwind CSS](https://github.com/tailwindlabs/tailwindcss) - utility-first CSS framework

### Coding Style

- [ESLint](https://eslint.org/) - single quotes, no semi
- [Prettier](https://prettier.io/)
  - [prettier-plugin-tailwindcss](https://github.com/tailwindlabs/prettier-plugin-tailwindcss) - automatically sorts classes

### Dev tools

- [TypeScript](https://www.typescriptlang.org/)
- [Yarn](https://yarnpkg.com/) - Package manager
- [esno](https://github.com/antfu/esno) - TypeScript / ESNext node runtime powered by esbuild
- [npm-run-all](https://github.com/mysticatea/npm-run-all) - Run multiple npm-scripts in parallel or sequential
- [web-ext](https://github.com/mozilla/web-ext) - Streamlined experience for developing web extensions

## Use the Template

### GitHub Template

[Create a repo from this template on GitHub](https://github.com/hasaniskandar/vite-preact-compat-webext/generate).

### Clone to local

If you prefer to do it manually with the cleaner git history

> If you don't have yarn installed, run: npm install --global yarn

```bash
npx degit hasaniskandar/vite-preact-compat-webext my-webext
cd my-webext
yarn
```

## Usage

### Folders

- `src` - main source.
  - `contentScript` - scripts and components to be injected as `content_script`
  - `background` - scripts for background.
  - `components` - auto-imported Vue components that shared in popup and options page.
  - `styles` - styles shared in popup and options page
  - `manifest.ts` - manifest for the extension.
- `extension` - extension package root.
  - `assets` - static assets.
  - `dist` - built files, also serve stub entry for Vite on development.
- `scripts` - development and bundling helper scripts.

### Development

```bash
yarn dev
```

Then **load extension in browser with the `extension/` folder**.

For Firefox developers, you can run the following command instead:

```bash
yarn start:firefox
```

`web-ext` auto reload the extension when `extension/` files changed.

> While Vite handles HMR automatically in the most of the case, [Extensions Reloader](https://chrome.google.com/webstore/detail/fimgfedafeadlieiabdeeaodndnlbhid) is still recommanded for cleaner hard reloading.

### Build

To build the extension, run

```bash
yarn build
```

And then pack files under `extension`, you can upload `extension.crx` or `extension.xpi` to appropriate extension store.

## Credits

This template was made based on [antfu/vitesse-webext](https://github.com/antfu/vitesse-webext), one of many [@antfu](https://github.com/antfu)'s wonderful works.

## Variations

For Vue 3, check out the [original template](https://github.com/antfu/vitesse-webext).
