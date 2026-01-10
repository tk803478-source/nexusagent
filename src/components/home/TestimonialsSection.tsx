import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    quote: "Nexus transformed our online presence completely. Their web development team delivered a stunning website that increased our conversions by 150%. The attention to detail and commitment to excellence was remarkable.",
    author: "Sarah Johnson",
    role: "CEO, TechStart Inc.",
    rating: 5,
  },
  {
    quote: "The SEO results have been phenomenal. Within six months, we moved from page 5 to the top 3 for our main keywords. Their data-driven approach and transparent reporting made the entire process seamless.",
    author: "Michael Chen",
    role: "Marketing Director, GrowthCo",
    rating: 5,
  },
  {
    quote: "Working with Nexus on our video marketing campaign was a game-changer. The quality of content they produce is exceptional, and their team truly understands how to tell compelling brand stories.",
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
        <div className="section-header opacity-0-start animate-fade-in-up">
          <span className="section-badge">Testimonials</span>
          <h2 className="section-title">What Our Clients Say</h2>
          <p className="section-description">
            Don't just take our word for it. Here's what our clients have to say 
            about their experience working with Nexus Digital Agency. We're proud 
            of the relationships we've built and the results we've delivered.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`card-elevated p-8 relative hover-lift card-highlight opacity-0-start animate-fade-in-up delay-${(index + 1) * 150}`}
            >
              <Quote size={40} className="absolute top-6 right-6 text-sky/20" />
              
              {/* Rating */}
              <div className="flex gap-1 mb-5">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} size={18} className="fill-sky text-sky" />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-foreground mb-6 leading-relaxed">
                "{testimonial.quote}"
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-4 pt-6 border-t border-border">
                <div className="w-12 h-12 rounded-full bg-sky-light flex items-center justify-center text-navy font-semibold">
                  {testimonial.author.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <div className="font-semibold text-navy">{testimonial.author}</div>
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