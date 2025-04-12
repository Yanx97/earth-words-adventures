
import { useState } from "react";
import BottomNavigation from "@/components/layout/BottomNavigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Mock data
const globalRankings = [
  { id: 1, name: "Lin Wei", avatar: "", points: 860, level: 8 },
  { id: 2, name: "Sarah Chen", avatar: "", points: 720, level: 7 },
  { id: 3, name: "Alex Wong", avatar: "", points: 680, level: 6 },
  { id: 4, name: "Mike Zhang", avatar: "", points: 590, level: 5 },
  { id: 5, name: "Lisa Jin", avatar: "", points: 540, level: 5 },
];

const friendRankings = [
  { id: 2, name: "Sarah Chen", avatar: "", points: 720, level: 7 },
  { id: 4, name: "Mike Zhang", avatar: "", points: 590, level: 5 },
  { id: 7, name: "David Liu", avatar: "", points: 450, level: 4 },
];

const dailyChallenge = {
  title: "Earth's Structure",
  description: "Master 5 new words about the Earth's structure",
  reward: "20 points + 'Geologist' badge",
  progress: 2,
  total: 5
};

const Leaderboard = () => {
  const [selectedTab, setSelectedTab] = useState("global");
  
  // Get user initials for avatar fallback
  const getInitials = (name: string) => {
    return name.split(' ').map(part => part[0]).join('');
  };

  return (
    <div className="pb-20">
      {/* Top header */}
      <div className="sticky top-0 z-30 flex items-center justify-between bg-background/80 backdrop-blur-sm px-4 py-3 border-b">
        <div className="flex items-center">
          <div className="text-sm font-medium">Leaderboard</div>
        </div>
      </div>

      {/* Main content */}
      <div className="container max-w-md mx-auto px-4 py-6">
        {/* Daily challenge card */}
        <div className="mb-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 shadow-sm border border-blue-100">
          <h2 className="text-lg font-bold text-blue-800">Daily Challenge</h2>
          <h3 className="font-medium mb-2">{dailyChallenge.title}</h3>
          <p className="text-sm text-gray-600 mb-3">{dailyChallenge.description}</p>
          
          {/* Progress bar */}
          <div className="mb-3">
            <div className="flex justify-between text-xs mb-1">
              <span>Progress</span>
              <span>{dailyChallenge.progress}/{dailyChallenge.total}</span>
            </div>
            <div className="h-2 bg-blue-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-blue-500 rounded-full" 
                style={{ width: `${(dailyChallenge.progress / dailyChallenge.total) * 100}%` }}
              />
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="text-xs text-gray-600">
              Reward: {dailyChallenge.reward}
            </div>
            <Button size="sm" variant="outline" className="text-xs">
              Continue
              <ChevronRight className="h-3 w-3 ml-1" />
            </Button>
          </div>
        </div>
        
        {/* Rankings tabs */}
        <Tabs 
          defaultValue="global" 
          value={selectedTab}
          onValueChange={setSelectedTab}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="global">Global</TabsTrigger>
            <TabsTrigger value="friends">Friends</TabsTrigger>
          </TabsList>
          
          <TabsContent value="global" className="mt-4">
            <div className="space-y-3">
              {globalRankings.map((user, index) => (
                <div key={user.id} className="flex items-center p-3 bg-card rounded-lg border">
                  <div className="w-6 font-bold text-center">
                    {index + 1}
                  </div>
                  <Avatar className="mx-3">
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {getInitials(user.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="font-medium">{user.name}</div>
                    <div className="text-xs text-muted-foreground">Level {user.level}</div>
                  </div>
                  <div className="font-bold">{user.points}</div>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="friends" className="mt-4">
            <div className="space-y-3">
              {friendRankings.map((user, index) => (
                <div key={user.id} className="flex items-center p-3 bg-card rounded-lg border">
                  <div className="w-6 font-bold text-center">
                    {index + 1}
                  </div>
                  <Avatar className="mx-3">
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {getInitials(user.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="font-medium">{user.name}</div>
                    <div className="text-xs text-muted-foreground">Level {user.level}</div>
                  </div>
                  <div className="font-bold">{user.points}</div>
                </div>
              ))}
              
              {friendRankings.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  <p>No friends added yet</p>
                  <Button variant="outline" size="sm" className="mt-2">
                    Add Friends
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Bottom navigation */}
      <BottomNavigation />
    </div>
  );
};

export default Leaderboard;
