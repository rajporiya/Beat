import { create } from "zustand";
import type { Song } from "@/types";

interface PlayerStore {
    currentSong : Song | null;
    isPlaying : boolean;
    queue : Song[];
    currentIndex : number;

    initalizeQueue : ( songs : Song[]) => void;
    playerAlbum : ( songs : Song[], startIndex?: number) => void;
    setCurrentSong : (song : Song | null)  => void;
    togglePlay: () => void;
    playNext: () => void;
    playPrevious : () => void;
}

export const usePlayStore = create<PlayerStore>((set,get) =>({
    currentSong :null,
    isPlaying : false,
    queue : [],
    currentIndex : -1,

    initalizeQueue : ( songs : Song[]) => {
        const { queue, currentSong, currentIndex } = get()
        const shouldResetIndex = queue.length !== songs.length
        set({
            queue : songs,
            currentSong : currentSong || songs[0] || null,
            currentIndex : shouldResetIndex ? (songs.length ? 0 : -1) : currentIndex,
        })
    },
    playerAlbum : ( songs : Song[], startIndex = 0) => {
        if(songs.length === 0 ) return

        const song = songs[startIndex]
        set({
            queue :songs,
            currentSong : song,
            currentIndex : startIndex,
            isPlaying : true
        })
    },
    setCurrentSong : (song : Song | null)  => {
        if (!song) return;
        const songIndex = get().queue.findIndex(s => s._id ===  song._id)
        set({
            currentSong : song,
            isPlaying : true,
            currentIndex : songIndex !== -1 ? songIndex : get().currentIndex
        })
    },
    togglePlay: () => {
        const willStartPlaying = !get().isPlaying;

        set({
            isPlaying : willStartPlaying,
        })
    },
    playNext : () =>{
        const { currentIndex, queue}= get()
        const nextIndex = currentIndex + 1

        if(nextIndex< queue.length) {
          const nextSong = queue[nextIndex]  
          set({
            currentSong : nextSong,
            currentIndex : nextIndex,
            isPlaying : true
          })
        } else {
            set({
                isPlaying : false
            })
        }
    },
    playPrevious : () => {
        const { currentIndex, queue} = get()
        const prevIndex = currentIndex - 1 ;
        if(prevIndex >= 0 ) {
            const prevSong = queue[prevIndex]
            set({
                currentIndex : prevIndex,
                currentSong : prevSong,
                isPlaying : true
            })
        }else{
            set({
                isPlaying : false
            })
        }
    }

}))