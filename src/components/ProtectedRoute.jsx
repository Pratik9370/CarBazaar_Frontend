import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const [isAuth, setIsAuth] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("https://carbazaar-backend-1whv.onrender.com/api/auth/verify", {
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
  if (isAuth === null) return <div>Loading...</div>;

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
