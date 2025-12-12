import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, ShoppingCart, Bell, Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const categories = [
  "Development",
  "Business",
  "Finance & Accounting",
  "IT & Software",
  "Design",
  "Marketing",
  "Personal Development",
  "Photography",
];

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between gap-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-gradient">
            <span className="text-lg font-bold text-primary-foreground">S</span>
          </div>
          <span className="hidden font-display text-xl font-bold text-foreground sm:inline-block">
            SkillForge
          </span>
        </Link>

        {/* Categories Dropdown - Desktop */}
        <div className="hidden lg:flex">
          <button className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
            Categories
            <ChevronDown className="h-4 w-4" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="hidden flex-1 max-w-2xl md:flex">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search for anything..."
              className="w-full rounded-full border-border bg-secondary pl-10 pr-4 focus:border-primary focus:ring-primary"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-2 lg:flex">
          <Link
            to="/teach"
            className="px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Teach on SkillForge
          </Link>
          <Link
            to="/my-learning"
            className="px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            My Learning
          </Link>
        </nav>

        {/* Right Side Actions */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="hidden md:flex">
            <ShoppingCart className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="hidden md:flex">
            <Bell className="h-5 w-5" />
          </Button>

          <div className="hidden items-center gap-2 lg:flex">
            <Button variant="outline" asChild>
              <Link to="/login">Log in</Link>
            </Button>
            <Button variant="default" asChild>
              <Link to="/signup">Sign up</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="animate-slide-up border-t border-border bg-background p-4 lg:hidden">
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search for anything..."
                className="w-full pl-10"
              />
            </div>
          </div>
          <nav className="flex flex-col gap-2">
            {categories.map((category) => (
              <Link
                key={category}
                to={`/category/${category.toLowerCase().replace(/ & /g, "-")}`}
                className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              >
                {category}
              </Link>
            ))}
            <hr className="my-2 border-border" />
            <Link
              to="/teach"
              className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              Teach on SkillForge
            </Link>
            <Link
              to="/my-learning"
              className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              My Learning
            </Link>
            <hr className="my-2 border-border" />
            <div className="flex gap-2">
              <Button variant="outline" className="flex-1" asChild>
                <Link to="/login">Log in</Link>
              </Button>
              <Button className="flex-1" asChild>
                <Link to="/signup">Sign up</Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
