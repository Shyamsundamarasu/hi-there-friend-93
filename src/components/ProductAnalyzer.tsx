import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Upload, Search, Link, Sparkles, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { ProductComparison } from './ProductComparison';
import { SentimentChart } from './SentimentChart';
import { PlatformAnalysis } from './PlatformAnalysis';

interface AnalysisResult {
  productName: string;
  overallScore: number;
  sentiment: 'positive' | 'negative' | 'neutral';
  recommendation: 'Best Choice' | 'Mixed Reviews' | 'Not Recommended';
  platforms: Array<{
    name: string;
    score: number;
    reviewCount: number;
    price: string;
    url: string;
  }>;
  summary: string;
}

export const ProductAnalyzer = () => {
  const [productInput, setProductInput] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [progress, setProgress] = useState(0);
  const { toast } = useToast();

  const mockAnalysis = async (input: string): Promise<AnalysisResult> => {
    // Simulate AI analysis with realistic delays
    const steps = [
      'Analyzing product input...',
      'Searching across platforms...',
      'Fetching reviews from Amazon...',
      'Fetching reviews from Flipkart...',
      'Fetching reviews from Myntra...',
      'Fetching reviews from Nykaa...',
      'Running sentiment analysis...',
      'Comparing products...',
      'Generating recommendation...'
    ];

    for (let i = 0; i < steps.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 500));
      setProgress((i + 1) / steps.length * 100);
      toast({
        title: steps[i],
        duration: 1000,
      });
    }

    // Generate mock data based on input
    const products = ['iPhone 15', 'Samsung Galaxy S24', 'Wireless Earbuds', 'Laptop', 'Dress'];
    const detectedProduct = products.find(p => input.toLowerCase().includes(p.toLowerCase())) || input;
    
    const overallScore = Math.random() * 40 + 60; // 60-100 range
    const sentiment = overallScore > 80 ? 'positive' : overallScore > 60 ? 'neutral' : 'negative';
    const recommendation = overallScore > 85 ? 'Best Choice' : overallScore > 65 ? 'Mixed Reviews' : 'Not Recommended';

    return {
      productName: detectedProduct,
      overallScore,
      sentiment,
      recommendation,
      platforms: [
        {
          name: 'Amazon',
          score: Math.random() * 30 + 70,
          reviewCount: Math.floor(Math.random() * 5000) + 1000,
          price: '₹' + (Math.random() * 50000 + 10000).toFixed(0),
          url: '#'
        },
        {
          name: 'Flipkart',
          score: Math.random() * 30 + 70,
          reviewCount: Math.floor(Math.random() * 3000) + 500,
          price: '₹' + (Math.random() * 50000 + 10000).toFixed(0),
          url: '#'
        },
        {
          name: 'Myntra',
          score: Math.random() * 30 + 70,
          reviewCount: Math.floor(Math.random() * 2000) + 200,
          price: '₹' + (Math.random() * 50000 + 10000).toFixed(0),
          url: '#'
        },
        {
          name: 'Nykaa',
          score: Math.random() * 30 + 70,
          reviewCount: Math.floor(Math.random() * 1500) + 100,
          price: '₹' + (Math.random() * 50000 + 10000).toFixed(0),
          url: '#'
        }
      ],
      summary: `Based on comprehensive analysis of ${Math.floor(Math.random() * 10000) + 5000} reviews across multiple platforms, this product shows ${sentiment} sentiment with strong performance in quality and value categories.`
    };
  };

  const handleAnalyze = async () => {
    if (!productInput.trim() && !selectedFile) {
      toast({
        title: 'Please provide product input',
        description: 'Enter a product name, URL, or upload an image',
        variant: 'destructive'
      });
      return;
    }

    setIsAnalyzing(true);
    setProgress(0);
    
    try {
      const input = selectedFile ? selectedFile.name : productInput;
      const result = await mockAnalysis(input);
      setAnalysisResult(result);
      
      toast({
        title: 'Analysis Complete!',
        description: `Found ${result.recommendation.toLowerCase()} product across platforms`,
      });
    } catch (error) {
      toast({
        title: 'Analysis Failed',
        description: 'Please try again with different input',
        variant: 'destructive'
      });
    } finally {
      setIsAnalyzing(false);
      setProgress(0);
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setProductInput('');
    }
  };

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return <TrendingUp className="w-5 h-5 text-primary" />;
      case 'negative': return <TrendingDown className="w-5 h-5 text-destructive" />;
      default: return <Minus className="w-5 h-5 text-muted-foreground" />;
    }
  };

  const getRecommendationColor = (recommendation: string) => {
    switch (recommendation) {
      case 'Best Choice': return 'bg-primary';
      case 'Mixed Reviews': return 'bg-yellow-500';
      case 'Not Recommended': return 'bg-destructive';
      default: return 'bg-muted';
    }
  };

  return (
    <div className="space-y-8">
      <Card className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5" />
        <CardHeader className="relative">
          <CardTitle className="flex items-center gap-2 text-2xl">
            <Sparkles className="w-6 h-6 text-primary" />
            AI Product Analyzer
          </CardTitle>
        </CardHeader>
        <CardContent className="relative space-y-6">
          <Tabs defaultValue="text" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="text" className="flex items-center gap-2">
                <Search className="w-4 h-4" />
                Product Name
              </TabsTrigger>
              <TabsTrigger value="image" className="flex items-center gap-2">
                <Upload className="w-4 h-4" />
                Upload Image
              </TabsTrigger>
              <TabsTrigger value="url" className="flex items-center gap-2">
                <Link className="w-4 h-4" />
                Product URL
              </TabsTrigger>
            </TabsList>

            <TabsContent value="text" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="product-name">Enter Product Name</Label>
                <Input
                  id="product-name"
                  placeholder="e.g., iPhone 15, Samsung Galaxy S24, Wireless Earbuds..."
                  value={productInput}
                  onChange={(e) => setProductInput(e.target.value)}
                  className="h-12"
                />
              </div>
            </TabsContent>

            <TabsContent value="image" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="product-image">Upload Product Image</Label>
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center hover:border-primary/50 transition-colors">
                  <input
                    id="product-image"
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                  <label htmlFor="product-image" className="cursor-pointer">
                    <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">
                      {selectedFile ? selectedFile.name : 'Click to upload product image'}
                    </p>
                  </label>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="url" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="product-url">Product URL</Label>
                <Input
                  id="product-url"
                  placeholder="https://amazon.in/product-link or https://flipkart.com/product-link"
                  value={productInput}
                  onChange={(e) => setProductInput(e.target.value)}
                  className="h-12"
                />
              </div>
            </TabsContent>
          </Tabs>

          {isAnalyzing && (
            <div className="space-y-4">
              <Progress value={progress} className="w-full" />
              <p className="text-sm text-muted-foreground text-center">
                Analyzing reviews across platforms...
              </p>
            </div>
          )}

          <Button 
            onClick={handleAnalyze} 
            disabled={isAnalyzing}
            className="w-full h-12 text-lg font-semibold bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
          >
            {isAnalyzing ? 'Analyzing...' : 'Analyze Product'}
          </Button>
        </CardContent>
      </Card>

      {analysisResult && (
        <div className="space-y-6">
          <Card className="relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10" />
            <CardHeader className="relative">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl">{analysisResult.productName}</CardTitle>
                <div className="flex items-center gap-2">
                  {getSentimentIcon(analysisResult.sentiment)}
                  <Badge className={getRecommendationColor(analysisResult.recommendation)}>
                    {analysisResult.recommendation}
                  </Badge>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-3xl font-bold text-primary">
                  {analysisResult.overallScore.toFixed(1)}%
                </div>
                <div className="text-sm text-muted-foreground">
                  Overall Satisfaction Score
                </div>
              </div>
            </CardHeader>
            <CardContent className="relative">
              <p className="text-muted-foreground">{analysisResult.summary}</p>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-6">
            <SentimentChart data={analysisResult} />
            <PlatformAnalysis platforms={analysisResult.platforms} />
          </div>

          <ProductComparison platforms={analysisResult.platforms} />
        </div>
      )}
    </div>
  );
};