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
      
      {/* SEO-rich content section for AdSense approval */}
      <section className="section-padding bg-background">
        <div className="container-wide prose-agency">
          <h2 className="text-center">Your Trusted Digital Partner</h2>
          <div className="max-w-4xl mx-auto">
            <p>
              Welcome to Nexus Digital Agency, where innovation meets execution. In today's rapidly evolving digital landscape, 
              having a strong online presence is no longer optional—it's essential for business success. We understand the 
              challenges that businesses face when navigating the complex world of digital marketing, web development, and 
              technology integration. That's why we've assembled a team of experts dedicated to helping you achieve your goals.
            </p>
            
            <h3>Comprehensive Digital Solutions for Modern Businesses</h3>
            <p>
              Our agency offers a full spectrum of digital services designed to meet the diverse needs of businesses across 
              all industries. From startups looking to establish their first digital footprint to established enterprises 
              seeking to modernize their technology stack, we have the expertise and experience to deliver results that matter.
            </p>
            <p>
              Our web development team specializes in creating responsive, high-performance websites that not only look 
              stunning but also drive conversions. We utilize the latest technologies including React, Next.js, and modern 
              backend solutions to ensure your website is fast, secure, and scalable. Every website we build is optimized 
              for search engines from the ground up, giving you a competitive advantage in organic search rankings.
            </p>
            
            <h3>Data-Driven SEO Strategies That Deliver Results</h3>
            <p>
              Search engine optimization is at the core of what we do. Our SEO specialists employ proven strategies that 
              have helped hundreds of businesses improve their search rankings and increase organic traffic. We don't 
              believe in one-size-fits-all solutions—every SEO campaign we create is tailored to your specific industry, 
              target audience, and business objectives.
            </p>
            <p>
              Our approach includes comprehensive technical SEO audits, in-depth keyword research, content optimization, 
              and strategic link building. We stay up-to-date with the latest algorithm changes and industry best practices 
              to ensure your website maintains its competitive edge in search results.
            </p>
            
            <h3>Creative Video Production and Content Marketing</h3>
            <p>
              Video content has become one of the most powerful tools for engaging audiences and conveying brand messages. 
              Our creative team produces high-quality video content that captures attention and drives action. From brand 
              videos and product demonstrations to social media content and promotional campaigns, we handle every aspect 
              of video production with creativity and precision.
            </p>
            <p>
              We understand that great content goes beyond just production value—it needs to resonate with your audience 
              and support your overall marketing objectives. That's why we work closely with you to understand your brand 
              voice, target audience, and goals before developing any creative concept.
            </p>
            
            <h3>Cutting-Edge AI Solutions for Business Optimization</h3>
            <p>
              Artificial intelligence is transforming how businesses operate, and we're at the forefront of this revolution. 
              Our AI solutions team develops custom integrations that automate workflows, enhance customer experiences, and 
              unlock new opportunities for growth. Whether you need intelligent chatbots, predictive analytics, or process 
              automation, we have the technical expertise to deliver solutions that drive real business value.
            </p>
            <p>
              We believe that AI should be accessible to businesses of all sizes. That's why we focus on creating practical, 
              cost-effective solutions that can be implemented quickly and deliver measurable results from day one.
            </p>
            
            <h3>Why Businesses Choose Nexus Digital Agency</h3>
            <p>
              What sets us apart from other digital agencies is our commitment to results and our client-first approach. 
              We don't just deliver projects—we build partnerships. Our team takes the time to understand your business, 
              your challenges, and your goals, and we develop strategies specifically designed to help you succeed.
            </p>
            <p>
              Our track record speaks for itself: over 200 successful projects delivered, a 98% client satisfaction rate, 
              and countless businesses transformed through our digital solutions. We pride ourselves on transparent 
              communication, timely delivery, and ongoing support that extends well beyond project completion.
            </p>
            <p>
              Ready to take your digital presence to the next level? Contact us today to schedule a free consultation 
              and discover how Nexus Digital Agency can help your business thrive in the digital age.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
