'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { Product } from '@/lib/types';
import {
  Card,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/cart-context';
import { formatPrice, cn } from '@/lib/utils'; // Imported cn from your utils
import { ShoppingCart } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };

  return (
    <Card className="flex flex-col h-full overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <Link href={`/product/${product.id}`} className="flex flex-col h-full">
        <CardHeader className="p-0">
          <div className="relative aspect-[4/3] w-full">
            <Image
              src={product.image.imageUrl}
              alt={product.name}
              data-ai-hint={product.image.imageHint}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover"
            />
          </div>
        </CardHeader>
        
        <div className="p-4 flex flex-col flex-grow">
          <CardTitle className="font-headline text-lg mb-1 leading-tight hover:text-primary transition-colors">
            {product.name}
          </CardTitle>
          
          <p className="text-sm text-muted-foreground">
            {product.category}
          </p>
          
          <div className="flex-grow" />
          
          {/* FIX: Added 'font-sans' via the 'cn' utility. 
            This ensures the Rupee symbol (₹) uses a system font 
            instead of Space Grotesk, which lacks the correct glyph.
          */}
          <p className={cn("font-sans font-semibold text-lg mt-2")}>
            {formatPrice(product.price)}
          </p>
        </div>

        <CardFooter className="p-4 pt-0">
          <Button 
            onClick={handleAddToCart} 
            className="w-full bg-accent hover:bg-accent/90"
          >
            <ShoppingCart className="mr-2 h-4 w-4" /> 
            Add to cart
          </Button>
        </CardFooter>
      </Link>
    </Card>
  );
}