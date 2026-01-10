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
      <section className="section-padding bg-sky-section">
        <div className="container-wide">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12 opacity-0-start animate-fade-in-up">
              <span className="section-badge">About Our Agency</span>
              <h2 className="section-title">Your Trusted Digital Partner</h2>
            </div>
            
            <div className="prose-agency opacity-0-start animate-fade-in-up delay-100">
              <p>
                Welcome to Nexus Digital Agency, where innovation meets execution. In today's rapidly evolving digital landscape, 
                having a strong online presence is essential for business success. We understand the 
                challenges that businesses face when navigating the complex world of digital marketing, web development, and 
                technology integration. That's why we've built a team of experts dedicated to simplifying your digital journey.
              </p>
              
              <h3>Comprehensive Digital Solutions for Modern Businesses</h3>
              <p>
                Our agency offers a full spectrum of digital services designed to meet the diverse needs of businesses across 
                all industries. From startups looking to establish their first digital footprint to established enterprises 
                seeking to modernize their technology stack, we have the expertise and experience to deliver measurable results 
                that impact your bottom line.
              </p>
              <p>
                Our web development team specializes in creating responsive, high-performance websites that not only look 
                stunning but also drive conversions. We utilize the latest technologies including React, Next.js, and modern 
                backend solutions to ensure your website is fast, secure, and scalable. Every website we build is optimized 
                for search engines from day one, giving you a competitive edge in your market.
              </p>
              
              <h3>Data-Driven SEO Strategies That Deliver Results</h3>
              <p>
                Search engine optimization is at the core of what we do. Our SEO specialists employ proven strategies that 
                have helped hundreds of businesses improve their search rankings and increase organic traffic. Every SEO campaign 
                we create is tailored to your specific industry, target audience, and business objectives. We focus on sustainable, 
                white-hat techniques that build long-term authority and trust with search engines.
              </p>

              <div className="my-8 p-6 rounded-2xl bg-background border border-border">
                <h4 className="text-lg font-semibold text-navy mb-4">What Sets Us Apart:</h4>
                <ul className="space-y-3">
                  {[
                    "Dedicated project managers for every client",
                    "Transparent reporting and regular communication",
                    "Customized strategies based on your unique goals",
                    "Proven track record with measurable results",
                    "Ongoing support and optimization"
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <CheckCircle2 size={20} className="text-sky mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <h3>Why Businesses Choose Nexus Digital Agency</h3>
              <p>
                What sets us apart is our commitment to results and our client-first approach. 
                We don't just deliver projects—we build partnerships. Our team takes the time to understand your business, 
                your challenges, and your goals, developing strategies specifically designed to help you succeed in the 
                competitive digital marketplace.
              </p>
              <p>
                Our track record speaks for itself: over 200 successful projects delivered, a 98% client satisfaction rate, 
                and countless businesses transformed through our digital solutions. We've helped companies increase their 
                organic traffic by up to 300%, improve conversion rates by 150%, and build brands that stand out in crowded markets.
              </p>
              <p>
                Ready to take your digital presence to the next level? Contact us today to schedule a free consultation. 
                Our team is ready to listen to your vision and show you how we can help turn it into reality. Together, 
                we'll create a digital strategy that drives growth, engages your audience, and delivers lasting results.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;