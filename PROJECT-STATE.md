# Project State

## Development baseline

- Canonical branch: `main`
- Published source baseline: `0.2.0`
- Current work: local `0.2.1` frontend contract fixes

## GB-0.2.1-01 findings

- Container direction values are semantic (`horizontal` / `vertical`) at the
  block-control boundary and CSS values (`row` / `column`) at the frontend
  boundary.
- Advanced Heading typography and color must be owned by the semantic heading
  element inside the block so theme `h1`–`h6` rules cannot replace configured
  values.
- Counter independent number/label typography remains deferred.
- Container `content` width fallback remains `800px`; width/default UX is a
  separate follow-up and is intentionally unchanged.
