import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function StatsGrid({ items }: { items: { label: string; value: string; hint: string }[] }) {
  return <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">{items.map((item) => <Card key={item.label}><CardHeader><CardTitle className="text-sm text-muted-foreground">{item.label}</CardTitle></CardHeader><CardContent><p className="text-3xl font-bold">{item.value}</p><p className="text-sm text-muted-foreground">{item.hint}</p></CardContent></Card>)}</div>;
}
