/**
 * Feature flags for staged rollout.
 *
 * Keep `PAYMENTS_AND_ORDERS_ENABLED = false` while operating in
 * Document Verification & Checklist mode prior to government licensing.
 * Flip to `true` later to restore online payments, fee collection, and courier dispatch.
 */
export const PAYMENTS_AND_ORDERS_ENABLED = false;
