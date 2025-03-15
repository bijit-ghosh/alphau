
import React from 'react';
import { useUser, SignInButton } from '@clerk/clerk-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { LogIn } from 'lucide-react';

const UserProfile = () => {
  const { user, isLoaded } = useUser();

  if (!isLoaded) {
    return <div className="flex justify-center p-4">Loading user information...</div>;
  }

  if (!user) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-center">Sign In</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center text-muted-foreground">
            <p>Please sign in to access your profile and dashboard features.</p>
          </div>
          <div className="flex justify-center pt-4">
            <SignInButton mode="modal">
              <Button className="w-full sm:w-auto flex items-center justify-center gap-2">
                <LogIn className="w-4 h-4" />
                <span>Sign In / Sign Up</span>
              </Button>
            </SignInButton>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-4">
          <Avatar>
            <AvatarImage src={user.imageUrl} alt={user.fullName || 'User'} />
            <AvatarFallback>{user.firstName?.charAt(0) || 'U'}</AvatarFallback>
          </Avatar>
          <span>User Profile</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="text-sm font-medium text-muted-foreground">Full Name</h3>
          <p className="text-lg">{user.fullName || 'Not provided'}</p>
        </div>
        
        <div>
          <h3 className="text-sm font-medium text-muted-foreground">Email</h3>
          <p className="text-lg">{user.primaryEmailAddress?.emailAddress || 'No email'}</p>
        </div>
        
        <div>
          <h3 className="text-sm font-medium text-muted-foreground">Username</h3>
          <p className="text-lg">{user.username || 'No username set'}</p>
        </div>
        
        <div className="text-xs text-muted-foreground mt-6">
          User ID: {user.id}
        </div>
      </CardContent>
    </Card>
  );
};

export default UserProfile;
