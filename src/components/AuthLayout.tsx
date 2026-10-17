import { ReactNode } from "react";
import { Link } from "react-router";

export function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-6">
          <Link to="/" className="text-3xl font-bold text-sky-700">🌟 KidSpark</Link>
        </div>
        {children}
      </div>
    </div>
  );
}
