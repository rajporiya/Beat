import { useSignIn } from "@clerk/clerk-react";
import { Button } from "./ui/button";

const SignInOAuthButton = () => {
  const { signIn, isLoaded } = useSignIn();
  console.log(useSignIn);
  

  if (!isLoaded) {
    return null;
  }

  const signInWithGoogle = async ()=>{
    try {
      await signIn.authenticateWithRedirect({
        strategy : "oauth_google",
        redirectUrl : "/sso-callback",
        redirectUrlComplete :"/auth-callback"
      })
    } catch (error) {
      
    }
  }
  return (
    <Button
      variant="secondary"
      onClick={signInWithGoogle}
      className="w-full text-white border-e-zinc-200 h-11"
    >
      Continue with Google
    </Button>
  );
};

export default SignInOAuthButton;
