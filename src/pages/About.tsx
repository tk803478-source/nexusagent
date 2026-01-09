import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { 
  ArrowRight, 
  Target, 
  Eye, 
  Heart, 
  Zap,
  Award
} from "lucide-react";

const stats = [
  { value: "200+", label: "Projects Completed" },
  { value: "98%", label: "Client Satisfaction" },
  { value: "50+", label: "Team Members" },
  { value: "15+", label: "Countries Served" },
];

const values = [
  {
    icon: Target,
    title: "Results-Driven",
    description: "We focus on delivering measurable outcomes that directly impact your bottom line.",
  },
  {
    icon: Heart,
    title: "Client-First",
    description: "Your success is our priority. We build partnerships based on trust and transparency.",
  },
  {
    icon: Zap,
    title: "Innovation",
    description: "We stay at the forefront of technology, constantly exploring new solutions.",
  },
  {
    icon: Award,
    title: "Excellence",
    description: "We hold ourselves to the highest standards in every project we deliver.",
  },
];

const team = [
  { name: "Alex Thompson", role: "Founder & CEO", expertise: "Strategy & Vision" },
  { name: "Sarah Chen", role: "Creative Director", expertise: "Design & Branding" },
  { name: "Marcus Johnson", role: "Tech Lead", expertise: "Development & Architecture" },
  { name: "Emily Rodriguez", role: "SEO Director", expertise: "Search & Analytics" },
];

export default function About() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-28 bg-primary">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-primary-foreground">
              <span className="inline-block px-4 py-2 rounded-full bg-white/10 border border-white/20 text-sm mb-6">
                About Us
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
                We Build Digital Experiences
              </h1>
              <p className="text-lg md:text-xl text-primary-foreground/80 max-w-lg leading-relaxed">
                Nexus Digital Agency is a team of passionate experts dedicated to 
                helping businesses succeed in the digital world through innovative 
                technology and creative solutions.
              </p>
            </div>
            
            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat) => (
                <div 
                  key={stat.label}
                  className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 text-center"
                >
                  <div className="text-3xl md:text-4xl font-display font-bold text-white mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-primary-foreground/70">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="section-padding bg-background">
        <div className="container-wide">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <span className="section-badge">Our Story</span>
              <h2 className="section-title">From Vision to Reality</h2>
            </div>
            
            <div className="prose-agency">
              <p>
                Nexus Digital Agency was founded with a simple yet powerful vision: to bridge the gap 
                between businesses and the digital world. In an era where technology evolves at an 
                unprecedented pace, we recognized that many companies struggled to keep up while 
                focusing on their core operations.
              </p>
              <p>
                What started as a small team of passionate developers and marketers has grown into 
                a full-service digital agency serving clients across 15 countries. Our journey has 
                been marked by continuous learning and an unwavering commitment to excellence.
              </p>
              <p>
                Today, we are proud to have helped over 200 businesses transform their digital 
                presence. Our success is measured not by the number of projects we complete, but 
                by the lasting impact we create for our clients and their customers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-padding bg-secondary/30">
        <div className="container-wide">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="card-elevated p-8 md:p-10">
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                <Target size={28} className="text-primary" />
              </div>
              <h3 className="text-2xl font-display font-bold text-foreground mb-4">Our Mission</h3>
              <p className="text-muted-foreground leading-relaxed">
                To empower businesses with innovative digital solutions that drive growth, enhance 
                customer experiences, and create lasting competitive advantages.
              </p>
            </div>
            
            <div className="card-elevated p-8 md:p-10">
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                <Eye size={28} className="text-primary" />
              </div>
              <h3 className="text-2xl font-display font-bold text-foreground mb-4">Our Vision</h3>
              <p className="text-muted-foreground leading-relaxed">
                To be the trusted digital partner for businesses worldwide, recognized for our 
                innovative solutions and meaningful contributions to our clients' success.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section-padding bg-background">
        <div className="container-wide">
          <div className="section-header">
            <span className="section-badge">Our Values</span>
            <h2 className="section-title">What We Stand For</h2>
            <p className="section-description">
              Our core values guide everything we do, from how we approach projects 
              to how we interact with clients.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value) => {
              const Icon = value.icon;
              return (
                <div key={value.title} className="text-center p-6">
                  <div className="w-16 h-16 mx-auto rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                    <Icon size={32} className="text-primary" />
                  </div>
                  <h3 className="text-xl font-display font-semibold text-foreground mb-3">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="section-padding bg-secondary/30">
        <div className="container-wide">
          <div className="section-header">
            <span className="section-badge">Our Team</span>
            <h2 className="section-title">Meet the Experts</h2>
            <p className="section-description">
              Our diverse team brings together decades of combined experience across 
              design, development, marketing, and strategy.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member) => (
              <div key={member.name} className="card-elevated p-6 text-center">
                <div className="w-20 h-20 mx-auto rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-xl mb-4">
                  {member.name.split(' ').map(n => n[0]).join('')}
                </div>
                <h3 className="font-display font-semibold text-foreground mb-1">{member.name}</h3>
                <p className="text-primary text-sm font-medium mb-2">{member.role}</p>
                <p className="text-muted-foreground text-sm">{member.expertise}</p>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <p className="text-muted-foreground mb-4">
              Want to join our team? We're always looking for talented individuals.
            </p>
            <Button asChild>
              <Link to="/careers">
                View Open Positions
                <ArrowRight size={18} />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-primary">
        <div className="container-wide text-center text-primary-foreground">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-6">
            Ready to Work Together?
          </h2>
          <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto mb-10 leading-relaxed">
            Let's discuss how we can help your business achieve its digital goals. 
            Schedule a free consultation with our team today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="xl" variant="hero" asChild>
              <Link to="/hire-us">
                Start Your Project
                <ArrowRight size={20} />
              </Link>
            </Button>
            <Button size="xl" variant="heroOutline" asChild>
              <Link to="/contact">
                Contact Us
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
