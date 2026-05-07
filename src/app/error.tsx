"use client";

import { Button } from "@/components/ui/button";

export default function ErrorPage({ error, reset }: { error: Error; reset: () => void }) {
  return <section className="container py-16"><div className="rounded-2xl border bg-card p-8"><h1 className="text-2xl font-bold">Что-то пошло не так</h1><p className="mt-2 text-muted-foreground">{error.message}</p><Button className="mt-6" onClick={reset}>Попробовать снова</Button></div></section>;
}
