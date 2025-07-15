
'use client';

import React from 'react';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { products } from '@/lib/data';
import { Search } from 'lucide-react';
import { ThemeToggle } from '../theme-toggle';
import Link from 'next/link';
import { Button } from '../ui/button';

interface PosHeaderProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  category: string;
  setCategory: (value: string) => void;
}

export function PosHeader({
  searchTerm,
  setSearchTerm,
  category,
  setCategory,
}: PosHeaderProps) {
  const categories = ['All', ...new Set(products.map((p) => p.category))];

  return (
    <div className="p-4 border-b border-border flex items-center gap-4 flex-wrap">
       <Link href="/" className="text-xl font-bold mr-4 hidden sm:block">BranchBrain</Link>
      <div className="relative flex-1 min-w-[200px]">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          placeholder="Search products..."
          className="pl-10 h-11"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <Select value={category} onValueChange={setCategory}>
        <SelectTrigger className="w-[180px] h-11">
          <SelectValue placeholder="Select a category" />
        </SelectTrigger>
        <SelectContent>
          {categories.map((cat) => (
            <SelectItem key={cat} value={cat}>
              {cat}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <div className="ml-auto flex items-center gap-2">
         <Button asChild variant="outline">
            <Link href="/">Admin Dashboard</Link>
        </Button>
        <ThemeToggle />
      </div>
    </div>
  );
}
