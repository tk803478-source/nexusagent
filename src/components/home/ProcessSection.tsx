import { MessageSquare, Lightbulb, Code2, Rocket } from "lucide-react";

const steps = [
  {
    icon: MessageSquare,
    number: "01",
    title: "Discovery",
    description: "We understand your business goals, target audience, and unique challenges through consultations.",
  },
  {
    icon: Lightbulb,
    number: "02",
    title: "Strategy",
    description: "Our team develops a comprehensive strategy tailored to your objectives and goals.",
  },
  {
    icon: Code2,
    number: "03",
    title: "Development",
    description: "We bring your vision to life using cutting-edge technologies and best practices.",
  },
  {
    icon: Rocket,
    number: "04",
    title: "Launch & Support",
    description: "After testing, we launch your project and provide ongoing support for success.",
  },
];

export function ProcessSection() {
  return (
    <section className="section-padding bg-secondary/30">
      <div className="container-wide">
        {/* Header */}
        <div className="section-header">
          <span className="section-badge">Our Process</span>
          <h2 className="section-title">How We Work</h2>
          <p className="section-description">
            Our proven process ensures every project is delivered on time, on budget, 
            and exceeds expectations.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connection Line - Desktop */}
          <div className="hidden lg:block absolute top-24 left-[10%] right-[10%] h-0.5 bg-border" />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
            {steps.map((step) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.number}
                  className="relative text-center"
                >
                  {/* Icon */}
                  <div className="relative z-10 w-20 h-20 mx-auto rounded-2xl bg-background border-2 border-border flex items-center justify-center mb-6 shadow-sm">
                    <Icon size={32} className="text-primary" />
                  </div>
                  
                  {/* Number Badge */}
                  <div className="absolute top-0 right-1/2 translate-x-12 -translate-y-2 w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center shadow-md">
                    {step.number}
                  </div>

                  <h3 className="text-xl font-display font-semibold text-foreground mb-4">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
