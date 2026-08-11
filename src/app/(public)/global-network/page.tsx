import GlobalNetworkContent from "@/components/network/GlobalNetworkContent";
import { API_BASE } from "@/lib/api";

export const dynamic = 'force-dynamic';

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
