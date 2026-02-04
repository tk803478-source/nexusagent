import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { PageHero } from "@/components/shared/PageHero";
import { Button } from "@/components/ui/button";
import { useServices } from "@/hooks/useServices";
import heroImage from "@/assets/hero-services.jpg";
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
  "automation": [
    "Workflow Automation",
    "Data Pipeline Development",
    "CRM Integration",
    "Email Marketing Automation",
    "Custom API Integrations",
    "Reporting Automation",
    "Process Optimization",
    "System Integration"
  ],
  "growth-systems": [
    "Lead Generation Systems",
    "Marketing Automation",
    "Sales Funnel Development",
    "Analytics & Tracking",
    "A/B Testing Frameworks",
    "Conversion Optimization",
    "Customer Journey Mapping",
    "Performance Dashboards"
  ],
};

const defaultBenefits: Record<string, string[]> = {
  "web-development": [
    "Increase conversions with optimized user experience",
    "Reduce bounce rates with fast-loading pages",
    "Build trust with professional, modern design",
    "Scale seamlessly as your business grows"
  ],
  "ai-solutions": [
    "Reduce operational costs by up to 60%",
    "Provide 24/7 customer support",
    "Make data-driven decisions faster",
    "Stay ahead of the competition"
  ],
  "automation": [
    "Save 20+ hours per week on manual tasks",
    "Eliminate human error in repetitive processes",
    "Scale operations without increasing headcount",
    "Focus on high-value strategic work"
  ],
  "growth-systems": [
    "Increase lead generation by up to 300%",
    "Improve conversion rates across all channels",
    "Reduce customer acquisition costs",
    "Build predictable revenue streams"
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
      price_from: 4999,
    },
    {
      id: "ai-solutions",
      name: "AI Solutions",
      slug: "ai-solutions",
      icon: "Bot",
      short_description: "Harness artificial intelligence for business growth",
      description: "Harness the power of artificial intelligence to transform your business operations. We develop custom AI solutions including chatbots, automation workflows, and machine learning models.",
      price_from: 9999,
    },
    {
      id: "automation",
      name: "Automation",
      slug: "automation",
      icon: "Code",
      short_description: "Streamline operations with intelligent automation",
      description: "Eliminate manual processes and scale your operations with our intelligent automation solutions. From workflow automation to system integrations, we build solutions that save time and reduce errors.",
      price_from: 2999,
    },
    {
      id: "growth-systems",
      name: "Growth Systems",
      slug: "growth-systems",
      icon: "Megaphone",
      short_description: "Build predictable revenue with proven systems",
      description: "Implement data-driven growth systems that generate leads, convert prospects, and retain customers. Our growth frameworks are designed for sustainable, scalable business expansion.",
      price_from: 4999,
    },
  ];

  const displayServices = services.length > 0 ? services : (loading ? [] : fallbackServices);

  return (
    <Layout>
      {/* Hero Section */}
      <PageHero
        title="Comprehensive AI-Powered"
        titleAccent="Digital Solutions"
        subtitle="Web Development • AI Agents • Automation • Growth Systems"
        image={heroImage}
        imageAlt="NORYX AI automation and web development services"
      />

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
            className={`section-padding ${isEven ? 'bg-background' : 'bg-muted/30'}`}
          >
            <div className="container-wide">
              <div className={`grid lg:grid-cols-2 gap-12 lg:gap-20 items-center ${!isEven ? 'lg:grid-flow-dense' : ''}`}>
                {/* Content */}
                <div className={!isEven ? 'lg:col-start-2' : ''}>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center">
                      <Icon size={28} className="text-accent" />
                    </div>
                    <div>
                      <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                        {service.name}
                      </h2>
                      <p className="text-accent font-medium">{service.short_description}</p>
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
                            <CheckCircle2 size={20} className="text-accent mt-0.5 flex-shrink-0" />
                            <span className="text-muted-foreground">{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="flex flex-wrap items-center gap-4">
                    <Button size="lg" variant="accent" asChild>
                      <Link to="/hire-us">
                        Get Started
                        <ArrowRight size={18} />
                      </Link>
                    </Button>
                    {service.price_from && (
                      <div className="text-muted-foreground">
                        Starting from <span className="text-foreground font-semibold">${service.price_from.toLocaleString()}</span>
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
                          <div className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                            <CheckCircle2 size={14} className="text-accent" />
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
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-white">
            Ready to Get Started?
          </h2>
          <p className="text-lg text-primary-foreground/70 max-w-2xl mx-auto mb-10 leading-relaxed">
            Let us help you transform your business with AI-powered solutions. Schedule a free consultation 
            to discuss your project requirements and get a custom quote.
          </p>
          <Button size="xl" variant="heroAccent" asChild>
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
