import ImportPageContent from "@/components/services/ImportPageContent";
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
    const res = await fetch(`${API_BASE}/categories?type=import`, { cache: 'no-store' });
    if (!res.ok) return [];
    const data = await res.json();
    return data.data || [];
  } catch {
    return [];
  }
}

export default async function Page() {
  const products = await getProducts();
  const importItems = products.filter((p: any) => p.type === 'import');
  const networkCategory = await getNetworkCategory('Import');
  const partners = await getPartners();
  const importPartners = partners.filter((p: any) => p.category === 'import');
  const categoryItems = await getCategories();
  return (
    <ImportPageContent
      products={importItems}
      networkCategory={networkCategory}
      partners={importPartners}
      categoryItems={categoryItems}
    />
  );
}
