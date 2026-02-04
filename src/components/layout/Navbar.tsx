import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
  { name: "About", href: "/about" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-background/98 backdrop-blur-md shadow-sm border-b border-border"
          : "bg-transparent"
      )}
    >
      <nav className="container-wide">
        <div className="flex h-18 md:h-20 items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className={cn(
              "flex items-center gap-2.5 text-xl md:text-2xl font-bold tracking-tight transition-colors",
              scrolled ? "text-foreground" : "text-white"
            )}
          >
            <div className="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-accent flex items-center justify-center text-accent-foreground font-bold text-sm md:text-base">
              N
            </div>
            <span>NORYX</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={cn(
                  "px-4 py-2 text-sm font-medium rounded-xl transition-all duration-300",
                  location.pathname === link.href
                    ? scrolled ? "text-foreground bg-muted" : "text-white bg-white/15"
                    : scrolled 
                      ? "text-muted-foreground hover:text-foreground hover:bg-muted"
                      : "text-white/80 hover:text-white hover:bg-white/10"
                )}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Desktop CTAs */}
          <div className="hidden md:flex items-center gap-3">
            <Button 
              variant={scrolled ? "ghost" : "ghost"} 
              asChild
              className={cn(
                "transition-all duration-300",
                !scrolled ? "text-white hover:bg-white/10 hover:text-white" : "text-foreground hover:bg-muted"
              )}
            >
              <Link to="/careers">Careers</Link>
            </Button>
            <Button variant={scrolled ? "accent" : "heroAccent"} asChild className="btn-animated">
              <Link to="/hire-us">Get Started</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={cn(
              "md:hidden p-2 transition-colors",
              scrolled ? "text-foreground" : "text-white"
            )}
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-background border-b border-border shadow-lg animate-fade-in-down">
            <div className="container-wide py-4 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className={cn(
                    "block px-4 py-3 text-base font-medium rounded-xl transition-colors",
                    location.pathname === link.href
                      ? "text-foreground bg-muted"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  )}
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-4 mt-2 border-t border-border space-y-2">
                <Button variant="outline" className="w-full" asChild>
                  <Link to="/careers">Careers</Link>
                </Button>
                <Button variant="accent" className="w-full" asChild>
                  <Link to="/hire-us">Get Started</Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
