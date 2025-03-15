
import React from 'react';
import { useUser } from '@clerk/clerk-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const UserProfile = () => {
  const { user, isLoaded } = useUser();

  if (!isLoaded) {
    return <div className="flex justify-center p-4">Loading user information...</div>;
  }

  if (!user) {
    return <div className="flex justify-center p-4">Not signed in</div>;
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
