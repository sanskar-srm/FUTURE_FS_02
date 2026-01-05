'use client';

import { notFound } from 'next/navigation';
import { products } from '@/lib/products';
import Image from 'next/image';
import { useState } from 'react';
import { useCart } from '@/context/cart-context';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { formatPrice } from '@/lib/utils';
import { Minus, Plus, ShoppingCart } from 'lucide-react';
import { ProductRecommendations } from '@/components/products/product-recommendations';

export default function ProductPage({ params }: { params: { id: string } }) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const product = products.find((p) => p.id === params.id);

  if (!product) {
    notFound();
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setQuantity(1);
  };
  
  const increaseQuantity = () => setQuantity(prev => prev + 1);
  const decreaseQuantity = () => setQuantity(prev => Math.max(1, prev - 1));

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
        <div className="bg-card p-4 rounded-lg shadow-sm">
          <div className="relative aspect-square w-full overflow-hidden rounded-md">
            <Image
              src={product.image.imageUrl}
              alt={product.name}
              data-ai-hint={product.image.imageHint}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>

        <div className="flex flex-col justify-center">
          <div>
            <p className="text-sm font-medium text-primary">{product.category}</p>
            <h1 className="text-3xl lg:text-4xl font-headline font-bold mt-1">
              {product.name}
            </h1>
            <p className="text-3xl font-semibold text-accent mt-4">{formatPrice(product.price)}</p>
          </div>
          <Separator className="my-6" />
          <p className="text-muted-foreground leading-relaxed">{product.description}</p>
          <Separator className="my-6" />
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" onClick={decreaseQuantity}><Minus className="h-4 w-4" /></Button>
              <span className="text-lg font-bold w-10 text-center">{quantity}</span>
              <Button variant="outline" size="icon" onClick={increaseQuantity}><Plus className="h-4 w-4" /></Button>
            </div>
            <Button size="lg" className="flex-grow bg-accent hover:bg-accent/90" onClick={handleAddToCart}>
                <ShoppingCart className="mr-2"/>
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
      <div className="mt-16 md:mt-24">
        <ProductRecommendations currentProductId={product.id} />
      </div>
    </div>
  );
}
