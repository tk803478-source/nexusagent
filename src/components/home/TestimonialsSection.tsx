import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    quote: "NORYX transformed our operations completely. Their AI solutions reduced our processing time by 60% and increased our conversion rates dramatically. The ROI has been exceptional.",
    author: "Sarah Johnson",
    role: "CEO, TechStart Inc.",
    rating: 5,
  },
  {
    quote: "The automation systems they built have been game-changing. We've saved over 30 hours per week on manual tasks, allowing our team to focus on strategic growth initiatives.",
    author: "Michael Chen",
    role: "COO, GrowthCo",
    rating: 5,
  },
  {
    quote: "Working with NORYX on our web platform was seamless. They delivered a high-performance application that handles millions of users. Their technical expertise is unmatched.",
    author: "Emily Rodriguez",
    role: "CTO, ScaleUp Labs",
    rating: 5,
  },
];

export function TestimonialsSection() {
  return (
    <section className="section-padding bg-background">
      <div className="container-wide">
        {/* Header */}
        <div className="section-header opacity-0-start animate-fade-in-up">
          <span className="section-badge">Testimonials</span>
          <h2 className="section-title">What Our Clients Say</h2>
          <p className="section-description">
            Don't just take our word for it. Here's what business leaders have to say 
            about their experience working with NORYX.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`card-elevated p-8 relative hover-lift card-highlight opacity-0-start animate-fade-in-up delay-${(index + 1) * 150}`}
            >
              <Quote size={40} className="absolute top-6 right-6 text-accent/20" />
              
              {/* Rating */}
              <div className="flex gap-1 mb-5">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} size={18} className="fill-accent text-accent" />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-foreground mb-6 leading-relaxed">
                "{testimonial.quote}"
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-4 pt-6 border-t border-border">
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
