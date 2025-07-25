import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { ExternalLink, Crown, TrendingUp } from 'lucide-react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface Platform {
  name: string;
  score: number;
  reviewCount: number;
  price: string;
  url: string;
}

interface ProductComparisonProps {
  platforms: Platform[];
}

export const ProductComparison = ({ platforms }: ProductComparisonProps) => {
  const bestPlatform = platforms.reduce((best, current) => 
    current.score > best.score ? current : best
  );

  const chartData = {
    labels: platforms.map(p => p.name),
    datasets: [
      {
        label: 'Sentiment Score',
        data: platforms.map(p => p.score),
        backgroundColor: [
          'hsl(35 100% 50%)',   // Amazon
          'hsl(214 100% 50%)',  // Flipkart
          'hsl(324 89% 54%)',   // Myntra
          'hsl(345 83% 61%)',   // Nykaa
          'hsl(25 95% 53%)'     // Meesho
        ].slice(0, platforms.length),
        borderColor: [
          'hsl(35 100% 50%)',
          'hsl(214 100% 50%)',
          'hsl(324 89% 54%)',
          'hsl(345 83% 61%)',
          'hsl(25 95% 53%)'
        ].slice(0, platforms.length),
        borderWidth: 2,
        borderRadius: 4,
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const platform = platforms[context.dataIndex];
            return [
              `Score: ${context.parsed.y.toFixed(1)}%`,
              `Reviews: ${platform.reviewCount.toLocaleString()}`,
              `Price: ${platform.price}`
            ];
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        grid: {
          color: 'hsl(240 3.7% 15.9%)'
        },
        ticks: {
          color: 'hsl(240 5% 64.9%)',
          callback: (value: any) => `${value}%`
        }
      },
      x: {
        grid: {
          display: false
        },
        ticks: {
          color: 'hsl(240 5% 64.9%)'
        }
      }
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Performance Comparison
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <Bar data={chartData} options={options} />
          </div>
        </CardContent>
      </Card>

      <Card className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10" />
        <CardHeader className="relative">
          <CardTitle className="flex items-center gap-2">
            <Crown className="w-5 h-5 text-yellow-500" />
            Recommended Choice
          </CardTitle>
        </CardHeader>
        <CardContent className="relative">
          <div className="flex items-center justify-between p-6 bg-card/50 rounded-lg border-2 border-primary/20">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <h3 className="text-2xl font-bold">{bestPlatform.name}</h3>
                <Badge className="bg-primary">
                  Highest Score: {bestPlatform.score.toFixed(1)}%
                </Badge>
              </div>
              <div className="flex items-center gap-4 text-muted-foreground">
                <span>{bestPlatform.reviewCount.toLocaleString()} reviews analyzed</span>
                <span>•</span>
                <span className="text-2xl font-bold text-primary">{bestPlatform.price}</span>
              </div>
              <p className="text-sm text-muted-foreground max-w-md">
                This platform has the highest customer satisfaction score based on sentiment analysis 
                of reviews, making it the recommended choice for this product.
              </p>
            </div>
            <Button className="h-12 px-8 bg-gradient-to-r from-primary to-primary/80">
              <ExternalLink className="w-4 h-4 mr-2" />
              View Product
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Quick Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-card/50 rounded-lg">
              <div className="text-2xl font-bold text-primary">
                {platforms.length}
              </div>
              <div className="text-sm text-muted-foreground">Platforms Analyzed</div>
            </div>
            <div className="text-center p-4 bg-card/50 rounded-lg">
              <div className="text-2xl font-bold text-primary">
                {platforms.reduce((sum, p) => sum + p.reviewCount, 0).toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground">Total Reviews</div>
            </div>
            <div className="text-center p-4 bg-card/50 rounded-lg">
              <div className="text-2xl font-bold text-primary">
                {(platforms.reduce((sum, p) => sum + p.score, 0) / platforms.length).toFixed(1)}%
              </div>
              <div className="text-sm text-muted-foreground">Average Score</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};