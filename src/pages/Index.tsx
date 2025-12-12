import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { CategoryBar } from "@/components/CategoryBar";
import { TrustBanner } from "@/components/TrustBanner";
import { FeaturedCourses } from "@/components/FeaturedCourses";
import { TopCategories } from "@/components/TopCategories";
import { BecomeInstructor } from "@/components/BecomeInstructor";
import { Testimonials } from "@/components/Testimonials";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <CategoryBar />
        <TrustBanner />
        <FeaturedCourses />
        <TopCategories />
        <BecomeInstructor />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
