import { useMusicStore } from "@/stores/useMusicStore";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const AlbumPage = () => {
  const { albumId } = useParams<{ albumId: string }>();
  const { fetchAlbumId, curruntAlbum, isLoading} = useMusicStore()

  useEffect(()=>{
    if(albumId) fetchAlbumId(albumId)
  }, [fetchAlbumId, albumId])

  if(isLoading) return null
  return <div>{albumId}</div>;
};

export default AlbumPage;
