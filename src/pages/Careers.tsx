import { useState, useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { 
  CheckCircle2, 
  Send, 
  ArrowRight, 
  Users, 
  Globe, 
  Zap, 
  Heart,
  Briefcase
} from "lucide-react";

interface Position {
  id: string;
  title: string;
  department: string;
  description: string | null;
  requirements: string | null;
}

const benefits = [
  { icon: Globe, title: "Remote First", description: "Work from anywhere in the world" },
  { icon: Zap, title: "Flexible Hours", description: "Balance work with your life" },
  { icon: Users, title: "Great Team", description: "Collaborate with talented people" },
  { icon: Heart, title: "Growth Focus", description: "Continuous learning opportunities" },
];

export default function Careers() {
  const { toast } = useToast();
  const [positions, setPositions] = useState<Position[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [selectedPosition, setSelectedPosition] = useState<Position | null>(null);
  const [formData, setFormData] = useState({
    position_id: "",
    full_name: "",
    email: "",
    phone: "",
    skills: "",
    portfolio_url: "",
    linkedin_url: "",
    message: "",
  });

  useEffect(() => {
    async function fetchPositions() {
      const { data } = await supabase
        .from('positions')
        .select('*')
        .eq('is_open', true);
      
      if (data) setPositions(data);
    }
    fetchPositions();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleApply = (position: Position) => {
    setSelectedPosition(position);
    setFormData((prev) => ({ ...prev, position_id: position.id }));
    setShowForm(true);
    setTimeout(() => {
      document.getElementById('application-form')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase
      .from('team_applications')
      .insert([{
        position_id: formData.position_id || null,
        full_name: formData.full_name,
        email: formData.email,
        phone: formData.phone || null,
        skills: formData.skills,
        portfolio_url: formData.portfolio_url || null,
        linkedin_url: formData.linkedin_url || null,
        message: formData.message || null,
      }]);

    if (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } else {
      setSubmitted(true);
    }
    setLoading(false);
  };

  if (submitted) {
    return (
      <Layout>
        <section className="pt-32 pb-16 md:pt-40 min-h-screen flex items-center" style={{ background: 'var(--gradient-subtle)' }}>
          <div className="container-tight text-center">
            <div className="w-20 h-20 mx-auto rounded-full bg-green-100 flex items-center justify-center mb-8">
              <CheckCircle2 size={48} className="text-green-600" />
            </div>
            <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
              Application Submitted!
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-lg mx-auto">
              Thank you for your interest in joining our team. We will review your application 
              and get back to you within a few days.
            </p>
            <Button variant="accent" asChild>
              <a href="/">
                Return to Homepage
                <ArrowRight size={18} />
              </a>
            </Button>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24" style={{ background: 'var(--gradient-hero)' }}>
        <div className="container-wide text-center text-primary-foreground">
          <span className="inline-block px-4 py-2 rounded-full bg-primary-foreground/10 border border-primary-foreground/20 text-sm mb-6">
            Join Our Team
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
            Build Your Career
            <span className="text-gradient block">With Us</span>
          </h1>
          <p className="text-lg md:text-xl text-primary-foreground/80 max-w-2xl mx-auto">
            Join a team of passionate innovators working on exciting projects for clients worldwide. 
            We offer remote-friendly positions with great benefits.
          </p>
        </div>
      </section>

      {/* Benefits */}
      <section className="section-padding bg-background">
        <div className="container-wide">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-4">
              Why Work With Us
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We believe in creating an environment where talented individuals can thrive and do their best work.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit) => {
              const Icon = benefit.icon;
              return (
                <div key={benefit.title} className="text-center p-6">
                  <div className="w-14 h-14 mx-auto rounded-2xl bg-accent/10 flex items-center justify-center mb-4">
                    <Icon size={28} className="text-accent" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground">{benefit.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="section-padding" style={{ background: 'var(--gradient-subtle)' }}>
        <div className="container-wide">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-4">
              Open Positions
            </h2>
            <p className="text-muted-foreground">
              Find your perfect role and apply today.
            </p>
          </div>

          {positions.length > 0 ? (
            <div className="grid gap-6 max-w-3xl mx-auto">
              {positions.map((position) => (
                <div key={position.id} className="card-elevated p-6 md:p-8">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <Briefcase size={20} className="text-accent" />
                        <span className="text-sm text-accent font-medium">{position.department}</span>
                      </div>
                      <h3 className="text-xl font-display font-semibold text-foreground mb-2">
                        {position.title}
                      </h3>
                      {position.description && (
                        <p className="text-muted-foreground text-sm mb-2">{position.description}</p>
                      )}
                      {position.requirements && (
                        <p className="text-muted-foreground text-sm">
                          <strong>Requirements:</strong> {position.requirements}
                        </p>
                      )}
                    </div>
                    <Button 
                      variant="accent" 
                      onClick={() => handleApply(position)}
                      className="md:flex-shrink-0"
                    >
                      Apply Now
                      <ArrowRight size={18} />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">No open positions at the moment.</p>
              <p className="text-muted-foreground">
                Feel free to submit a general application below and we will keep you in mind for future opportunities.
              </p>
              <Button variant="accent" className="mt-6" onClick={() => setShowForm(true)}>
                Submit General Application
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Application Form */}
      {showForm && (
        <section id="application-form" className="section-padding bg-background">
          <div className="container-tight">
            <div className="card-elevated p-8 md:p-12">
              <h2 className="text-2xl font-display font-bold text-foreground mb-2">
                {selectedPosition ? `Apply for ${selectedPosition.title}` : 'Submit Your Application'}
              </h2>
              <p className="text-muted-foreground mb-8">
                Fill out the form below and we will review your application.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="full_name">Full Name *</Label>
                    <Input
                      id="full_name"
                      name="full_name"
                      value={formData.full_name}
                      onChange={handleChange}
                      placeholder="John Smith"
                      required
                      className="h-12"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      required
                      className="h-12"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+1 (234) 567-890"
                      className="h-12"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="portfolio_url">Portfolio URL</Label>
                    <Input
                      id="portfolio_url"
                      name="portfolio_url"
                      type="url"
                      value={formData.portfolio_url}
                      onChange={handleChange}
                      placeholder="https://yourportfolio.com"
                      className="h-12"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="linkedin_url">LinkedIn Profile</Label>
                  <Input
                    id="linkedin_url"
                    name="linkedin_url"
                    type="url"
                    value={formData.linkedin_url}
                    onChange={handleChange}
                    placeholder="https://linkedin.com/in/yourprofile"
                    className="h-12"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="skills">Your Skills & Experience *</Label>
                  <Textarea
                    id="skills"
                    name="skills"
                    value={formData.skills}
                    onChange={handleChange}
                    placeholder="List your relevant skills, technologies, and years of experience..."
                    required
                    rows={4}
                    className="resize-none"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Why do you want to join us?</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about yourself and why you would be a great fit for our team..."
                    rows={4}
                    className="resize-none"
                  />
                </div>

                <div className="pt-4">
                  <Button 
                    type="submit" 
                    size="lg" 
                    variant="accent"
                    disabled={loading}
                    className="w-full md:w-auto"
                  >
                    {loading ? "Submitting..." : (
                      <>
                        Submit Application
                        <Send size={18} />
                      </>
                    )}
                  </Button>
                  <p className="text-sm text-muted-foreground mt-4">
                    By submitting this form, you agree to our{" "}
                    <a href="/privacy-policy" className="text-accent hover:underline">Privacy Policy</a>.
                  </p>
                </div>
              </form>
            </div>
          </div>
        </section>
      )}
    </Layout>
  );
}
