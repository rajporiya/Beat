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
    fetchFeatureSong :  () => Promise<void>
    fetchMadeForYouSong :  () => Promise<void>
    fetchTrendingSong :  () => Promise<void>

    madeForYouSongs : Song[];
    featureSong : Song[];
    trendingSong : Song[];

}

export const useMusicStore = create<MusicStore>((set)=>({
    albums : [],
    songs : [],
    isLoading : false,
    err : null,
    curruntAlbum : null,
    madeForYouSongs : [],
    featureSong : [],
    trendingSong : [],

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
    },

    fetchFeatureSong : async () => {
        set({isLoading : true, err : null})
        try {
            const responce  = await axiosInstance.get("/songs/featured")  
            set({ featureSong : responce.data})
        } catch (error : any) {
            set({
                err: error.response?.data?.message ?? "Failed to fetch feature song",
                curruntAlbum: null })
        }finally{
            set({isLoading : false})
        }
    },
    
    fetchTrendingSong : async () => {
        set({isLoading : true, err : null})
        try {
            const responce  = await axiosInstance.get("/songs/made-for-you")  
            set({ featureSong : responce.data})
        } catch (error : any) {
            set({
                err: error.response?.data?.message ?? "Failed to fetch feature song",
                curruntAlbum: null })
        }finally{
            set({isLoading : false})
        }
    },

    fetchMadeForYouSong : async () => {
        set({isLoading : true, err : null})
        try {
            const responce  = await axiosInstance.get("/songs/trending")  
            set({ featureSong : responce.data})
        } catch (error : any) {
            set({
                err: error.response?.data?.message ?? "Failed to fetch feature song",
                curruntAlbum: null })
        }finally{
            set({isLoading : false})
        }
    }
}))
