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
    description: "Every strategy we develop is backed by data and focused on delivering measurable outcomes.",
  },
  {
    icon: Users,
    title: "Dedicated Expert Team",
    description: "Work with specialists who are passionate about your success and bring years of experience.",
  },
  {
    icon: Zap,
    title: "Fast Turnaround",
    description: "Our agile processes ensure quick delivery without compromising on quality.",
  },
  {
    icon: Shield,
    title: "Transparent Communication",
    description: "Stay informed with regular updates and open channels of communication.",
  },
  {
    icon: HeadphonesIcon,
    title: "24/7 Support",
    description: "Our support team is available around the clock to address your concerns.",
  },
  {
    icon: TrendingUp,
    title: "Scalable Solutions",
    description: "We build with growth in mind, ensuring your infrastructure can scale seamlessly.",
  },
];

export function WhyChooseUsSection() {
  return (
    <section className="section-padding bg-background">
      <div className="container-wide">
        {/* Header */}
        <div className="section-header">
          <span className="section-badge">Why Choose Us</span>
          <h2 className="section-title">Your Success Is Our Priority</h2>
          <p className="section-description">
            We combine technical expertise with creative thinking to deliver 
            solutions that exceed your expectations.
          </p>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {reasons.map((reason) => {
            const Icon = reason.icon;
            return (
              <div
                key={reason.title}
                className="group text-center p-8 rounded-2xl hover:bg-secondary/50 transition-colors duration-300"
              >
                <div className="w-16 h-16 mx-auto rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                  <Icon size={30} className="text-primary group-hover:text-primary-foreground" />
                </div>
                <h3 className="text-xl font-display font-semibold text-foreground mb-4">
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
