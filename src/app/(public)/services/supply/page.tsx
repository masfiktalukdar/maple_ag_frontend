import SupplyPageContent from "@/components/services/SupplyPageContent";

export const dynamic = 'force-dynamic';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

async function getProducts() {
  try {
    const res = await fetch(`${API_BASE}/products`, { cache: 'no-store' });
    if (!res.ok) return [];
    const data = await res.json();
    return data.data || [];
  } catch {
    return [];
  }
}

async function getNetworkCategory(name: string) {
  try {
    const res = await fetch(`${API_BASE}/network/${name}`, { cache: 'no-store' });
    if (!res.ok) return null;
    const data = await res.json();
    return data.data || null;
  } catch {
    return null;
  }
}

async function getPartners() {
  try {
    const res = await fetch(`${API_BASE}/services/partners`, { cache: 'no-store' });
    if (!res.ok) return [];
    const data = await res.json();
    return data.data || [];
  } catch {
    return [];
  }
}

async function getCategoryItems() {
  try {
    const res = await fetch(`${API_BASE}/services/category-items`, { cache: 'no-store' });
    if (!res.ok) return [];
    const data = await res.json();
    return data.data || [];
  } catch {
    return [];
  }
}

export default async function Page() {
  const products = await getProducts();
  const supplyItems = products.filter((p: any) => p.type === 'supply');
  const networkCategory = await getNetworkCategory('Supply');
  const partners = await getPartners();
  const supplyPartners = partners.filter((p: any) => p.category === 'supply');
  const categoryItems = await getCategoryItems();
  const supplyCategoryItems = categoryItems.filter((c: any) => c.category === 'supply');
  return (
    <SupplyPageContent
      products={supplyItems}
      networkCategory={networkCategory}
      partners={supplyPartners}
      categoryItems={supplyCategoryItems}
    />
  );
}

