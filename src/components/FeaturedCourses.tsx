import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CourseCard } from "./CourseCard";

const featuredCourses = [
  {
    title: "The Complete 2024 Web Development Bootcamp",
    instructor: "Dr. Angela Yu",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=450&fit=crop",
    rating: 4.7,
    reviewCount: 342567,
    price: 14.99,
    originalPrice: 84.99,
    duration: "65 hours",
    students: "850K",
    isBestseller: true,
  },
  {
    title: "Machine Learning A-Z: AI, Python & R",
    instructor: "Kirill Eremenko",
    image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&h=450&fit=crop",
    rating: 4.5,
    reviewCount: 185234,
    price: 12.99,
    originalPrice: 79.99,
    duration: "44 hours",
    students: "520K",
    isBestseller: true,
  },
  {
    title: "React - The Complete Guide 2024",
    instructor: "Maximilian Schwarzmüller",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=450&fit=crop",
    rating: 4.6,
    reviewCount: 234567,
    price: 13.99,
    originalPrice: 89.99,
    duration: "52 hours",
    students: "680K",
  },
  {
    title: "Python for Data Science and Machine Learning",
    instructor: "Jose Portilla",
    image: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=800&h=450&fit=crop",
    rating: 4.6,
    reviewCount: 145678,
    price: 11.99,
    originalPrice: 74.99,
    duration: "38 hours",
    students: "420K",
    isNew: true,
  },
  {
    title: "AWS Certified Solutions Architect 2024",
    instructor: "Stephane Maarek",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=450&fit=crop",
    rating: 4.8,
    reviewCount: 98765,
    price: 15.99,
    originalPrice: 99.99,
    duration: "28 hours",
    students: "290K",
    isBestseller: true,
  },
  {
    title: "Complete Digital Marketing Course",
    instructor: "Rob Percival",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=450&fit=crop",
    rating: 4.4,
    reviewCount: 76543,
    price: 10.99,
    originalPrice: 69.99,
    duration: "42 hours",
    students: "180K",
  },
  {
    title: "UI/UX Design Masterclass",
    instructor: "Daniel Scott",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=450&fit=crop",
    rating: 4.7,
    reviewCount: 54321,
    price: 12.99,
    originalPrice: 79.99,
    duration: "24 hours",
    students: "150K",
    isNew: true,
  },
  {
    title: "JavaScript: The Advanced Concepts",
    instructor: "Andrei Neagoie",
    image: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=800&h=450&fit=crop",
    rating: 4.8,
    reviewCount: 87654,
    price: 13.99,
    originalPrice: 84.99,
    duration: "26 hours",
    students: "320K",
  },
];

export const FeaturedCourses = () => {
  return (
    <section className="py-16">
      <div className="container">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <h2 className="mb-2 font-display text-3xl font-bold text-foreground">
              Featured Courses
            </h2>
            <p className="text-muted-foreground">
              Expand your career opportunities with our most popular courses
            </p>
          </div>
          <Button variant="ghost" className="hidden gap-2 md:flex">
            View all courses
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {featuredCourses.map((course) => (
            <CourseCard key={course.title} {...course} />
          ))}
        </div>

        <div className="mt-8 text-center md:hidden">
          <Button variant="outline" className="gap-2">
            View all courses
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};
