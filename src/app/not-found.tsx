import Link from "next/link";
import "../styles/not_found.scss"

export default function NotFound() {
  return (
    <div className="global">
      <h2 className="glow spacing-letter-big">404 Not Found</h2>
      <p>Could not find requested resource</p>
      <Link className="link push-action" href="/">Return Home</Link>
    </div>
  );
}