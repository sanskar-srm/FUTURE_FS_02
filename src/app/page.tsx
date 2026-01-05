'use client';

import { useState, useMemo } from 'react';
import type { Product } from '@/lib/types';
import { products as allProducts, categories } from '@/lib/products';
import { ProductCard } from '@/components/products/product-card';
import { ProductFilters } from '@/components/products/product-filters';
import { Card, CardContent } from '@/components/ui/card';

export default function Home() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredProducts = useMemo(() => {
    return allProducts.filter((product) => {
      const matchesCategory =
        selectedCategory === 'all' || product.category === selectedCategory;
      const matchesSearch = product.name
        .toLowerCase()
        .includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [search, selectedCategory]);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <header className="text-center mb-12">
        <h1 className="text-5xl md:text-6xl font-headline font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
          Welcome to CommerceVerse
        </h1>
        <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          Discover a new universe of products, curated just for you. Explore, shop, and enjoy.
        </p>
      </header>

      <div className="mb-8">
        <ProductFilters
          categories={categories}
          search={search}
          onSearchChange={setSearch}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />
      </div>

      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="pt-6">
            <div className="text-center text-muted-foreground py-12">
              <h2 className="text-2xl font-headline font-semibold mb-2">No Products Found</h2>
              <p>Try adjusting your search or filter settings.</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
