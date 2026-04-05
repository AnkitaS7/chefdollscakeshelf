/* =============================================================
   InstagramSection — Real-time Instagram feed with graceful fallback
   
   BEHAVIOUR:
   • When INSTAGRAM_ACCESS_TOKEN + INSTAGRAM_USER_ID are set on the server,
     this section displays LIVE posts fetched from the Instagram Graph API.
   • When credentials are NOT set (default / gift state), it shows a
     beautiful simulated feed so the website never looks broken.
   
   TO ACTIVATE THE LIVE FEED:
   Add these two secrets in Manus → Settings → Secrets:
     INSTAGRAM_ACCESS_TOKEN  — long-lived token from Meta Developer Console
     INSTAGRAM_USER_ID       — numeric Instagram user ID from /me endpoint
   See server/instagramRouter.ts for the full step-by-step guide.
   ============================================================= */

import { useEffect, useRef, useState } from "react";
import {
  Instagram,
  Heart,
  MessageCircle,
  ExternalLink,
  RefreshCw,
  Wifi,
  WifiOff,
} from "lucide-react";
import { trpc } from "@/lib/trpc";

// ─── Placeholder images used when credentials are not configured ──────────────
// These are the AI-generated images created for ChefDollsCakeShelf.
// Once live credentials are set, these are replaced by real Instagram posts.
const PLACEHOLDER_POSTS = [
  {
    id: "placeholder-1",
    mediaUrl:
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663513006516/gFNz9nK7irL8AANKwrwZkG/hero-cake-gefdk8N67kM7hmNuUEyU2P.webp",
    permalink: "https://www.instagram.com/chefdollscakeshelf",
    caption: "Floral dream wedding cake ✨ Pure eggless elegance",
    timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    mediaType: "IMAGE" as const,
    likes: "1.2k",
    comments: "48",
  },
  {
    id: "placeholder-2",
    mediaUrl:
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663513006516/gFNz9nK7irL8AANKwrwZkG/custom-cake-NGNfLBTCpacv8RbEz4TQHA.webp",
    permalink: "https://www.instagram.com/chefdollscakeshelf",
    caption: "Birthday magic 🎂 Custom design with gold leaf",
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    mediaType: "IMAGE" as const,
    likes: "987",
    comments: "32",
  },
  {
    id: "placeholder-3",
    mediaUrl:
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663513006516/gFNz9nK7irL8AANKwrwZkG/cupcakes-nQKEy2box4UwCimEPepzBd.webp",
    permalink: "https://www.instagram.com/chefdollscakeshelf",
    caption: "Cupcake love 🧁 Fresh baked every morning",
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    mediaType: "IMAGE" as const,
    likes: "1.5k",
    comments: "61",
  },
  {
    id: "placeholder-4",
    mediaUrl:
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663513006516/gFNz9nK7irL8AANKwrwZkG/hero-cake-gefdk8N67kM7hmNuUEyU2P.webp",
    permalink: "https://www.instagram.com/chefdollscakeshelf",
    caption: "Wedding elegance 💍 Three-tier eggless masterpiece",
    timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    mediaType: "IMAGE" as const,
    likes: "843",
    comments: "27",
  },
  {
    id: "placeholder-5",
    mediaUrl:
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663513006516/gFNz9nK7irL8AANKwrwZkG/cupcakes-nQKEy2box4UwCimEPepzBd.webp",
    permalink: "https://www.instagram.com/chefdollscakeshelf",
    caption: "Sweet moments 🌸 Made with love in Mumbai",
    timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    mediaType: "IMAGE" as const,
    likes: "1.1k",
    comments: "39",
  },
  {
    id: "placeholder-6",
    mediaUrl:
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663513006516/gFNz9nK7irL8AANKwrwZkG/custom-cake-NGNfLBTCpacv8RbEz4TQHA.webp",
    permalink: "https://www.instagram.com/chefdollscakeshelf",
    caption: "Custom creation 🎨 Your vision, our craft",
    timestamp: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000).toISOString(),
    mediaType: "IMAGE" as const,
    likes: "756",
    comments: "22",
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────
function timeAgo(isoString: string): string {
  const diff = Date.now() - new Date(isoString).getTime();
  const hours = Math.floor(diff / 3_600_000);
  if (hours < 1) return "Just now";
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  return `${Math.floor(days / 7)}w ago`;
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function InstagramSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headRef = useRef<HTMLDivElement>(null);

  // Fetch from backend (returns { posts, configured, error, cachedAt })
  const { data, isLoading, refetch, isRefetching } =
    trpc.instagram.feed.useQuery(undefined, {
      staleTime: 25 * 60 * 1000, // consider fresh for 25 min (server caches 30 min)
      retry: 1,
    });

  // Decide which posts to display
  const isLive = data?.configured === true && (data?.posts?.length ?? 0) > 0;
  const displayPosts = isLive ? data!.posts : PLACEHOLDER_POSTS;

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting && headRef.current) {
            headRef.current.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="instagram"
      ref={sectionRef}
      className="py-20 md:py-28 relative overflow-hidden"
      style={{ background: "oklch(0.97 0.02 20)" }}
    >
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, oklch(0.78 0.1 70), transparent)",
        }}
      />

      <div className="container relative z-10">
        {/* ── Header ─────────────────────────────────────────────────────── */}
        <div ref={headRef} className="reveal text-center mb-10">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4"
            style={{
              background:
                "linear-gradient(135deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)",
            }}
          >
            <Instagram className="w-4 h-4 text-white" />
            <span
              className="text-white text-sm font-semibold"
              style={{ fontFamily: "var(--font-body)" }}
            >
              @chefdollscakeshelf
            </span>
          </div>

          <h2
            className="font-display text-4xl md:text-5xl font-semibold mb-3"
            style={{ color: "oklch(0.22 0.04 40)" }}
          >
            Follow Our
            <br />
            <em style={{ color: "oklch(0.55 0.12 10)", fontStyle: "italic" }}>
              Sweet Journey
            </em>
          </h2>
          <p
            className="text-base max-w-md mx-auto"
            style={{
              color: "oklch(0.50 0.04 30)",
              fontFamily: "var(--font-body)",
            }}
          >
            Get daily cake inspiration, behind-the-scenes baking, and exclusive
            offers on Instagram.
          </p>

          {/* Live / Placeholder status badge */}
          <div className="flex items-center justify-center gap-2 mt-4">
            {isLoading ? (
              <span
                className="inline-flex items-center gap-1.5 text-xs px-3 py-1 rounded-full"
                style={{
                  background: "oklch(0.93 0.03 60)",
                  color: "oklch(0.50 0.04 30)",
                  fontFamily: "var(--font-body)",
                }}
              >
                <RefreshCw className="w-3 h-3 animate-spin" />
                Loading feed…
              </span>
            ) : isLive ? (
              <span
                className="inline-flex items-center gap-1.5 text-xs px-3 py-1 rounded-full"
                style={{
                  background: "oklch(0.93 0.08 140)",
                  color: "oklch(0.40 0.12 140)",
                  fontFamily: "var(--font-body)",
                }}
              >
                <Wifi className="w-3 h-3" />
                Live from Instagram
                {data?.cachedAt && (
                  <span className="opacity-60">
                    · updated {timeAgo(data.cachedAt)}
                  </span>
                )}
              </span>
            ) : (
              <span
                className="inline-flex items-center gap-1.5 text-xs px-3 py-1 rounded-full"
                style={{
                  background: "oklch(0.95 0.03 60)",
                  color: "oklch(0.55 0.04 30)",
                  fontFamily: "var(--font-body)",
                }}
              >
                <WifiOff className="w-3 h-3" />
                Preview feed · Connect Instagram to show live posts
              </span>
            )}

            {/* Manual refresh button (only shown when live) */}
            {isLive && (
              <button
                onClick={() => refetch()}
                disabled={isRefetching}
                className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full transition-opacity hover:opacity-70"
                style={{
                  color: "oklch(0.55 0.04 30)",
                  fontFamily: "var(--font-body)",
                }}
                title="Refresh feed"
              >
                <RefreshCw
                  className={`w-3 h-3 ${isRefetching ? "animate-spin" : ""}`}
                />
              </button>
            )}
          </div>

          <div className="ornament-line mt-4 max-w-xs mx-auto">
            <span className="text-amber-400 text-sm">✦</span>
          </div>
        </div>

        {/* ── Feed Grid ──────────────────────────────────────────────────── */}
        {isLoading ? (
          // Skeleton loader
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 mb-10">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="rounded-2xl aspect-square animate-pulse"
                style={{ background: "oklch(0.90 0.03 60)" }}
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 mb-10">
            {displayPosts.slice(0, 6).map((post, i) => (
              <FeedCard
                key={post.id}
                post={post}
                delay={i * 80}
                isLive={isLive}
              />
            ))}
          </div>
        )}

        {/* ── Follow CTA ─────────────────────────────────────────────────── */}
        <div className="text-center">
          <a
            href="https://www.instagram.com/chefdollscakeshelf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full text-sm font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl"
            style={{
              background:
                "linear-gradient(135deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)",
              color: "white",
              fontFamily: "var(--font-body)",
              boxShadow: "0 4px 20px rgba(220, 39, 67, 0.3)",
            }}
          >
            <Instagram className="w-5 h-5" />
            Follow @chefdollscakeshelf
            <ExternalLink className="w-4 h-4" />
          </a>
          <p
            className="mt-3 text-sm"
            style={{
              color: "oklch(0.55 0.04 30)",
              fontFamily: "var(--font-body)",
            }}
          >
            Join our growing community of cake lovers ✨
          </p>
        </div>
      </div>
    </section>
  );
}

// ─── Feed Card ────────────────────────────────────────────────────────────────
type DisplayPost = {
  id: string;
  mediaUrl: string;
  thumbnailUrl?: string;
  permalink: string;
  caption?: string;
  timestamp: string;
  mediaType: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
  // placeholder-only fields
  likes?: string;
  comments?: string;
};

function FeedCard({
  post,
  delay,
  isLive,
}: {
  post: DisplayPost;
  delay: number;
  isLive: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting && cardRef.current) {
            setTimeout(() => {
              if (cardRef.current) cardRef.current.classList.add("visible");
            }, delay);
          }
        });
      },
      { threshold: 0.1 }
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, [delay]);

  const imgSrc = imgError
    ? "https://d2xsxph8kpxj0f.cloudfront.net/310519663513006516/gFNz9nK7irL8AANKwrwZkG/hero-cake-gefdk8N67kM7hmNuUEyU2P.webp"
    : post.mediaType === "VIDEO"
      ? (post.thumbnailUrl ?? post.mediaUrl)
      : post.mediaUrl;

  return (
    <a
      ref={cardRef as any}
      href={post.permalink}
      target="_blank"
      rel="noopener noreferrer"
      className="reveal group relative block rounded-2xl overflow-hidden aspect-square"
    >
      <img
        src={imgSrc}
        alt={post.caption ?? "Instagram post"}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        onError={() => setImgError(true)}
        loading="lazy"
      />

      {/* VIDEO badge */}
      {post.mediaType === "VIDEO" && (
        <div
          className="absolute top-2 right-2 px-2 py-0.5 rounded-full text-xs font-semibold"
          style={{
            background: "oklch(0.22 0.04 40 / 0.75)",
            color: "white",
            fontFamily: "var(--font-body)",
          }}
        >
          ▶ Video
        </div>
      )}
      {/* CAROUSEL badge */}
      {post.mediaType === "CAROUSEL_ALBUM" && (
        <div className="absolute top-2 right-2 text-white" title="Carousel">
          <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white drop-shadow">
            <path d="M2 6h2v12H2zm18 0h2v12h-2zM6 4h12v16H6z" />
          </svg>
        </div>
      )}

      {/* Hover overlay */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center gap-2 transition-opacity duration-300 opacity-0 group-hover:opacity-100 p-3"
        style={{ background: "oklch(0.22 0.04 40 / 0.72)" }}
      >
        {/* Engagement stats */}
        <div className="flex gap-4">
          {isLive ? (
            <div className="flex items-center gap-1 text-white">
              <Heart className="w-4 h-4" fill="white" />
              <span
                className="text-xs font-semibold"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {timeAgo(post.timestamp)}
              </span>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-1 text-white">
                <Heart className="w-4 h-4" fill="white" />
                <span
                  className="text-xs font-semibold"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {(post as any).likes}
                </span>
              </div>
              <div className="flex items-center gap-1 text-white">
                <MessageCircle className="w-4 h-4" fill="white" />
                <span
                  className="text-xs font-semibold"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {(post as any).comments}
                </span>
              </div>
            </>
          )}
        </div>

        {/* Caption snippet */}
        {post.caption && (
          <p
            className="text-white text-xs text-center line-clamp-2 px-2"
            style={{ fontFamily: "var(--font-body)" }}
          >
            {post.caption}
          </p>
        )}

        <ExternalLink className="w-4 h-4 text-white opacity-70" />
      </div>
    </a>
  );
}
