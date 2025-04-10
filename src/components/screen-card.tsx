
import { Card, CardContent } from "@/components/ui/card";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { ArrowRight, Users } from "lucide-react";

interface ScreenCardProps {
  title: string;
  icon: string;
  description: string;
  criteria?: string[];
  usersCount?: string;
  onClick: () => void;
  isPro?: boolean;
}

export function ScreenCard({
  title,
  icon,
  description,
  criteria = [],
  usersCount = "0",
  onClick,
  isPro = false
}: ScreenCardProps) {
  return (
    <Card 
      className="overflow-hidden hover:shadow-md transition-all duration-200 cursor-pointer bg-white hover:bg-gray-50"
      onClick={onClick}
    >
      <CardContent className="p-6">
        <div className="mb-4 flex items-start justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{icon}</span>
            <h3 className="text-lg font-semibold">{title}</h3>
          </div>
          
          {isPro && (
            <div className="rounded-full bg-purple-100 px-2 py-1 text-xs font-medium text-purple-800">
              Pro
            </div>
          )}
        </div>
        
        {criteria && criteria.length > 0 && (
          <div className="mb-4 border rounded-lg p-2 bg-gray-50">
            {criteria.map((criterion, i) => (
              <span key={i} className="text-sm">
                {criterion}
                {i < criteria.length - 1 && <span className="mx-1">•</span>}
                {i === criteria.length - 2 && criteria.length > 2 && (
                  <HoverCard>
                    <HoverCardTrigger asChild>
                      <span className="text-xs text-purple-700 cursor-help">+{criteria.length - 2} more</span>
                    </HoverCardTrigger>
                    <HoverCardContent className="w-80">
                      <div className="text-sm">
                        Additional criteria used for this screen
                      </div>
                    </HoverCardContent>
                  </HoverCard>
                )}
              </span>
            ))}
          </div>
        )}
        
        <p className="mb-4 text-sm text-muted-foreground">{description}</p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Users className="h-3 w-3" />
            <span>{usersCount} users have used this</span>
          </div>
          <ArrowRight className="h-4 w-4 text-muted-foreground" />
        </div>
      </CardContent>
    </Card>
  );
}
