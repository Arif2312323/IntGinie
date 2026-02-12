import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {ClerkProvider} from "@clerk/clerk-react"
import {QueryClient,QueryClientProvider} from "@tanstack/react-query"
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router'


const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
const queryClient = new QueryClient();

if(!PUBLISHABLE_KEY)
{
  throw new Error("Missing Clerk publishable key");
}
createRoot(document.getElementById('root')).render(
  <StrictMode>
      <QueryClientProvider client={queryClient}>
        <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
            <BrowserRouter>
              <App />
            </BrowserRouter>
        </ClerkProvider>
      </QueryClientProvider>
  </StrictMode>,
)
