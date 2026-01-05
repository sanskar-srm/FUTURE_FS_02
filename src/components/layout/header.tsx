import Link from 'next/link';
import { ShoppingBag } from 'lucide-react';
import { CartSheet } from '@/components/cart/cart-sheet';

export function Header() {
  return (
    <header className="bg-card/80 backdrop-blur-sm sticky top-0 z-40 border-b">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <div className="flex items-center">
          <Link href="/" className="flex items-center gap-2">
            <ShoppingBag className="h-7 w-7 text-primary" />
            <span className="text-xl font-headline font-bold text-foreground">
              CommerceVerse
            </span>
          </Link>
        </div>
        <div className="flex items-center">
          <CartSheet />
        </div>
      </div>
    </header>
  );
}
