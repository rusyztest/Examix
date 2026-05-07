export function PageShell({ title, description, children }: { title: string; description?: string; children: React.ReactNode }) {
  return (
    <section className="container py-8 md:py-12">
      <div className="mb-8 max-w-3xl">
        <h1 className="text-3xl font-bold tracking-tight md:text-5xl">{title}</h1>
        {description ? <p className="mt-3 text-lg text-muted-foreground">{description}</p> : null}
      </div>
      {children}
    </section>
  );
}
