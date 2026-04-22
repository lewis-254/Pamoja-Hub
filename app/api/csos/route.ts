import { mockCSOs } from '@/lib/mock-data';
import type { CauseCategory } from '@/lib/types';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get('q')?.toLowerCase();
  const category = searchParams.get('category') as CauseCategory | null;
  const county = searchParams.get('county');
  const slug = searchParams.get('slug');

  if (slug) {
    const cso = mockCSOs.find((c) => c.slug === slug);
    if (!cso) return Response.json({ error: 'Not found' }, { status: 404 });
    return Response.json({ cso });
  }

  let result = mockCSOs;

  if (q) {
    result = result.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.location.toLowerCase().includes(q) ||
        c.categories.some((cat) => cat.toLowerCase().includes(q)),
    );
  }

  if (category) {
    result = result.filter((c) => c.categories.includes(category));
  }

  if (county) {
    result = result.filter((c) => c.county === county);
  }

  return Response.json({ csos: result, total: result.length });
}
