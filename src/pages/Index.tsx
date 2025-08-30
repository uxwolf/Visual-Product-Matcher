import React, { useState, useCallback, useEffect } from 'react';
import { Search, Sparkles, Zap, Brain } from 'lucide-react';
import { ImageUploader } from '@/components/ImageUploader';
import { ProductGrid } from '@/components/ProductGrid';
import { SimilarityFilter } from '@/components/SimilarityFilter';
import { sampleProducts, Product } from '@/data/sampleProducts';
import { findSimilarProducts, initializeModel, precomputeProductEmbeddings, testImageProcessing, createFallbackSimilarity } from '@/utils/similarityUtils';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';

interface ProductWithSimilarity extends Product {
  similarity: number;
}

const Index = () => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [similarProducts, setSimilarProducts] = useState<ProductWithSimilarity[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isModelLoading, setIsModelLoading] = useState(false);
  const [modelLoadError, setModelLoadError] = useState<string | null>(null);
  const [similarityThreshold, setSimilarityThreshold] = useState(0.3);
  const { toast } = useToast();

  // Initialize AI model and pre-compute embeddings on component mount
  useEffect(() => {
    const loadModel = async () => {
      setIsModelLoading(true);
      setModelLoadError(null);
      try {
        await initializeModel();
        
        // Test image processing to ensure everything works
        const testResult = await testImageProcessing();
        if (!testResult) {
          throw new Error('Image processing test failed. AI model may not be working correctly.');
        }
        
        // Pre-compute embeddings for all products
        await precomputeProductEmbeddings(sampleProducts);
        
        toast({
          title: "AI Model Ready",
          description: "Visual similarity engine is now active with pre-computed embeddings!",
        });
      } catch (error) {
        console.error('AI model initialization failed:', error);
        const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
        setModelLoadError(errorMessage);
        toast({
          title: "AI Model Failed to Load",
          description: "Using fallback mode. AI features are limited but the app will still work.",
          variant: "destructive",
        });
        // Don't return, let the app continue with fallback
      }
      setIsModelLoading(false);
    };

    loadModel();
  }, [toast]);

  const handleImageUpload = useCallback(async (imageUrl: string) => {
    setUploadedImage(imageUrl);
    setIsAnalyzing(true);

    try {
      // Try to use AI model first
      let results: ProductWithSimilarity[];
      
      try {
        results = await findSimilarProducts(imageUrl, sampleProducts, 0.1);
        
        // If no results found, lower the threshold
        if (results.length === 0) {
          console.log('No results found, lowering threshold...');
          results = await findSimilarProducts(imageUrl, sampleProducts, 0.05);
        }
        
        toast({
          title: "AI Analysis Complete",
          description: `Found ${results.length} similar products with AI-powered matching!`,
        });
      } catch (aiError) {
        console.warn('AI analysis failed, using fallback:', aiError);
        
        // Use fallback similarity
        results = createFallbackSimilarity(sampleProducts);
        
        toast({
          title: "Fallback Mode",
          description: `Found ${results.length} products using fallback matching. AI features are currently unavailable.`,
          variant: "default",
        });
      }
      
      setSimilarProducts(results);
      
    } catch (error) {
      console.error('All analysis methods failed:', error);
      
      // Provide more specific error messages
      let errorMessage = 'Unable to analyze image. Please try again.';
      if (error instanceof Error) {
        errorMessage = error.message;
        
        // Add helpful suggestions based on error type
        if (errorMessage.includes('CORS')) {
          errorMessage += ' Try uploading the image file directly instead of using a URL.';
        } else if (errorMessage.includes('network')) {
          errorMessage += ' Please check your internet connection.';
        } else if (errorMessage.includes('format')) {
          errorMessage += ' Please use JPEG, PNG, or WebP images.';
        } else if (errorMessage.includes('not accessible')) {
          errorMessage += ' Please check the image URL or upload the file directly.';
        }
      }
      
      toast({
        title: "Analysis Failed",
        description: errorMessage,
        variant: "destructive",
      });
      // Clear results on error
      setSimilarProducts([]);
    } finally {
      setIsAnalyzing(false);
    }
  }, [toast]);

  const handleTestImageProcessing = useCallback(async () => {
    try {
      const result = await testImageProcessing();
      if (result) {
        toast({
          title: "Test Successful",
          description: "Image processing is working correctly!",
        });
      } else {
        toast({
          title: "Test Failed",
          description: "Image processing test failed. Please check the console for details.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Test Error",
        description: error instanceof Error ? error.message : "Unknown test error",
        variant: "destructive",
      });
    }
  }, [toast]);

  const filteredProducts = similarProducts
    .filter(product => product.similarity >= similarityThreshold)
    .sort((a, b) => b.similarity - a.similarity); // Sort by similarity percentage (highest first)

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <header className="relative overflow-hidden bg-gradient-animated">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative container mx-auto px-4 py-16 text-center">
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-white/90 text-sm">
              <Brain className="w-4 h-4" />
              AI-Powered Visual Search
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-white">
              Visual Product
              <span className="block gradient-text">Matcher</span>
            </h1>
            
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Upload any image and discover visually similar products using advanced AI technology. 
              Find exactly what you're looking for with intelligent image matching.
            </p>
            
            <div className="flex items-center justify-center gap-4 text-white/60">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                <span className="text-sm">AI-Powered</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4" />
                <span className="text-sm">Real-time</span>
              </div>
              <div className="flex items-center gap-2">
                <Search className="w-4 h-4" />
                <span className="text-sm">Visual Search</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12 space-y-12">
        {/* Upload Section */}
        <section className="max-w-2xl mx-auto">
          {modelLoadError ? (
            <div className="text-center p-8 bg-warning/10 border border-warning/20 rounded-lg">
              <div className="mb-4">
                <Brain className="w-12 h-12 text-warning mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-warning mb-2">AI Model Failed to Load</h3>
                <p className="text-muted-foreground mb-4">
                  The AI model could not be initialized, but you can still use the app in fallback mode.
                </p>
                <div className="bg-background/50 p-4 rounded border text-sm text-muted-foreground mb-4">
                  <strong>Error:</strong> {modelLoadError}
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  The app will work with limited functionality. You can still upload images and get results.
                </p>
                <div className="flex gap-2 justify-center">
                  <Button 
                    onClick={() => window.location.reload()} 
                    variant="outline"
                    className="border-warning text-warning hover:bg-warning hover:text-warning-foreground"
                  >
                    Retry AI Model
                  </Button>
                  <Button 
                    onClick={handleTestImageProcessing}
                    variant="outline"
                    className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                  >
                    Test AI Processing
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <>
              <ImageUploader 
                onImageUpload={handleImageUpload}
                isLoading={isAnalyzing || isModelLoading}
              />
              
              {isModelLoading && (
                <div className="text-center mt-6 p-4 bg-primary/10 rounded-lg">
                  <div className="flex items-center justify-center gap-2 text-primary">
                    <Brain className="w-5 h-5 animate-pulse" />
                    <span>Loading AI model and pre-computing embeddings...</span>
                  </div>
                </div>
              )}
              
              {!isModelLoading && !modelLoadError && (
                <div className="text-center mt-6">
                  <Button 
                    onClick={handleTestImageProcessing}
                    variant="outline"
                    size="sm"
                    className="text-xs"
                  >
                    Test AI Processing
                  </Button>
                </div>
              )}
            </>
          )}
        </section>

        {/* Results Section */}
        {uploadedImage && (
          <section className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-2">Similar Products</h2>
              <p className="text-muted-foreground">
                {modelLoadError 
                  ? "Results using fallback matching (AI features unavailable)"
                  : "Discovered using enhanced visual similarity analysis with category weighting"
                }
              </p>
            </div>

            {/* Filter Controls */}
            <div className="max-w-md mx-auto">
              <SimilarityFilter
                threshold={similarityThreshold}
                onThresholdChange={setSimilarityThreshold}
                resultsCount={filteredProducts.length}
                totalCount={similarProducts.length}
              />
            </div>

            {/* Product Grid */}
            <ProductGrid 
              products={filteredProducts}
              isLoading={isAnalyzing}
            />
          </section>
        )}

        {/* Features Section */}
        {!uploadedImage && !modelLoadError && (
          <section className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">How It Works</h2>
              <p className="text-muted-foreground text-lg">
                Our enhanced AI analyzes visual features with category weighting to find the most similar products
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center space-y-4">
                <div className="mx-auto w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center">
                  <Search className="w-8 h-8 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold">Upload Image</h3>
                <p className="text-muted-foreground">
                  Drag & drop or paste a URL of any product image
                </p>
              </div>
              
              <div className="text-center space-y-4">
                <div className="mx-auto w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center">
                  <Brain className="w-8 h-8 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold">Enhanced AI Analysis</h3>
                <p className="text-muted-foreground">
                  Our CLIP model with category weighting analyzes visual features
                </p>
              </div>
              
              <div className="text-center space-y-4">
                <div className="mx-auto w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center">
                  <Sparkles className="w-8 h-8 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold">Smart Matching</h3>
                <p className="text-muted-foreground">
                  Get ranked results with improved accuracy and relevance
                </p>
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default Index;
