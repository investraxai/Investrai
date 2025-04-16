
import { Youtube } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface FundOpinion {
  title: string;
  channelName: string;
  timeAgo: string;
  videoUrl: string;
  thumbnailUrl?: string;
}

interface FundOpinionsProps {
  fundName: string;
  opinions: FundOpinion[];
}

export function FundOpinions({ fundName, opinions }: FundOpinionsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">{fundName} Review & Opinions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {opinions.map((opinion, index) => (
            <a
              key={index}
              href={opinion.videoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-4 hover:bg-muted/50 rounded-lg transition-colors group"
            >
              <div className="relative min-w-[120px] h-[68px] rounded-md overflow-hidden bg-muted">
                {opinion.thumbnailUrl ? (
                  <img 
                    src={opinion.thumbnailUrl} 
                    alt={opinion.title} 
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full bg-red-100 dark:bg-red-900/20">
                    <Youtube className="h-8 w-8 text-red-600" />
                  </div>
                )}
                <div className="absolute inset-0 flex items-center justify-center bg-black/5 group-hover:bg-black/10 transition-colors">
                  <div className="bg-black/60 rounded-full p-2 opacity-80 group-hover:opacity-100 transition-opacity">
                    <Youtube className="h-6 w-6 text-white" />
                  </div>
                </div>
              </div>
              <div className="space-y-1">
                <h3 className="font-medium line-clamp-2 group-hover:text-primary transition-colors">{opinion.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {opinion.channelName} • {opinion.timeAgo}
                </p>
              </div>
            </a>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
