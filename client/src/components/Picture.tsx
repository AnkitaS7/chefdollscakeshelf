/* =============================================================
   Picture - serves AVIF, then WebP, then the original JPEG.

   `name` is the file's basename in /public with no extension; the
   three encodings sit side by side there. The <picture> wrapper is
   display:contents so it generates no box of its own and the <img>
   keeps whatever layout it had before.
   ============================================================= */

export default function Picture({
  name,
  alt,
  className,
  style,
  width,
  height,
  priority = false,
}: {
  name: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
  width: number;
  height: number;
  /** Above the fold: load it eagerly and tell the browser it matters. */
  priority?: boolean;
}) {
  return (
    <picture style={{ display: "contents" }}>
      <source srcSet={`/${name}.avif`} type="image/avif" />
      <source srcSet={`/${name}.webp`} type="image/webp" />
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
