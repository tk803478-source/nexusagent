import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/home/HeroSection";
import { ServicesSection } from "@/components/home/ServicesSection";
import { WhyChooseUsSection } from "@/components/home/WhyChooseUsSection";
import { ProcessSection } from "@/components/home/ProcessSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { CTASection } from "@/components/home/CTASection";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <ServicesSection />
      <WhyChooseUsSection />
      <ProcessSection />
      <TestimonialsSection />
      <CTASection />
      
      {/* SEO-rich content section */}
      <section className="section-padding bg-secondary/30">
        <div className="container-wide">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-4">
                Your Trusted Digital Partner
              </h2>
            </div>
            
            <div className="prose-agency">
              <p>
                Welcome to Nexus Digital Agency, where innovation meets execution. In today's rapidly evolving digital landscape, 
                having a strong online presence is essential for business success. We understand the 
                challenges that businesses face when navigating the complex world of digital marketing, web development, and 
                technology integration.
              </p>
              
              <h3>Comprehensive Digital Solutions</h3>
              <p>
                Our agency offers a full spectrum of digital services designed to meet the diverse needs of businesses across 
                all industries. From startups looking to establish their first digital footprint to established enterprises 
                seeking to modernize their technology stack, we have the expertise to deliver results.
              </p>
              <p>
                Our web development team specializes in creating responsive, high-performance websites that not only look 
                stunning but also drive conversions. We utilize the latest technologies including React, Next.js, and modern 
                backend solutions to ensure your website is fast, secure, and scalable.
              </p>
              
              <h3>Data-Driven SEO Strategies</h3>
              <p>
                Search engine optimization is at the core of what we do. Our SEO specialists employ proven strategies that 
                have helped hundreds of businesses improve their search rankings and increase organic traffic. Every SEO campaign 
                we create is tailored to your specific industry, target audience, and business objectives.
              </p>
              
              <h3>Why Businesses Choose Nexus</h3>
              <p>
                What sets us apart is our commitment to results and our client-first approach. 
                We don't just deliver projects—we build partnerships. Our team takes the time to understand your business, 
                your challenges, and your goals, developing strategies specifically designed to help you succeed.
              </p>
              <p>
                Our track record speaks for itself: over 200 successful projects delivered, a 98% client satisfaction rate, 
                and countless businesses transformed through our digital solutions. Ready to take your digital presence to 
                the next level? Contact us today to schedule a free consultation.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
