import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Client } from '@notionhq/client';

const notion = new Client({ auth: process.env.NOTION_API_KEY });
const DB = process.env.NOTION_DATABASE_ID!;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  const { token } = req.query;
  if (!token || typeof token !== 'string') {
    return res.status(400).json({ error: 'Missing token' });
  }

  try {
    const result = await notion.databases.query({
      database_id: DB,
      filter: { property: 'RSVP Token', rich_text: { equals: token } },
      page_size: 1,
    });

    if (result.results.length === 0) {
      return res.status(404).json({ error: 'Guest not found' });
    }

    const page = result.results[0] as any;
    const props = page.properties;

    const firstName = props['First Name']?.title?.[0]?.plain_text ?? '';
    const lastName  = props['Last Name']?.rich_text?.[0]?.plain_text ?? '';
    const name      = [firstName, lastName].filter(Boolean).join(' ') || 'Guest';
    const _debug    = { keys: Object.keys(props), firstName: props['First Name'], lastName: props['Last Name'] };
    const status  = props['RSVP Status']?.select?.name ?? null;
    const dietary = props['Dietary Restrictions']?.rich_text?.[0]?.plain_text ?? '';
    const song    = props['Song Request']?.rich_text?.[0]?.plain_text ?? '';

    // Find plus one: the related person who does NOT have Generate RSVP checked
    const relatedIds: string[] = (props['Plus One of']?.relation ?? []).map((r: any) => r.id);
    let plusOne: { id: string; name: string; status: string | null; dietary: string } | null = null;

    for (const id of relatedIds) {
      const relPage = await notion.pages.retrieve({ page_id: id }) as any;
      const rp = relPage.properties;
      if (!rp['Generate RSVP']?.checkbox) {
        const poFirst = rp['First Name']?.title?.[0]?.plain_text ?? '';
        const poLast  = rp['Last Name']?.rich_text?.[0]?.plain_text ?? '';
        plusOne = {
          id,
          name:    [poFirst, poLast].filter(Boolean).join(' ') || 'Guest',
          status:  rp['RSVP Status']?.select?.name ?? null,
          dietary: rp['Dietary Restrictions']?.rich_text?.[0]?.plain_text ?? '',
        };
        break;
      }
    }

    return res.status(200).json({ name, status, dietary, song, plusOne, _debug });
  } catch (err) {
    console.error('Notion error:', err);
    return res.status(500).json({ error: 'Failed to look up guest' });
  }
}
