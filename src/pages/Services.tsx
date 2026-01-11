import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { useServices } from "@/hooks/useServices";
import { 
  Globe, 
  Search, 
  Video, 
  Bot, 
  Code,
  Palette,
  Megaphone,
  Shield,
  ArrowRight, 
  CheckCircle2
} from "lucide-react";

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

// Default features for services if not stored in DB
const defaultFeatures: Record<string, string[]> = {
  "web-development": [
    "Custom Website Design & Development",
    "E-commerce Solutions & Online Stores",
    "Progressive Web Applications (PWA)",
    "Content Management Systems",
    "API Development & Integration",
    "Performance Optimization",
    "Security Implementation",
    "Ongoing Maintenance & Support"
  ],
  "seo-optimization": [
    "Comprehensive SEO Audits",
    "Keyword Research & Strategy",
    "On-Page SEO Optimization",
    "Technical SEO Implementation",
    "Content Strategy & Creation",
    "Link Building Campaigns",
    "Local SEO Optimization",
    "Monthly Performance Reports"
  ],
  "video-production": [
    "Brand & Corporate Videos",
    "Product Demonstrations",
    "Social Media Content",
    "Motion Graphics & Animation",
    "Video Editing & Post-Production",
    "Script Writing & Storyboarding",
    "Voiceover & Sound Design",
    "Multi-Platform Optimization"
  ],
  "ai-solutions": [
    "Custom AI Chatbots & Assistants",
    "Process Automation",
    "Predictive Analytics",
    "Natural Language Processing",
    "Computer Vision Solutions",
    "Machine Learning Models",
    "Data Analysis & Insights",
    "AI Strategy Consulting"
  ],
};

const defaultBenefits: Record<string, string[]> = {
  "web-development": [
    "Increase conversions with optimized user experience",
    "Reduce bounce rates with fast-loading pages",
    "Build trust with professional, modern design",
    "Scale seamlessly as your business grows"
  ],
  "seo-optimization": [
    "Increase organic traffic by up to 300%",
    "Reduce cost per acquisition",
    "Build long-term sustainable growth",
    "Outrank your competitors"
  ],
  "video-production": [
    "Increase engagement by 1200% compared to text",
    "Boost conversion rates with video content",
    "Build stronger emotional connections",
    "Stand out in crowded feeds"
  ],
  "ai-solutions": [
    "Reduce operational costs by up to 60%",
    "Provide 24/7 customer support",
    "Make data-driven decisions faster",
    "Stay ahead of the competition"
  ],
};

export default function Services() {
  const location = useLocation();
  const { services, loading } = useServices();

  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.slice(1));
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
      }
    }
  }, [location, services]);

  // Fallback services if database is empty
  const fallbackServices = [
    {
      id: "web-development",
      name: "Web Development",
      slug: "web-development",
      icon: "Globe",
      short_description: "Custom websites that convert visitors into customers",
      description: "Transform your digital presence with our expert web development services. We specialize in creating responsive, high-performance websites and web applications using the latest technologies including React, Next.js, and modern backend solutions.",
      price_from: 999,
    },
    {
      id: "seo-optimization",
      name: "SEO Optimization",
      slug: "seo-optimization",
      icon: "Search",
      short_description: "Dominate search rankings and drive organic traffic",
      description: "Elevate your online visibility with our comprehensive SEO services. We employ data-driven strategies to improve your search engine rankings, increase organic traffic, and maximize your ROI.",
      price_from: 499,
    },
    {
      id: "video-production",
      name: "Video Production",
      slug: "video-production",
      icon: "Video",
      short_description: "Captivate audiences with compelling visual stories",
      description: "Captivate your audience with professional video content. Our video production team creates compelling visual stories that engage viewers and drive results across all platforms.",
      price_from: 799,
    },
    {
      id: "ai-solutions",
      name: "AI Solutions",
      slug: "ai-solutions",
      icon: "Bot",
      short_description: "Harness artificial intelligence for business growth",
      description: "Harness the power of artificial intelligence to transform your business operations. We develop custom AI solutions including chatbots, automation workflows, and machine learning models.",
      price_from: 1499,
    },
  ];

  const displayServices = services.length > 0 ? services : (loading ? [] : fallbackServices);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-28 bg-primary">
        <div className="container-wide text-center text-primary-foreground">
          <span className="inline-block px-4 py-2 rounded-full bg-white/10 border border-white/20 text-sm mb-6">
            Our Services
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
            Comprehensive Digital Solutions
          </h1>
          <p className="text-lg md:text-xl text-primary-foreground/80 max-w-2xl mx-auto leading-relaxed">
            From strategy to execution, we provide end-to-end digital services 
            that help businesses thrive in the modern marketplace.
          </p>
        </div>
      </section>

      {/* Loading State */}
      {loading && (
        <section className="section-padding bg-background">
          <div className="container-wide">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="mb-16 animate-pulse">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                  <div>
                    <div className="h-8 bg-muted rounded w-1/3 mb-4" />
                    <div className="h-6 bg-muted rounded w-2/3 mb-4" />
                    <div className="h-4 bg-muted rounded w-full mb-2" />
                    <div className="h-4 bg-muted rounded w-3/4" />
                  </div>
                  <div className="h-64 bg-muted rounded-xl" />
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Services Detail Sections */}
      {!loading && displayServices.map((service, index) => {
        const Icon = iconMap[service.icon || "Globe"] || Globe;
        const isEven = index % 2 === 0;
        const features = defaultFeatures[service.slug] || [];
        const benefits = defaultBenefits[service.slug] || [];
        
        return (
          <section 
            key={service.id} 
            id={service.slug}
            className={`section-padding ${isEven ? 'bg-background' : 'bg-secondary/30'}`}
          >
            <div className="container-wide">
              <div className={`grid lg:grid-cols-2 gap-12 lg:gap-20 items-center ${!isEven ? 'lg:grid-flow-dense' : ''}`}>
                {/* Content */}
                <div className={!isEven ? 'lg:col-start-2' : ''}>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Icon size={28} className="text-primary" />
                    </div>
                    <div>
                      <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">
                        {service.name}
                      </h2>
                      <p className="text-primary font-medium">{service.short_description}</p>
                    </div>
                  </div>
                  
                  <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                    {service.description}
                  </p>

                  {benefits.length > 0 && (
                    <div className="mb-8">
                      <h3 className="text-lg font-semibold text-foreground mb-4">Key Benefits</h3>
                      <ul className="space-y-3">
                        {benefits.map((benefit) => (
                          <li key={benefit} className="flex items-start gap-3">
                            <CheckCircle2 size={20} className="text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-muted-foreground">{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="flex flex-wrap items-center gap-4">
                    <Button size="lg" asChild>
                      <Link to="/hire-us">
                        Get Started
                        <ArrowRight size={18} />
                      </Link>
                    </Button>
                    {service.price_from && (
                      <div className="text-muted-foreground">
                        Starting from <span className="text-foreground font-semibold">${service.price_from}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Features Card */}
                {features.length > 0 && (
                  <div className={`card-elevated p-8 lg:p-10 ${!isEven ? 'lg:col-start-1' : ''}`}>
                    <h3 className="text-xl font-semibold text-foreground mb-6">What's Included</h3>
                    <ul className="space-y-4">
                      {features.map((feature) => (
                        <li key={feature} className="flex items-center gap-3">
                          <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                            <CheckCircle2 size={14} className="text-primary" />
                          </div>
                          <span className="text-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </section>
        );
      })}

      {/* CTA Section */}
      <section className="section-padding bg-primary">
        <div className="container-wide text-center text-primary-foreground">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto mb-10 leading-relaxed">
            Let us help you transform your digital presence. Schedule a free consultation 
            to discuss your project requirements and get a custom quote.
          </p>
          <Button size="xl" variant="hero" asChild>
            <Link to="/hire-us">
              Request a Free Quote
              <ArrowRight size={20} />
            </Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
}
