# Debug Session: vendor-notes-write-fail

- Status: OPEN
- Started At: 2026-06-17
- Symptom: `共享廠商筆記寫入失敗，請稍後再試。`
- Scope: `/social-ops` shared vendor notes write path

## Hypotheses

1. `BLOB_READ_WRITE_TOKEN` is now present, but the token does not have write permission for the connected Blob store.
2. The Blob store is configured as private, while the code writes with `access: "public"`, causing `put()` to fail at runtime.
3. The deployed project and the Blob store are mismatched, so the write call reaches a valid token but the wrong store context.
4. The request body reaches the API, but `put()` fails because Vercel Blob runtime requirements differ between local/dev and deployed execution.
5. The API is throwing inside `writeVendorNotes()` for a specific Blob SDK error that is currently hidden by the generic catch response.

## Evidence Plan

- Add runtime instrumentation around token detection, request parsing, read-before-write, and `put()` failure details.
- Reproduce the failing save once after deployment.
- Compare the returned error evidence to the five hypotheses above.
