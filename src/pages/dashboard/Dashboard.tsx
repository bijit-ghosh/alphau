
import React from "react";
import { SignedIn, SignedOut, SignInButton } from "@clerk/clerk-react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import UserProfile from "@/components/UserProfile";
import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";

const Dashboard = () => {
  return (
    <DashboardLayout>
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
        
        <SignedIn>
          <UserProfile />
        </SignedIn>
        
        <SignedOut>
          <div className="text-center max-w-md mx-auto">
            <UserProfile />
            
            <div className="mt-8 p-4 bg-muted/30 rounded-lg">
              <h2 className="text-xl font-semibold mb-2">Access Your Dashboard</h2>
              <p className="text-muted-foreground mb-4">
                Sign in to view your personalized dashboard and access all features.
              </p>
              <SignInButton mode="modal">
                <Button className="w-full sm:w-auto flex items-center justify-center gap-2 bg-primary">
                  <LogIn className="w-4 h-4" />
                  <span>Sign In Now</span>
                </Button>
              </SignInButton>
            </div>
          </div>
        </SignedOut>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
