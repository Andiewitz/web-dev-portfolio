/**
 * VisionFX design reminder: quiet editorial identity with typography doing the branding work.
 * The wordmark deliberately avoids standalone slash, arrow, and numeric motifs.
 */
type VisionMarkProps = {
  inverse?: boolean;
};

export default function VisionMark({ inverse = false }: VisionMarkProps) {
  return (
    <span className={`vision-wordmark ${inverse ? "vision-wordmark--inverse" : ""}`}>
      <span className="vision-wordmark__mark" aria-hidden="true"><i /></span>
      <span className="vision-wordmark__name">Vision</span><span className="vision-wordmark__fx">FX</span>
    </span>
  );
}
