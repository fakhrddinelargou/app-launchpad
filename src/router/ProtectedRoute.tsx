import { useQuery } from "@tanstack/react-query";
import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";



type Props = {
  children: ReactNode;
};

export default function ProtectedRoute({ children }: Props) {
  const token = localStorage.getItem("token");

  const {isLoading,  error  } = useQuery({
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

if(isLoading){
  return <div className="w-full h-[92vh] flex items-center justify-center"><span className=" text-blue-950 text-2xl  font-semibold">..Loading</span></div>
}



return <>{children}</>;

}