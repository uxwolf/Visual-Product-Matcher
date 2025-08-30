import React from 'react';
import { Product } from '@/data/sampleProducts';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, Zap } from 'lucide-react';

interface ProductWithSimilarity extends Product {
  similarity: number;
}

interface ProductGridProps {
  products: ProductWithSimilarity[];
  isLoading?: boolean;
}

export const ProductGrid: React.FC<ProductGridProps> = ({ 
  products, 
  isLoading = false 
}) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, index) => (
          <Card key={index} className="overflow-hidden animate-pulse">
            <div className="aspect-square bg-muted" />
            <div className="p-4 space-y-2">
              <div className="h-4 bg-muted rounded" />
              <div className="h-3 bg-muted rounded w-2/3" />
              <div className="h-3 bg-muted rounded w-1/2" />
            </div>
          </Card>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <Card className="p-12 text-center glass">
        <div className="mx-auto w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mb-4 opacity-50">
          <Zap className="w-8 h-8 text-primary-foreground" />
        </div>
        <h3 className="text-xl font-semibold mb-2">No Similar Products Found</h3>
        <p className="text-muted-foreground">
          Try uploading a different image or adjusting the similarity threshold.
        </p>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product, index) => (
        <Card 
          key={product.id} 
          className="group overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-[1.02] glass"
          style={{ 
            animationDelay: `${index * 100}ms`,
            animation: 'float 3s ease-in-out infinite'
          }}
        >
          <div className="relative overflow-hidden">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full aspect-square object-cover transition-transform duration-300 group-hover:scale-110"
              loading="lazy"
            />
            <div className="absolute top-2 right-2 flex gap-1">
              <Badge 
                variant="secondary" 
                className="bg-background/80 backdrop-blur-sm text-xs font-medium"
              >
                {(product.similarity * 100).toFixed(0)}%
              </Badge>
              {product.similarity > 0.8 && (
                <Badge 
                  variant="default" 
                  className="bg-gradient-primary text-primary-foreground text-xs"
                >
                  <Star className="w-3 h-3 mr-1" />
                  Match
                </Badge>
              )}
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
          
          <div className="p-4 space-y-2">
            <div className="flex items-start justify-between">
              <h3 className="font-semibold text-sm leading-tight line-clamp-2 group-hover:text-primary transition-colors duration-200">
                {product.name}
              </h3>
            </div>
            
            <div className="flex items-center justify-between">
              <Badge variant="outline" className="text-xs">
                {product.category}
              </Badge>
              {product.price && (
                <span className="font-bold text-primary">
                  {product.price}
                </span>
              )}
            </div>
            
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>Similarity</span>
              <div className="flex items-center gap-1">
                <div className="w-16 h-1.5 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-primary transition-all duration-500 ease-out"
                    style={{ width: `${product.similarity * 100}%` }}
                  />
                </div>
                <span className="font-medium">
                  {(product.similarity * 100).toFixed(0)}%
                </span>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};