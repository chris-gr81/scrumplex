import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";

export function ProfileCard() {
  return (
    <div>
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Profil anlegen</CardTitle>
          <CardDescription>
            Um Ihnen eine personalisierte Erfahrung zu bieten, benötigt
            Scrumplex grundlegende Informationen, um Sie persönlich
            anzusprechen.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <label htmlFor="vorname">Vorname</label>
                <Input id="vorname" type="text" placeholder="Max" required />
              </div>
              <div className="grid gap-2">
                <label htmlFor="nachname">Nachname</label>
                <Input id="nachname" type="text" placeholder="Mustermann" />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button type="submit" className="w-full">
            Profil speichern
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default ProfileCard;
