import ProductDetailsContent from "@/components/products/ProductDetailsContent";

export const dynamic = 'force-dynamic';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

async function getProduct(id: string) {
  try {
    const url = `${API_BASE}/products/${id}`;
    const res = await fetch(url, {
      cache: "no-store",
    });
    if (!res.ok) {
      return null;
    }
    const result = await res.json();
    return result.data;
  } catch {
    return null;
  }
}

export default async function ProductDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = await getProduct(id);

  return <ProductDetailsContent product={product} />;
}
