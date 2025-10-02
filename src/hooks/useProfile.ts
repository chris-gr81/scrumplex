import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabaseClient";
import { useEffect } from "react";

export function useProfile() {
  const { session, getProfile, profile, setProfile } = useAuth();

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

  async function createProfile(
    firstName: string,
    lastName: string,
    id: string
  ) {
    const { data, error } = await supabase
      .from("profiles")
      .insert([
        {
          id: id,
          first_name: firstName,
          last_name: lastName,
          profile_complete: true,
        },
      ])
      .select("*")
      .single();
    if (error) return { ok: false, error };
    setProfile(data);
    console.log("Profile created: ", profile);
    return { ok: true, data };
  }
  return { profile, createProfile };
}
