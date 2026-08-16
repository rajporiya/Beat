import { useAuth } from "@clerk/clerk-react";
import { useEffect, useState, type ReactNode } from "react";
import { Loader } from "lucide-react";
import { axiosInstance } from "@/lib/axios";

type AuthProviderProps = {
  children: ReactNode;
};

const updateApiToken = (token: string | null) => {
  if (token) {
    axiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete axiosInstance.defaults.headers.common.Authorization;
  }
};

const AuthProvider = ({ children }: AuthProviderProps) => {
  const { getToken } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      try {
        const token = await getToken();
        updateApiToken(token);
      } catch (error) {
        console.error("Error in AuthProvider:", error);
        updateApiToken(null);
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, [getToken]);

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader className="size-8 animate-spin text-emerald-500" />
      </div>
    );
  }

  return <>{children}</>;
};

export default AuthProvider;
