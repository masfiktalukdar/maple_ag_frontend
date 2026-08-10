import ManagementContent from "@/components/about/ManagementContent";

export const dynamic = 'force-dynamic';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'https://maple-ag-backend.vercel.app/api';

async function getTeam() {
  try {
    const res = await fetch(`${API_BASE}/team`, { cache: "no-store" });
    if (!res.ok) return [];
    const data = await res.json();
    return data.data || [];
  } catch {
    return [];
  }
}

export default async function Page() {
  const team = await getTeam();
  return <ManagementContent team={team} />;
}
