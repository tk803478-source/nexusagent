import { useState, useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle2, Send, ArrowRight } from "lucide-react";

interface Service {
  id: string;
  name: string;
  slug: string;
}

export default function HireUs() {
  const { toast } = useToast();
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    service_id: "",
    client_name: "",
    client_email: "",
    client_phone: "",
    company_name: "",
    requirements: "",
    budget: "",
    timeline: "",
  });

  useEffect(() => {
    async function fetchServices() {
      const { data } = await supabase
        .from('services')
        .select('id, name, slug')
        .eq('status', 'active')
        .order('display_order');
      
      if (data) setServices(data);
    }
    fetchServices();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase
      .from('service_requests')
      .insert([{
        service_id: formData.service_id || null,
        client_name: formData.client_name,
        client_email: formData.client_email,
        client_phone: formData.client_phone || null,
        company_name: formData.company_name || null,
        requirements: formData.requirements,
        budget: formData.budget || null,
        timeline: formData.timeline || null,
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
        <section className="pt-32 pb-16 md:pt-40 min-h-screen flex items-center bg-secondary/30">
          <div className="container-tight text-center">
            <div className="w-20 h-20 mx-auto rounded-full bg-green-100 flex items-center justify-center mb-8">
              <CheckCircle2 size={48} className="text-green-600" />
            </div>
            <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
              Request Submitted Successfully!
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-lg mx-auto leading-relaxed">
              Thank you for your interest in our services. Our team will review your request 
              and get back to you within 24 hours.
            </p>
            <Button asChild>
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
      <section className="pt-32 pb-20 md:pt-40 md:pb-28 bg-primary">
        <div className="container-wide text-center text-primary-foreground">
          <span className="inline-block px-4 py-2 rounded-full bg-white/10 border border-white/20 text-sm mb-6">
            Start Your Project
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
            Hire Our Services
          </h1>
          <p className="text-lg md:text-xl text-primary-foreground/80 max-w-2xl mx-auto leading-relaxed">
            Tell us about your project and let our team help you achieve your digital goals. 
            Fill out the form below to get started.
          </p>
        </div>
      </section>

      {/* Form Section */}
      <section className="section-padding bg-background">
        <div className="container-tight">
          <div className="card-elevated p-8 md:p-12">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Service Selection */}
              <div className="space-y-2">
                <Label htmlFor="service">Service You Need *</Label>
                <Select 
                  value={formData.service_id} 
                  onValueChange={(value) => handleSelectChange('service_id', value)}
                >
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Select a service" />
                  </SelectTrigger>
                  <SelectContent>
                    {services.map((service) => (
                      <SelectItem key={service.id} value={service.id}>
                        {service.name}
                      </SelectItem>
                    ))}
                    <SelectItem value="other">Other / Multiple Services</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Contact Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground pb-2 border-b border-border">Contact Information</h3>
                <div className="grid md:grid-cols-2 gap-6 pt-2">
                  <div className="space-y-2">
                    <Label htmlFor="client_name">Full Name *</Label>
                    <Input
                      id="client_name"
                      name="client_name"
                      value={formData.client_name}
                      onChange={handleChange}
                      placeholder="John Smith"
                      required
                      className="h-12"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="client_email">Email Address *</Label>
                    <Input
                      id="client_email"
                      name="client_email"
                      type="email"
                      value={formData.client_email}
                      onChange={handleChange}
                      placeholder="john@company.com"
                      required
                      className="h-12"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="client_phone">Phone Number</Label>
                    <Input
                      id="client_phone"
                      name="client_phone"
                      type="tel"
                      value={formData.client_phone}
                      onChange={handleChange}
                      placeholder="+1 (234) 567-890"
                      className="h-12"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company_name">Company Name</Label>
                    <Input
                      id="company_name"
                      name="company_name"
                      value={formData.company_name}
                      onChange={handleChange}
                      placeholder="Your Company Inc."
                      className="h-12"
                    />
                  </div>
                </div>
              </div>

              {/* Project Details */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground pb-2 border-b border-border">Project Details</h3>
                
                <div className="space-y-2 pt-2">
                  <Label htmlFor="requirements">Project Requirements *</Label>
                  <Textarea
                    id="requirements"
                    name="requirements"
                    value={formData.requirements}
                    onChange={handleChange}
                    placeholder="Please describe your project requirements in detail. Include goals, target audience, specific features needed, and any reference examples..."
                    required
                    rows={6}
                    className="resize-none"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="budget">Estimated Budget</Label>
                    <Select 
                      value={formData.budget} 
                      onValueChange={(value) => handleSelectChange('budget', value)}
                    >
                      <SelectTrigger className="h-12">
                        <SelectValue placeholder="Select budget range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="under-1000">Under $1,000</SelectItem>
                        <SelectItem value="1000-5000">$1,000 - $5,000</SelectItem>
                        <SelectItem value="5000-10000">$5,000 - $10,000</SelectItem>
                        <SelectItem value="10000-25000">$10,000 - $25,000</SelectItem>
                        <SelectItem value="25000-50000">$25,000 - $50,000</SelectItem>
                        <SelectItem value="over-50000">Over $50,000</SelectItem>
                        <SelectItem value="discuss">Prefer to discuss</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="timeline">Desired Timeline</Label>
                    <Select 
                      value={formData.timeline} 
                      onValueChange={(value) => handleSelectChange('timeline', value)}
                    >
                      <SelectTrigger className="h-12">
                        <SelectValue placeholder="Select timeline" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="asap">As soon as possible</SelectItem>
                        <SelectItem value="1-2-weeks">1-2 weeks</SelectItem>
                        <SelectItem value="1-month">Within 1 month</SelectItem>
                        <SelectItem value="1-3-months">1-3 months</SelectItem>
                        <SelectItem value="3-6-months">3-6 months</SelectItem>
                        <SelectItem value="flexible">Flexible</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <Button 
                  type="submit" 
                  size="lg" 
                  disabled={loading}
                  className="w-full md:w-auto"
                >
                  {loading ? (
                    "Submitting..."
                  ) : (
                    <>
                      Submit Request
                      <Send size={18} />
                    </>
                  )}
                </Button>
                <p className="text-sm text-muted-foreground mt-4">
                  By submitting this form, you agree to our{" "}
                  <a href="/privacy-policy" className="text-primary hover:underline">Privacy Policy</a>
                  {" "}and{" "}
                  <a href="/terms-of-service" className="text-primary hover:underline">Terms of Service</a>.
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>
    </Layout>
  );
}
