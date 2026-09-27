# Genial Blocks

Public development source for **Genial Blocks 0.1.0**, a native WordPress
block-editor plugin by GenialSouls.

## Source layout

- `src/` contains the human-readable Advanced Heading and Advanced Button block
  source, metadata, editor styles, and frontend styles.
- `includes/`, `genial-blocks.php`, and `uninstall.php` contain the plugin PHP
  runtime.
- `build/blocks/` contains the generated assets distributed to WordPress. Do
  not edit generated JavaScript or CSS by hand.
- `scripts/flatten-block-metadata.js` keeps generated block metadata beside its
  compiled assets.
- `BUILDING.md` documents the reproducible build process.

This source tree corresponds to the submitted Genial Blocks 0.1.0 two-block
scope. Later development blocks are intentionally not included here.

## License

Genial Blocks is licensed under GPL-2.0-or-later. See [`LICENSE`](LICENSE).
