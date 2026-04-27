import { notFound } from "next/navigation";
import { getDictionary, hasLocale, type Locale } from "../../dictionaries";
import { ShopContent } from "./shop-content";

const mockProducts = [
  {
    id: "1",
    name: "Wireless Bluetooth Headphones",
    price: 79.99,
    originalPrice: 129.99,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
    category: "Electronics",
    inStock: true,
  },
  {
    id: "2",
    name: "Premium Cotton T-Shirt",
    price: 29.99,
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
    category: "Clothing",
    inStock: true,
  },
  {
    id: "3",
    name: "Minimalist Watch",
    price: 149.99,
    originalPrice: 199.99,
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
    category: "Accessories",
    inStock: true,
  },
  {
    id: "4",
    name: "Running Shoes",
    price: 89.99,
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
    category: "Footwear",
    inStock: false,
  },
  {
    id: "5",
    name: "Leather Backpack",
    price: 119.99,
    originalPrice: 159.99,
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop",
    category: "Bags",
    inStock: true,
  },
  {
    id: "6",
    name: "Smart Watch Pro",
    price: 249.99,
    image:
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400&h=400&fit=crop",
    category: "Electronics",
    inStock: true,
  },
  {
    id: "7",
    name: "Sunglasses Classic",
    price: 59.99,
    image:
      "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop",
    category: "Accessories",
    inStock: true,
  },
  {
    id: "8",
    name: "Ceramic Coffee Mug",
    price: 19.99,
    image:
      "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=400&h=400&fit=crop",
    category: "Home",
    inStock: true,
  },
];

const categories = [
  "All",
  "Electronics",
  "Clothing",
  "Accessories",
  "Footwear",
  "Bags",
  "Home",
];

export default async function ShopPage({
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
        <h1 className="text-2xl font-bold">{dict.shop.title}</h1>
        <p className="text-muted-foreground">
          {mockProducts.length} {dict.shop.products}
        </p>
      </div>

      <ShopContent
        products={mockProducts}
        categories={categories}
        lang={lang}
        dict={dict.shop}
      />
    </div>
  );
}
