import { 
  Code, 
  Briefcase, 
  Calculator, 
  Monitor, 
  Palette, 
  Megaphone, 
  Heart, 
  Camera,
  Music,
  Dumbbell
} from "lucide-react";

const categories = [
  { name: "Development", icon: Code, color: "bg-purple/10 text-purple" },
  { name: "Business", icon: Briefcase, color: "bg-blue-500/10 text-blue-500" },
  { name: "Finance", icon: Calculator, color: "bg-green-500/10 text-green-500" },
  { name: "IT & Software", icon: Monitor, color: "bg-orange/10 text-orange" },
  { name: "Design", icon: Palette, color: "bg-pink-500/10 text-pink-500" },
  { name: "Marketing", icon: Megaphone, color: "bg-red-500/10 text-red-500" },
  { name: "Personal Development", icon: Heart, color: "bg-rose-500/10 text-rose-500" },
  { name: "Photography", icon: Camera, color: "bg-amber-500/10 text-amber-500" },
  { name: "Music", icon: Music, color: "bg-indigo-500/10 text-indigo-500" },
  { name: "Health & Fitness", icon: Dumbbell, color: "bg-emerald-500/10 text-emerald-500" },
];

export const CategoryBar = () => {
  return (
    <section className="border-b border-border bg-secondary/50 py-6">
      <div className="container">
        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map(({ name, icon: Icon, color }) => (
            <button
              key={name}
              className="group flex shrink-0 flex-col items-center gap-2 rounded-xl px-4 py-3 transition-all hover:bg-background hover:shadow-md"
            >
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-xl ${color} transition-transform group-hover:scale-110`}
              >
                <Icon className="h-6 w-6" />
              </div>
              <span className="whitespace-nowrap text-xs font-medium text-muted-foreground group-hover:text-foreground">
                {name}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
