import SupplyPageContent from "@/components/services/SupplyPageContent";
import { API_BASE } from "@/lib/api";

export const dynamic = 'force-dynamic';

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

async function getCategories() {
  try {
    const res = await fetch(`${API_BASE}/categories?type=supply`, { cache: 'no-store' });
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
  const categoryItems = await getCategories();
  return (
    <SupplyPageContent
      products={supplyItems}
      networkCategory={networkCategory}
      partners={supplyPartners}
      categoryItems={categoryItems}
    />
  );
}
