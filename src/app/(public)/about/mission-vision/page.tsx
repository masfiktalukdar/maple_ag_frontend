import MissionVisionContent from "@/components/about/MissionVisionContent";

export const dynamic = 'force-dynamic';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

async function getGoals() {
  try {
    const res = await fetch(`${API_BASE}/goals`, { cache: "no-store" });
    if (!res.ok) return [];
    const data = await res.json();
    return data.data || [];
  } catch {
    return [];
  }
}

export default async function Page() {
  const goals = await getGoals();
  return <MissionVisionContent goals={goals} />;
}
