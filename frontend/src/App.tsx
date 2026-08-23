import { Route, Routes } from "react-router-dom"
import HomePage from './pages/HomePage'
import AuthCallbackPage from './pages/auth-callback/AuthCallbackPage'
import { AuthenticateWithRedirectCallback } from "@clerk/clerk-react"
import MainLayout from "./layout/MainLayout"
import ChatPage from "./pages/ChatPage"
import AlbumPage from "./pages/home/AlbumPage"

const App = () => {
  return (
    <>
       <Routes>
        <Route path='/sso-callback' element={<AuthenticateWithRedirectCallback signInForceRedirectUrl="/auth-callback" />} />
        <Route path='/auth-callback' element={<AuthCallbackPage />} />

        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />}/>
          <Route path="/chat" element={<ChatPage />}/>
          <Route path="/album/:albumId" element={<AlbumPage />}/>
        </Route>
       </Routes>
      </>
  )
}

export default App
