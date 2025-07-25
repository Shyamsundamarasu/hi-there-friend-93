import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

interface SentimentChartProps {
  data: {
    productName: string;
    overallScore: number;
    sentiment: 'positive' | 'negative' | 'neutral';
  };
}

export const SentimentChart = ({ data }: SentimentChartProps) => {
  const positive = data.overallScore;
  const neutral = Math.min(20, 100 - positive);
  const negative = 100 - positive - neutral;

  const chartData = {
    labels: ['Positive', 'Neutral', 'Negative'],
    datasets: [
      {
        data: [positive, neutral, negative],
        backgroundColor: [
          'hsl(142 76% 36%)',
          'hsl(45 93% 47%)', 
          'hsl(0 62.8% 30.6%)'
        ],
        borderColor: [
          'hsl(142 76% 36%)',
          'hsl(45 93% 47%)',
          'hsl(0 62.8% 30.6%)'
        ],
        borderWidth: 2
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          color: 'hsl(0 0% 98%)',
          padding: 20,
          font: {
            size: 12
          }
        }
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            return `${context.label}: ${context.parsed.toFixed(1)}%`;
          }
        }
      }
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Sentiment Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <Doughnut data={chartData} options={options} />
        </div>
        <div className="mt-4 grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-primary">{positive.toFixed(1)}%</div>
            <div className="text-sm text-muted-foreground">Positive</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-yellow-500">{neutral.toFixed(1)}%</div>
            <div className="text-sm text-muted-foreground">Neutral</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-destructive">{negative.toFixed(1)}%</div>
            <div className="text-sm text-muted-foreground">Negative</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};