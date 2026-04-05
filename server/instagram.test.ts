/**
 * instagram.test.ts
 * Tests for the Instagram router - verifies the no-credentials fallback
 * and the cache/error handling paths.
 */

import { describe, it, expect, beforeEach, vi } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

// ── Minimal context (no user needed - all procedures are public) ──────────────
function makeCtx(): TrpcContext {
  return {
    user: null,
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };
}

describe("instagram.feed", () => {
  beforeEach(() => {
    // Ensure env vars are cleared before each test
    delete process.env.INSTAGRAM_ACCESS_TOKEN;
    delete process.env.INSTAGRAM_USER_ID;
  });

  it("returns configured:false and empty posts when credentials are not set", async () => {
    const caller = appRouter.createCaller(makeCtx());
    const result = await caller.instagram.feed();

    expect(result.configured).toBe(false);
    expect(result.posts).toHaveLength(0);
    expect(result.error).toBeNull();
    expect(result.cachedAt).toBeNull();
  });

  it("returns configured:true and attempts fetch when credentials are set", async () => {
    process.env.INSTAGRAM_ACCESS_TOKEN = "fake-token";
    process.env.INSTAGRAM_USER_ID = "123456789";

    // Mock global fetch to return a valid Instagram API response
    const mockFetch = vi.fn().mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        data: [
          {
            id: "post-1",
            media_url: "https://example.com/image.jpg",
            permalink: "https://www.instagram.com/p/abc123/",
            caption: "Test cake 🎂",
            timestamp: new Date().toISOString(),
            media_type: "IMAGE",
          },
        ],
      }),
    });

    vi.stubGlobal("fetch", mockFetch);

    const caller = appRouter.createCaller(makeCtx());
    const result = await caller.instagram.feed();

    expect(result.configured).toBe(true);
    expect(result.posts).toHaveLength(1);
    expect(result.posts[0]?.id).toBe("post-1");
    expect(result.posts[0]?.mediaUrl).toBe("https://example.com/image.jpg");
    expect(result.error).toBeNull();

    vi.unstubAllGlobals();
  });

  it("returns error message and empty posts when API call fails with no cache", async () => {
    process.env.INSTAGRAM_ACCESS_TOKEN = "expired-token";
    process.env.INSTAGRAM_USER_ID = "123456789";

    // Clear any cache left by the previous test
    const clearCaller = appRouter.createCaller(makeCtx());
    await clearCaller.instagram.clearCache();

    const mockFetch = vi.fn().mockResolvedValueOnce({
      ok: false,
      status: 401,
      text: async () => '{"error":{"message":"Invalid OAuth access token"}}',
    });

    vi.stubGlobal("fetch", mockFetch);

    const caller = appRouter.createCaller(makeCtx());
    const result = await caller.instagram.feed();

    expect(result.configured).toBe(true);
    expect(result.posts).toHaveLength(0);
    expect(result.error).toContain("401");

    vi.unstubAllGlobals();
  });
});

describe("instagram.clearCache", () => {
  it("returns success:true", async () => {
    const caller = appRouter.createCaller(makeCtx());
    const result = await caller.instagram.clearCache();
    expect(result.success).toBe(true);
  });
});

describe("instagram.refreshToken", () => {
  beforeEach(() => {
    delete process.env.INSTAGRAM_ACCESS_TOKEN;
  });

  it("returns success:false when no token is configured", async () => {
    const caller = appRouter.createCaller(makeCtx());
    const result = await caller.instagram.refreshToken();
    expect(result.success).toBe(false);
    expect(result.message).toContain("INSTAGRAM_ACCESS_TOKEN");
  });

  it("returns new token on successful refresh", async () => {
    process.env.INSTAGRAM_ACCESS_TOKEN = "old-token";

    const mockFetch = vi.fn().mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        access_token: "new-refreshed-token-abc",
        expires_in: 5183944,
      }),
    });

    vi.stubGlobal("fetch", mockFetch);

    const caller = appRouter.createCaller(makeCtx());
    const result = await caller.instagram.refreshToken();

    expect(result.success).toBe(true);
    expect(result.newToken).toBe("new-refreshed-token-abc");
    expect(result.expiresInDays).toBeGreaterThan(50);

    vi.unstubAllGlobals();
  });
});
