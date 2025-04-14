
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Info } from "lucide-react";

interface MicroLessonTooltipProps {
  children: React.ReactNode;
  lesson: string;
}

export function MicroLessonTooltip({ children, lesson }: MicroLessonTooltipProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="inline-flex items-center gap-1 cursor-help">
            {children}
            <Info className="h-4 w-4 text-muted-foreground" />
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p className="max-w-xs text-sm">{lesson}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
