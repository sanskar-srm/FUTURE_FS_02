'use client';

import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Search } from 'lucide-react';

interface ProductFiltersProps {
  categories: string[];
  search: string;
  onSearchChange: (value: string) => void;
  selectedCategory: string;
  onCategoryChange: (value: string) => void;
}

export function ProductFilters({
  categories,
  search,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
}: ProductFiltersProps) {
  return (
    <div className="bg-card p-6 rounded-lg shadow-sm mb-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
            <h3 className="font-headline text-lg font-semibold mb-3">Search Products</h3>
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                    type="text"
                    placeholder="Search by name..."
                    value={search}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="pl-10"
                />
            </div>
        </div>
        <div className="md:col-span-2">
            <h3 className="font-headline text-lg font-semibold mb-3">Filter by Category</h3>
            <RadioGroup
                value={selectedCategory}
                onValueChange={onCategoryChange}
                className="flex flex-wrap gap-x-4 gap-y-2"
            >
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="all" id="cat-all" />
                    <Label htmlFor="cat-all" className="font-normal cursor-pointer">All</Label>
                </div>
                {categories.map((category) => (
                    <div key={category} className="flex items-center space-x-2">
                        <RadioGroupItem value={category} id={`cat-${category}`} />
                        <Label htmlFor={`cat-${category}`} className="font-normal cursor-pointer">{category}</Label>
                    </div>
                ))}
            </RadioGroup>
        </div>
      </div>
    </div>
  );
}
