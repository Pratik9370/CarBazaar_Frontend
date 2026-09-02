import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const [isAuth, setIsAuth] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("http://13.61.35.6/api/auth/verify", {
          method: "GET",
          credentials: "include"
        });

        setIsAuth(res.ok);
      } catch (err) {
        setIsAuth(false);
      }
    };

    checkAuth();
  }, []);

  // Still loading
  if (isAuth === null) return (
    <div className="min-h-screen bg-[#FAFAF7] flex flex-col items-center justify-center gap-3">
      <div className="w-8 h-8 border-2 border-[#E8E6E1] border-t-[#B8862E] rounded-full animate-spin"></div>
      <p className="font-mono text-xs uppercase tracking-wide text-[#6B6D72]">Verifying access…</p>
    </div>
  );

  // Not authenticated → go to login
  if (!isAuth) {
    return (
      <Navigate
        to="/authentication/login"
        replace
        state={{ from: location.pathname }}
      />
    );
  }

  // Authenticated → allow access
  return children;
}