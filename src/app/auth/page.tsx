import { Sparkles } from "lucide-react";
import { continueAsGuest } from "@/lib/actions/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function AuthPage() {
  return (
    <section className="container grid min-h-[calc(100vh-4rem)] place-items-center py-10">
      <Card className="w-full max-w-md overflow-hidden">
        <CardHeader className="space-y-3">
          <div className="grid h-12 w-12 place-items-center rounded-2xl bg-primary/10 text-primary">
            <Sparkles className="h-6 w-6" />
          </div>
          <CardTitle>Войти без регистрации</CardTitle>
          <CardDescription>
            Почта и пароль не нужны: укажите имя, и Examix создаст гостевую сессию через Supabase Anonymous Auth.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={continueAsGuest} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Имя ученика</Label>
              <Input id="username" name="username" placeholder="Например, Анна" required minLength={2} maxLength={40} />
            </div>
            <Button type="submit" className="w-full">
              Продолжить подготовку
            </Button>
            <p className="text-center text-xs text-muted-foreground">
              Для учителей и администраторов роль можно изменить в таблице profiles после создания профиля.
            </p>
          </form>
        </CardContent>
      </Card>
    </section>
  );
}
