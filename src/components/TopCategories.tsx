import { ArrowRight, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";

const topCategories = [
  {
    name: "Web Development",
    courses: 12453,
    image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=600&h=400&fit=crop",
    trending: true,
  },
  {
    name: "Data Science",
    courses: 8765,
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
    trending: true,
  },
  {
    name: "Mobile Development",
    courses: 5432,
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&h=400&fit=crop",
    trending: false,
  },
  {
    name: "Cloud Computing",
    courses: 4321,
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=400&fit=crop",
    trending: true,
  },
  {
    name: "Cybersecurity",
    courses: 3456,
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&h=400&fit=crop",
    trending: false,
  },
  {
    name: "AI & Machine Learning",
    courses: 6789,
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop",
    trending: true,
  },
];

export const TopCategories = () => {
  return (
    <section className="bg-secondary/50 py-16">
      <div className="container">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <h2 className="mb-2 font-display text-3xl font-bold text-foreground">
              Top Categories
            </h2>
            <p className="text-muted-foreground">
              Explore our most popular course categories
            </p>
          </div>
          <Button variant="ghost" className="hidden gap-2 md:flex">
            Explore all
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {topCategories.map(({ name, courses, image, trending }) => (
            <div
              key={name}
              className="group relative cursor-pointer overflow-hidden rounded-2xl"
            >
              <div className="aspect-[3/2]">
                <img
                  src={image}
                  alt={name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/50 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="flex items-center gap-2">
                  <h3 className="font-display text-xl font-bold text-primary-foreground">
                    {name}
                  </h3>
                  {trending && (
                    <span className="flex items-center gap-1 rounded-full bg-success/20 px-2 py-0.5 text-xs font-medium text-success">
                      <TrendingUp className="h-3 w-3" />
                      Trending
                    </span>
                  )}
                </div>
                <p className="text-sm text-primary-foreground/70">
                  {courses.toLocaleString()} courses
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
