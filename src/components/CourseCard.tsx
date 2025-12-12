import { Star, Clock, Users, Play } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface CourseCardProps {
  title: string;
  instructor: string;
  image: string;
  rating: number;
  reviewCount: number;
  price: number;
  originalPrice?: number;
  duration: string;
  students: string;
  isBestseller?: boolean;
  isNew?: boolean;
}

export const CourseCard = ({
  title,
  instructor,
  image,
  rating,
  reviewCount,
  price,
  originalPrice,
  duration,
  students,
  isBestseller,
  isNew,
}: CourseCardProps) => {
  return (
    <div className="group cursor-pointer overflow-hidden rounded-xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      {/* Image Container */}
      <div className="relative aspect-video overflow-hidden">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary-foreground/90 shadow-lg">
            <Play className="h-6 w-6 text-primary" fill="currentColor" />
          </div>
        </div>
        {/* Badges */}
        <div className="absolute left-3 top-3 flex gap-2">
          {isBestseller && (
            <Badge className="bg-gold text-foreground font-semibold">Bestseller</Badge>
          )}
          {isNew && (
            <Badge className="bg-success text-primary-foreground font-semibold">New</Badge>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="mb-1 line-clamp-2 font-display text-base font-bold text-card-foreground group-hover:text-primary">
          {title}
        </h3>
        <p className="mb-2 text-sm text-muted-foreground">{instructor}</p>

        {/* Rating */}
        <div className="mb-2 flex items-center gap-1">
          <span className="font-bold text-orange">{rating.toFixed(1)}</span>
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < Math.floor(rating)
                    ? "fill-orange text-orange"
                    : "fill-muted text-muted"
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-muted-foreground">
            ({reviewCount.toLocaleString()})
          </span>
        </div>

        {/* Meta Info */}
        <div className="mb-3 flex items-center gap-3 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {duration}
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-3 w-3" />
            {students}
          </div>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="font-display text-lg font-bold text-card-foreground">
            ${price.toFixed(2)}
          </span>
          {originalPrice && (
            <span className="text-sm text-muted-foreground line-through">
              ${originalPrice.toFixed(2)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
