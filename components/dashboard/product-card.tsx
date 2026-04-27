"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  inStock: boolean;
  lang: string;
  addToCartLabel: string;
  outOfStockLabel: string;
}

export function ProductCard({
  id,
  name,
  price,
  originalPrice,
  image,
  category,
  inStock,
  lang,
  addToCartLabel,
  outOfStockLabel,
}: ProductCardProps) {
  const discount = originalPrice
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : 0;

  return (
    <div className="group bg-card border-border overflow-hidden rounded-xl border transition-shadow hover:shadow-lg">
      <Link href={`/${lang}/shop/product/${id}`} className="block">
        <div className="bg-muted relative aspect-square overflow-hidden">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {discount > 0 && (
            <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-500">
              -{discount}%
            </Badge>
          )}
          {!inStock && (
            <div className="bg-background/80 absolute inset-0 flex items-center justify-center backdrop-blur-sm">
              <span className="text-muted-foreground font-medium">
                {outOfStockLabel}
              </span>
            </div>
          )}
        </div>
      </Link>

      <div className="p-4">
        <p className="text-muted-foreground mb-1 text-xs tracking-wide uppercase">
          {category}
        </p>
        <Link href={`/${lang}/shop/product/${id}`}>
          <h3 className="group-hover:text-primary mb-2 line-clamp-2 font-medium transition-colors">
            {name}
          </h3>
        </Link>

        <div className="mb-3 flex items-center gap-2">
          <span className="text-lg font-bold">${price.toFixed(2)}</span>
          {originalPrice && (
            <span className="text-muted-foreground text-sm line-through">
              ${originalPrice.toFixed(2)}
            </span>
          )}
        </div>

        <Button
          className="w-full"
          size="sm"
          disabled={!inStock}
          variant={inStock ? "default" : "secondary"}
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          {inStock ? addToCartLabel : outOfStockLabel}
        </Button>
      </div>
    </div>
  );
}
