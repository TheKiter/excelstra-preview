# Excelstra Multi-Page Luxury Website — GHL & Deployment Guide

This package contains the complete, dark luxury multi-page website for **Excelstra**, built in vanilla HTML/CSS/JavaScript with the 239-frame cinematic scroll film overture and exact brand copy.

---

## 1. Local Preview

To test the entire multi-page website locally:

```bash
cd "C:\Users\nigel\.gemini\antigravity\scratch\excelstra-website"
python -m http.server 8000
```

Open **`http://localhost:8000`** in your browser.
*(Always serve over HTTP so the browser can load canvas WebP frames without `file://` security blocks.)*

---

## 2. GoHighLevel (GHL) Compatibility Guide

The folder **`ghl-snippets/`** contains self-contained, copy-paste-ready HTML files specifically formatted for GoHighLevel's **Custom JS/HTML** code element.

### How to Add a Page into GoHighLevel:

1. **Create or Open a Page in GHL**:
   - In GHL, go to **Sites &rarr; Websites** (or **Funnels**).
   - Create a page matching the slug (e.g., `/`, `/the-architecture`, `/membership`, `/events`, `/mastermind`, `/speaking`, `/podcast`, `/wealth-calculator`, `/about-eunicia`, `/our-team`, `/book-a-call`, `/faq`, etc.).

2. **Configure the GHL Section**:
   - Add a **Full-Width Section**.
   - In Section Settings &rarr; Spacing: Set **Padding to 0px** (Top, Bottom, Left, Right) and **Margin to 0px**.
   - Add a **1-Column Row** (Set Row padding and margins to 0px).

3. **Add the Custom JS/HTML Element**:
   - Drag the **Custom JS/HTML** element into the column.
   - Click **Open Code Editor**.

4. **Paste the Snippet**:
   - Open the corresponding file in `ghl-snippets/` (for example, `ghl-home.html` for Home, `ghl-the-architecture.html` for Architecture).
   - Copy the entire contents and paste into the GHL code editor.
   - Click **Yes, Save** and **Publish**.

---

## 3. Asset Hosting for GoHighLevel (Canvas Frames & Images)

Because GHL code boxes cannot host folders of raw image files locally, the 239 cinematic film frames (`frames/` and `frames-sm/`) and brand logos (`logo.png`, `share.png`) should be accessible via a public URL.

### Recommended Hosting Options for Assets:
1. **Cloudflare Pages / Vercel (Free & Instant)**:
   - Deploy this folder to Cloudflare Pages or Vercel (it takes 1 minute and provides an instant HTTPS URL, e.g. `https://excelstra-assets.pages.dev`).
2. **AWS S3 / CloudFront**:
   - Upload `frames/`, `frames-sm/`, `logo.png`, etc. to an S3 bucket with public read access.
3. **GitHub Pages**:
   - Push to a public/private GitHub repo with Pages enabled.

### Configuring the URL in GHL:
At the very top of each snippet in GHL, set `window.EXCELSTRA_ASSET_BASE`:

```html
<script>
  window.EXCELSTRA_ASSET_BASE = "https://your-assets-host.com/";
</script>
```

The scroll-film canvas will automatically scrub through `https://your-assets-host.com/frames/frame_000.webp` through `frame_238.webp` with zero CORS or path issues!

---

## 4. Pages Included

| Page File | GHL Snippet | Destination Route / Purpose |
|---|---|---|
| `index.html` | `ghl-home.html` | Home page with 239-frame scroll overture |
| `the-architecture.html` | `ghl-the-architecture.html` | The Ten Levels & Three Pillars |
| `membership.html` | `ghl-membership.html` | Copper, Gold, Diamond & Continuance |
| `events.html` | `ghl-events.html` | True Wealth Mastery (Oct 1-2, Fort Lauderdale) |
| `mastermind.html` | `ghl-mastermind.html` | Year-round 4x private room |
| `speaking.html` | `ghl-speaking.html` | Keynotes, workshops & inquiry form |
| `podcast.html` | `ghl-podcast.html` | Episodes & streaming platforms |
| `wealth-calculator.html` | `ghl-wealth-calculator.html` | 2-min interactive memo calculation |
| `about-eunicia.html` | `ghl-about-eunicia.html` | Eunicia Peret founder story |
| `our-team.html` | `ghl-our-team.html` | 5 disciplines & expert integration |
| `newsletter.html` | `ghl-newsletter.html` | Considered letter subscription |
| `member-stories.html` | `ghl-member-stories.html` | Founder stories across real estate & tech |
| `book-a-call.html` | `ghl-book-a-call.html` | 60-min qualifying session scheduler |
| `faq.html` | `ghl-faq.html` | 8 core firm Q&As in accordion |
| `questions-to-ask.html` | `ghl-questions-to-ask.html` | 5 strategic cross-discipline questions |
| `privacy.html` | `ghl-privacy.html` | Legal privacy notice |
| `terms.html` | `ghl-terms.html` | Legal terms of engagement |
