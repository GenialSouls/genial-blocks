# Building Genial Blocks 0.1.0

Run these commands from the repository root with Node.js 18 or newer and npm
6.14.4 or newer:

```bash
npm ci --ignore-scripts --no-audit --no-fund
npm run build
```

The pinned development tools are `@wordpress/scripts` 27.9.0 and TypeScript
5.7.3. `package-lock.json` records the complete dependency tree. The build uses
the WordPress Scripts webpack/Sass/PostCSS pipeline and writes generated assets
to:

```text
build/blocks/advanced-heading/
build/blocks/advanced-button/
```

The build command runs `scripts/flatten-block-metadata.js` after each block so
the generated `block.json` is beside the compiled assets. WordPress loads the
compiled files from `build/blocks/`; the human-readable implementation remains
under `src/`.

The editor dependencies are WordPress-provided externals declared in the
generated `index.asset.php` files. No third-party runtime library is bundled by
this plugin.
