# Social Hive Studio

Premium full-stack website and CMS for a Gen Z photography/reels brand.

## Stack

- Next.js 14 App Router
- React + TypeScript
- Tailwind CSS
- Framer Motion
- Supabase Auth, PostgreSQL, and Storage
- Lucide React
- React Hot Toast
- Next/Image optimization

## Local Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create `.env.local`:

   ```bash
   cp .env.example .env.local
   ```

3. Fill in:

   ```env
   NEXT_PUBLIC_SUPABASE_URL=your-project-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
   ADMIN_EMAILS=admin@socialhivestudio.com
   ```

   `ADMIN_EMAILS` accepts a comma-separated list.

4. In Supabase SQL Editor, run:

   ```sql
   -- paste supabase/schema.sql
   ```

5. In Supabase Auth, create a user whose email is listed in `ADMIN_EMAILS`.

6. Start the app:

   ```bash
   npm run dev
   ```

## Routes

- `/` - animated homepage with featured images
- `/hall-of-fame` - masonry gallery filtered by `show_on_hall_of_fame`
- `/categories` - dynamic category listing
- `/categories/[slug]` - category gallery
- `/about` - brand storytelling
- `/contact` - contact form and studio information
- `/studio-admin-access` - hidden admin login
- `/dashboard` - protected CMS dashboard

## Admin CMS

The dashboard supports:

- Drag-and-drop image upload to Supabase Storage
- Required category assignment for every image
- Optional homepage and Hall of Fame placement toggles
- Image search, filtering, editing, and deletion
- Category creation, editing, deletion, and thumbnail upload
- Analytics cards and uploads-by-category chart

All write operations run through protected API routes using `SUPABASE_SERVICE_ROLE_KEY`. Public pages only read published database data.

## Database

Schema lives in [supabase/schema.sql](./supabase/schema.sql).

Tables:

- `categories`
- `images`

Storage bucket:

- `studio-images`

## Deploy to Vercel

1. Push the repository to GitHub.
2. Import the repo in Vercel.
3. Add the same environment variables from `.env.local`.
4. Deploy.

After deploy, confirm that your Supabase project allows your Vercel domain under Auth URL settings if you use redirect-based auth flows later. This project uses password login, so the main requirement is valid environment variables and the SQL schema.

## Production Notes

- Keep `SUPABASE_SERVICE_ROLE_KEY` server-only. Never expose it in client components.
- Update `ADMIN_EMAILS` before inviting real administrators.
- Replace default contact details in `components/Footer.tsx` and `app/contact/page.tsx`.
- Add your production domain to `metadataBase` in `app/layout.tsx`.
