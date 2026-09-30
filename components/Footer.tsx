import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Youtube,
} from "lucide-react";

const footerLinks = [
  ["Home", "/"],
  ["Portfolio", "/portfolio"],
  ["Services", "/services"],
  ["Shoot Sets", "/shoot-sets"],
  ["About", "/about"],
  ["Contact", "/contact"],
] as const;

export function Footer() {
  return (
    <footer data-theme="dark" className="site-footer">
      <div className="site-footer-main">
        <section className="footer-newsletter" aria-labelledby="footer-newsletter-title">
          <p className="footer-kicker"><span aria-hidden="true" />Occasional notes from behind the lens</p>
          <h2 id="footer-newsletter-title" className="footer-newsletter-title">
            A little more <i>love</i>
            <br />
            in your inbox.
          </h2>
          <form className="footer-newsletter-form" action="mailto:[EMAIL]" method="get">
            <label className="sr-only" htmlFor="newsletter-email">Your email address</label>
            <input
              id="newsletter-email"
              name="email"
              type="email"
              required
              placeholder="Your email address"
            />
            <button type="submit">
              Subscribe <ArrowRight size={16} aria-hidden="true" />
            </button>
          </form>
          <p className="footer-newsletter-note">Stories, shoots, and a glimpse behind the scenes.</p>
        </section>

        <nav className="footer-column footer-explore" aria-label="Explore">
          <h3 className="footer-column-title">Explore</h3>
          <ul>
            {footerLinks.map(([label, href]) => (
              <li key={href}><Link href={href}>{label}</Link></li>
            ))}
          </ul>
        </nav>

        <section className="footer-column footer-contact" aria-labelledby="footer-contact-title">
          <h3 id="footer-contact-title" className="footer-column-title">Say hello</h3>
          <ul>
            <li><a href="tel:[PHONE]"><Phone aria-hidden="true" /><span>[PHONE]</span></a></li>
            <li><a href="mailto:[EMAIL]"><Mail aria-hidden="true" /><span>[EMAIL]</span></a></li>
            <li>
              <span className="footer-contact-icon"><MapPin aria-hidden="true" /></span>
              <span>LL3 E-2, Sector 63,<br />Noida, UP 201301<br />India</span>
            </li>
          </ul>
        </section>

        <section className="footer-column footer-social" aria-labelledby="footer-social-title">
          <h3 id="footer-social-title" className="footer-column-title">Follow along</h3>
          <div className="footer-social-links">
            <a aria-label="Photio on Instagram" href="[INSTAGRAM_URL]" target="_blank" rel="noreferrer"><Instagram /></a>
            <a aria-label="Photio on YouTube" href="https://youtube.com" target="_blank" rel="noreferrer"><Youtube /></a>
            <a aria-label="Photio on Facebook" href="https://facebook.com" target="_blank" rel="noreferrer"><Facebook /></a>
            <a aria-label="Chat with Photio on WhatsApp" href="https://wa.me/[PHONE]" target="_blank" rel="noreferrer"><Phone /></a>
          </div>
          <a className="footer-whatsapp" href="https://wa.me/[PHONE]" target="_blank" rel="noreferrer">
            WhatsApp us <ArrowUpRight aria-hidden="true" />
          </a>
        </section>
      </div>

      <div className="site-footer-bottom">
        <div className="footer-copyright">
          <span className="footer-monogram" aria-hidden="true">N</span>
          <span>© {new Date().getFullYear()} Photio Studio. That click, wow!</span>
        </div>
        <p>Made with intention in Noida</p>
      </div>
    </footer>
  );
}
