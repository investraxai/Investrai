
import { Star } from "lucide-react";

const riskLabels: Record<number, string> = {
  1: "Very Low",
  2: "Low",
  3: "Moderate",
  4: "High",
  5: "Very High",
};

interface RiskRatingProps {
  rating: 1 | 2 | 3 | 4 | 5;
}

export function RiskRating({ rating }: RiskRatingProps) {
  return (
    <div className="flex items-center">
      <div className="flex">
        {[1, 2, 3, 4, 5].map((level) => (
          <Star
            key={level}
            className={`h-4 w-4 ${
              level <= rating
                ? "fill-yellow-400 text-yellow-400"
                : "text-gray-300"
            }`}
          />
        ))}
      </div>
      <span className="ml-2 text-sm">{riskLabels[rating]}</span>
    </div>
  );
}
