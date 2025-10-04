import { useAuth } from "@/contexts/AuthContext";

export default function Dashboard() {
  const { profile } = useAuth();
  return (
    <div>
      <h2 className="font-bold">Das wird einmal das Dashboard</h2>
      <p>Damits nicht langweilig bleibt, hier ein paar Zustandsdaten: </p>
      <ul className="list-disc p-5">
        <li>Profile Vorname: {profile.first_name}</li>
        <li>Profile Nachname: {profile.last_name}</li>
        <li>Profile ID: {profile.id}</li>
      </ul>
    </div>
  );
}
