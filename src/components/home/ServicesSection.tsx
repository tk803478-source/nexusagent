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
    description: "Build stunning, high-performance websites that captivate visitors and convert them into loyal customers. Our expert developers use cutting-edge technologies to create responsive, secure, and scalable web solutions tailored to your business needs.",
    features: ["Responsive Design", "E-commerce Solutions", "CMS Integration", "API Development"],
  },
  {
    icon: "Search",
    name: "SEO Optimization",
    slug: "seo-optimization",
    description: "Dominate search engine rankings with our proven SEO strategies. We combine technical expertise with content optimization to increase your organic visibility, drive qualified traffic, and maximize your return on investment.",
    features: ["Technical SEO", "Keyword Research", "Content Strategy", "Link Building"],
  },
  {
    icon: "Video",
    name: "Video Production",
    slug: "video-production",
    description: "Tell your brand story through compelling visual content that resonates with your audience. From concept to final cut, our video production team creates professional content that engages viewers across all digital platforms.",
    features: ["Brand Videos", "Social Content", "Motion Graphics", "Post-Production"],
  },
  {
    icon: "Bot",
    name: "AI Solutions",
    slug: "ai-solutions",
    description: "Harness the power of artificial intelligence to automate workflows, enhance customer experiences, and gain competitive advantages. Our custom AI solutions help businesses work smarter and scale faster.",
    features: ["Chatbots", "Process Automation", "Data Analytics", "Custom AI Models"],
  },
];

export function ServicesSection() {
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
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8 mb-14">
          {services.map((service, index) => {
            const Icon = iconMap[service.icon];
            return (
              <Link
                key={service.slug}
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
                      {service.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {service.features.map((feature) => (
                        <span
                          key={feature}
                          className="px-3 py-1.5 text-xs font-medium bg-sky-light rounded-full text-navy/80"
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