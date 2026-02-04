import { Link } from "react-router-dom";
import { ArrowRight, Globe, Bot, Code, Megaphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useServices } from "@/hooks/useServices";

// Icon mapping for dynamic icons
const iconMap: Record<string, React.ElementType> = {
  Globe,
  Bot,
  Code,
  Megaphone,
};

export function ServicesSection() {
  const { services, loading } = useServices();

  // Fallback services - NORYX focused
  const fallbackServices = [
    {
      id: "web-development",
      name: "Web Development",
      slug: "web-development",
      icon: "Globe",
      short_description: "Build stunning, high-performance websites and applications that captivate visitors and convert them into customers.",
    },
    {
      id: "ai-solutions",
      name: "AI Solutions",
      slug: "ai-solutions",
      icon: "Bot",
      short_description: "Harness the power of artificial intelligence to automate workflows and enhance customer experiences.",
    },
    {
      id: "automation",
      name: "Automation",
      slug: "automation",
      icon: "Code",
      short_description: "Streamline your operations with intelligent automation that saves time and eliminates errors.",
    },
    {
      id: "growth-systems",
      name: "Growth Systems",
      slug: "growth-systems",
      icon: "Megaphone",
      short_description: "Build predictable revenue with proven lead generation and marketing automation systems.",
    },
  ];

  const displayServices = services.length > 0 ? services : (loading ? [] : fallbackServices);

  return (
    <section className="section-padding bg-muted/30">
      <div className="container-wide">
        {/* Header */}
        <div className="section-header opacity-0-start animate-fade-in-up">
          <span className="section-badge">Our Services</span>
          <h2 className="section-title">AI-Powered Digital Solutions</h2>
          <p className="section-description">
            From strategy to execution, we provide end-to-end digital services that help 
            businesses thrive. Our expert team delivers measurable results that drive growth.
          </p>
        </div>

        {/* Services Grid */}
        {loading ? (
          <div className="grid md:grid-cols-2 gap-6 lg:gap-8 mb-14">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="card-elevated p-8 lg:p-10 animate-pulse">
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
                  className={`group card-interactive p-8 lg:p-10 opacity-0-start animate-fade-in-up delay-${(index + 1) * 100}`}
                >
                  <div className="flex items-start gap-5">
                    <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0 group-hover:bg-accent group-hover:scale-105 transition-all duration-300">
                      <Icon size={26} className="text-accent group-hover:text-accent-foreground" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-accent transition-colors">
                        {service.name}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {service.short_description}
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
          <Button size="lg" variant="accent" asChild className="btn-animated">
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
