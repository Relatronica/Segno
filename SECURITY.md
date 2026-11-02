# Security

## Reporting a vulnerability

Do not open a public issue.

Use the form at [segno.app/segnala](https://segno.app/segnala) and put "security" in the subject. Describe the problem, the steps to reproduce it, and the impact you would expect. We reply before any public disclosure; if you hear nothing within a few days, follow up on the same channel.

## Exposed surface

| Area | Notes |
| --- | --- |
| `/api/pipeline/*` | guarded by `PIPELINE_SECRET`; reads external RSS feeds |
| `/redazione` | guarded by `PIPELINE_SECRET`, excluded from robots and sitemap |
| `/api/contact` | public form, sends email via Resend |
| Netlify Blobs | store for candidates and signals in production |

Expected secrets: `PIPELINE_SECRET`, `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`. They live only in environment variables: none of these values is committed, and no `.env` should ever be.

## What is not a security issue

- The timeline is public and the code is open by design: the repository is public, so this is not an information leak.
- The dataset is citable and reusable under CC BY 4.0: copying it is not a violation.
- A mistake in the dataset is a correction, not a vulnerability: report it through the form.
