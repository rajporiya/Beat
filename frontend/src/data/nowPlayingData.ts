export interface ArtistDetail {
  name: string;
  monthlyListeners: string;
  bio: string;
  avatarUrl: string;
}

export interface SongDetails {
  lyrics: string[];
  artistDetail: ArtistDetail;
}

export const ARTIST_DETAILS: Record<string, ArtistDetail> = {
  mithoon: {
    name: "Mithoon",
    monthlyListeners: "14,892,301 monthly listeners",
    bio: "Mithoon is an acclaimed Indian film music director, composer and lyricist known for soulful chartbusters like 'Tum Hi Ho', 'Tera Ban Jaunga', 'Sanam Re' and 'Intezaar'.",
    avatarUrl: "/cover-images/kabir_singh.jpg",
  },
  pritam: {
    name: "Pritam",
    monthlyListeners: "38,412,980 monthly listeners",
    bio: "Pritam Chakraborty is an Indian music director, composer and singer who has composed music for over a hundred Bollywood films and remains one of India's most streamed artists.",
    avatarUrl: "/artists/pritam.jpg",
  },
  "a.r. rahman": {
    name: "A.R. Rahman",
    monthlyListeners: "29,845,120 monthly listeners",
    bio: "Two-time Academy Award and Grammy-winning composer, singer and songwriter known as the Mozart of Madras, blending world music and Indian classical.",
    avatarUrl: "/artists/ar_rahman.jpg",
  },
  "arijit singh": {
    name: "Arijit Singh",
    monthlyListeners: "44,192,800 monthly listeners",
    bio: "Arijit Singh is widely regarded as one of the greatest and most versatile playback singers in Indian music history with thousands of recorded songs.",
    avatarUrl: "/artists/arijit_singh.jpg",
  },
  "sachin-jigar": {
    name: "Sachin-Jigar",
    monthlyListeners: "21,304,912 monthly listeners",
    bio: "Music composer duo Sachin Sanghvi and Jigar Saraiya renowned for energetic chartbusters across Hindi and Gujarati cinema.",
    avatarUrl: "/artists/sachin_jigar.jpg",
  },
  "vishal-shekhar": {
    name: "Vishal-Shekhar",
    monthlyListeners: "18,920,400 monthly listeners",
    bio: "Dynamic music director duo Vishal Dadlani and Shekhar Ravjiani known for iconic Bollywood anthems, rock and modern pop.",
    avatarUrl: "/artists/vishal_shekhar.jpg",
  },
  "atif aslam": {
    name: "Atif Aslam",
    monthlyListeners: "26,114,350 monthly listeners",
    bio: "Celebrated Pakistani playback singer and songwriter famed across South Asia for his distinct vocal belting technique and romantic ballads.",
    avatarUrl: "/artists/atif_aslam.jpg",
  },
  "anirudh ravichander": {
    name: "Anirudh Ravichander",
    monthlyListeners: "27,450,890 monthly listeners",
    bio: "Prolific South Indian music composer, producer and singer known for viral sensations and powerhouse cinematic soundtracks.",
    avatarUrl: "/artists/anirudh.jpg",
  },
  "udit narayan": {
    name: "Udit Narayan",
    monthlyListeners: "16,840,210 monthly listeners",
    bio: "Legendary four-time National Film Award-winning playback singer whose timeless voice defined 90s and 2000s Bollywood cinema.",
    avatarUrl: "/artists/udit_narayan.jpg",
  },
  "sidhu moose wala": {
    name: "Sidhu Moose Wala",
    monthlyListeners: "22,341,900 monthly listeners",
    bio: "Legendary Punjabi singer, rapper and songwriter revered globally for revolutionary lyricism and putting Punjabi music on the world map.",
    avatarUrl: "/cover-images/ghostface_killah.jpg",
  },
  "yo yo honey singh": {
    name: "Yo Yo Honey Singh",
    monthlyListeners: "19,820,110 monthly listeners",
    bio: "Indian music producer, rapper, and pop icon who brought hip-hop into mainstream Indian cinema with record-breaking party anthems.",
    avatarUrl: "/cover-images/casa_tupka.jpg",
  },
};

export const SONG_LYRICS: Record<string, string[]> = {
  "tera ban jaunga": [
    "Meri raahon mein khile phool sa",
    "Tu jo muskura de toh jee uthun",
    "Haan hasi ban gaye",
    "Haan nami ban gaye",
    "Tum mere aasmaan",
    "Meri zameen ban gaye",
    "Kyunki main tera ban jaunga",
    "Main tera ban jaunga...",
  ],
  "kabir singh": [
    "Haan hasi ban gaye",
    "Haan nami ban gaye",
    "Tum mere aasmaan",
    "Meri zameen ban gaye",
    "Kyunki main tera ban jaunga",
    "Main tera ban jaunga...",
  ],
  "aashiqui 2": [
    "Hum tere bin ab reh nahi sakte",
    "Tere bina kya wajood mera",
    "Tujhse juda gar ho jaayenge",
    "Toh khud se hi ho jaayenge judaa",
    "Kyunki tum hi ho",
    "Ab tum hi ho",
    "Zindagi ab tum hi ho...",
  ],
  "casa tupka anthemo": [
    "Yo Yo Honey Singh",
    "Casa Tupka with the heavy beat",
    "Gaddi meri chhad di ni road",
    "Bass kare heart nu explode",
    "Party sharty chaldi all night",
    "Everything is looking so bright!",
  ],
  "ghostface killah": [
    "Sidhu Moose Wala",
    "Mxrci on the track",
    "Ho jatt da muqabla dass kithe ae",
    "Dil da ni maada",
    "Tera Sidhu Moose Wala!",
  ],
  alfaaz: [
    "Alfaaz mere dil ke",
    "Tujhse hi jud gaye hain",
    "Har raah pe chalte hue",
    "Hum tere ban gaye hain...",
  ],
  "yeh prem mol liya": [
    "Yeh prem mol liya",
    "Humne sanam tere pyaar mein",
    "Dil yeh fida kiya",
    "Tere hi intezaar mein...",
  ],
  animal: [
    "Ho khande khadke saare",
    "Arjan Vailly ne",
    "Pair jod ke gandasi maari",
    "Takua gandasa vajjda...",
  ],
  rockstar: [
    "Jo bhi main kehna chahoon",
    "Barbaad kare alfaaz mere",
    "Sadda haq aithe rakh",
    "Rang de mera jahaan...",
  ],
  "yeh jawaani hai deewani": [
    "Ilahi mera jee aaye aaye",
    "Kal pe sawaal hai, jeena filhaal hai",
    "Subhanallah, haseen chehra",
    "Balam pichkari jo tune mujhe maari...",
  ],
  bari: [
    "Bari khol ke vekh zara tu",
    "Saamne kaun khada ae",
    "Dil vich tu hi tu vasdi",
    "Chann vi sharma reha ae...",
  ],
  "samjho na": [
    "Samjho na kuch toh samjho na",
    "Hum toh deewane hain tumhare",
    "Khamoshiyon ko awaz do",
    "Sun lo sitaaron ke ishaare...",
  ],
};

export const getArtistDetailsForSong = (artistName: string = ""): ArtistDetail => {
  const lower = artistName.toLowerCase();
  for (const [key, detail] of Object.entries(ARTIST_DETAILS)) {
    if (lower.includes(key)) {
      return detail;
    }
  }

  const primaryName = artistName.split(/[,&]/)[0]?.trim() || "Featured Artist";
  return {
    name: primaryName,
    monthlyListeners: "12,450,230 monthly listeners",
    bio: `${primaryName} is a popular artist with hit tracks trending on Beat Music.`,
    avatarUrl: "/cover-images/kabir_singh.jpg",
  };
};

export const getLyricsForSong = (title: string = ""): string[] => {
  const lower = title.toLowerCase();
  for (const [key, lyrics] of Object.entries(SONG_LYRICS)) {
    if (lower.includes(key) || key.includes(lower)) {
      return lyrics;
    }
  }

  return [
    "Haan hasi ban gaye",
    "Haan nami ban gaye",
    "Tum mere aasmaan",
    "Meri zameen ban gaye",
    "Kyunki main tera ban jaunga",
    "Main tera ban jaunga...",
  ];
};
