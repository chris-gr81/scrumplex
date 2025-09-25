import { Sidebar } from "lucide-react";
import { Outlet } from "react-router";

function Root() {
  return (
    <main className="flex">
      <nav>
        <ul>
          <li>Erstes</li>
          <ul className="list-disc pl-5">
            <li>bla</li>
            <li>bla</li>
          </ul>
          <li>Zweites</li>
          <ul className="list-disc pl-5">
            <li>bla</li>
            <li>bla</li>
          </ul>
        </ul>
      </nav>
      <div>
        <header>SCRUMPLEX PRODUCT BACKLOG</header>
        <main>
          <Outlet />
        </main>
      </div>
    </main>
  );
}

export default Root;
