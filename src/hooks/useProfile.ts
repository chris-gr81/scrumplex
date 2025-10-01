import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";

export function useProfile() {
  const { session, getProfile } = useAuth();
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    if (!session?.user?.id) {
      setProfile(null);
      return;
    }

    (async () => {
      const profile = await getProfile(session?.user?.id);

      setProfile(profile);
    })();
  }, [session?.user?.id]);

  return profile;
}
