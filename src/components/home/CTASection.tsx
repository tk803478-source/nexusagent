import { Link } from "react-router-dom";
import { ArrowRight, Users, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CTASection() {
  return (
    <section className="section-padding bg-primary">
      <div className="container-wide">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Hire Us CTA */}
          <div className="text-primary-foreground opacity-0-start animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-sky/20 border border-sky/30 text-sm mb-6">
              <Sparkles size={14} className="text-sky" />
              <span className="text-sky">Let's Build Something Great</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-6 text-white">
              Ready to Start Your
              <span className="block mt-2 text-sky">Next Project?</span>
            </h2>
            <p className="text-lg text-primary-foreground/80 mb-8 max-w-lg leading-relaxed">
              Let us help you transform your digital presence. From initial concept 
              to final delivery, we're here to guide you every step of the way. 
              Schedule a free consultation to discuss your vision.
            </p>
            <Button size="xl" variant="hero" asChild className="btn-animated">
              <Link to="/hire-us">
                Hire Our Services
                <ArrowRight size={20} />
              </Link>
            </Button>
          </div>

          {/* Join Team CTA */}
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl p-8 md:p-10 hover-lift opacity-0-start animate-scale-in delay-200">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-sky flex items-center justify-center">
                <Users size={28} className="text-navy" />
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
            <p className="text-primary-foreground/80 mb-6 leading-relaxed">
              Are you a passionate developer, designer, or digital marketer? Join our 
              growing team and work on exciting projects with clients worldwide. We offer 
              remote-first positions with competitive compensation.
            </p>
            <div className="flex flex-wrap gap-3 mb-6">
              <span className="px-3 py-1.5 text-sm bg-sky/20 rounded-full text-sky border border-sky/30">
                Remote-Friendly
              </span>
              <span className="px-3 py-1.5 text-sm bg-sky/20 rounded-full text-sky border border-sky/30">
                Competitive Pay
              </span>
              <span className="px-3 py-1.5 text-sm bg-sky/20 rounded-full text-sky border border-sky/30">
                Growth Opportunities
              </span>
            </div>
            <Button size="lg" variant="heroOutline" asChild className="btn-animated">
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