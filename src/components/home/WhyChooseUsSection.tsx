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
    description: "Every strategy we develop is backed by data and focused on delivering measurable outcomes that impact your bottom line.",
  },
  {
    icon: Users,
    title: "Dedicated Expert Team",
    description: "Work with a team of specialists who are passionate about your success and bring years of industry experience to every project.",
  },
  {
    icon: Zap,
    title: "Fast Turnaround",
    description: "We understand the importance of time-to-market. Our agile processes ensure quick delivery without compromising quality.",
  },
  {
    icon: Shield,
    title: "Transparent Communication",
    description: "Stay informed with regular updates, clear reporting, and open channels of communication throughout your project lifecycle.",
  },
  {
    icon: HeadphonesIcon,
    title: "24/7 Support",
    description: "Our support team is available around the clock to address your concerns and ensure your digital assets are always performing.",
  },
  {
    icon: TrendingUp,
    title: "Scalable Solutions",
    description: "We build with growth in mind, ensuring your digital infrastructure can scale seamlessly as your business expands.",
  },
];

export function WhyChooseUsSection() {
  return (
    <section className="section-padding bg-background">
      <div className="container-wide">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
            Why Choose Us
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-6">
            Your Success Is Our Priority
          </h2>
          <p className="text-lg text-muted-foreground">
            We combine technical expertise with creative thinking to deliver 
            solutions that not only meet your requirements but exceed your expectations.
          </p>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason, index) => {
            const Icon = reason.icon;
            return (
              <div
                key={reason.title}
                className="group text-center p-8"
              >
                <div className="w-16 h-16 mx-auto rounded-2xl bg-accent/10 flex items-center justify-center mb-6 group-hover:bg-accent group-hover:scale-110 transition-all duration-300">
                  <Icon size={32} className="text-accent group-hover:text-accent-foreground" />
                </div>
                <h3 className="text-xl font-display font-semibold text-foreground mb-3">
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
