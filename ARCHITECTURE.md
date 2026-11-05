
## Overview
This application uses the Next.js 15 App Router architecture. It is divided into two primary route groups: `(public)` for the public-facing portfolio and `(admin)` for the secure CMS dashboard.

## Route Topology

```text
app/
├── globals.css                       # Tailwind directives and core global styles
├── layout.tsx                        # Root layout (HTML/Body, global providers like Theme)
│
├── (public)/                         # Public-facing Route Group
│   ├── layout.tsx                    # Public shell (Navbar, Footer, Contact overlay)
│   ├── page.tsx                      # Landing page (Hero, Services, featured works)
│   ├── portfolio/
│   │   ├── page.tsx                  # Full masonry portfolio grid with category filters
│   │   └── [id]/page.tsx             # Case Study page (Rich text story + Sticky PiP Video)
│   └── live/
│       └── page.tsx                  # YouTube live stream embed / offline state
│
├── (admin)/                          # Secure CMS Route Group
│   ├── layout.tsx                    # Admin shell (Sidebar, Topbar) - Enforces Auth globally
│   ├── login/
│   │   └── page.tsx                  # JWT/Credential login interface
│   └── dashboard/
│       ├── page.tsx                  # Portfolio listing (Data table / Grid)
│       └── works/
│           ├── new/page.tsx          # Create new portfolio item + TipTap Editor
│           └── [id]/page.tsx         # Update existing portfolio item + TipTap Editor
│
└── api/                              # Route Handlers (RESTful API)
    ├── auth/
    │   ├── login/route.ts            # Authenticates user, signs JWT, sets HttpOnly cookie
    │   └── logout/route.ts           # Clears HttpOnly cookie
    ├── contact/
    │   └── route.ts                  # Zod validated form handler -> Nodemailer/SMTP
    ├── portfolio/
    │   ├── route.ts                  # GET (List all works), POST (Create new work)
    │   └── [id]/route.ts             # GET (Single work), PUT (Update work), DELETE (Remove)
    └── upload/
        └── route.ts                  # Authenticated proxy streaming multipart form data to Cloudinary

```

## Data Fetching & State Paradigm

### 1. Read Operations (Public Pages)

* **React Server Components (RSC):** Pages like `(public)/portfolio/page.tsx` and `(public)/portfolio/[id]/page.tsx` MUST fetch data directly from the MongoDB database (`lib/mongodb.ts`) on the server.
* **No Client Fetching for Initial Load:** Do not use `useEffect` or `useQuery` for the initial fetch of portfolio items. Pass the server-fetched data as props to interactive Client Components (like `PortfolioGrid`) when client-side filtering or Framer Motion animations are required.

### 2. Write Operations (Admin CMS)

* Mutations (Create, Update, Delete) are handled via standard `fetch` calls to the `/api/portfolio` endpoints from the Client Components in the admin dashboard.
* Following a successful mutation, the client should call `router.refresh()` to trigger Next.js to re-fetch the Server Components and update the UI.

## Integration & Asset Flow

1. **Database:** Mongoose handles schemas and database connections. The connection is cached in the `global` namespace to prevent connection limit exhaustion during Next.js Hot Module Replacement (HMR).
2. **Media Uploads:** The `(admin)/dashboard/works/new/page.tsx` utilizes a direct file input. The file is sent via `FormData` to `/api/upload/route.ts`, which validates the file size/MIME type, uploads it directly to Cloudinary, and returns the secure URL (`res.cloudinary.com/...`). This URL is then saved in the MongoDB document.
3. **Live Streaming:** The `(public)/live/page.tsx` component reads the `youtubeStreamId` from a global settings document or the most recent "Live Event" document in the database and injects it into a standard YouTube `<iframe>`.