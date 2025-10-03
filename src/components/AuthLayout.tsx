import logo from "../assets/scrumplex_logo.png";
import { Outlet } from "react-router";

export function AuthLayout() {
  return (
    <div className="min-h-svh flex flex-col items-center justify-center bg-zinc-200 p-6">
      <div className="w-full max-w-sm flex flex-col items-center gap-8">
        <div className="flex items-center justify-center">
          <img src={logo} alt="Scrumplex Logo" className=" drop-shadow-lg" />
        </div>
        <main className="w-full max-w-sm">
          <Outlet />
        </main>
        <div className="text-center text-xs text-zinc-500 mt-8">
          © 2025 Christian Grimm
        </div>
      </div>
    </div>
  );
}
export default AuthLayout;
