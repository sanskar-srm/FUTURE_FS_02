'use client';

import { useCart } from '@/context/cart-context';
import { formatPrice, cn } from '@/lib/utils'; // Imported cn utility
import { Separator } from '@/components/ui/separator';
import Image from 'next/image';

export function OrderSummary() {
  const { cart, cartTotal } = useCart();

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {cart.map((item) => (
          <div key={item.product.id} className="flex items-center gap-4">
            <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border">
              <Image
                src={item.product.image.imageUrl}
                alt={item.product.name}
                data-ai-hint={item.product.image.imageHint}
                fill
                sizes="64px"
                className="object-cover"
              />
               <div className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold">
                {item.quantity}
              </div>
            </div>
            <div className="flex-grow">
              <p className="font-semibold text-sm">{item.product.name}</p>
            </div>
            
            {/* FIXED: Added font-sans to item total */}
            <p className={cn("font-medium text-sm tabular-nums font-sans")}>
              {formatPrice(item.product.price * item.quantity)}
            </p>
          </div>
        ))}
      </div>
      <Separator />
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Subtotal</span>
          {/* FIXED: Added font-sans to subtotal */}
          <span className="font-sans">{formatPrice(cartTotal)}</span>
        </div>
         <div className="flex justify-between text-sm text-muted-foreground">
          <span>Shipping</span>
          <span>FREE</span>
        </div>
         <div className="flex justify-between text-sm text-muted-foreground">
          <span>Taxes</span>
          <span>Calculated at next step</span>
        </div>
      </div>
      <Separator />
      
      {/* FIXED: Removed 'font-headline' and added 'font-sans' for the symbol */}
      <div className="flex justify-between text-lg font-bold">
        <span>Total</span>
        <span className="font-sans">{formatPrice(cartTotal)}</span>
      </div>
    </div>
  );
}