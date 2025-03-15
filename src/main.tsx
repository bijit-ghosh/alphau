
import React from "react";
import ReactDOM from "react-dom/client";
import { ClerkProvider } from "@clerk/clerk-react";
import App from "./App";
import "./index.css";

// Replace this with your actual Clerk publishable key
const PUBLISHABLE_KEY = "pk_test_your_actual_clerk_publishable_key_here";

if (!PUBLISHABLE_KEY || PUBLISHABLE_KEY.includes("your_actual_clerk")) {
  throw new Error("Please add your Clerk Publishable Key");
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ClerkProvider
      publishableKey={PUBLISHABLE_KEY}
      clerkJSVersion="5.56.0-snapshot.v20250312225817"
      signInUrl="/sign-in"
      signUpUrl="/sign-up"
      signInFallbackRedirectUrl="/dashboard"
      signUpFallbackRedirectUrl="/"
      signInForceRedirectUrl="/dashboard"
      signUpForceRedirectUrl="/"
      afterSignOutUrl="/"
      waitlistUrl="/"
    >
      <App />
    </ClerkProvider>
  </React.StrictMode>
);
