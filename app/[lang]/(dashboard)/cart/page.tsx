import { notFound } from "next/navigation";
import { getDictionary, hasLocale, type Locale } from "../../dictionaries";
import { CartContent } from "./cart-content";

const mockCartItems = [
  {
    id: "1",
    name: "Wireless Bluetooth Headphones",
    price: 79.99,
    originalPrice: 129.99,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
    category: "Electronics",
    quantity: 1,
  },
  {
    id: "3",
    name: "Minimalist Watch",
    price: 149.99,
    originalPrice: 199.99,
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
    category: "Accessories",
    quantity: 2,
  },
  {
    id: "5",
    name: "Leather Backpack",
    price: 119.99,
    originalPrice: 159.99,
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop",
    category: "Bags",
    quantity: 1,
  },
];

export default async function CartPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  if (!hasLocale(lang)) {
    notFound();
  }

  const dict = await getDictionary(lang as Locale);

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">{dict.cart.title}</h1>
        <p className="text-muted-foreground">
          {mockCartItems.length}{" "}
          {mockCartItems.length === 1 ? dict.cart.item : dict.cart.items}
        </p>
      </div>

      <CartContent items={mockCartItems} lang={lang} dict={dict.cart} />
    </div>
  );
}
