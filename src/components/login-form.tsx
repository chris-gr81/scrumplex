import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, type FormEvent } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { AuthSchema } from "@/schemas/auth.schema";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { signIn, signUp } = useAuth();
  const [isSignUp, setIsSignUp] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const parseResult = AuthSchema.safeParse({
      email: email,
      password: password,
    });

    if (!parseResult.success) {
      console.error("Validation error: ", parseResult.error);
      // TODO: Error handling
      return;
    }

    const res = parseResult.data;

    if (isSignUp) {
      const { error: signUpError } = await signUp(res.email, res.password);
      if (signUpError) {
        console.error("Error signing up:", signUpError.message);
        return;
      }
    } else {
      const { error: signInError } = await signIn(res.email, res.password);
      if (signInError) {
        console.error("Error signing in:", signInError.message);
        return;
      }
    }
  };

  function handleToggleSigning() {
    setIsSignUp((prev) => !prev);
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="w-sm">
        <CardHeader>
          <CardTitle>{isSignUp ? "Account anlegen" : "Einloggen"}</CardTitle>
          <CardDescription>
            {isSignUp
              ? "Melden Sie sich mit einer gültigen E-Mail-Adresse und einem starken Passwort an."
              : "Geben Sie Ihre E-Mail-Adresse und Ihr Passwort ein, um sich anzumelden."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="abc@beispiel.de"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  {/* placeholder for forgot password feature */}
                </div>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full">
                  {isSignUp ? "Account anlegen" : "Login"}
                </Button>
                {/* TODO <Button variant="outline" className="w-full">
                  Login with GitHub
                </Button> */}
              </div>
            </div>
            <div className="mt-4 text-center text-sm">
              {isSignUp
                ? "Sie haben schon einen Account?"
                : "Sie haben noch keinen Account?"}{" "}
              <a
                href="#"
                className="underline underline-offset-4"
                onClick={(e) => {
                  e.preventDefault();
                  handleToggleSigning();
                }}
              >
                {isSignUp ? "Einloggen" : "Account anlegen"}
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
