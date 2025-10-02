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
import { ProfileSchema } from "@/schemas/profile.schema";
import { useProfile } from "@/hooks/useProfile";

export function ProfileCard() {
  const { session, profile } = useAuth();
  const { createProfile } = useProfile();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const parseResult = ProfileSchema.safeParse({
      firstName: form.vorname.value,
      lastName: form.nachname.value,
      id: session.user.id,
    });

    if (!parseResult.success) {
      console.error("Validation error: ", parseResult.error);
      // TODO: Error handling
      return;
    }

    const res = parseResult.data;
    try {
      const result = await createProfile(res.firstName, res.lastName, res.id);

      console.log("created", result);
    } catch (error) {
      console.error("Error creating profile:", error);
    } finally {
      form.reset();
      console.log("Profile created: ", profile);
    }
  };

  return (
    <Card className="w-sm">
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
