/* =============================================================
   Picture - serves the modern encodings, falling back to the JPEG.

   `name` is the file's basename in /public with no extension; each
   listed format sits side by side there as `/<name>.<ext>`. The
   <picture> wrapper is display:contents so it generates no box of its
   own and the <img> keeps whatever layout it had before.

   Important: <picture> picks a <source> by MIME-type support, NOT by
   whether the file exists — a browser that supports AVIF will show a
   broken image if `<name>.avif` is missing rather than falling back to
   the JPEG. So `formats` must list only encodings that actually exist
   for this image; the .jpg (the <img> src) is the always-present base.
   ============================================================= */

type Format = "avif" | "webp";

const MIME: Record<Format, string> = {
  avif: "image/avif",
  webp: "image/webp",
};

export default function Picture({
  name,
  alt,
  className,
  style,
  width,
  height,
  priority = false,
  formats = ["avif", "webp"],
}: {
  name: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
  width: number;
  height: number;
  /** Above the fold: load it eagerly and tell the browser it matters. */
  priority?: boolean;
  /** Modern encodings that exist alongside the JPEG. Narrow it (or pass
      `[]`) for an image that only ships as a .jpg, or the browser may
      request a missing source and render nothing. */
  formats?: Format[];
}) {
  return (
    <picture style={{ display: "contents" }}>
      {formats.map(f => (
        <source key={f} srcSet={`/${name}.${f}`} type={MIME[f]} />
      ))}
      <img
        src={`/${name}.jpg`}
        alt={alt}
        className={className}
        style={style}
        width={width}
        height={height}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        decoding="async"
      />
    </picture>
  );
}
