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
      console.error("Google sign-in failed:", error);
    }
  }
  return (
    <Button
      variant="secondary"
      onClick={signInWithGoogle}
      className="w-full text-white h-11"
    >
      Continue with Google
    </Button>
  );
};

export default SignInOAuthButton;
