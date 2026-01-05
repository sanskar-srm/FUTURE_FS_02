'use client';

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/context/cart-context';
import { ShoppingBag, Frown } from 'lucide-react';
import { CartItemCard } from './cart-item';
import { formatPrice, cn } from '@/lib/utils'; // Imported cn utility
import Link from 'next/link';

export function CartSheet() {
  const { cart, itemCount, cartTotal } = useCart();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <ShoppingBag className="h-6 w-6" />
          {itemCount > 0 && (
            <Badge
              variant="default"
              className="absolute -top-2 -right-2 h-6 w-6 justify-center rounded-full bg-accent text-accent-foreground p-0"
            >
              {itemCount}
            </Badge>
          )}
          <span className="sr-only">Open cart</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col">
        <SheetHeader>
          <SheetTitle>Your Cart</SheetTitle>
        </SheetHeader>
        {itemCount > 0 ? (
          <>
            <ScrollArea className="flex-grow pr-4 -mr-6">
              <div className="flex flex-col gap-4 py-4">
                {cart.map((item) => (
                  <CartItemCard key={item.product.id} item={item} />
                ))}
              </div>
            </ScrollArea>
            <SheetFooter className="mt-auto">
              <div className="w-full space-y-4">
                <Separator />
                <div className="flex justify-between items-center font-semibold">
                  <span>Subtotal</span>
                  {/* FIXED: Wrapped in cn with font-sans to fix the Rupee symbol */}
                  <span className={cn("font-sans")}>
                    {formatPrice(cartTotal)}
                  </span>
                </div>
                <SheetClose asChild>
                  <Button asChild className="w-full" size="lg">
                    <Link href="/checkout">Proceed to Checkout</Link>
                  </Button>
                </SheetClose>
              </div>
            </SheetFooter>
          </>
        ) : (
          <div className="flex-grow flex flex-col items-center justify-center text-center">
            <Frown className="w-16 h-16 text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold font-headline">Your cart is empty</h3>
            <p className="text-muted-foreground mt-2">Add some products to get started.</p>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}