# Project State

## Development baseline

- Canonical branch: `main`
- Published source baseline: `0.2.0`
- Current work: local `0.3.0` development — three new Free blocks

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

## GB-0.3.0-03 final release candidate

- Release metadata is normalized to `0.3.0`; the unpublished `0.2.1` RC was
  never published. Existing block schema metadata remains compatibility-safe.
- `readme.txt` now describes all 13 Free blocks, includes the 0.3.0 changelog,
  uses five directory-compatible tags, and has a compliant short description.
- Exact RC: `/home/openclaw/projects/genialsouls/release-candidates/genial-blocks-0.3.0.zip`
  — 104016 bytes, 127 files, SHA-256
  `fd6a1d899c9f459d335c8ae9f2ea2b7626119e1f41e5cff1b871e1c07b9e47ea`.
- Exact RC installation on WordPress 7.1.1 / PHP 8.3.6 passed activation,
  13/13 registration, all-block HTTP rendering, asset loading, and Plugin
  Check with zero errors and zero warnings.
- The all-13-block fixture parsed and round-tripped exactly. The preserved
  0.2.0 showcase fixture also round-tripped exactly with paired markers,
  17 Advanced Heading instances, and 2 Container instances.
- Exact-RC responsive smoke passed at 1440, 768, 375, and 320px with no
  overflow. Countdown future instances decremented independently; expired
  instances clamped to zero and displayed completion state without browser
  exceptions.
- Prior Chrome-based frontend evidence remains under
  `/home/openclaw/projects/genialsouls/qa/gb-0.3.0-02/`. Final authenticated
  editor MediaUpload and keyboard-only checks remain owner/manual gates because
  the disposable lab browser session expired during this phase; no claim of
  those editor interactions is made here.
- Read-only WordPress.org SVN inspection found trunk/readme.txt at revision
  3722273 and tags/0.2.0/readme.txt both still advertise Stable tag 0.2.0 and
  the older 10-block-era description. Publication must update the intended
  trunk/tag paths deliberately; no SVN mutation was made.
- Remaining publication steps: owner approval, then a separate authorized
  WordPress.org SVN/GitHub publication phase and final public listing checks.

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

## GB-0.3.0-01 development

- The unpublished 0.2.1 RC is superseded as a publication target; its
  Advanced Heading and Container fixes remain in the development baseline.
- Three Free blocks are being added: `genial-blocks/testimonial`,
  `genial-blocks/team-member`, and `genial-blocks/countdown`.
- The unused `Domain Path: /languages` header was removed after Plugin Check
  reported that the directory is not shipped; `Text Domain` remains unchanged.
- Final 0.3.0 release metadata and publication packaging remain deferred.

### Implementation checkpoint

- Testimonial supports quote, author metadata, optional avatar, rating,
  alignment, color, border, radius, and spacing controls.
- Team Member supports image, name, designation, biography, extensible social
  links, alignment, color, border, radius, and spacing controls.
- Countdown stores an ISO 8601 target with explicit UTC guidance, clamps at
  zero, stops its interval on completion, supports multiple instances, and
  exposes a non-live timer representation for assistive technology.
- Native lab validation passed on WordPress 7.1.1 / PHP 8.3.6: activation,
  13/13 registration, saved-content parsing, HTTP 200 rendering, and asset
  loading. Plugin Check reported no errors after removing the unused Domain
  Path header.

## GB-0.3.0-02 QA and polish

- Installed Chrome 154 through the existing native lab path with Playwright;
  no browser provisioning or gateway restart was required.
- Fresh Gutenberg-created Testimonial, Team Member, and Countdown content
  reloaded without Invalid Block, recovery, console, or page errors.
- The Testimonial save contract was corrected so role and company are emitted
  as their declared scoped HTML selectors; this preserves those fields on
  editor reload.
- Default frontend fallback surfaces were improved without changing attribute
  defaults: Testimonial and Team Member use restrained neutral surfaces, and
  Countdown units use soft blue surfaces and borders.
- Frontend QA passed at 1440, 1024, 768, 375, and 320px with no horizontal
  overflow or console errors. Countdown instances decremented independently,
  reached zero for expired targets, and displayed completion state.
- Plugin Check passed with no errors after aligning the local development
  readme Stable tag with the existing plugin header (`0.2.1`). This is local
  development metadata; 0.3.0 release normalization remains deferred.
- QA screenshots are stored outside the plugin tree under
  `/home/openclaw/projects/genialsouls/qa/gb-0.3.0-02/`.
