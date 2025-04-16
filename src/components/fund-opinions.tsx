
import { Youtube } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface FundOpinion {
  title: string;
  channelName: string;
  timeAgo: string;
  videoUrl: string;
}

interface FundOpinionsProps {
  fundName: string;
  opinions: FundOpinion[];
}

export function FundOpinions({ fundName, opinions }: FundOpinionsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Youtube className="h-5 w-5 text-red-600" />
          {fundName} Reviews & Opinions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {opinions.map((opinion, index) => (
            <a
              key={index}
              href={opinion.videoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-3 p-3 hover:bg-muted rounded-lg transition-colors"
            >
              <Youtube className="h-12 w-12 text-red-600 flex-shrink-0" />
              <div className="space-y-1">
                <h3 className="font-medium line-clamp-2">{opinion.title}</h3>
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
