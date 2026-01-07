import { Layout } from "@/components/layout/Layout";

export default function TermsOfService() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-20" style={{ background: 'var(--gradient-hero)' }}>
        <div className="container-wide text-center text-primary-foreground">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Terms of Service
          </h1>
          <p className="text-primary-foreground/80">
            Last updated: January 7, 2025
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding bg-background">
        <div className="container-tight">
          <div className="prose-agency max-w-none">
            <h2>Agreement to Terms</h2>
            <p>
              These Terms of Service constitute a legally binding agreement made between you, whether personally or 
              on behalf of an entity ("you") and Nexus Digital Agency ("Company," "we," "us," or "our"), concerning 
              your access to and use of our website and services. You agree that by accessing the website or using 
              our services, you have read, understood, and agree to be bound by all of these Terms of Service.
            </p>
            <p>
              IF YOU DO NOT AGREE WITH ALL OF THESE TERMS OF SERVICE, THEN YOU ARE EXPRESSLY PROHIBITED FROM USING 
              THE SITE AND SERVICES AND YOU MUST DISCONTINUE USE IMMEDIATELY.
            </p>

            <h2>Services</h2>
            <p>
              Nexus Digital Agency provides digital services including but not limited to web development, SEO 
              optimization, video production, and AI solutions. The specific scope of services will be outlined in 
              individual service agreements or project proposals provided to clients.
            </p>

            <h2>Intellectual Property Rights</h2>
            <p>
              Unless otherwise indicated, the website and all content, features, and functionality are owned by 
              Nexus Digital Agency, its licensors, or other providers of such material and are protected by 
              copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.
            </p>
            <p>
              Upon full payment for services rendered, clients will receive the rights to the deliverables as 
              specified in their service agreement. Third-party components, stock assets, or licensed materials 
              may be subject to additional terms.
            </p>

            <h2>User Representations</h2>
            <p>By using the website and services, you represent and warrant that:</p>
            <ul>
              <li>You have the legal capacity and agree to comply with these Terms of Service</li>
              <li>You are not a minor in the jurisdiction in which you reside</li>
              <li>You will not access the website through automated or non-human means</li>
              <li>You will not use the website for any illegal or unauthorized purpose</li>
              <li>Your use of the website will not violate any applicable law or regulation</li>
            </ul>

            <h2>Service Requests and Orders</h2>
            <p>
              When you submit a service request through our website, you are making an inquiry, not a binding 
              commitment. A binding agreement is only formed when we accept your project and you confirm 
              acceptance of our proposal, including scope, timeline, and pricing.
            </p>
            <p>
              We reserve the right to refuse service to anyone for any reason at any time. Pricing for services 
              is subject to change without notice until a formal agreement is executed.
            </p>

            <h2>Payment Terms</h2>
            <p>
              Payment terms will be specified in individual service agreements. Generally, we require a deposit 
              before commencing work, with remaining payments due according to agreed milestones or upon project 
              completion. All fees are non-refundable unless otherwise specified.
            </p>
            <p>
              Late payments may incur interest charges and may result in suspension of services. We accept various 
              payment methods as specified during the checkout process.
            </p>

            <h2>Project Deliverables</h2>
            <p>
              We will deliver services in accordance with the specifications outlined in your service agreement. 
              Revisions and modifications may be subject to additional charges if they exceed the scope agreed upon.
            </p>
            <p>
              You are responsible for reviewing deliverables promptly and providing feedback within the timeframe 
              specified. Failure to respond may result in automatic approval of deliverables.
            </p>

            <h2>Confidentiality</h2>
            <p>
              Both parties agree to keep confidential all non-public information disclosed during the course of 
              the business relationship. This includes but is not limited to business strategies, technical 
              information, and customer data.
            </p>

            <h2>Limitation of Liability</h2>
            <p>
              IN NO EVENT WILL WE OR OUR DIRECTORS, EMPLOYEES, OR AGENTS BE LIABLE TO YOU OR ANY THIRD PARTY FOR 
              ANY DIRECT, INDIRECT, CONSEQUENTIAL, EXEMPLARY, INCIDENTAL, SPECIAL, OR PUNITIVE DAMAGES, INCLUDING 
              LOST PROFIT, LOST REVENUE, LOSS OF DATA, OR OTHER DAMAGES ARISING FROM YOUR USE OF THE WEBSITE OR 
              SERVICES, EVEN IF WE HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
            </p>
            <p>
              Our total liability to you for all claims arising from or related to our services shall not exceed 
              the total amount paid by you for the specific service giving rise to the claim.
            </p>

            <h2>Indemnification</h2>
            <p>
              You agree to defend, indemnify, and hold us harmless, including our subsidiaries, affiliates, and 
              all of our respective officers, agents, partners, and employees, from and against any loss, damage, 
              liability, claim, or demand, including reasonable attorneys' fees and expenses, made by any third 
              party due to or arising out of your use of the services.
            </p>

            <h2>Termination</h2>
            <p>
              These Terms of Service remain in full force and effect while you use the website or services. We may 
              terminate or suspend your access immediately, without prior notice or liability, for any reason 
              whatsoever, including without limitation if you breach these Terms of Service.
            </p>
            <p>
              For project-based services, termination terms will be specified in individual service agreements. 
              Generally, either party may terminate with written notice, subject to payment for work completed.
            </p>

            <h2>Dispute Resolution</h2>
            <p>
              Any disputes arising out of or relating to these Terms of Service or your use of our services shall 
              be resolved through good-faith negotiations. If negotiations fail, disputes shall be resolved through 
              binding arbitration in accordance with the rules of the American Arbitration Association.
            </p>

            <h2>Governing Law</h2>
            <p>
              These Terms of Service and your use of the website and services are governed by and construed in 
              accordance with the laws of the State of California, without regard to its conflict of law principles.
            </p>

            <h2>Severability</h2>
            <p>
              If any provision of these Terms of Service is held to be unenforceable or invalid, such provision 
              will be changed and interpreted to accomplish the objectives of such provision to the greatest extent 
              possible under applicable law, and the remaining provisions will continue in full force and effect.
            </p>

            <h2>Changes to Terms</h2>
            <p>
              We reserve the right to modify or replace these Terms of Service at any time. If a revision is 
              material, we will provide at least 30 days notice prior to any new terms taking effect. What 
              constitutes a material change will be determined at our sole discretion.
            </p>

            <h2>Contact Information</h2>
            <p>
              If you have any questions about these Terms of Service, please contact us:
            </p>
            <ul>
              <li>Email: legal@nexusagency.com</li>
              <li>Phone: +1 (234) 567-890</li>
              <li>Address: 123 Business Avenue, San Francisco, CA 94102</li>
            </ul>
          </div>
        </div>
      </section>
    </Layout>
  );
}
