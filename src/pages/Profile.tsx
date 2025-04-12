
import BottomNavigation from "@/components/layout/BottomNavigation";
import { Card } from "@/components/ui/card";
import {
  Calendar,
  Settings,
  Globe,
  BookOpen,
  Award,
  Star,
  Volume2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

// Mock user data
const userData = {
  name: "Alex Chen",
  level: 4,
  title: "Geography Explorer",
  streakDays: 7,
  wordsLearned: 42,
  wordsToReview: 15,
  progress: {
    currentLevel: 65, // percentage
    nextMilestone: 100, // words
    currentCount: 42, // words
  },
  achievements: [
    { name: "7-Day Streak", icon: Calendar, earned: true },
    { name: "Earth Specialist", icon: Globe, earned: true },
    { name: "Vocabulary Builder", icon: BookOpen, earned: false },
    { name: "Quiz Master", icon: Award, earned: false },
  ]
};

const Profile = () => {
  return (
    <div className="pb-20">
      {/* Top header */}
      <div className="sticky top-0 z-30 flex items-center justify-between bg-background/80 backdrop-blur-sm px-4 py-3 border-b">
        <div className="flex items-center">
          <div className="text-sm font-medium">My Profile</div>
        </div>
        <Button variant="ghost" size="icon" aria-label="Settings">
          <Settings className="h-5 w-5" />
        </Button>
      </div>

      {/* Main content */}
      <div className="container max-w-md mx-auto px-4 py-6">
        {/* User info */}
        <div className="mb-8 text-center">
          <div className="inline-block rounded-full bg-primary/10 p-6 mb-3">
            <span className="text-3xl">👤</span>
          </div>
          <h1 className="text-xl font-bold">{userData.name}</h1>
          <div className="flex items-center justify-center gap-2 mt-1">
            <span className="bg-primary/10 text-primary text-xs font-medium px-2 py-1 rounded-full">
              Level {userData.level}
            </span>
            <span className="bg-secondary text-secondary-foreground text-xs font-medium px-2 py-1 rounded-full">
              {userData.title}
            </span>
          </div>
        </div>

        {/* Stats cards */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <Card className="p-4">
            <div className="text-xl font-bold">{userData.streakDays}</div>
            <div className="text-sm text-muted-foreground flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              Day Streak
            </div>
          </Card>
          
          <Card className="p-4">
            <div className="text-xl font-bold">{userData.wordsLearned}</div>
            <div className="text-sm text-muted-foreground flex items-center">
              <BookOpen className="h-4 w-4 mr-1" />
              Words Learned
            </div>
          </Card>
        </div>

        {/* Progress section */}
        <div className="mb-8">
          <h2 className="text-lg font-bold mb-4">Current Progress</h2>
          <Card className="p-4">
            <div className="flex justify-between mb-2">
              <div className="font-medium">Level {userData.level} Progress</div>
              <div className="text-sm">{userData.progress.currentCount}/{userData.progress.nextMilestone}</div>
            </div>
            <Progress value={userData.progress.currentLevel} className="h-2" />
            
            <div className="mt-4 text-sm text-muted-foreground">
              {userData.wordsToReview} words to review
            </div>
            
            <Button variant="outline" className="w-full mt-4 text-sm">
              Practice Now
            </Button>
          </Card>
        </div>

        {/* Achievements */}
        <div className="mb-8">
          <h2 className="text-lg font-bold mb-4">Achievements</h2>
          <div className="grid grid-cols-2 gap-3">
            {userData.achievements.map((achievement, index) => {
              const Icon = achievement.icon;
              return (
                <Card 
                  key={index} 
                  className={`p-3 ${!achievement.earned ? 'opacity-50' : ''}`}
                >
                  <div className="flex items-center">
                    <div className={`p-2 rounded-full ${achievement.earned ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="ml-3">
                      <div className="text-sm font-medium">{achievement.name}</div>
                      {achievement.earned ? (
                        <div className="text-xs text-primary flex items-center">
                          <Star className="h-3 w-3 mr-0.5 fill-current" />
                          Earned
                        </div>
                      ) : (
                        <div className="text-xs text-muted-foreground">In progress</div>
                      )}
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Settings shortcuts */}
        <div>
          <h2 className="text-lg font-bold mb-4">Settings</h2>
          <Card className="divide-y">
            <div className="p-4 flex justify-between items-center">
              <div className="flex items-center">
                <Globe className="h-5 w-5 mr-3 text-muted-foreground" />
                <span>Language</span>
              </div>
              <div className="text-sm text-muted-foreground">English</div>
            </div>
            <div className="p-4 flex justify-between items-center">
              <div className="flex items-center">
                <Volume2 className="h-5 w-5 mr-3 text-muted-foreground" />
                <span>Pronunciation</span>
              </div>
              <div className="text-sm text-muted-foreground">American</div>
            </div>
          </Card>
        </div>
      </div>

      {/* Bottom navigation */}
      <BottomNavigation />
    </div>
  );
};

export default Profile;
