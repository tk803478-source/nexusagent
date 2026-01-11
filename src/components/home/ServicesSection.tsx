import { Link } from "react-router-dom";
import { ArrowRight, Globe, Search, Video, Bot, Code, Palette, Megaphone, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useServices } from "@/hooks/useServices";

// Icon mapping for dynamic icons
const iconMap: Record<string, React.ElementType> = {
  Globe,
  Search,
  Video,
  Bot,
  Code,
  Palette,
  Megaphone,
  Shield,
};

export function ServicesSection() {
  const { services, loading } = useServices();

  // Fallback services if database is empty
  const fallbackServices = [
    {
      id: "web-development",
      name: "Web Development",
      slug: "web-development",
      icon: "Globe",
      short_description: "Build stunning, high-performance websites that captivate visitors and convert them into loyal customers.",
      description: "Build stunning, high-performance websites that captivate visitors and convert them into loyal customers.",
    },
    {
      id: "seo-optimization",
      name: "SEO Optimization",
      slug: "seo-optimization",
      icon: "Search",
      short_description: "Dominate search engine rankings with our proven SEO strategies.",
      description: "Dominate search engine rankings with our proven SEO strategies.",
    },
    {
      id: "video-production",
      name: "Video Production",
      slug: "video-production",
      icon: "Video",
      short_description: "Tell your brand story through compelling visual content that resonates with your audience.",
      description: "Tell your brand story through compelling visual content that resonates with your audience.",
    },
    {
      id: "ai-solutions",
      name: "AI Solutions",
      slug: "ai-solutions",
      icon: "Bot",
      short_description: "Harness the power of artificial intelligence to automate workflows and enhance customer experiences.",
      description: "Harness the power of artificial intelligence to automate workflows and enhance customer experiences.",
    },
  ];

  const displayServices = services.length > 0 ? services : (loading ? [] : fallbackServices);

  return (
    <section className="section-padding bg-sky-section">
      <div className="container-wide">
        {/* Header */}
        <div className="section-header opacity-0-start animate-fade-in-up">
          <span className="section-badge">Our Services</span>
          <h2 className="section-title">Comprehensive Digital Solutions</h2>
          <p className="section-description">
            From strategy to execution, we provide end-to-end digital services that help 
            businesses thrive in the modern marketplace. Our expert team delivers measurable 
            results that drive growth and exceed expectations.
          </p>
        </div>

        {/* Services Grid */}
        {loading ? (
          <div className="grid md:grid-cols-2 gap-6 lg:gap-8 mb-14">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="card-interactive p-8 lg:p-10 animate-pulse">
                <div className="flex items-start gap-5">
                  <div className="w-14 h-14 rounded-xl bg-muted flex-shrink-0" />
                  <div className="flex-1">
                    <div className="h-6 bg-muted rounded mb-3 w-1/2" />
                    <div className="h-4 bg-muted rounded mb-2 w-full" />
                    <div className="h-4 bg-muted rounded w-3/4" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6 lg:gap-8 mb-14">
            {displayServices.slice(0, 4).map((service, index) => {
              const Icon = iconMap[service.icon || "Globe"] || Globe;
              return (
                <Link
                  key={service.id}
                  to={`/services#${service.slug}`}
                  className={`group card-interactive p-8 lg:p-10 icon-box-hover opacity-0-start animate-fade-in-up delay-${(index + 1) * 100}`}
                >
                  <div className="flex items-start gap-5">
                    <div className="icon-box flex-shrink-0">
                      <Icon size={26} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-display font-semibold text-navy mb-3 group-hover:text-sky transition-colors">
                        {service.name}
                      </h3>
                      <p className="text-muted-foreground mb-5 leading-relaxed">
                        {service.short_description || service.description?.substring(0, 150) + "..."}
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}

        {/* CTA */}
        <div className="text-center opacity-0-start animate-fade-in-up delay-500">
          <Button size="lg" asChild className="btn-animated">
            <Link to="/services">
              View All Services
              <ArrowRight size={18} />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
