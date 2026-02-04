import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PageHeroProps {
  title: string;
  titleAccent?: string;
  subtitle: string;
  image: string;
  imageAlt: string;
  primaryCta?: {
    text: string;
    href: string;
  };
  secondaryCta?: {
    text: string;
    href: string;
  };
  children?: ReactNode;
}

export function PageHero({
  title,
  titleAccent,
  subtitle,
  image,
  imageAlt,
  primaryCta = { text: "🚀 Get Started", href: "/hire-us" },
  secondaryCta = { text: "Book Free Consultation", href: "/contact" },
  children,
}: PageHeroProps) {
  return (
    <section className="min-h-[80vh] flex items-center bg-primary">
      <div className="container-wide pt-28 pb-20 md:pt-36 md:pb-28">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left - Content */}
          <div className="text-primary-foreground opacity-0-start animate-fade-in-up">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] mb-6 text-white">
              {title}
              {titleAccent && (
                <span className="block mt-2 text-accent">{titleAccent}</span>
              )}
            </h1>

            <p className="text-lg md:text-xl text-primary-foreground/70 mb-10 leading-relaxed">
              {subtitle}
            </p>

            {children}

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="xl" variant="heroAccent" asChild className="btn-animated">
                <Link to={primaryCta.href}>
                  {primaryCta.text}
                  <ArrowRight size={20} />
                </Link>
              </Button>
              <Button size="xl" variant="heroOutline" asChild className="btn-animated">
                <Link to={secondaryCta.href}>
                  <Phone size={18} />
                  {secondaryCta.text}
                </Link>
              </Button>
            </div>
          </div>

          {/* Right - Image */}
          <div className="relative opacity-0-start animate-scale-in delay-200">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src={image} 
                alt={imageAlt} 
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
