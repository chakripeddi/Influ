
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { User } from "lucide-react";

interface WelcomeBannerProps {
  userName: string;
  userAvatar?: string;
  tip?: string;
}

// Array of tips for influencers
const influencerTips = [
  "Engage with your audience daily to boost your content visibility.",
  "Use analytics to understand which content performs best with your followers.",
  "Create a consistent posting schedule to maintain audience engagement.",
  "Respond to comments to build stronger connections with your audience.",
  "Collaborate with other influencers to expand your reach.",
  "Focus on quality over quantity in your content creation.",
  "Stay authentic to build trust with your audience.",
  "Test different content formats to see what resonates with your followers.",
  "Share behind-the-scenes content to humanize your brand.",
  "Keep up with platform algorithm changes to optimize your content strategy."
];

const WelcomeBanner = ({ userName, userAvatar, tip }: WelcomeBannerProps) => {
  // Get current time to determine greeting
  const currentHour = new Date().getHours();
  let greeting;

  if (currentHour < 12) {
    greeting = "Good morning";
  } else if (currentHour < 18) {
    greeting = "Good afternoon";
  } else {
    greeting = "Good evening";
  }

  // Get a random tip if none provided
  const displayTip = tip || influencerTips[Math.floor(Math.random() * influencerTips.length)];

  // Get first name
  const firstName = userName.split(' ')[0];

  return (
    <Card className="bg-gradient-to-br from-primary/10 to-background border-none shadow-lg animate-fade-in">
      <CardContent className="p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <div className="flex items-center mb-4 md:mb-0">
            <Avatar className="h-16 w-16 rounded-full border-4 border-background shadow-xl">
              {userAvatar ? (
                <AvatarImage src={userAvatar} alt={userName} />
              ) : (
                <AvatarFallback className="bg-primary text-primary-foreground">
                  <User className="h-8 w-8" />
                </AvatarFallback>
              )}
            </Avatar>
            <div className="ml-4">
              <p className="text-sm font-medium text-muted-foreground">{greeting}</p>
              <h1 className="text-2xl font-bold">{firstName}</h1>
            </div>
          </div>
          
          <div className="bg-white dark:bg-slate-800 shadow-sm p-4 rounded-md max-w-md">
            <p className="text-sm font-medium">👋 Tip of the day</p>
            <p className="text-sm text-muted-foreground mt-1">{displayTip}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WelcomeBanner;
