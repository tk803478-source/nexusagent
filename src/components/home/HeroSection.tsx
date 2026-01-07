import { Link } from "react-router-dom";
import { ArrowRight, Play, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const highlights = [
  "Expert Development Team",
  "Data-Driven Strategies",
  "24/7 Dedicated Support",
];

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden" style={{ background: 'var(--gradient-hero)' }}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-accent/30 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
      </div>

      <div className="container-wide relative z-10 pt-24 pb-16 md:pt-32 md:pb-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <div className="text-primary-foreground">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/10 border border-primary-foreground/20 text-sm mb-6 animate-fade-in">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span>Trusted by 200+ businesses worldwide</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-display font-bold leading-[1.1] mb-6 animate-fade-in-up">
              Transform Your
              <span className="text-gradient block">Digital Presence</span>
            </h1>

            <p className="text-lg md:text-xl text-primary-foreground/80 max-w-xl mb-8 leading-relaxed animate-fade-in-up delay-100">
              We are a full-service digital agency specializing in web development, 
              SEO optimization, video production, and AI-powered solutions. Partner 
              with us to accelerate your business growth and dominate your market.
            </p>

            {/* Highlights */}
            <div className="flex flex-wrap gap-4 mb-8 animate-fade-in-up delay-200">
              {highlights.map((item) => (
                <div key={item} className="flex items-center gap-2 text-primary-foreground/90">
                  <CheckCircle2 size={18} className="text-accent" />
                  <span className="text-sm font-medium">{item}</span>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up delay-300">
              <Button size="xl" variant="hero" asChild>
                <Link to="/hire-us">
                  Get Started Today
                  <ArrowRight size={20} />
                </Link>
              </Button>
              <Button size="xl" variant="heroOutline" asChild>
                <Link to="/services">
                  Explore Services
                </Link>
              </Button>
            </div>
          </div>

          {/* Stats Card */}
          <div className="relative animate-fade-in-up delay-400">
            <div className="relative bg-card/10 backdrop-blur-sm border border-primary-foreground/20 rounded-3xl p-8 md:p-10">
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center p-6 rounded-2xl bg-primary-foreground/5">
                  <div className="text-4xl md:text-5xl font-display font-bold text-accent mb-2">200+</div>
                  <div className="text-sm text-primary-foreground/70">Projects Delivered</div>
                </div>
                <div className="text-center p-6 rounded-2xl bg-primary-foreground/5">
                  <div className="text-4xl md:text-5xl font-display font-bold text-accent mb-2">98%</div>
                  <div className="text-sm text-primary-foreground/70">Client Satisfaction</div>
                </div>
                <div className="text-center p-6 rounded-2xl bg-primary-foreground/5">
                  <div className="text-4xl md:text-5xl font-display font-bold text-accent mb-2">50+</div>
                  <div className="text-sm text-primary-foreground/70">Team Experts</div>
                </div>
                <div className="text-center p-6 rounded-2xl bg-primary-foreground/5">
                  <div className="text-4xl md:text-5xl font-display font-bold text-accent mb-2">24/7</div>
                  <div className="text-sm text-primary-foreground/70">Support Available</div>
                </div>
              </div>
            </div>
            
            {/* Floating Badge */}
            <div className="absolute -bottom-4 -left-4 bg-accent text-accent-foreground px-6 py-3 rounded-2xl shadow-lg animate-float">
              <div className="text-sm font-semibold">🚀 100% On-Time Delivery</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
