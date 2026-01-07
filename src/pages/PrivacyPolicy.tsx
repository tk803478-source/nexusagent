import { Layout } from "@/components/layout/Layout";

export default function PrivacyPolicy() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-20" style={{ background: 'var(--gradient-hero)' }}>
        <div className="container-wide text-center text-primary-foreground">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Privacy Policy
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
            <h2>Introduction</h2>
            <p>
              Nexus Digital Agency ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy 
              explains how we collect, use, disclose, and safeguard your information when you visit our website or use 
              our services. Please read this privacy policy carefully. If you do not agree with the terms of this privacy 
              policy, please do not access the site.
            </p>

            <h2>Information We Collect</h2>
            <h3>Personal Data</h3>
            <p>
              We may collect personal information that you voluntarily provide to us when you express interest in 
              obtaining information about our services, when you participate in activities on the website, or otherwise 
              when you contact us. The personal information we collect may include:
            </p>
            <ul>
              <li>Name and contact information (email address, phone number, mailing address)</li>
              <li>Company name and job title</li>
              <li>Information about your project requirements</li>
              <li>Payment information for service transactions</li>
              <li>Resume and portfolio information for job applications</li>
              <li>Any other information you choose to provide</li>
            </ul>

            <h3>Automatically Collected Information</h3>
            <p>
              When you visit our website, we automatically collect certain information about your device and your visit, 
              including:
            </p>
            <ul>
              <li>IP address and browser type</li>
              <li>Operating system</li>
              <li>Referring URLs and pages visited</li>
              <li>Time spent on pages</li>
              <li>Other diagnostic data</li>
            </ul>

            <h2>How We Use Your Information</h2>
            <p>We use the information we collect for various purposes, including to:</p>
            <ul>
              <li>Provide, operate, and maintain our services</li>
              <li>Respond to your inquiries and fulfill your requests</li>
              <li>Send you updates, marketing communications, and promotional materials</li>
              <li>Process job applications and evaluate candidates</li>
              <li>Improve our website and services</li>
              <li>Analyze usage patterns and trends</li>
              <li>Protect against fraudulent or illegal activity</li>
              <li>Comply with legal obligations</li>
            </ul>

            <h2>Sharing Your Information</h2>
            <p>
              We do not sell, trade, or otherwise transfer your personal information to third parties without your 
              consent, except in the following circumstances:
            </p>
            <ul>
              <li><strong>Service Providers:</strong> We may share your information with third-party vendors who perform 
              services on our behalf, such as payment processing, email delivery, and analytics.</li>
              <li><strong>Legal Requirements:</strong> We may disclose your information when required by law or in response 
              to valid requests by public authorities.</li>
              <li><strong>Business Transfers:</strong> In the event of a merger, acquisition, or sale of assets, your 
              information may be transferred as part of that transaction.</li>
            </ul>

            <h2 id="cookies">Cookies and Tracking Technologies</h2>
            <p>
              We use cookies and similar tracking technologies to track activity on our website and hold certain 
              information. Cookies are files with small amount of data which may include an anonymous unique identifier. 
              You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
            </p>
            <p>Types of cookies we use:</p>
            <ul>
              <li><strong>Essential Cookies:</strong> Necessary for the website to function properly</li>
              <li><strong>Analytics Cookies:</strong> Help us understand how visitors interact with our website</li>
              <li><strong>Marketing Cookies:</strong> Used to deliver relevant advertisements</li>
            </ul>

            <h2>Data Security</h2>
            <p>
              We implement appropriate technical and organizational security measures to protect your personal 
              information against unauthorized access, alteration, disclosure, or destruction. However, no method of 
              transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute 
              security.
            </p>

            <h2>Your Rights</h2>
            <p>Depending on your location, you may have the following rights regarding your personal data:</p>
            <ul>
              <li>The right to access and receive a copy of your personal data</li>
              <li>The right to rectify or update inaccurate personal data</li>
              <li>The right to erasure (deletion) of your personal data</li>
              <li>The right to restrict or object to processing</li>
              <li>The right to data portability</li>
              <li>The right to withdraw consent</li>
            </ul>
            <p>
              To exercise any of these rights, please contact us using the information provided below.
            </p>

            <h2>Third-Party Links</h2>
            <p>
              Our website may contain links to third-party websites. We are not responsible for the privacy practices 
              or content of these third-party sites. We encourage you to read the privacy policies of any third-party 
              websites you visit.
            </p>

            <h2>Children's Privacy</h2>
            <p>
              Our services are not intended for individuals under the age of 18. We do not knowingly collect personal 
              information from children. If you are a parent or guardian and believe your child has provided us with 
              personal information, please contact us immediately.
            </p>

            <h2>Changes to This Privacy Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the 
              new Privacy Policy on this page and updating the "Last updated" date. You are advised to review this 
              Privacy Policy periodically for any changes.
            </p>

            <h2>Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy or our data practices, please contact us:
            </p>
            <ul>
              <li>Email: privacy@nexusagency.com</li>
              <li>Phone: +1 (234) 567-890</li>
              <li>Address: 123 Business Avenue, San Francisco, CA 94102</li>
            </ul>
          </div>
        </div>
      </section>
    </Layout>
  );
}
