import { ProductAnalyzer } from '@/components/ProductAnalyzer';
import { Badge } from '@/components/ui/badge';
import { Sparkles, ShoppingCart, Brain, BarChart3 } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/5 to-background" />
        <div className="relative container mx-auto px-4 py-16 lg:py-24">
          <div className="text-center space-y-8 max-w-4xl mx-auto">
            <Badge variant="secondary" className="inline-flex items-center gap-2 px-4 py-2">
              <Sparkles className="w-4 h-4" />
              AI-Powered Product Analysis
            </Badge>
            
            <h1 className="text-4xl lg:text-6xl font-bold bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent">
              Find the Best Products
              <br />
              Across All Platforms
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Leverage advanced AI to analyze thousands of customer reviews across Amazon, Flipkart, 
              Myntra, Nykaa, and Meesho. Get data-driven recommendations for your perfect purchase.
            </p>

            <div className="grid md:grid-cols-3 gap-8 mt-16">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <ShoppingCart className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-lg font-semibold">Multi-Platform Search</h3>
                <p className="text-sm text-muted-foreground">
                  Search across 5+ major e-commerce platforms simultaneously
                </p>
              </div>
              
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <Brain className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-lg font-semibold">AI Sentiment Analysis</h3>
                <p className="text-sm text-muted-foreground">
                  Advanced NLP models analyze customer sentiment and satisfaction
                </p>
              </div>
              
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <BarChart3 className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-lg font-semibold">Smart Recommendations</h3>
                <p className="text-sm text-muted-foreground">
                  Get personalized recommendations based on comprehensive analysis
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Application */}
      <div className="container mx-auto px-4 py-16">
        <ProductAnalyzer />
      </div>

      {/* Footer */}
      <footer className="border-t bg-card/50">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              <span className="font-semibold">Smart Shopping Assistant</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Powered by advanced AI models for intelligent product analysis
            </p>
            <div className="flex justify-center gap-6 text-xs text-muted-foreground">
              <span>Amazon</span>
              <span>•</span>
              <span>Flipkart</span>
              <span>•</span>
              <span>Myntra</span>
              <span>•</span>
              <span>Nykaa</span>
              <span>•</span>
              <span>Meesho</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;