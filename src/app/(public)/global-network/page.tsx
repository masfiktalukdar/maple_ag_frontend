import GlobalNetworkContent from "@/components/network/GlobalNetworkContent";

export const dynamic = 'force-dynamic';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

async function getNetworkData() {
  try {
    const res = await fetch(`${API_BASE}/network`, {
      cache: "no-store",
    });
    if (!res.ok) return [];
    const result = await res.json();
    return result.data || [];
  } catch {
    return [];
  }
}

export default async function Page() {
  const networkData = await getNetworkData();
  return <GlobalNetworkContent networkData={networkData} />;
}
