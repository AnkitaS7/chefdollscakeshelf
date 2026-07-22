/* =============================================================
   Runs every route change inside a View Transition, so moving between
   pages cross-fades instead of cutting. Uses wouter's `aroundNav`
   escape hatch, which wraps navigation without changing the URL,
   history or scroll behaviour.

   Browsers without the API take the plain path, unchanged.
   ============================================================= */

import { flushSync } from "react-dom";
import type { AroundNavHandler } from "wouter";

type StartViewTransition = (callback: () => void) => unknown;

export const viewTransitionNav: AroundNavHandler = (navigate, to, options) => {
  const start = (
    document as Document & { startViewTransition?: StartViewTransition }
  ).startViewTransition;

  if (typeof start !== "function") {
    navigate(to, options);
    return;
  }

  // flushSync so the DOM has already updated when the browser takes its
  // "after" snapshot; without it the transition captures the old page twice.
  start.call(document, () => flushSync(() => navigate(to, options)));
};
