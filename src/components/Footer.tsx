import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Linkedin, Youtube, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";

const footerLinks = {
  "SkillForge Business": [
    "Teach on SkillForge",
    "Get the app",
    "About us",
    "Contact us",
  ],
  Careers: ["Blog", "Help and Support", "Affiliate", "Investors"],
  "Terms & Privacy": [
    "Terms of Service",
    "Privacy Policy",
    "Cookie Settings",
    "Sitemap",
    "Accessibility Statement",
  ],
};

const socialLinks = [
  { icon: Facebook, href: "#" },
  { icon: Twitter, href: "#" },
  { icon: Instagram, href: "#" },
  { icon: Linkedin, href: "#" },
  { icon: Youtube, href: "#" },
];

export const Footer = () => {
  return (
    <footer className="border-t border-border bg-navy text-primary-foreground">
      <div className="container py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="mb-4 flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-gradient">
                <span className="text-lg font-bold text-primary-foreground">S</span>
              </div>
              <span className="font-display text-xl font-bold">SkillForge</span>
            </Link>
            <p className="mb-4 text-sm text-primary-foreground/60">
              Learn from the best. Anytime, anywhere. Transform your career with
              our industry-leading courses.
            </p>
            <div className="flex gap-3">
              {socialLinks.map(({ icon: Icon, href }) => (
                <a
                  key={href}
                  href={href}
                  className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-foreground/10 text-primary-foreground/60 transition-colors hover:bg-primary-foreground/20 hover:text-primary-foreground"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="mb-4 font-semibold">{title}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-primary-foreground/60 transition-colors hover:text-primary-foreground"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-primary-foreground/10 pt-8 md:flex-row">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              className="gap-2 text-primary-foreground/60 hover:bg-primary-foreground/10 hover:text-primary-foreground"
            >
              <Globe className="h-4 w-4" />
              English
            </Button>
          </div>
          <p className="text-sm text-primary-foreground/60">
            © {new Date().getFullYear()} SkillForge, Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
