import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Client } from '@notionhq/client';

const notion = new Client({ auth: process.env.NOTION_API_KEY });
const DB = process.env.NOTION_DATABASE_ID!;

function txt(content: string) {
  return [{ text: { content: content.slice(0, 2000) } }];
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { token, attending, dietary, song, guestFirstName, guestLastName, plusOneId, plusOneAttending, plusOneDietary, plusOneFirstName, plusOneLastName } = req.body ?? {};

  if (!token || typeof token !== 'string') return res.status(400).json({ error: 'Missing token' });
  if (typeof attending !== 'boolean') return res.status(400).json({ error: 'attending must be a boolean' });

  try {
    // Verify token still resolves (guard against replay with wrong token)
    const result = await notion.databases.query({
      database_id: DB,
      filter: { property: 'RSVP Token', rich_text: { equals: token } },
      page_size: 1,
    });

    if (result.results.length === 0) return res.status(404).json({ error: 'Guest not found' });

    const pageId = result.results[0].id;

    // Update primary guest
    await notion.pages.update({
      page_id: pageId,
      properties: {
        ...(guestFirstName ? { 'First Name': { title: [{ text: { content: String(guestFirstName) } }] } } : {}),
        ...(guestLastName  ? { 'Last Name':  { rich_text: txt(String(guestLastName)) } } : {}),
        'RSVP Status': { select: { name: attending ? 'Attending' : 'Not Attending' } },
        'Dietary Restrictions': { rich_text: txt(String(dietary ?? '')) },
        'Song Request': { rich_text: txt(String(song ?? '')) },
      },
    });

    // Update plus one if they have a row
    if (plusOneId && typeof plusOneAttending === 'boolean') {
      await notion.pages.update({
        page_id: plusOneId,
        properties: {
          ...(plusOneFirstName ? { 'First Name': { title: [{ text: { content: String(plusOneFirstName) } }] } } : {}),
          ...(plusOneLastName  ? { 'Last Name':  { rich_text: txt(String(plusOneLastName)) } } : {}),
          'RSVP Status': { select: { name: plusOneAttending ? 'Attending' : 'Not Attending' } },
          'Dietary Restrictions': { rich_text: txt(String(plusOneDietary ?? '')) },
        },
      });
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Notion error:', err);
    return res.status(500).json({ error: 'Failed to save RSVP' });
  }
}
