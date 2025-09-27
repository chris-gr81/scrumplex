import { LoginForm } from "@/components/login-form";
import { supabase } from "@/lib/supabaseClient";
import { useEffect, useState, type FormEvent } from "react";

function Root() {
  const [session, setSession] = useState<any>(null);

  const fetchSession = async () => {
    const { data } = await supabase.auth.getSession();
    setSession(data.session);
    console.log(session);
  };
  useEffect(() => {
    fetchSession();
  }, []);

  return (
    <div>
      <h2>{session ? "Eingelogt" : "nicht eingelogt"}</h2>
      <LoginForm />
    </div>
  );
}

export default Root;
