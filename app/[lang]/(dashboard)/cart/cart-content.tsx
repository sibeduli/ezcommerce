"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Minus,
  Plus,
  Trash2,
  ShoppingBag,
  ArrowRight,
  Tag,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

interface CartItem {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  quantity: number;
}

interface CartContentProps {
  items: CartItem[];
  lang: string;
  dict: {
    title: string;
    emptyTitle: string;
    emptySubtitle: string;
    continueShopping: string;
    items: string;
    item: string;
    quantity: string;
    price: string;
    remove: string;
    orderSummary: string;
    subtotal: string;
    discount: string;
    shipping: string;
    freeShipping: string;
    total: string;
    checkout: string;
    promoCode: string;
    apply: string;
  };
}

export function CartContent({ items, lang, dict }: CartContentProps) {
  const [cartItems, setCartItems] = useState(items);
  const [promoCode, setPromoCode] = useState("");

  const updateQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      })
    );
  };

  const removeItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const originalTotal = cartItems.reduce(
    (sum, item) => sum + (item.originalPrice || item.price) * item.quantity,
    0
  );
  const discount = originalTotal - subtotal;
  const shipping = subtotal > 100 ? 0 : 9.99;
  const total = subtotal + shipping;

  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="bg-muted mb-6 flex h-20 w-20 items-center justify-center rounded-full">
          <ShoppingBag className="text-muted-foreground h-10 w-10" />
        </div>
        <h2 className="mb-2 text-xl font-semibold">{dict.emptyTitle}</h2>
        <p className="text-muted-foreground mb-6">{dict.emptySubtitle}</p>
        <Link href={`/${lang}/shop`}>
          <Button>
            {dict.continueShopping}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 lg:flex-row">
      {/* Cart items */}
      <div className="flex-1">
        <div className="space-y-4">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="bg-card border-border flex gap-4 rounded-xl border p-4"
            >
              <Link
                href={`/${lang}/shop/product/${item.id}`}
                className="bg-muted relative h-24 w-24 shrink-0 overflow-hidden rounded-lg"
              >
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover"
                />
              </Link>

              <div className="flex flex-1 flex-col justify-between">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-muted-foreground text-xs tracking-wide uppercase">
                      {item.category}
                    </p>
                    <Link href={`/${lang}/shop/product/${item.id}`}>
                      <h3 className="hover:text-primary mt-1 font-medium transition-colors">
                        {item.name}
                      </h3>
                    </Link>
                    <div className="mt-1 flex items-center gap-2">
                      <span className="font-semibold">
                        ${item.price.toFixed(2)}
                      </span>
                      {item.originalPrice && (
                        <span className="text-muted-foreground text-sm line-through">
                          ${item.originalPrice.toFixed(2)}
                        </span>
                      )}
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-muted-foreground hover:text-destructive h-8 w-8"
                    onClick={() => removeItem(item.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>

                <div className="mt-3 flex items-center gap-3">
                  <div className="flex items-center rounded-lg border">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 rounded-none rounded-l-lg"
                      onClick={() => updateQuantity(item.id, -1)}
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="flex h-8 w-10 items-center justify-center text-sm font-medium">
                      {item.quantity}
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 rounded-none rounded-r-lg"
                      onClick={() => updateQuantity(item.id, 1)}
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                  <span className="text-muted-foreground text-sm">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Order summary */}
      <div className="lg:w-96">
        <div className="bg-card border-border rounded-xl border p-6">
          <h2 className="mb-4 font-semibold">{dict.orderSummary}</h2>

          {/* Promo code */}
          <div className="mb-4 flex gap-2">
            <div className="relative flex-1">
              <Tag className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
              <Input
                placeholder={dict.promoCode}
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                className="pl-9"
              />
            </div>
            <Button variant="outline">{dict.apply}</Button>
          </div>

          <Separator className="mb-4" />

          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">
                {dict.subtotal} ({itemCount}{" "}
                {itemCount === 1 ? dict.item : dict.items})
              </span>
              <span className="font-medium">${subtotal.toFixed(2)}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">{dict.discount}</span>
                <span className="font-medium text-emerald-600">
                  -${discount.toFixed(2)}
                </span>
              </div>
            )}
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">{dict.shipping}</span>
              <span className="font-medium">
                {shipping === 0 ? (
                  <span className="text-emerald-600">{dict.freeShipping}</span>
                ) : (
                  `$${shipping.toFixed(2)}`
                )}
              </span>
            </div>
          </div>

          <Separator className="my-4" />

          <div className="flex justify-between">
            <span className="font-semibold">{dict.total}</span>
            <span className="text-xl font-bold">${total.toFixed(2)}</span>
          </div>

          <Button className="mt-6 w-full" size="lg">
            {dict.checkout}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>

          <Link href={`/${lang}/shop`}>
            <Button variant="link" className="mt-2 w-full">
              {dict.continueShopping}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
