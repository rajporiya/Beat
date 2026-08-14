import { Show, SignInButton, SignUpButton, UserButton } from '@clerk/react'
import { Button } from './components/ui/button'

const App = () => {
  return (
    <>
       <header>
        <Show when="signed-out">
          <SignInButton ><Button>SignIn</Button></SignInButton>
          <SignUpButton ><Button>Sign Up</Button></SignUpButton>
        </Show>
        <Show when="signed-in">
          <UserButton />
        </Show>
      </header>
      </>
  )
}

export default App
