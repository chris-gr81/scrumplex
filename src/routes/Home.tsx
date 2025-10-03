import { useAuth } from "@/contexts/AuthContext";

function Home() {
  const { profile } = useAuth();
  return (
    <div>
      <h2>
        Hallo {profile.first_name} {profile.last_name}
      </h2>
    </div>
  );
}
export default Home;
