import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return <div className="container py-10"><Skeleton className="h-10 w-72" /><Skeleton className="mt-6 h-64 w-full" /></div>;
}
