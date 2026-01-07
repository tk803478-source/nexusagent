import { MessageSquare, Lightbulb, Code2, Rocket } from "lucide-react";

const steps = [
  {
    icon: MessageSquare,
    number: "01",
    title: "Discovery",
    description: "We start by understanding your business goals, target audience, and unique challenges through in-depth consultations.",
  },
  {
    icon: Lightbulb,
    number: "02",
    title: "Strategy",
    description: "Our team develops a comprehensive strategy tailored to your objectives, outlining the roadmap for success.",
  },
  {
    icon: Code2,
    number: "03",
    title: "Development",
    description: "We bring your vision to life using cutting-edge technologies and industry best practices for optimal results.",
  },
  {
    icon: Rocket,
    number: "04",
    title: "Launch & Support",
    description: "After rigorous testing, we launch your project and provide ongoing support to ensure continued success.",
  },
];

export function ProcessSection() {
  return (
    <section className="section-padding" style={{ background: 'var(--gradient-subtle)' }}>
      <div className="container-wide">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
            Our Process
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-6">
            How We Work
          </h2>
          <p className="text-lg text-muted-foreground">
            Our proven process ensures every project is delivered on time, on budget, 
            and exceeds expectations. Here's how we turn your ideas into reality.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connection Line - Desktop */}
          <div className="hidden lg:block absolute top-24 left-0 right-0 h-0.5 bg-border" />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.number}
                  className="relative text-center"
                >
                  {/* Icon */}
                  <div className="relative z-10 w-20 h-20 mx-auto rounded-2xl bg-background border-2 border-border flex items-center justify-center mb-6 shadow-sm">
                    <Icon size={32} className="text-accent" />
                  </div>
                  
                  {/* Number Badge */}
                  <div className="absolute top-0 right-1/2 translate-x-12 -translate-y-2 w-8 h-8 rounded-full bg-accent text-accent-foreground text-sm font-bold flex items-center justify-center">
                    {step.number}
                  </div>

                  <h3 className="text-xl font-display font-semibold text-foreground mb-3">
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
