import { supabase } from "@/lib/supabaseClient";
import type { Session } from "@supabase/supabase-js";
import { type ProfileRow, type RoleType } from "@/schemas";
import {
  useContext,
  useEffect,
  useState,
  type ReactNode,
  createContext,
  useRef,
} from "react";
import { loadRoles } from "@/lib/utils";

export type ProfilePatch = Partial<
  Pick<ProfileRow, "first_name" | "last_name">
>;

export type AuthState =
  | { status: "loading" }
  | { status: "unauthenticated" }
  | { status: "profileLoading"; session: Session }
  | { status: "profileNotBoarded"; session: Session }
  | { status: "ready"; session: Session; profile: ProfileRow };

// context type
type AuthContextValue = {
  auth: AuthState;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshProfile: () => Promise<void>;
  upsertProfile: (patch: ProfilePatch) => Promise<ProfileRow>;
  roles: RoleType[] | null;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

// provider
export function AuthProvider({ children }: { children: ReactNode }) {
  const [auth, setAuth] = useState<AuthState>({ status: "loading" });
  const [roles, setRoles] = useState<RoleType[] | null>(null);
  const isReady = useRef(false);

  /** loading session and profile */
  useEffect(() => {
    (async () => {
      const { data } = await supabase.auth.getSession();
      const session = data.session;

      if (!session) {
        setAuth({ status: "unauthenticated" });
        return;
      }

      setAuth({ status: "profileLoading", session });

      // loading profile from db
      const { data: profile, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", session.user.id)
        .maybeSingle<ProfileRow>();

      if (error) {
        console.error("Fehler beim Laden des Profils", error.message);
        setAuth({ status: "profileNotBoarded", session });
        return;
      }
      // if maybe db is not loading anyways
      if (!profile || profile.profile_complete === false) {
        setAuth({ status: "profileNotBoarded", session });
        return;
      }

      setAuth({ status: "ready", session, profile });
    })().catch(console.error);
  }, []);

  useEffect(() => {
    if (auth.status === "profileLoading") {
      void refreshProfile();
    }
  }, [auth.status]);

  // inital loads of statics when authstate is "ready"
  useEffect(() => {
    if (auth.status === "ready" && isReady.current === false) {
      (async () => {
        const res = await loadRoles();
        setRoles(res);
      })();
      isReady.current = true;
    }
  }, [auth.status]);

  // operating functions for context usage
  const signIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    if (data.session)
      setAuth({ status: "profileLoading", session: data.session });
  };

  const signUp = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) throw error;
    if (data.session)
      setAuth({ status: "profileLoading", session: data.session });
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setAuth({ status: "unauthenticated" });
  };

  const refreshProfile = async () => {
    if (
      auth.status === "ready" ||
      auth.status === "profileNotBoarded" ||
      auth.status === "profileLoading"
    ) {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", auth.session.user.id)
        .maybeSingle<ProfileRow>();

      if (error || !data || data.profile_complete === false) {
        setAuth({ status: "profileNotBoarded", session: auth.session });
      } else {
        setAuth({ status: "ready", session: auth.session, profile: data });
      }
    }
  };

  const upsertProfile = async (patch: ProfilePatch) => {
    if (auth.status !== "ready" && auth.status !== "profileNotBoarded") {
      throw new Error("No active session");
    }
    const first = patch.first_name?.trim();
    const last = patch.last_name?.trim();

    const { data, error } = await supabase
      .from("profiles")
      .upsert(
        {
          id: auth.session.user.id,
          ...(first ? { first_name: first } : {}),
          ...(last ? { last_name: last } : {}),
          profile_complete: true, // onboarding guarantees first and last name
        },
        { onConflict: "id" }
      )
      .select("*")
      .single<ProfileRow>();
    if (error) throw error;
    setAuth({ status: "ready", session: auth.session, profile: data });
    return data;
  };

  return (
    <AuthContext.Provider
      value={{
        auth,
        signIn,
        signUp,
        logout,
        refreshProfile,
        upsertProfile,
        roles,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth has to be used inside a <AuthProvider>");
  return ctx;
};
