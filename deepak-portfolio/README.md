# Deepak Kumar — Portfolio

A plain HTML, CSS and JavaScript portfolio site. No frameworks, no backend, no build step.
It runs by opening `index.html` and works as-is on GitHub Pages.

## Folder contents

```
deepak-portfolio/
├── index.html        the page structure (do not put personal details here)
├── style.css         colours, spacing, responsive layout
├── script.js         reads data.js and fills the page
├── data.js           ← THE ONLY FILE YOU EDIT
├── resume.pdf        replace with your own resume
├── README.md         this file
└── images/
    ├── profile.jpg
    ├── project1.jpg
    ├── project2.jpg
    ├── project3.jpg
    ├── certificate1.jpg
    ├── certificate2.jpg
    └── college-logo.png
```

All the images and `resume.pdf` supplied here are placeholders. Replace them with your
own files, keeping the **same file names**, and everything keeps working.

## How data.js controls the site

`index.html` contains empty containers with IDs, for example `<div id="projectsGrid"></div>`.
When the page loads, `script.js` reads the `portfolioData` object inside `data.js` and writes
the content into those containers.

So: change a value in `data.js` → save → refresh the browser → the site updates.
Add a project to the `projects` list and a new project card appears automatically.

## Editing rules

* Keep the quotation marks `" "` around text.
* Keep the commas `,` at the end of each line.
* Don't delete `{ }` or `[ ]` brackets.
* If the page goes blank, press `Ctrl + Z` in your editor to undo the last change.
  You can also press `F12` in the browser and open the Console tab to see the error.

## Publishing on GitHub Pages

1. Create a GitHub account at github.com.
2. Create a public repository named `deepak-portfolio`.
3. Upload every file and the `images` folder (drag and drop works).
4. Repository → Settings → Pages → Source: `Deploy from a branch` → Branch: `main` → `/ (root)` → Save.
5. Wait 1–2 minutes. Your site is live at
   `https://your-username.github.io/deepak-portfolio/`

To update later: edit `data.js` on GitHub (pencil icon) → Commit changes → the live site
refreshes in about a minute.
