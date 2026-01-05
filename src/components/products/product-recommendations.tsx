'use client';

import { useEffect, useState } from 'react';
import { getProductRecommendations } from '@/ai/flows/smart-product-recommendations';
import { products as allProducts } from '@/lib/products';
import type { Product } from '@/lib/types';
import { ProductCard } from './product-card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Skeleton } from '@/components/ui/skeleton';

const VIEWING_HISTORY_KEY = 'commerceverse_viewing_history';
const MAX_HISTORY_LENGTH = 10;

interface ProductRecommendationsProps {
  currentProductId: string;
}

export function ProductRecommendations({ currentProductId }: ProductRecommendationsProps) {
  const [recommendations, setRecommendations] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchRecommendations() {
      setIsLoading(true);
      try {
        // Manage viewing history
        let history: string[] = JSON.parse(localStorage.getItem(VIEWING_HISTORY_KEY) || '[]');
        
        // Add current product, avoid duplicates, and trim history
        history = [currentProductId, ...history.filter(id => id !== currentProductId)];
        if (history.length > MAX_HISTORY_LENGTH) {
          history = history.slice(0, MAX_HISTORY_LENGTH);
        }
        localStorage.setItem(VIEWING_HISTORY_KEY, JSON.stringify(history));

        // Get recommendations from AI
        const result = await getProductRecommendations({
          viewingHistory: history,
          currentProductId,
        });

        // Filter out the current product and map IDs to full product objects
        const recommendedProducts = result.recommendedProducts
          .filter(id => id !== currentProductId)
          .map(id => allProducts.find(p => p.id === id))
          .filter((p): p is Product => p !== undefined);

        setRecommendations(recommendedProducts);
      } catch (error) {
        console.error('Failed to get product recommendations:', error);
        setRecommendations([]);
      } finally {
        setIsLoading(false);
      }
    }

    fetchRecommendations();
  }, [currentProductId]);

  if (isLoading) {
    return (
      <div>
        <h2 className="text-3xl font-headline font-bold mb-6">You might also like</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
                <div key={i} className="flex flex-col space-y-3">
                    <Skeleton className="h-[225px] w-full rounded-xl" />
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-[250px]" />
                        <Skeleton className="h-4 w-[200px]" />
                    </div>
                </div>
            ))}
        </div>
      </div>
    );
  }

  if (recommendations.length === 0) {
    return null; // Don't show the section if there are no recommendations
  }

  return (
    <div>
      <h2 className="text-3xl font-headline font-bold mb-6">You might also like</h2>
      <Carousel
        opts={{
          align: 'start',
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent>
          {recommendations.map((product) => (
            <CarouselItem key={product.id} className="sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
              <div className="p-1 h-full">
                <ProductCard product={product} />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
