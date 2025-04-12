
import { Link, useLocation } from "react-router-dom";
import { Award, Compass, User, Archive } from "lucide-react";
import { cn } from "@/lib/utils";

const NavItem = ({ 
  to, 
  icon: Icon, 
  label, 
  isActive 
}: { 
  to: string; 
  icon: React.ElementType; 
  label: string;
  isActive: boolean;
}) => {
  return (
    <Link 
      to={to} 
      className={cn(
        "nav-item", 
        isActive ? "nav-item-active" : "nav-item-inactive"
      )}
    >
      <Icon className={cn("h-6 w-6 mb-1", isActive ? "text-primary" : "text-muted-foreground")} />
      <span>{label}</span>
    </Link>
  );
};

const BottomNavigation = () => {
  const location = useLocation();
  const path = location.pathname;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 h-16 bg-background border-t shadow-sm">
      <nav className="h-full">
        <div className="flex h-full justify-around items-center">
          <NavItem 
            to="/" 
            icon={Compass} 
            label="Learn" 
            isActive={path === "/"} 
          />
          <NavItem 
            to="/collection" 
            icon={Archive} 
            label="Collection" 
            isActive={path === "/collection"} 
          />
          <NavItem 
            to="/leaderboard" 
            icon={Award} 
            label="Leaderboard" 
            isActive={path === "/leaderboard"} 
          />
          <NavItem 
            to="/profile" 
            icon={User} 
            label="Profile" 
            isActive={path === "/profile"} 
          />
        </div>
      </nav>
    </div>
  );
};

export default BottomNavigation;
