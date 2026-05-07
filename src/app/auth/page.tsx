import { signIn, signUp } from "@/lib/actions/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function AuthPage() {
  return (
    <section className="container grid min-h-[calc(100vh-4rem)] place-items-center py-10">
      <Card className="w-full max-w-md">
        <CardHeader><CardTitle>Вход в Examix</CardTitle></CardHeader>
        <CardContent>
          <form action={signIn} className="space-y-4">
            <div className="space-y-2"><Label htmlFor="email">Email</Label><Input id="email" name="email" type="email" required /></div>
            <div className="space-y-2"><Label htmlFor="password">Пароль</Label><Input id="password" name="password" type="password" required /></div>
            <div className="grid gap-2 sm:grid-cols-2"><Button type="submit">Войти</Button><Button formAction={signUp} variant="outline">Регистрация</Button></div>
          </form>
        </CardContent>
      </Card>
    </section>
  );
}
