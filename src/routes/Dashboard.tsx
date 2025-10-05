import { useAuth } from "@/contexts/AuthContext";

export default function Dashboard() {
  const { auth } = useAuth();
  if (auth.status !== "ready") return;
  return (
    <div>
      <h2 className="font-bold">Das wird einmal das Dashboard</h2>
      <p>Damits nicht langweilig bleibt, hier ein paar Zustandsdaten: </p>
      <ul className="list-disc p-5">
        <li>Profile Vorname: {auth.profile.first_name}</li>
        <li>Profile Nachname: {auth.profile.last_name}</li>
        <li>Profile ID: {auth.profile.id}</li>
      </ul>
    </div>
  );
}
