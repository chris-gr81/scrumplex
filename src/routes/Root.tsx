import { LoginForm } from "@/components/login-form";
import ProfileCard from "@/components/ProfileCard";
import { useAuth } from "@/contexts/AuthContext";
import { useProfile } from "@/hooks/useProfile";

function Root() {
  const { session, logout } = useAuth();
  const profile = useProfile();

  const renderContent = () => {
    if (!session) return <LoginForm />;
    if (!profile) return <ProfileCard />;
    return <h2>Hallo {profile}</h2>;
  };
  return (
    <div>
      <h2>{session ? "Eingelogt" : "nicht eingelogt"}</h2>
      <button onClick={logout}>Logout</button>
      {renderContent()}
    </div>
  );
}

export default Root;
