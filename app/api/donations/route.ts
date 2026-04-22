// In-memory donation log — resets on server restart
// Real implementation: write to PostgreSQL / Supabase

interface DonationPayload {
  csoId: string;
  campaignId?: string;
  amount: number;
  method: 'mpesa' | 'card';
  citizenId: string;
}

const donations: Array<DonationPayload & { id: string; timestamp: string; status: 'completed' }> = [];

export async function POST(req: Request) {
  const payload = await req.json() as DonationPayload;

  const record = {
    ...payload,
    id: `don-${Date.now()}`,
    timestamp: new Date().toISOString(),
    status: 'completed' as const,
  };

  donations.push(record);
  console.log('[donations] New donation logged:', record);

  return Response.json({ success: true, donation: record });
}

export async function GET() {
  return Response.json({ donations });
}
