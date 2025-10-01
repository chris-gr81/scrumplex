import { supabase } from "@/lib/supabaseClient";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

type AuthContextValue = {
  session: any;
  logout: () => Promise<void>;
  signIn: (email: string, password: string) => Promise<any>;
  signUp: (email: string, password: string) => Promise<any>;
  getProfile: (currentId: any) => Promise<any>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<any>(null);

  /** Load current Supabase session */
  const fetchSession = async () => {
    const currentSession = await supabase.auth.getSession();
    setSession(currentSession.data.session);
    console.log("Fetch session: ", currentSession.data.session);
  };

  useEffect(() => {
    fetchSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        console.log("Auth state changed: ", session);
      }
    );

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  /** sign out the current user */
  const logout = async () => {
    await supabase.auth.signOut();
    console.log("Logged out: ", session);
  };

  /** sign up a new user */
  const signUp = async (email: string, password: string) => {
    return await supabase.auth.signUp({
      email,
      password,
    });
  };

  /** sign in a user */
  const signIn = async (email: string, password: string) => {
    return await supabase.auth.signInWithPassword({
      email,
      password,
    });
  };

  /** check profile */
  const getProfile = async (currentId: any) => {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", currentId)
      .maybeSingle();
    if (error) {
      console.error("Error fetching profile:", error.message);
      return null;
    }
    return data;
  };

  return (
    <AuthContext.Provider
      value={{ session, logout, signIn, signUp, getProfile }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}
