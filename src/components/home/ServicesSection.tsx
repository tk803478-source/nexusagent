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
    description: "Custom websites and web applications built with modern technologies for optimal performance and user experience.",
    features: ["Responsive Design", "E-commerce", "CMS Integration", "API Development"],
  },
  {
    icon: "Search",
    name: "SEO Optimization",
    slug: "seo-optimization",
    description: "Data-driven SEO strategies that boost your search rankings, increase organic traffic, and deliver results.",
    features: ["Technical SEO", "Keyword Research", "Content Strategy", "Link Building"],
  },
  {
    icon: "Video",
    name: "Video Production",
    slug: "video-production",
    description: "Professional video content that tells your brand story and engages audiences across all platforms.",
    features: ["Brand Videos", "Social Content", "Motion Graphics", "Post-Production"],
  },
  {
    icon: "Bot",
    name: "AI Solutions",
    slug: "ai-solutions",
    description: "Cutting-edge AI integrations that automate workflows and enhance customer experiences.",
    features: ["Chatbots", "Process Automation", "Data Analytics", "Custom AI Models"],
  },
];

export function ServicesSection() {
  return (
    <section className="section-padding bg-secondary/30">
      <div className="container-wide">
        {/* Header */}
        <div className="section-header">
          <span className="section-badge">Our Services</span>
          <h2 className="section-title">Comprehensive Digital Solutions</h2>
          <p className="section-description">
            From strategy to execution, we provide end-to-end digital services that help 
            businesses thrive in the modern marketplace.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8 mb-14">
          {services.map((service) => {
            const Icon = iconMap[service.icon];
            return (
              <Link
                key={service.slug}
                to={`/services#${service.slug}`}
                className="group card-interactive p-8 lg:p-10"
              >
                <div className="flex items-start gap-5">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                    <Icon size={26} className="text-primary group-hover:text-primary-foreground" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-display font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                      {service.name}
                    </h3>
                    <p className="text-muted-foreground mb-5 leading-relaxed">
                      {service.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {service.features.map((feature) => (
                        <span
                          key={feature}
                          className="px-3 py-1.5 text-xs font-medium bg-secondary rounded-full text-muted-foreground"
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
          <Button size="lg" asChild>
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
