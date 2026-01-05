'use server';

/**
 * @fileOverview Provides smart product recommendations based on viewing history.
 *
 * - getProductRecommendations - A function that returns product recommendations based on viewing history.
 * - ProductRecommendationsInput - The input type for the getProductRecommendations function.
 * - ProductRecommendationsOutput - The return type for the getProductRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ProductRecommendationsInputSchema = z.object({
  viewingHistory: z
    .array(z.string())
    .describe('An array of product IDs representing the user viewing history.'),
  currentProductId: z
    .string()
    .optional()
    .describe('The ID of the product currently being viewed, if any.'),
});
export type ProductRecommendationsInput = z.infer<typeof ProductRecommendationsInputSchema>;

const ProductRecommendationsOutputSchema = z.object({
  recommendedProducts: z
    .array(z.string())
    .describe('An array of product IDs recommended to the user.'),
});
export type ProductRecommendationsOutput = z.infer<typeof ProductRecommendationsOutputSchema>;

export async function getProductRecommendations(input: ProductRecommendationsInput): Promise<ProductRecommendationsOutput> {
  return productRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'productRecommendationsPrompt',
  input: {schema: ProductRecommendationsInputSchema},
  output: {schema: ProductRecommendationsOutputSchema},
  prompt: `You are an expert e-commerce product recommendation engine.

Based on the user's viewing history, recommend related products.

Viewing History: {{#each viewingHistory}}{{{this}}}, {{/each}}
{{#if currentProductId}}Currently Viewing: {{{currentProductId}}}{{/if}}

Return a list of product IDs in the recommendedProducts array that the user might be interested in.`,
});

const productRecommendationsFlow = ai.defineFlow(
  {
    name: 'productRecommendationsFlow',
    inputSchema: ProductRecommendationsInputSchema,
    outputSchema: ProductRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
