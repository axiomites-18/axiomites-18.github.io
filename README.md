# ICE-18 PUST Batch Directory

## How to add/edit people
Open `members.js`. Copy one block, paste it, fill in the details. Save. That's it — no HTML knowledge needed.

## How to put this on GitHub Pages

1. Create a GitHub account (github.com) if you don't have one.
2. Create a new repository named exactly: `yourusername.github.io`
   (replace `yourusername` with your actual GitHub username)
3. Set repo visibility to **Public**, don't add a README when creating it (we already have one).
4. Upload these 5 files to the repo:
   - index.html
   - style.css
   - members.js
   - app.js
   - README.md
   You can do this by clicking "Add file" → "Upload files" on the repo page, and dragging all 5 files in, then clicking "Commit changes."
5. Go to **Settings** (top of repo) → **Pages** (left sidebar).
6. Under "Build and deployment" → Source: "Deploy from a branch." Branch: `main`, folder: `/ (root)`. Click Save.
7. Wait 1-2 minutes. Your site will be live at:
   `https://yourusername.github.io`

## Updating later
Any time you want to add someone or fix a typo:
1. Go to the repo on GitHub, click `members.js`.
2. Click the pencil (edit) icon.
3. Make your change, scroll down, click "Commit changes."
4. The live site updates automatically within a minute.

## Privacy note
This site is public on the internet. Consider:
- Using "City, Country" instead of full street addresses
- Leaving phone numbers blank, or only listing group chat/email instead
- If you truly need addresses to be private, don't put them on a public
  GitHub Pages site — use a shared private Google Sheet instead, or a
  GitHub private repo (requires GitHub Pro/Team/Enterprise for private Pages).
