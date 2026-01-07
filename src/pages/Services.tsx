import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { 
  Globe, 
  Search, 
  Video, 
  Bot, 
  ArrowRight, 
  CheckCircle2,
  Code2,
  LineChart,
  Palette,
  Zap
} from "lucide-react";

const services = [
  {
    id: "web-development",
    icon: Globe,
    name: "Web Development",
    tagline: "Custom websites that convert visitors into customers",
    description: "Transform your digital presence with our expert web development services. We specialize in creating responsive, high-performance websites and web applications using the latest technologies including React, Next.js, and modern backend solutions. Our team delivers scalable solutions that grow with your business, from simple landing pages to complex enterprise applications.",
    features: [
      "Custom Website Design & Development",
      "E-commerce Solutions & Online Stores",
      "Progressive Web Applications (PWA)",
      "Content Management Systems",
      "API Development & Integration",
      "Performance Optimization",
      "Security Implementation",
      "Ongoing Maintenance & Support"
    ],
    benefits: [
      "Increase conversions with optimized user experience",
      "Reduce bounce rates with fast-loading pages",
      "Build trust with professional, modern design",
      "Scale seamlessly as your business grows"
    ],
    priceFrom: 999,
  },
  {
    id: "seo-optimization",
    icon: Search,
    name: "SEO Optimization",
    tagline: "Dominate search rankings and drive organic traffic",
    description: "Elevate your online visibility with our comprehensive SEO services. We employ data-driven strategies to improve your search engine rankings, increase organic traffic, and maximize your ROI. Our approach includes technical SEO audits, keyword research, content optimization, and link building strategies tailored to your industry and target audience.",
    features: [
      "Comprehensive SEO Audits",
      "Keyword Research & Strategy",
      "On-Page SEO Optimization",
      "Technical SEO Implementation",
      "Content Strategy & Creation",
      "Link Building Campaigns",
      "Local SEO Optimization",
      "Monthly Performance Reports"
    ],
    benefits: [
      "Increase organic traffic by up to 300%",
      "Reduce cost per acquisition",
      "Build long-term sustainable growth",
      "Outrank your competitors"
    ],
    priceFrom: 499,
  },
  {
    id: "video-production",
    icon: Video,
    name: "Video Production",
    tagline: "Captivate audiences with compelling visual stories",
    description: "Captivate your audience with professional video content. Our video production team creates compelling visual stories that engage viewers and drive results. From promotional videos and social media content to full-scale commercial productions, we handle every aspect of the video creation process with creativity and precision.",
    features: [
      "Brand & Corporate Videos",
      "Product Demonstrations",
      "Social Media Content",
      "Motion Graphics & Animation",
      "Video Editing & Post-Production",
      "Script Writing & Storyboarding",
      "Voiceover & Sound Design",
      "Multi-Platform Optimization"
    ],
    benefits: [
      "Increase engagement by 1200% compared to text",
      "Boost conversion rates with video content",
      "Build stronger emotional connections",
      "Stand out in crowded feeds"
    ],
    priceFrom: 799,
  },
  {
    id: "ai-solutions",
    icon: Bot,
    name: "AI Solutions",
    tagline: "Harness artificial intelligence for business growth",
    description: "Harness the power of artificial intelligence to transform your business operations. We develop custom AI solutions including chatbots, automation workflows, data analysis tools, and machine learning models. Our AI services help you streamline processes, enhance customer experiences, and gain competitive advantages in your market.",
    features: [
      "Custom AI Chatbots & Assistants",
      "Process Automation",
      "Predictive Analytics",
      "Natural Language Processing",
      "Computer Vision Solutions",
      "Machine Learning Models",
      "Data Analysis & Insights",
      "AI Strategy Consulting"
    ],
    benefits: [
      "Reduce operational costs by up to 60%",
      "Provide 24/7 customer support",
      "Make data-driven decisions faster",
      "Stay ahead of the competition"
    ],
    priceFrom: 1499,
  },
];

export default function Services() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.slice(1));
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
      }
    }
  }, [location]);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24" style={{ background: 'var(--gradient-hero)' }}>
        <div className="container-wide text-center text-primary-foreground">
          <span className="inline-block px-4 py-2 rounded-full bg-primary-foreground/10 border border-primary-foreground/20 text-sm mb-6">
            Our Services
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
            Comprehensive Digital
            <span className="text-gradient block">Solutions</span>
          </h1>
          <p className="text-lg md:text-xl text-primary-foreground/80 max-w-2xl mx-auto">
            From strategy to execution, we provide end-to-end digital services 
            that help businesses thrive in the modern marketplace.
          </p>
        </div>
      </section>

      {/* Services Detail Sections */}
      {services.map((service, index) => {
        const Icon = service.icon;
        const isEven = index % 2 === 0;
        
        return (
          <section 
            key={service.id} 
            id={service.id}
            className={`section-padding ${isEven ? 'bg-background' : ''}`}
            style={!isEven ? { background: 'var(--gradient-subtle)' } : undefined}
          >
            <div className="container-wide">
              <div className={`grid lg:grid-cols-2 gap-12 lg:gap-16 items-center ${!isEven ? 'lg:grid-flow-dense' : ''}`}>
                {/* Content */}
                <div className={!isEven ? 'lg:col-start-2' : ''}>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center">
                      <Icon size={28} className="text-accent" />
                    </div>
                    <div>
                      <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">
                        {service.name}
                      </h2>
                      <p className="text-accent font-medium">{service.tagline}</p>
                    </div>
                  </div>
                  
                  <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                    {service.description}
                  </p>

                  <div className="mb-8">
                    <h3 className="text-lg font-semibold text-foreground mb-4">Key Benefits</h3>
                    <ul className="space-y-3">
                      {service.benefits.map((benefit) => (
                        <li key={benefit} className="flex items-start gap-3">
                          <CheckCircle2 size={20} className="text-accent mt-0.5 flex-shrink-0" />
                          <span className="text-muted-foreground">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-wrap items-center gap-4">
                    <Button size="lg" variant="accent" asChild>
                      <Link to="/hire-us">
                        Get Started
                        <ArrowRight size={18} />
                      </Link>
                    </Button>
                    <div className="text-muted-foreground">
                      Starting from <span className="text-foreground font-semibold">${service.priceFrom}</span>
                    </div>
                  </div>
                </div>

                {/* Features Card */}
                <div className={`card-elevated p-8 ${!isEven ? 'lg:col-start-1' : ''}`}>
                  <h3 className="text-xl font-semibold text-foreground mb-6">What's Included</h3>
                  <ul className="space-y-4">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                          <CheckCircle2 size={14} className="text-accent" />
                        </div>
                        <span className="text-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>
        );
      })}

      {/* CTA Section */}
      <section className="section-padding" style={{ background: 'var(--gradient-hero)' }}>
        <div className="container-wide text-center text-primary-foreground">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto mb-8">
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
