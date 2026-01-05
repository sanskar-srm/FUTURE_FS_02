'use client';

import { useCart } from '@/context/cart-context';
import { CheckoutForm } from '@/components/checkout/checkout-form';
import { OrderSummary } from '@/components/checkout/order-summary';
import { Card, CardContent } from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function CheckoutPage() {
  const { itemCount } = useCart();
  const router = useRouter();

  useEffect(() => {
    // Redirect to home if cart is empty
    if (itemCount === 0) {
      router.replace('/');
    }
  }, [itemCount, router]);

  // Don't render anything if cart is empty to avoid flash of content before redirect
  if (itemCount === 0) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-headline font-bold">Checkout</h1>
        <p className="mt-3 text-lg text-muted-foreground">
          Complete your purchase by filling out the form below.
        </p>
      </div>

      <div className="grid md:grid-cols-5 gap-8 lg:gap-12">
        <div className="md:col-span-3">
            <h2 className="text-2xl font-headline font-semibold mb-4">Shipping & Payment</h2>
            <Card>
                <CardContent className="p-6">
                    <CheckoutForm />
                </CardContent>
            </Card>
        </div>
        <div className="md:col-span-2">
            <h2 className="text-2xl font-headline font-semibold mb-4">Order Summary</h2>
            <Card className="sticky top-24">
                <CardContent className="p-6">
                    <OrderSummary />
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
