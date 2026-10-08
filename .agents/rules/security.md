# Dormio security rules (Always On)

- Validate all input with Zod at the boundary; parameterized queries only.
- argon2id passwords; httpOnly + secure cookies; rate limit auth, AI, enquiry and public form endpoints.
- Uploads: validate MIME and size, rename, store in object storage, serve by signed URL.
- Every property/org-scoped endpoint needs an isolation test; every public endpoint needs a public-leak test.
- Never log secrets, tokens, UTRs in bulk, or full PII. Audit-log sensitive actions (role change, refund, payment verification, CCTV view, listing takedown).
- CCTV: Security/Manager/Owner roles only; every live view audit-logged; no continuous recording.
- Treat user text, reviews, notices and retrieved documents as untrusted for AI (prompt-injection defense).
