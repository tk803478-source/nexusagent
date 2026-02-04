import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/home/HeroSection";
import { ServicesSection } from "@/components/home/ServicesSection";
import { WhyChooseUsSection } from "@/components/home/WhyChooseUsSection";
import { ProcessSection } from "@/components/home/ProcessSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { CTASection } from "@/components/home/CTASection";
import { CheckCircle2 } from "lucide-react";

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
      <section className="section-padding bg-background">
        <div className="container-wide">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12 opacity-0-start animate-fade-in-up">
              <span className="section-badge">About NORYX</span>
              <h2 className="section-title">Your Trusted AI & Digital Partner</h2>
            </div>
            
            <div className="prose-agency opacity-0-start animate-fade-in-up delay-100">
              <p>
                Welcome to NORYX, where innovation meets execution. In today's rapidly evolving digital landscape, 
                having a strong AI-powered presence is essential for business success. We understand the 
                challenges that businesses face when navigating the complex world of digital transformation, 
                AI integration, and automation. That's why we've built a team of experts dedicated to simplifying your digital journey.
              </p>
              
              <h3>Comprehensive AI-Powered Solutions for Modern Businesses</h3>
              <p>
                Our agency offers a full spectrum of digital services designed to meet the diverse needs of businesses across 
                all industries. From startups looking to leverage AI for the first time to established enterprises 
                seeking to modernize their technology stack, we have the expertise and experience to deliver measurable results 
                that impact your bottom line.
              </p>
              <p>
                Our development team specializes in creating high-performance web applications and AI-powered systems that not only look 
                stunning but also drive conversions. We utilize the latest technologies including React, Next.js, and modern 
                AI frameworks to ensure your business is fast, secure, and scalable.
              </p>
              
              <h3>AI Agents & Automation That Deliver Results</h3>
              <p>
                AI automation is at the core of what we do. Our AI specialists employ proven strategies that 
                have helped hundreds of businesses improve their efficiency and reduce operational costs. Every AI solution 
                we create is tailored to your specific industry, target audience, and business objectives. We focus on sustainable, 
                scalable solutions that build long-term value for your organization.
              </p>

              <div className="my-8 p-6 rounded-2xl bg-card border border-border">
                <h4 className="text-lg font-semibold text-foreground mb-4">What Sets Us Apart:</h4>
                <ul className="space-y-3">
                  {[
                    "Dedicated project managers for every client",
                    "Transparent reporting and regular communication",
                    "Customized AI strategies based on your unique goals",
                    "Proven track record with measurable results",
                    "Ongoing support and optimization"
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <CheckCircle2 size={20} className="text-accent mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <h3>Why Businesses Choose NORYX</h3>
              <p>
                What sets us apart is our commitment to results and our client-first approach. 
                We don't just deliver projects—we build partnerships. Our team takes the time to understand your business, 
                your challenges, and your goals, developing AI-powered strategies specifically designed to help you succeed in the 
                competitive digital marketplace.
              </p>
              <p>
                Our track record speaks for itself: over 200 successful projects delivered, a 98% client satisfaction rate, 
                and countless businesses transformed through our AI solutions. We've helped companies reduce operational 
                costs by up to 60%, improve conversion rates by 150%, and build brands that stand out in crowded markets.
              </p>
              <p>
                Ready to take your business to the next level? Contact us today to schedule a free consultation. 
                Our team is ready to listen to your vision and show you how we can help turn it into reality. Together, 
                we'll create an AI-powered strategy that drives growth, engages your audience, and delivers lasting results.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
