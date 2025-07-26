import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ExternalLink, Star, Users } from 'lucide-react';

interface Platform {
  name: string;
  score: number;
  reviewCount: number;
  price: string;
  url: string;
}

interface PlatformAnalysisProps {
  platforms: Platform[];
}

export const PlatformAnalysis = ({ platforms }: PlatformAnalysisProps) => {
  const getPlatformColor = (platformName: string) => {
    const colors: Record<string, string> = {
      'Amazon': 'bg-amazon',
      'Flipkart': 'bg-flipkart', 
      'Myntra': 'bg-myntra',
      'Nykaa': 'bg-nykaa',
      'Meesho': 'bg-meesho'
    };
    return colors[platformName] || 'bg-primary';
  };

  const getScoreColor = (score: number) => {
    if (score >= 85) return 'text-primary';
    if (score >= 70) return 'text-yellow-500';
    return 'text-destructive';
  };

  const sortedPlatforms = [...platforms].sort((a, b) => b.score - a.score);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Platform Comparison</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {sortedPlatforms.map((platform, index) => (
          <div key={platform.name} className="space-y-3 p-4 rounded-lg bg-card/50 border">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${getPlatformColor(platform.name)}`} />
                <h3 className="font-semibold">{platform.name}</h3>
                {index === 0 && (
                  <Badge variant="secondary" className="text-xs">
                    Best Score
                  </Badge>
                )}
              </div>
              <div className="flex items-center gap-3">
                <span className={`text-lg font-bold ${getScoreColor(platform.score)}`}>
                  {platform.score.toFixed(1)}
                </span>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => window.open(platform.url, '_blank')}
                  className="h-8 px-3"
                >
                  <ExternalLink className="w-3 h-3 mr-1" />
                  VIEW PRODUCT
                </Button>
              </div>
            </div>
            
            <Progress value={platform.score} className="h-2" />
            
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4 text-muted-foreground" />
                  <span>{platform.reviewCount.toLocaleString()} reviews</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span>{(platform.score / 20).toFixed(1)}/5</span>
                </div>
              </div>
              <div className="font-semibold text-primary">
                {platform.price}
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};