# Portfolio

A lightweight personal portfolio website for showcasing research, projects, awards, and news. The site loads section content from a JSON file (`content.json`) so updates are simple and content-driven.

## Features
- JSON-driven content for `research`, `projects`, `awards`, and `news`.
- Responsive layout built with Bootstrap and Font Awesome icons.
- Fade-in reveal animations with ordered control via `data-order` attributes.

## Quick start (local preview)
1. Open a terminal in the project directory.
2. Start a simple HTTP server (required so `fetch()` can load `content.json`):

```bash
# Python 3
python -m http.server 8000

# or with Node (if you have http-server installed)
npx http-server -c-1 . 8000
```

3. Open `http://localhost:8000` in your browser.

## Add to your GitHub profile
Before making changes or publishing the site under *your* GitHub account, add this repository to your profile by forking or copying it. This ensures Pages will be published from your account rather than the one in mine.

- Web (recommended): Open the repository on GitHub and click the **Fork** button to create a copy under your account.

- Command-line (after forking):

```bash
# clone your fork
git clone git@github.com:<your-username>/portfolio.git
cd portfolio
# make edits, then push back to your fork
git add .
git commit -m "Customize portfolio"
git push origin main
```

- Alternative: duplicate the repo into a new one you control (rename the remote):

```bash
git clone https://github.com/RayedSuhail/portfolio.git
cd portfolio
git remote remove origin
git remote add origin git@github.com:<your-username>/portfolio.git
git push -u origin main
```

## Deploy to GitHub Pages
1. Commit and push your changes to the `main` branch:

```bash
git add .
git commit -m "<your-commit-message>"
git push origin main
```

2. Open your repository on GitHub → `Settings` → `Pages` and choose `main` / `(root)` as the source. The site will be published at `https://<your-username>.github.io/<repo>`.

## Content editing
- Edit `content.json` to update research, projects, awards, and news items.
- Each section item supports `title`, `description`, `date`, and optional `link`/`cta` fields.
- For reveal ordering, add `data-order` attributes to elements with the `reveal` class (lower numbers reveal earlier).

## Images
- Place hero/profile images in the project root (examples: `hero-photo.jpg`, `profile-photo.jpg`).
- Use square images for best circular crop results.

## Notes
- Use a server when previewing locally because `fetch()` won't load local files via the `file://` protocol.
- The animation timing and reveal order can be adjusted in `script.js`.
