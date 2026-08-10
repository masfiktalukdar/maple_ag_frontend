import AboutPageContent from "@/components/about/AboutPageContent";

export const dynamic = 'force-dynamic';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

async function getJourney() {
  try {
    const res = await fetch(`${API_BASE}/journey`, { cache: 'no-store' });
    if (!res.ok) return [];
    const data = await res.json();
    return data.data || [];
  } catch {
    return [];
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

export default async function Page() {
  const [journey, clients, certifications] = await Promise.all([
    getJourney(),
    getClients(),
    getCertifications()
  ]);

  return <AboutPageContent journey={journey} clients={clients} certifications={certifications} />;
}
