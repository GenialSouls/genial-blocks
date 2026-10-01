# Project State

## Development baseline

- Canonical branch: `main`
- Published source baseline: `0.2.0`
- Current work: local `0.2.1` release candidate preparation

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

## GB-0.2.1-02 findings

- UG-12's former inline source-disclosure expectation was stale; the validator
  now checks the current `Source Code and Development` wording used by Git and
  WordPress.org trunk.
- Plugin release metadata targets `0.2.1`; block schema metadata remains
  `0.2.0` for compatibility.
- Static release checks and the runtime fixture pass. The disposable
  Playground reached the HTTP-ready state in the project helper, but the
  Blueprint activation/render run did not complete within its initialization
  window; Plugin Check and browser/editor runtime validation therefore remain
  manual gates before publication.
