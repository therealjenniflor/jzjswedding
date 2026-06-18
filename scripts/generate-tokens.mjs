/**
 * Run once to populate RSVP Token for every guest with "Generate RSVP" checked.
 *
 * Setup:
 *   1. cp .env.example .env  (or create .env with the two vars below)
 *   2. NOTION_API_KEY=secret_...
 *   3. NOTION_DATABASE_ID=...
 *
 * Usage:
 *   node scripts/generate-tokens.mjs
 *
 * Safe to re-run — skips guests that already have a token.
 */

import pkg from '@notionhq/client';
const { Client } = pkg;
import { randomBytes } from 'crypto';

function shortToken() {
  return randomBytes(6).toString('base64url').slice(0, 8);
}
import { config } from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
config({ path: resolve(__dirname, '../.env') });

const notion = new Client({ auth: process.env.NOTION_API_KEY });
const DB = process.env.NOTION_DATABASE_ID;

if (!process.env.NOTION_API_KEY || !DB) {
  console.error('Missing NOTION_API_KEY or NOTION_DATABASE_ID in .env');
  process.exit(1);
}

async function run() {
  let cursor;
  let total = 0;
  let generated = 0;
  let skipped = 0;

  do {
    const res = await notion.databases.query({
      database_id: DB,
      filter: { property: 'Generate RSVP', checkbox: { equals: true } },
      start_cursor: cursor,
      page_size: 100,
    });

    for (const page of res.results) {
      total++;
      const existing = page.properties['RSVP Token']?.rich_text?.[0]?.plain_text;
      if (existing) { skipped++; continue; }

      const token = shortToken();
      await notion.pages.update({
        page_id: page.id,
        properties: {
          'RSVP Token': { rich_text: [{ text: { content: token } }] },
          'RSVP Status': { select: { name: 'Pending' } },
        },
      });

      const name = page.properties['Name']?.title?.[0]?.plain_text ?? page.id;
      console.log(`  Generated token for ${name}: ${token}`);
      generated++;
    }

    cursor = res.has_more ? res.next_cursor : undefined;
  } while (cursor);

  console.log(`\nDone — ${total} guests checked, ${generated} tokens generated, ${skipped} already had tokens.`);
}

run().catch(err => { console.error(err); process.exit(1); });
