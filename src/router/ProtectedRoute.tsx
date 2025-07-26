import { useQuery } from "@tanstack/react-query";
import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import Dashboard from "../pages/Dashboard";


type Props = {
  children: ReactNode;
};

export default function ProtectedRoute({ children }: Props) {
  const token = localStorage.getItem("token");

  const {data ,  error  } = useQuery({
    queryKey: ["dashboard"],
    queryFn: async () => {
      const res = await fetch("http://localhost:3000/api/analytics/dashboard", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 403 || res.status === 401) {
        const userError: any = new Error("Unauthorized");
        userError.status = res.status;
        throw userError;
      }

      return res.json();
    },
  });

 if ((error as any)?.status === 403 || (error as any)?.status === 401) {
  localStorage.removeItem("token");
  return <Navigate to="/login" />;
}


if (data) {
  return <Dashboard  />;
}


return <>{children}</>;

}