import React from 'react';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Filter, TrendingUp } from 'lucide-react';

interface SimilarityFilterProps {
  threshold: number;
  onThresholdChange: (value: number) => void;
  resultsCount: number;
  totalCount: number;
}

export const SimilarityFilter: React.FC<SimilarityFilterProps> = ({
  threshold,
  onThresholdChange,
  resultsCount,
  totalCount
}) => {
  const getThresholdLabel = (value: number): string => {
    if (value >= 0.8) return 'Very High';
    if (value >= 0.6) return 'High';
    if (value >= 0.4) return 'Medium';
    if (value >= 0.2) return 'Low';
    return 'Any';
  };

  const getThresholdColor = (value: number): string => {
    if (value >= 0.8) return 'bg-success';
    if (value >= 0.6) return 'bg-primary';
    if (value >= 0.4) return 'bg-warning';
    return 'bg-muted-foreground';
  };

  return (
    <Card className="glass">
      <div className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-primary" />
            <Label className="text-base font-semibold">Similarity Filter</Label>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-xs">
              {resultsCount} / {totalCount} products
            </Badge>
            <Badge 
              className={`text-xs text-white ${getThresholdColor(threshold)}`}
            >
              {getThresholdLabel(threshold)}
            </Badge>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Minimum similarity</span>
            <span className="font-medium text-primary">
              {(threshold * 100).toFixed(0)}%
            </span>
          </div>
          
          <div className="relative">
            <Slider
              value={[threshold]}
              onValueChange={(value) => onThresholdChange(value[0])}
              max={1}
              min={0}
              step={0.05}
              className="relative"
            />
            
            {/* Visual threshold markers */}
            <div className="flex justify-between text-xs text-muted-foreground mt-2">
              <span>0%</span>
              <span>25%</span>
              <span>50%</span>
              <span>75%</span>
              <span>100%</span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <TrendingUp className="w-3 h-3" />
            <span>
              Higher values show only the most similar products
            </span>
          </div>
        </div>

        {/* Results summary */}
        <div className="border-t pt-4">
          <div className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground">Showing results</span>
            <div className="flex items-center gap-2">
              <div className="w-12 h-1.5 bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-primary transition-all duration-500"
                  style={{ width: `${totalCount > 0 ? (resultsCount / totalCount) * 100 : 0}%` }}
                />
              </div>
              <span className="font-medium">
                {totalCount > 0 ? ((resultsCount / totalCount) * 100).toFixed(0) : 0}%
              </span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};