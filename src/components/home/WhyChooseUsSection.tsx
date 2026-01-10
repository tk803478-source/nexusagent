import { 
  Target, 
  Users, 
  Zap, 
  Shield, 
  HeadphonesIcon, 
  TrendingUp 
} from "lucide-react";

const reasons = [
  {
    icon: Target,
    title: "Results-Driven Approach",
    description: "Every strategy we develop is backed by data and focused on delivering measurable outcomes that directly impact your bottom line. We set clear KPIs and track progress to ensure maximum ROI.",
  },
  {
    icon: Users,
    title: "Dedicated Expert Team",
    description: "Work with specialists who are passionate about your success. Our team brings years of industry experience and stays current with the latest technologies and best practices.",
  },
  {
    icon: Zap,
    title: "Fast Turnaround",
    description: "Our agile processes ensure quick delivery without compromising on quality. We understand that time is money, and we're committed to meeting deadlines consistently.",
  },
  {
    icon: Shield,
    title: "Transparent Communication",
    description: "Stay informed with regular updates and open channels of communication. We believe in building trust through honesty, clarity, and proactive project management.",
  },
  {
    icon: HeadphonesIcon,
    title: "24/7 Support",
    description: "Our dedicated support team is available around the clock to address your concerns. We're always just a message away, ensuring your business never skips a beat.",
  },
  {
    icon: TrendingUp,
    title: "Scalable Solutions",
    description: "We build with growth in mind, ensuring your digital infrastructure can scale seamlessly as your business expands. Future-proof technology that grows with you.",
  },
];

export function WhyChooseUsSection() {
  return (
    <section className="section-padding bg-background">
      <div className="container-wide">
        {/* Header */}
        <div className="section-header opacity-0-start animate-fade-in-up">
          <span className="section-badge">Why Choose Us</span>
          <h2 className="section-title">Your Success Is Our Priority</h2>
          <p className="section-description">
            We combine technical expertise with creative thinking to deliver 
            solutions that exceed your expectations. Our client-first approach 
            ensures your goals remain at the center of everything we do.
          </p>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {reasons.map((reason, index) => {
            const Icon = reason.icon;
            return (
              <div
                key={reason.title}
                className={`group text-center p-8 rounded-2xl hover:bg-sky-light/50 transition-all duration-300 hover-lift opacity-0-start animate-fade-in-up delay-${(index + 1) * 100}`}
              >
                <div className="w-16 h-16 mx-auto rounded-2xl bg-sky-light flex items-center justify-center mb-6 group-hover:bg-navy group-hover:scale-110 transition-all duration-300">
                  <Icon size={30} className="text-navy group-hover:text-white" />
                </div>
                <h3 className="text-xl font-display font-semibold text-navy mb-4">
                  {reason.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {reason.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}