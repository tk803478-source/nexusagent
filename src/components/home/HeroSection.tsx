import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const highlights = [
  "Expert Development Team",
  "Data-Driven Strategies",
  "24/7 Dedicated Support",
];

const stats = [
  { value: "200+", label: "Projects Delivered" },
  { value: "98%", label: "Client Satisfaction" },
  { value: "50+", label: "Team Experts" },
  { value: "24/7", label: "Support Available" },
];

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-primary">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-white rounded-full blur-3xl" />
      </div>

      <div className="container-wide relative z-10 pt-28 pb-20 md:pt-36 md:pb-28">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          {/* Content */}
          <div className="text-primary-foreground">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-sm mb-8">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span>Trusted by 200+ businesses worldwide</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-display font-bold leading-[1.1] mb-8">
              Transform Your
              <span className="block mt-2 text-primary-foreground/90">Digital Presence</span>
            </h1>

            <p className="text-lg md:text-xl text-primary-foreground/80 max-w-xl mb-10 leading-relaxed">
              We are a full-service digital agency specializing in web development, 
              SEO optimization, video production, and AI-powered solutions. Partner 
              with us to accelerate your business growth.
            </p>

            {/* Highlights */}
            <div className="flex flex-wrap gap-x-6 gap-y-3 mb-10">
              {highlights.map((item) => (
                <div key={item} className="flex items-center gap-2 text-primary-foreground/90">
                  <CheckCircle2 size={18} className="text-green-400" />
                  <span className="text-sm font-medium">{item}</span>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
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
          <div className="relative">
            <div className="relative bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl p-8 md:p-10">
              <div className="grid grid-cols-2 gap-6">
                {stats.map((stat) => (
                  <div key={stat.label} className="text-center p-6 rounded-2xl bg-white/5 border border-white/10">
                    <div className="text-4xl md:text-5xl font-display font-bold text-white mb-2">
                      {stat.value}
                    </div>
                    <div className="text-sm text-primary-foreground/70">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Floating Badge */}
            <div className="absolute -bottom-4 -left-4 bg-green-500 text-white px-6 py-3 rounded-2xl shadow-lg">
              <div className="text-sm font-semibold">🚀 100% On-Time Delivery</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
