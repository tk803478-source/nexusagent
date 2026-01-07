import { Link } from "react-router-dom";
import { ArrowRight, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CTASection() {
  return (
    <section className="section-padding" style={{ background: 'var(--gradient-hero)' }}>
      <div className="container-wide">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Hire Us CTA */}
          <div className="text-primary-foreground">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-6">
              Ready to Start Your
              <span className="text-gradient block">Next Project?</span>
            </h2>
            <p className="text-lg text-primary-foreground/80 mb-8 max-w-lg">
              Let us help you transform your digital presence. From initial concept 
              to final delivery, we are here to guide you every step of the way.
            </p>
            <Button size="xl" variant="hero" asChild>
              <Link to="/hire-us">
                Hire Our Services
                <ArrowRight size={20} />
              </Link>
            </Button>
          </div>

          {/* Join Team CTA */}
          <div className="bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 rounded-3xl p-8 md:p-10">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-accent flex items-center justify-center">
                <Users size={28} className="text-accent-foreground" />
              </div>
              <div>
                <h3 className="text-xl font-display font-semibold text-primary-foreground">
                  Join Our Team
                </h3>
                <p className="text-primary-foreground/70 text-sm">
                  We're always looking for talented individuals
                </p>
              </div>
            </div>
            <p className="text-primary-foreground/80 mb-6">
              Are you a passionate developer, designer, or digital marketer? Join our 
              growing team and work on exciting projects with clients from around the world.
            </p>
            <div className="flex flex-wrap gap-3 mb-6">
              <span className="px-3 py-1 text-sm bg-primary-foreground/10 rounded-full text-primary-foreground/90">
                Remote-Friendly
              </span>
              <span className="px-3 py-1 text-sm bg-primary-foreground/10 rounded-full text-primary-foreground/90">
                Competitive Pay
              </span>
              <span className="px-3 py-1 text-sm bg-primary-foreground/10 rounded-full text-primary-foreground/90">
                Growth Opportunities
              </span>
            </div>
            <Button size="lg" variant="heroOutline" asChild>
              <Link to="/careers">
                View Open Positions
                <ArrowRight size={18} />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
