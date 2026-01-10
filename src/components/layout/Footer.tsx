import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Linkedin, Twitter, Instagram } from "lucide-react";

const footerLinks = {
  services: [
    { name: "Web Development", href: "/services#web-development" },
    { name: "SEO Optimization", href: "/services#seo-optimization" },
    { name: "Video Production", href: "/services#video-production" },
    { name: "AI Solutions", href: "/services#ai-solutions" },
  ],
  company: [
    { name: "About Us", href: "/about" },
    { name: "Our Team", href: "/about#team" },
    { name: "Careers", href: "/careers" },
    { name: "Blog", href: "/blog" },
  ],
  legal: [
    { name: "Privacy Policy", href: "/privacy-policy" },
    { name: "Terms of Service", href: "/terms-of-service" },
    { name: "Cookie Policy", href: "/privacy-policy#cookies" },
  ],
};

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-navy text-white">
      <div className="container-wide py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link
              to="/"
              className="flex items-center gap-2.5 text-2xl font-display font-bold mb-5"
            >
              <div className="w-10 h-10 rounded-lg bg-sky flex items-center justify-center text-navy font-bold">
                N
              </div>
              <span>Nexus</span>
            </Link>
            <p className="text-white/70 max-w-sm mb-8 leading-relaxed">
              We are a full-service digital agency dedicated to helping businesses 
              grow through innovative technology solutions, strategic marketing, and 
              exceptional customer experiences.
            </p>
            <div className="space-y-3">
              <a
                href="mailto:contact@nexusagency.com"
                className="flex items-center gap-3 text-white/70 hover:text-sky transition-colors"
              >
                <Mail size={18} />
                <span>contact@nexusagency.com</span>
              </a>
              <a
                href="tel:+1234567890"
                className="flex items-center gap-3 text-white/70 hover:text-sky transition-colors"
              >
                <Phone size={18} />
                <span>+1 (234) 567-890</span>
              </a>
              <div className="flex items-center gap-3 text-white/70">
                <MapPin size={18} />
                <span>San Francisco, CA</span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-display font-semibold text-lg mb-5 text-white">Services</h3>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-white/70 hover:text-sky transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-display font-semibold text-lg mb-5 text-white">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-white/70 hover:text-sky transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-display font-semibold text-lg mb-5 text-white">Legal</h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-white/70 hover:text-sky transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-14 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/60 text-sm">
            © {currentYear} Nexus Digital Agency. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-lg text-white/60 hover:text-sky hover:bg-white/10 transition-all duration-300"
              aria-label="LinkedIn"
            >
              <Linkedin size={20} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-lg text-white/60 hover:text-sky hover:bg-white/10 transition-all duration-300"
              aria-label="Twitter"
            >
              <Twitter size={20} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-lg text-white/60 hover:text-sky hover:bg-white/10 transition-all duration-300"
              aria-label="Instagram"
            >
              <Instagram size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}