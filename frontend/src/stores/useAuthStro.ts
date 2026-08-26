import { axiosInstance } from "@/lib/axios";
import { create } from "zustand";

interface AuthStro {
    isAdmin : boolean,
    error : string | null,
    isLoading : boolean,
    checkAdminStatus : () => Promise<void>,
    reset : () => void
}
export const useAuthStro = create<AuthStro>((set)=>({
    isLoading : false, 
    isAdmin: false,
    error : null,
    checkAdminStatus : async () => {
        set({ isLoading : true, error: null})
        try {
            const res = await axiosInstance.get("/admin/check")
            set({ isAdmin: res.data.admin})
        } catch (error : any) {
            set({ isAdmin: false, error: error.response?.data?.message || error.message })
        }finally{
            set ({ isLoading : false})
        }
    },
    reset: () => {
        set({isAdmin : false, isLoading : false, error : null, })
    }
}))