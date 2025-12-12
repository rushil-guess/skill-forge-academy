const companies = [
  { name: "Google", logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" },
  { name: "Microsoft", logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg" },
  { name: "Amazon", logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" },
  { name: "Meta", logo: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg" },
  { name: "Apple", logo: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" },
];

export const TrustBanner = () => {
  return (
    <section className="border-y border-border bg-secondary/30 py-10">
      <div className="container">
        <p className="mb-8 text-center text-sm font-medium text-muted-foreground">
          Trusted by over 15,000 companies and millions of learners around the world
        </p>
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
          {companies.map(({ name, logo }) => (
            <div
              key={name}
              className="flex h-8 items-center opacity-50 grayscale transition-all hover:opacity-100 hover:grayscale-0"
            >
              <img
                src={logo}
                alt={name}
                className="h-full w-auto object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
