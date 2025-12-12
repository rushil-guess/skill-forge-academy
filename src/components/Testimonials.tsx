import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Software Developer at Google",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    content:
      "SkillForge completely transformed my career. I went from a marketing role to a full-stack developer position in just 8 months. The courses are incredibly comprehensive.",
    rating: 5,
  },
  {
    name: "Michael Chen",
    role: "Data Scientist at Microsoft",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    content:
      "The data science courses on SkillForge are top-notch. The instructors explain complex concepts in a way that's easy to understand. Highly recommend!",
    rating: 5,
  },
  {
    name: "Emily Rodriguez",
    role: "UX Designer at Airbnb",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    content:
      "I've tried many online learning platforms, but SkillForge stands out. The project-based learning approach helped me build a portfolio that got me my dream job.",
    rating: 5,
  },
];

export const Testimonials = () => {
  return (
    <section className="bg-secondary/50 py-16">
      <div className="container">
        <div className="mb-12 text-center">
          <h2 className="mb-2 font-display text-3xl font-bold text-foreground">
            What Our Students Say
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Join millions of learners who have transformed their careers with
            SkillForge
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map(({ name, role, avatar, content, rating }) => (
            <div
              key={name}
              className="relative rounded-2xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-lg"
            >
              <Quote className="absolute right-6 top-6 h-8 w-8 text-primary/10" />
              <div className="mb-4 flex">
                {[...Array(rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-5 w-5 fill-orange text-orange"
                  />
                ))}
              </div>
              <p className="mb-6 text-card-foreground/80">{content}</p>
              <div className="flex items-center gap-3">
                <img
                  src={avatar}
                  alt={name}
                  className="h-12 w-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold text-card-foreground">{name}</p>
                  <p className="text-sm text-muted-foreground">{role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
