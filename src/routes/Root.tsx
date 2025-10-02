import { LoginForm } from "@/components/login-form";
import ProfileCard from "@/components/ProfileCard";
import { useAuth } from "@/contexts/AuthContext";

function Root() {
  const { session, logout, profile } = useAuth();

  const renderContent = () => {
    if (!session) return <LoginForm />;
    if (!profile) return <ProfileCard />;

    return <h2>Hallo User</h2>;
  };
  return (
    <div className="flex flex-col items-center justify-center gap-6 p-4">
      <h2>{session ? "Eingelogt" : "nicht eingelogt"}</h2>
      <button onClick={logout}>Logout</button>
      {renderContent()}
    </div>
  );
}

export default Root;
