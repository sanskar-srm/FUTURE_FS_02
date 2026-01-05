'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/cart-context';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

const formSchema = z.discriminatedUnion('paymentMethod', [
  z.object({
    paymentMethod: z.literal('card'),
    fullName: z.string().min(2, { message: 'Full name must be at least 2 characters.' }),
    email: z.string().email({ message: 'Please enter a valid email address.' }),
    address: z.string().min(5, { message: 'Address must be at least 5 characters.' }),
    city: z.string().min(2, { message: 'City must be at least 2 characters.' }),
    zipCode: z.string().regex(/^\d{6}$/, { message: 'Please enter a valid 6-digit PIN code.' }),
    cardName: z.string().min(2, { message: 'Name on card is required.'}),
    cardNumber: z.string().regex(/^\d{16}$/, { message: 'Card number must be 16 digits.' }),
    cardExpiry: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, { message: 'Use MM/YY format.' }),
    cardCvc: z.string().regex(/^\d{3,4}$/, { message: 'CVC must be 3 or 4 digits.' }),
  }),
  z.object({
    paymentMethod: z.literal('cod'),
    fullName: z.string().min(2, { message: 'Full name must be at least 2 characters.' }),
    email: z.string().email({ message: 'Please enter a valid email address.' }),
    address: z.string().min(5, { message: 'Address must be at least 5 characters.' }),
    city: z.string().min(2, { message: 'City must be at least 2 characters.' }),
    zipCode: z.string().regex(/^\d{6}$/, { message: 'Please enter a valid 6-digit PIN code.' }),
    cardName: z.string().optional(),
    cardNumber: z.string().optional(),
    cardExpiry: z.string().optional(),
    cardCvc: z.string().optional(),
  }),
]);

export function CheckoutForm() {
  const router = useRouter();
  const { clearCart } = useCart();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      paymentMethod: 'card',
      fullName: '',
      email: '',
      address: '',
      city: '',
      zipCode: '',
      cardName: '',
      cardNumber: '',
      cardExpiry: '',
      cardCvc: '',
    },
  });

  const paymentMethod = form.watch('paymentMethod');

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log('Simulating order placement with values:', values);
    
    toast({
      title: "Order Placed!",
      description: "Thank you for your purchase. Your order is on its way.",
    });

    clearCart();
    router.push('/');
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="space-y-4">
            <h3 className="text-lg font-medium font-headline">Shipping Information</h3>
            <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                    <Input placeholder="Riya Sharma" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                    <Input placeholder="you@example.com" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl>
                    <Input placeholder="123 MG Road" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            <div className="grid grid-cols-2 gap-4">
                <FormField control={form.control} name="city" render={({ field }) => (
                    <FormItem>
                        <FormLabel>City</FormLabel>
                        <FormControl><Input placeholder="Mumbai" {...field} /></FormControl>
                        <FormMessage />
                    </FormItem>
                )}/>
                <FormField control={form.control} name="zipCode" render={({ field }) => (
                    <FormItem>
                        <FormLabel>PIN Code</FormLabel>
                        <FormControl><Input placeholder="400001" {...field} /></FormControl>
                        <FormMessage />
                    </FormItem>
                )}/>
            </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium font-headline">Payment Method</h3>
           <FormField
            control={form.control}
            name="paymentMethod"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="card" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        Credit/Debit Card
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="cod" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        Cash on Delivery
                      </FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {paymentMethod === 'card' && (
          <div className="space-y-4">
              <h3 className="text-lg font-medium font-headline">Payment Details (Simulation)</h3>
              <FormField control={form.control} name="cardName" render={({ field }) => (
                  <FormItem>
                      <FormLabel>Name on Card</FormLabel>
                      <FormControl><Input placeholder="Riya S. Sharma" {...field} /></FormControl>
                      <FormMessage />
                  </FormItem>
              )}/>
              <FormField control={form.control} name="cardNumber" render={({ field }) => (
                  <FormItem>
                      <FormLabel>Card Number</FormLabel>
                      <FormControl><Input placeholder="1111222233334444" {...field} /></FormControl>
                      <FormMessage />
                  </FormItem>
              )}/>
              <div className="grid grid-cols-2 gap-4">
                  <FormField control={form.control} name="cardExpiry" render={({ field }) => (
                      <FormItem>
                          <FormLabel>Expiry (MM/YY)</FormLabel>
                          <FormControl><Input placeholder="08/28" {...field} /></FormControl>
                          <FormMessage />
                      </FormItem>
                  )}/>
                  <FormField control={form.control} name="cardCvc" render={({ field }) => (
                      <FormItem>
                          <FormLabel>CVC</FormLabel>
                          <FormControl><Input placeholder="123" {...field} /></FormControl>
                          <FormMessage />
                      </FormItem>
                  )}/>
              </div>
          </div>
        )}
        
        <Button type="submit" className="w-full bg-primary hover:bg-primary/90" size="lg">Place Order</Button>
      </form>
    </Form>
  );
}
