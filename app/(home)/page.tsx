import { OrgSearch } from "@/components/org-search";
import { BookOpen, Users, FileText } from "lucide-react";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex flex-1 flex-col">
        {/* Hero Section */}
        <section className="relative flex flex-col items-center justify-center px-4 py-16 md:py-24">
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-secondary/50 to-background" />

          <div className="mb-8 flex items-center gap-3">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary shadow-lg">
              <BookOpen className="h-8 w-8 text-primary-foreground" />
            </div>
          </div>

          <h1 className="mb-4 text-center text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
            <span className="text-balance">FEU Tech</span>{" "}
            <span className="text-primary">Founding Book</span>
          </h1>

          <p className="mb-12 max-w-2xl text-center text-lg text-muted-foreground md:text-xl">
            The official knowledge base for FEU Tech student organizations.
            Discover documentation, guides, and resources for new and returning
            officers.
          </p>

          <div className="w-full max-w-5xl px-4">
            <OrgSearch />
          </div>
        </section>

        {/* Features Section */}
        <section className="border-t border-border bg-card px-4 py-16">
          <div className="container mx-auto max-w-5xl">
            <h2 className="mb-12 text-center text-2xl font-bold text-foreground md:text-3xl">
              Built for Student Organizations
            </h2>

            <div className="grid gap-8 md:grid-cols-3">
              <FeatureCard
                icon={<BookOpen className="h-6 w-6" />}
                title="Comprehensive Documentation"
                description="Access guides, procedures, and institutional knowledge from past officers."
              />
              <FeatureCard
                icon={<Users className="h-6 w-6" />}
                title="Officer Onboarding"
                description="New officers can get up to speed quickly with structured documentation."
              />
              <FeatureCard
                icon={<FileText className="h-6 w-6" />}
                title="Knowledge Preservation"
                description="Current officers can document their learnings for future generations."
              />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="flex flex-col items-center rounded-xl border border-border bg-background p-6 text-center shadow-sm transition-shadow hover:shadow-md">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
        {icon}
      </div>
      <h3 className="mb-2 text-lg font-semibold text-foreground">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
}