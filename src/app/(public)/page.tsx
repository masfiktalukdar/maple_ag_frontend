import HomePageContent from "@/components/home/HomePageContent";

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

async function getSettings(key: string) {
  try {
    const res = await fetch(`${API_BASE}/settings/${key}`, { cache: 'no-store' });
    if (!res.ok) return null;
    const data = await res.json();
    return data.data || null;
  } catch {
    return null;
  }
}

async function getClients() {
  try {
    const res = await fetch(`${API_BASE}/clients`, { cache: 'no-store' });
    if (!res.ok) return [];
    const data = await res.json();
    return data.data || [];
  } catch {
    return [];
  }
}

async function getCertifications() {
  try {
    const res = await fetch(`${API_BASE}/certifications`, { cache: 'no-store' });
    if (!res.ok) return [];
    const data = await res.json();
    return data.data || [];
  } catch {
    return [];
  }
}

async function getNetwork() {
  try {
    const res = await fetch(`${API_BASE}/network`, { cache: 'no-store' });
    if (!res.ok) return [];
    const data = await res.json();
    return data.data || [];
  } catch {
    return [];
  }
}

export default async function Page() {
  const [products, homeSettings, clients, certifications, networkData] = await Promise.all([
    getProducts(),
    getSettings('home'),
    getClients(),
    getCertifications(),
    getNetwork(),
  ]);

  const importItems = products.filter((p: any) => p.type === 'import').slice(0, 3);
  const exportItems = products.filter((p: any) => p.type === 'export').slice(0, 3);
  const supplyItems = products.filter((p: any) => p.type === 'supply').slice(0, 3);

  return (
    <HomePageContent
      importItems={importItems}
      exportItems={exportItems}
      supplyItems={supplyItems}
      homeSettings={homeSettings}
      clients={clients}
      certifications={certifications}
      networkData={networkData}
    />
  );
}
