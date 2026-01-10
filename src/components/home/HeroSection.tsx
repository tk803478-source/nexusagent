import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
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
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-sky/20 rounded-full blur-3xl animate-pulse-soft" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-sky/15 rounded-full blur-3xl animate-pulse-soft delay-500" />
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-white/5 rounded-full blur-3xl animate-float" />
      </div>

      <div className="container-wide relative z-10 pt-28 pb-20 md:pt-36 md:pb-28">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          {/* Content */}
          <div className="text-primary-foreground opacity-0-start animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky/20 border border-sky/30 text-sm mb-8 animate-fade-in delay-100">
              <Sparkles size={16} className="text-sky" />
              <span>Trusted by 200+ businesses worldwide</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-display font-bold leading-[1.1] mb-8 text-white animate-fade-in-up delay-150">
              Transform Your
              <span className="block mt-2 text-sky">Digital Presence</span>
            </h1>

            <p className="text-lg md:text-xl text-primary-foreground/80 max-w-xl mb-10 leading-relaxed animate-fade-in-up delay-200">
              We are a full-service digital agency specializing in web development, 
              SEO optimization, video production, and AI-powered solutions. Partner 
              with us to accelerate your business growth and dominate your market.
            </p>

            {/* Highlights */}
            <div className="flex flex-wrap gap-x-6 gap-y-3 mb-10 animate-fade-in-up delay-300">
              {highlights.map((item, index) => (
                <div key={item} className={`flex items-center gap-2 text-primary-foreground/90 opacity-0-start animate-slide-in-right delay-${(index + 3) * 100}`}>
                  <CheckCircle2 size={18} className="text-sky" />
                  <span className="text-sm font-medium">{item}</span>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up delay-400">
              <Button size="xl" variant="hero" asChild className="btn-animated">
                <Link to="/hire-us">
                  Get Started Today
                  <ArrowRight size={20} />
                </Link>
              </Button>
              <Button size="xl" variant="heroOutline" asChild className="btn-animated">
                <Link to="/services">
                  Explore Services
                </Link>
              </Button>
            </div>
          </div>

          {/* Stats Card */}
          <div className="relative opacity-0-start animate-scale-in delay-300">
            <div className="relative bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl p-8 md:p-10 hover-lift">
              <div className="grid grid-cols-2 gap-6">
                {stats.map((stat, index) => (
                  <div 
                    key={stat.label} 
                    className={`text-center p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors duration-300 opacity-0-start animate-fade-in-up delay-${400 + index * 100}`}
                  >
                    <div className="text-4xl md:text-5xl font-display font-bold text-sky mb-2">
                      {stat.value}
                    </div>
                    <div className="text-sm text-primary-foreground/70">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Floating Badge */}
            <div className="absolute -bottom-4 -left-4 bg-sky text-navy px-6 py-3 rounded-2xl shadow-lg animate-float">
              <div className="text-sm font-semibold">🚀 100% On-Time Delivery</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}