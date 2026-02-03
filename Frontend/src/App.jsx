import { SignedIn, SignedOut, SignIn, SignInButton, SignOutButton, UserButton } from "@clerk/clerk-react"

function App() {

  return (
    <>
    <SignedOut>
      <SignInButton mode = "modal"></SignInButton>
    </SignedOut>
    <SignedIn>
      <SignOutButton/>
    </SignedIn>

    <UserButton/>
    </>
  )
}

export default App
