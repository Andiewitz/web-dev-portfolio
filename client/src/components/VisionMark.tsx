/**
 * VisionFX design reminder: Voltage Editorial — an orange forward route on a cream/charcoal system.
 * The mark is a compact brand anchor, not decorative iconography.
 */
type VisionMarkProps = {
  className?: string;
  label?: boolean;
  inverse?: boolean;
};

export default function VisionMark({
  className = "",
  label = true,
  inverse = false,
}: VisionMarkProps) {
  return (
    <span className={`vision-mark ${inverse ? "vision-mark--inverse" : ""} ${className}`}>
      <img
        src="/manus-storage/visionfx-mark_d3fc86cc.png"
        alt=""
        aria-hidden="true"
        className="vision-mark__symbol"
      />
      {label && <span className="vision-mark__word">Vision<span>FX</span></span>}
    </span>
  );
}
