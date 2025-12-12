import { Search, Play, Users, Award, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-hero-gradient py-20 lg:py-32">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute left-1/4 top-1/4 h-64 w-64 rounded-full bg-purple blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-purple-light blur-3xl" />
      </div>

      <div className="container relative">
        <div className="mx-auto max-w-4xl text-center">
          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary-foreground/10 px-4 py-2 backdrop-blur-sm">
            <span className="flex h-2 w-2 rounded-full bg-success" />
            <span className="text-sm font-medium text-primary-foreground/80">
              Over 200,000+ courses available
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="mb-6 font-display text-4xl font-extrabold tracking-tight text-primary-foreground sm:text-5xl lg:text-6xl">
            Learn Without Limits,{" "}
            <span className="bg-gradient-to-r from-purple-light to-orange bg-clip-text text-transparent">
              Grow Without Bounds
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mb-10 text-lg text-primary-foreground/70 sm:text-xl">
            Start, switch, or advance your career with thousands of courses from
            world-class instructors. Master new skills at your own pace.
          </p>

          {/* Search Bar */}
          <div className="mx-auto mb-10 max-w-2xl">
            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="What do you want to learn?"
                  className="h-14 rounded-xl border-0 bg-primary-foreground pl-12 pr-4 text-base text-foreground shadow-lg placeholder:text-muted-foreground focus:ring-2 focus:ring-purple"
                />
              </div>
              <Button variant="hero" size="xl" className="shadow-lg">
                Search
              </Button>
            </div>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-sm text-primary-foreground/60">
              <span>Popular:</span>
              {["Python", "Web Development", "Data Science", "AWS"].map((topic) => (
                <button
                  key={topic}
                  className="rounded-full bg-primary-foreground/10 px-3 py-1 text-primary-foreground/80 transition-colors hover:bg-primary-foreground/20"
                >
                  {topic}
                </button>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="mx-auto grid max-w-3xl grid-cols-2 gap-6 md:grid-cols-4">
            {[
              { icon: BookOpen, value: "200K+", label: "Courses" },
              { icon: Users, value: "50M+", label: "Students" },
              { icon: Award, value: "75K+", label: "Instructors" },
              { icon: Play, value: "500M+", label: "Enrollments" },
            ].map(({ icon: Icon, value, label }) => (
              <div key={label} className="text-center">
                <div className="mb-2 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary-foreground/10">
                  <Icon className="h-6 w-6 text-purple-light" />
                </div>
                <div className="font-display text-2xl font-bold text-primary-foreground">
                  {value}
                </div>
                <div className="text-sm text-primary-foreground/60">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
