import { axiosInstance } from "@/lib/axios";
import type { Album, Song, Stats } from "@/types";
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
    fetchSongs :  () => Promise<void>
    fetchStats : () =>  Promise<void>


    madeForYouSongs : Song[];
    featureSong : Song[];
    trendingSong : Song[];
    stats  : Stats

    
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
    stats :{
        totalSongs : 0,
        totalAlbums : 0,
        totalUsers : 0,
        totalArtists : 0,
    },
    // isSongsLoading : false ,
    // isStatsLoading : false ,

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
            const responce  = await axiosInstance.get("/song/featured")
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
            const responce  = await axiosInstance.get("/song/trending")
            set({ trendingSong : responce.data})
        } catch (error : any) {
            set({
                err: error.response?.data?.message ?? "Failed to fetch trending songs",
                curruntAlbum: null })
        }finally{
            set({isLoading : false})
        }
    },

    fetchMadeForYouSong : async () => {
        set({isLoading : true, err : null})
        try {
            const responce  = await axiosInstance.get("/song/made-for-you")
            set({ madeForYouSongs : responce.data})
        } catch (error : any) {
            set({
                err: error.response?.data?.message ?? "Failed to fetch made-for-you songs",
                curruntAlbum: null })
        }finally{
            set({isLoading : false})
        }
    },
    fetchSongs : async ()=>{
        set({ isLoading : true, err : null})
        try {
            const responce  = await axiosInstance.get("/song")
            set({ songs : responce.data})
        } catch (error : any) {
            set({ err: error.message })
        }finally{
            set({isLoading : false})
        }
    },
    fetchStats : async ()=>{
        set({ isLoading : true, err : null})
        try {
            const responce  = await axiosInstance.get("stats")
             set({ songs : responce.data})
        } catch (error : any) {
            set({ err: error.message })
        }finally{
            set({isLoading : false})
        }
    }
}))
