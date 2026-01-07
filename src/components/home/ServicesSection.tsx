import { Link } from "react-router-dom";
import { ArrowRight, Globe, Search, Video, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";

const iconMap: Record<string, React.ElementType> = {
  Globe,
  Search,
  Video,
  Bot,
};

const services = [
  {
    icon: "Globe",
    name: "Web Development",
    slug: "web-development",
    description: "Custom websites and web applications built with modern technologies like React, Next.js, and cloud infrastructure for optimal performance.",
    features: ["Responsive Design", "E-commerce Solutions", "CMS Integration", "API Development"],
  },
  {
    icon: "Search",
    name: "SEO Optimization",
    slug: "seo-optimization",
    description: "Data-driven SEO strategies that boost your search rankings, increase organic traffic, and deliver measurable business results.",
    features: ["Technical SEO Audits", "Keyword Research", "Content Strategy", "Link Building"],
  },
  {
    icon: "Video",
    name: "Video Production",
    slug: "video-production",
    description: "Professional video content that tells your brand story, engages audiences, and drives conversions across all platforms.",
    features: ["Brand Videos", "Social Content", "Motion Graphics", "Post-Production"],
  },
  {
    icon: "Bot",
    name: "AI Solutions",
    slug: "ai-solutions",
    description: "Cutting-edge AI integrations that automate workflows, enhance customer experiences, and unlock new business opportunities.",
    features: ["Chatbots & Assistants", "Process Automation", "Data Analytics", "Custom AI Models"],
  },
];

export function ServicesSection() {
  return (
    <section className="section-padding" style={{ background: 'var(--gradient-subtle)' }}>
      <div className="container-wide">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
            Our Services
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-6">
            Comprehensive Digital Solutions
          </h2>
          <p className="text-lg text-muted-foreground">
            From strategy to execution, we provide end-to-end digital services that help 
            businesses thrive in the modern marketplace. Our expertise spans across 
            development, marketing, and creative production.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8 mb-12">
          {services.map((service, index) => {
            const Icon = iconMap[service.icon];
            return (
              <Link
                key={service.slug}
                to={`/services#${service.slug}`}
                className="group card-interactive p-8 lg:p-10"
              >
                <div className="flex items-start gap-5">
                  <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center flex-shrink-0 group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
                    <Icon size={28} className="text-accent group-hover:text-accent-foreground" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-display font-semibold text-foreground mb-3 group-hover:text-accent transition-colors">
                      {service.name}
                    </h3>
                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      {service.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {service.features.map((feature) => (
                        <span
                          key={feature}
                          className="px-3 py-1 text-xs font-medium bg-muted rounded-full text-muted-foreground"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button size="lg" variant="accent" asChild>
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
