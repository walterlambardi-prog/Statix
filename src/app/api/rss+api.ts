export async function GET(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const feed = url.searchParams.get('url');

  if (!feed) {
    return Response.json({ error: 'Missing url param' }, { status: 400 });
  }

  // Only allow http/https URLs to prevent SSRF
  let parsed: URL;
  try {
    parsed = new URL(feed);
  } catch {
    return Response.json({ error: 'Invalid url' }, { status: 400 });
  }
  if (parsed.protocol !== 'https:' && parsed.protocol !== 'http:') {
    return Response.json({ error: 'Invalid protocol' }, { status: 400 });
  }

  const upstream = await fetch(feed, {
    headers: { 'User-Agent': 'Stratix/1.0 RSS Reader' },
  });

  const text = await upstream.text();

  return new Response(text, {
    status: upstream.status,
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=300',
    },
  });
}
