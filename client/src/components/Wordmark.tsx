/**
 * Andrei wordmark: "ANDREI" in Bricolage Grotesque with a slanted I.
 * The slanted I echoes the favicon and gives the mark a distinct silhouette.
 */
type WordmarkProps = {
  inverse?: boolean;
};

export default function Wordmark({ inverse = false }: WordmarkProps) {
  return (
    <span className={`wordmark ${inverse ? "wordmark--inverse" : ""}`}>
      <span className="wordmark__text">ANDRE</span><span className="wordmark__i">I</span>
    </span>
  );
}
