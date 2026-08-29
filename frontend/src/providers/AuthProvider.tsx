import { useAuth } from "@clerk/clerk-react";
import { useEffect, useState, type ReactNode } from "react";
import { Loader } from "lucide-react";
import { axiosInstance } from "@/lib/axios";
import { useAuthStro } from "@/stores/useAuthStro";

type AuthProviderProps = {
  children: ReactNode;
};

const updateApiToken =  (token:string | null) => {
  if(token) axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  else delete axiosInstance.defaults.headers.common["Authorization"]
}
const AuthProvider = ({ children }: AuthProviderProps) => {
  const { getToken, isLoaded, isSignedIn } = useAuth();
  const [loading, setLoading] = useState(true);
  const { checkAdminStatus, reset } = useAuthStro()


    useEffect(()=>{
    const initAuth = async () =>{
      // Wait for Clerk to create the session before requesting its token.
      if (!isLoaded) return;

      try {
        const token = isSignedIn ? await getToken() : null;
        console.log("Clerk session diagnostic", {
          isLoaded,
          isSignedIn,
          hasToken: Boolean(token),
        });
        updateApiToken(token)
        if(token){
          await checkAdminStatus()
        } else {
          reset()
        }
      } catch (error) {
        updateApiToken(null)
        console.log("Errpr in auth provider", error);
        
      }finally{
        setLoading(false)
      }
    };
    initAuth()
  }, [getToken, isLoaded, isSignedIn, checkAdminStatus, reset])

  // Always obtain the current Clerk token immediately before a protected request.
  // This also handles a token refreshed after the application first rendered.
  useEffect(() => {
    const requestInterceptor = axiosInstance.interceptors.request.use(async (config) => {
      const token = await getToken();
      if (token) config.headers.Authorization = `Bearer ${token}`;
      else delete config.headers.Authorization;
      return config;
    });

    return () => axiosInstance.interceptors.request.eject(requestInterceptor);
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
