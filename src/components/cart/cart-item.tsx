'use client';

import Image from 'next/image';
import { useCart } from '@/context/cart-context';
import type { CartItem } from '@/lib/types';
import { formatPrice, cn } from '@/lib/utils'; // Imported cn here
import { Button } from '@/components/ui/button';
import { Minus, Plus, Trash2 } from 'lucide-react';
import Link from 'next/link';

interface CartItemProps {
  item: CartItem;
}

export function CartItemCard({ item }: CartItemProps) {
  const { updateQuantity, removeFromCart } = useCart();

  return (
    <div className="flex items-start gap-4">
      <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border">
        <Image
          src={item.product.image.imageUrl}
          alt={item.product.name}
          data-ai-hint={item.product.image.imageHint}
          fill
          sizes="96px"
          className="object-cover"
        />
      </div>
      <div className="flex-grow">
        <Link href={`/product/${item.product.id}`} className="hover:underline">
          <h3 className="font-semibold text-sm leading-tight">{item.product.name}</h3>
        </Link>
        
        {/* FIXED: Added font-sans to fix the Rupee symbol display */}
        <p className={cn("text-sm text-muted-foreground font-sans")}>
          {formatPrice(item.product.price)}
        </p>

        <div className="mt-2 flex items-center justify-between">
           <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="icon"
              className="h-7 w-7"
              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
            >
              <Minus className="h-3 w-3" />
              <span className="sr-only">Decrease quantity</span>
            </Button>
            <span className="w-8 text-center text-sm font-medium tabular-nums">
              {item.quantity}
            </span>
            <Button
              variant="outline"
              size="icon"
              className="h-7 w-7"
              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
            >
              <Plus className="h-3 w-3" />
              <span className="sr-only">Increase quantity</span>
            </Button>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted-foreground hover:text-destructive"
            onClick={() => removeFromCart(item.product.id)}
          >
            <Trash2 className="h-4 w-4" />
            <span className="sr-only">Remove item</span>
          </Button>
        </div>
      </div>
    </div>
  );
}