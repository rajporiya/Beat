import { axiosInstance } from "@/lib/axios";
import type { Album, Song } from "@/types";
import { create } from "zustand";

interface MusicStore {
    songs : Song[],
    albums : Album[]
    isLoading: boolean;
    err: string | null;
    curruntAlbum : Album | null;

    fetchAlbums: () => Promise<void>;
    fetchAlbumId : (id :string) => Promise<void>
}

export const useMusicStore = create<MusicStore>((set)=>({
    albums : [],
    songs : [],
    isLoading : false,
    err : null,
    curruntAlbum : null,

    fetchAlbums : async ()=>{
        // data fetching
        set({ isLoading : true, err: null })
        try {
            const res = await axiosInstance.get("/album")
            set({ albums : res.data})
        } catch (error : any) {
            set({ err: error.response?.data?.message ?? "Failed to fetch albums" })
        }finally{
            set({ isLoading : false})
        }
    },
    
    fetchAlbumId :async (id : string ) => {
        set ( { isLoading : true, err : null, curruntAlbum: null })
        try {
            const responce = await axiosInstance.get(`/album/${id}`);
            set({curruntAlbum: responce.data})
        } catch (error : any) {
            set({
                err: error.response?.data?.message ?? "Failed to fetch album",
                curruntAlbum: null })
        }
        finally{
            set({isLoading : false})
        }
    }
}))
