import { Navigate, Route, Routes } from "react-router-dom"
import HomePage from './pages/HomePage'
import AuthCallbackPage from './pages/auth-callback/AuthCallbackPage'
import { AuthenticateWithRedirectCallback } from "@clerk/clerk-react"
import MainLayout from "./layout/MainLayout"
import ChatPage from "./pages/ChatPage"
import AlbumPage from "./pages/home/AlbumPage"
import AdminPage from "./pages/admin/AdminPage"
import SearchPage from "./pages/SearchPage"
import LibraryPage from "./pages/LibraryPage"
import CollectionPage from "./pages/CollectionPage"
import ArtistPage from "./pages/ArtistPage"
import AuthPage from "./pages/AuthPage"

const App = () => {
  return (
    <>
       <Routes>
        <Route path='/sso-callback' element={<AuthenticateWithRedirectCallback signInForceRedirectUrl="/auth-callback" />} />
        <Route path='/auth-callback' element={<AuthCallbackPage />} />
        <Route path="/admin" element={<AdminPage/>}/>
        <Route path="/login" element={<AuthPage mode="login"/>}/>
        <Route path="/register" element={<AuthPage mode="register"/>}/>
        
        <Route element={<MainLayout />}>
          <Route path="/" element={<Navigate to="/home" replace />}/>
          <Route path="/home" element={<HomePage />}/>
          <Route path="/search" element={<SearchPage />}/>
          <Route path="/library" element={<LibraryPage />}/>
          <Route path="/liked" element={<CollectionPage type="liked" />}/>
          <Route path="/recently-played" element={<CollectionPage type="recent" />}/>
          <Route path="/artist/:artistId" element={<ArtistPage />}/>
          <Route path="/playlist/:playlistId" element={<CollectionPage type="liked" />}/>
          <Route path="/chat" element={<ChatPage />}/>
          <Route path="/album/:albumId" element={<AlbumPage />}/>
        </Route>
       </Routes>
      </>
  )
}

export default App
