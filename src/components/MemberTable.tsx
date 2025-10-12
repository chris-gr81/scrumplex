import { useAuth } from "@/contexts/AuthContext";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

export default function MemberTable() {
  const { auth } = useAuth();
  if (auth.status !== "ready") {
    return <div>Zugang verweigert, Sie sind nicht eingelogt.</div>;
    // TODO: Übergreifende Logik, Prozess und Meldung etablieren
  }
  const { profile } = auth;
  return (
    <Table>
      <TableCaption>
        Sie werden automatisch als Product Owner gesetzt.
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Vorname</TableHead>
          <TableHead>Nachname</TableHead>
          <TableHead>Rolle</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>{profile.first_name}</TableCell>
          <TableCell>{profile.last_name}</TableCell>
          <TableCell>Product Owner</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
