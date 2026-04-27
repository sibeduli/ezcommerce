"use client";

import { useState } from "react";
import { SlidersHorizontal, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ProductCard } from "@/components/dashboard/product-card";

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  inStock: boolean;
}

interface ShopContentProps {
  products: Product[];
  categories: string[];
  lang: string;
  dict: {
    searchPlaceholder: string;
    filters: string;
    categories: string;
    allCategories: string;
    sortBy: string;
    newest: string;
    priceLowHigh: string;
    priceHighLow: string;
    popular: string;
    addToCart: string;
    outOfStock: string;
    noProducts: string;
    clearFilters: string;
  };
}

export function ShopContent({
  products,
  categories,
  lang,
  dict,
}: ShopContentProps) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sortBy, setSortBy] = useState("newest");

  const filteredProducts = products
    .filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchesCategory =
        category === "All" || product.category === category;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        default:
          return 0;
      }
    });

  const hasFilters = search || category !== "All";

  const clearFilters = () => {
    setSearch("");
    setCategory("All");
  };

  const filterContent = (
    <div className="space-y-6">
      <div>
        <h3 className="mb-3 font-medium">{dict.categories}</h3>
        <div className="space-y-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`block w-full rounded-md px-3 py-2 text-left text-sm transition-colors ${
                category === cat
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-muted"
              }`}
            >
              {cat === "All" ? dict.allCategories : cat}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex gap-6">
      {/* Desktop sidebar */}
      <aside className="hidden w-56 shrink-0 lg:block">{filterContent}</aside>

      {/* Main content */}
      <div className="flex-1">
        {/* Toolbar */}
        <div className="mb-6 flex flex-wrap items-center gap-4">
          <div className="flex-1">
            <Input
              type="search"
              placeholder={dict.searchPlaceholder}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="max-w-sm"
            />
          </div>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder={dict.sortBy} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">{dict.newest}</SelectItem>
              <SelectItem value="popular">{dict.popular}</SelectItem>
              <SelectItem value="price-low">{dict.priceLowHigh}</SelectItem>
              <SelectItem value="price-high">{dict.priceHighLow}</SelectItem>
            </SelectContent>
          </Select>

          {/* Mobile filter button */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="lg:hidden">
                <SlidersHorizontal className="mr-2 h-4 w-4" />
                {dict.filters}
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <SheetHeader>
                <SheetTitle>{dict.filters}</SheetTitle>
              </SheetHeader>
              <div className="mt-6">{filterContent}</div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Active filters */}
        {hasFilters && (
          <div className="mb-4 flex items-center gap-2">
            {category !== "All" && (
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setCategory("All")}
              >
                {category}
                <X className="ml-1 h-3 w-3" />
              </Button>
            )}
            {search && (
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setSearch("")}
              >
                &quot;{search}&quot;
                <X className="ml-1 h-3 w-3" />
              </Button>
            )}
            <Button variant="ghost" size="sm" onClick={clearFilters}>
              {dict.clearFilters}
            </Button>
          </div>
        )}

        {/* Product grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                {...product}
                lang={lang}
                addToCartLabel={dict.addToCart}
                outOfStockLabel={dict.outOfStock}
              />
            ))}
          </div>
        ) : (
          <div className="py-12 text-center">
            <p className="text-muted-foreground">{dict.noProducts}</p>
            <Button variant="link" onClick={clearFilters}>
              {dict.clearFilters}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
