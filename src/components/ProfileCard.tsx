import { useAuth } from "@/contexts/AuthContext";
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
import { BoardingSchema } from "@/schemas/profile.schema";

export function ProfileCard() {
  const { auth, upsertProfile } = useAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (auth.status !== "ready" && auth.status !== "profileNotBoarded") {
      console.error("no active session");
      return;
    }
    const form = e.currentTarget;
    const fd = new FormData(e.currentTarget);
    const parseResult = BoardingSchema.safeParse({
      first_name: String(fd.get("vorname") ?? ""),
      last_name: String(fd.get("nachname") ?? ""),
    });

    if (!parseResult.success) {
      console.error("Validation error: ", parseResult.error);
      // TODO: Error handling
      return;
    }

    const res = parseResult.data;
    console.log(res);
    try {
      const result = await upsertProfile({
        first_name: res.first_name,
        last_name: res.last_name,
      });

      console.log("created", result);
    } catch (error) {
      console.error("Error creating profile:", error);
    } finally {
      form.reset();
    }
  };

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Profil anlegen</CardTitle>
        <CardDescription>
          Um Ihnen eine personalisierte Erfahrung zu bieten, benötigt Scrumplex
          grundlegende Informationen.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form id="profile-form" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <label htmlFor="vorname">Vorname</label>
              <Input
                id="vorname"
                name="vorname"
                type="text"
                placeholder="Max"
                required
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="nachname">Nachname</label>
              <Input
                id="nachname"
                name="nachname"
                type="text"
                placeholder="Mustermann"
                required
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button type="submit" form="profile-form" className="w-full">
          Profil speichern
        </Button>
      </CardFooter>
    </Card>
  );
}

export default ProfileCard;
