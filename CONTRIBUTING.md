# Contributing to Segno

Segno is code and dataset at once. The two are contributed in different ways, and they carry different licenses.

## Setup

```bash
npm install
npm run dev
```

Before opening a pull request:

```bash
npm run lint
npm run type-check
npm run build
```

## Dataset contributions

The curated dataset lives in `lib/data/`. Every event requires:

- a valid `sourceUrl` — a primary source or a citable outlet, never an aggregator;
- a verifiable verbatim quote, when the event feeds the tone curve;
- tone (`sentiment`) only on the quote, never on the headline that sums it up.

An event without a source does not go in. If a data point is uncertain, better to leave it out and open an issue about it.

For corrections, missing sources or new data there is also the form at `/segnala`: using it instead of a pull request is fine.

## Code contributions

Bug fixes, accessibility, performance and the tests we still lack are welcome. For changes to the interface or the structure, open an issue first: the project has a precise visual direction and prefers to discuss it before reviewing code.

## DCO — signature required

Every commit must carry a `Signed-off-by` line:

```bash
git commit -s -m "Fix timeline scrub on touch devices"
```

The `-s` flag appends this to the message:

```
Signed-off-by: First Last <email@example.com>
```

Signing means you have the right to submit that contribution and that you agree to release it under the project licenses. No separate CLA is needed: the signature preserves the project's ability to reuse its own code in the future, relicensing included. Pull requests without a signature are closed, not fixed by hand.

## Licensing of contributions

- Code → [AGPL-3.0-or-later](LICENSE)
- Data, quotes and text → [CC BY 4.0](LICENSE-CONTENT)

Do not add third-party images, fonts or datasets without a compatible license and documented attribution in the file. Images with no stated provenance are rejected.

## Security

Do not open public issues: see [SECURITY.md](SECURITY.md).
