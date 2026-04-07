import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

/**
 * Tests for multi-page site routes and Instagram feed behavior
 * (server-side procedures only - UI routing is tested via browser)
 */

function createPublicContext(): TrpcContext {
  return {
    user: null,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: () => {},
    } as TrpcContext["res"],
  };
}

describe("instagram.feed (no credentials)", () => {
  it("returns a valid response object when no token is configured", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.instagram.feed();

    // Response shape must always be present
    expect(result).toBeDefined();
    expect(result).toHaveProperty("posts");
    expect(result).toHaveProperty("configured");
    expect(result).toHaveProperty("error");
    expect(Array.isArray(result.posts)).toBe(true);
    // When unconfigured, posts is empty (frontend renders simulated feed)
    expect(result.posts).toHaveLength(0);
  });

  it("indicates fallback mode when credentials are missing", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.instagram.feed();

    // When no token is set, configured should be false
    expect(result.configured).toBe(false);
  });

  it("returns empty posts array when unconfigured (frontend handles fallback)", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.instagram.feed();

    // When unconfigured, posts is empty - the frontend renders the simulated feed
    expect(Array.isArray(result.posts)).toBe(true);
    expect(result.configured).toBe(false);
    expect(result.error).toBeNull();
  });
});

describe("auth.me (public procedure)", () => {
  it("returns null for unauthenticated users", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.auth.me();
    expect(result).toBeNull();
  });
});
