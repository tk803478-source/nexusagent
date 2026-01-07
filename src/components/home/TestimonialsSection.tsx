import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    quote: "Nexus transformed our online presence completely. Their web development team delivered a stunning website that increased our conversions by 150%. Highly recommended!",
    author: "Sarah Johnson",
    role: "CEO, TechStart Inc.",
    rating: 5,
  },
  {
    quote: "The SEO results have been phenomenal. Within six months, we moved from page 5 to the top 3 for our main keywords. Their data-driven approach really works.",
    author: "Michael Chen",
    role: "Marketing Director, GrowthCo",
    rating: 5,
  },
  {
    quote: "Working with Nexus on our video marketing campaign was a game-changer. The quality of content they produce is exceptional, and their team is incredibly responsive.",
    author: "Emily Rodriguez",
    role: "Brand Manager, StyleHub",
    rating: 5,
  },
];

export function TestimonialsSection() {
  return (
    <section className="section-padding bg-background">
      <div className="container-wide">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
            Testimonials
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-6">
            What Our Clients Say
          </h2>
          <p className="text-lg text-muted-foreground">
            Don't just take our word for it. Here's what our clients have to say 
            about their experience working with Nexus Digital Agency.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="card-elevated p-8 relative"
            >
              <Quote size={40} className="absolute top-6 right-6 text-accent/20" />
              
              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} size={18} className="fill-accent text-accent" />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-foreground mb-6 leading-relaxed">
                "{testimonial.quote}"
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center text-accent font-semibold">
                  {testimonial.author.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <div className="font-semibold text-foreground">{testimonial.author}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
