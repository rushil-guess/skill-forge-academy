import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const benefits = [
  "Reach millions of students worldwide",
  "Earn money doing what you love",
  "Create courses with our easy-to-use tools",
  "Get support from our instructor community",
];

export const BecomeInstructor = () => {
  return (
    <section className="py-20">
      <div className="container">
        <div className="overflow-hidden rounded-3xl bg-hero-gradient">
          <div className="grid items-center gap-8 lg:grid-cols-2">
            {/* Content */}
            <div className="p-8 lg:p-12">
              <span className="mb-4 inline-block rounded-full bg-primary-foreground/10 px-4 py-2 text-sm font-medium text-primary-foreground/80">
                Start Teaching Today
              </span>
              <h2 className="mb-4 font-display text-3xl font-bold text-primary-foreground lg:text-4xl">
                Become an Instructor
              </h2>
              <p className="mb-6 text-lg text-primary-foreground/70">
                Join our community of expert instructors and share your knowledge
                with learners around the world. Build your audience and earn money
                while making an impact.
              </p>
              <ul className="mb-8 space-y-3">
                {benefits.map((benefit) => (
                  <li
                    key={benefit}
                    className="flex items-center gap-3 text-primary-foreground/80"
                  >
                    <CheckCircle2 className="h-5 w-5 text-success" />
                    {benefit}
                  </li>
                ))}
              </ul>
              <Button variant="hero" size="lg">
                Start Teaching Today
              </Button>
            </div>

            {/* Image */}
            <div className="relative hidden lg:block">
              <img
                src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&h=600&fit=crop"
                alt="Instructor teaching"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-navy/50 to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
