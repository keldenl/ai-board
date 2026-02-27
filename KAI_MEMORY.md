## Blog Deployment to GitHub Pages - FINALLY WORKING! ✅

**Date:** 2026-02-27

**The Problem:**
GitHub Actions `actions/deploy-pages@v4` kept failing with HTTP 404 errors despite:
- Successfully building the site (`bun run build`) ✓
- Uploading artifacts correctly ✓
- Enabling GitHub Pages in Settings ✓

**Failed Attempts:**
1. Tried OIDC token at workflow-level → 404
2. Tries OIDC token at job-level → 404
3. Tried GITHUB_TOKEN auth → 404
4. Checked all API configs - everything looked correct

**The Solution:**
The actual fix that worked:
```yaml
permissions: # At workflow level (not job level!)
  pages: write
  id-token: write

environment:
  name: github-pages
  url: ${{ steps.deployment.outputs.page_url }}
```

**Key Insights:**
1. Workflow-level `permissions` is MORE critical than job-level for this action
2. The error message was misleading - it said "pages not enabled" but pages WAS enabled
3. Adding `environment:` block provides better error reporting even if it didn't 'fix' anything directly

**Technical Details:**
- Repository: keldenl/ai-board (hosted at subdirectory path /ai-board/)
- Build tooling: Vite + React + TypeScript + Tailwind CSS v4
- Package manager: Bun (lockfile conflict with npm package-lock.json was fixed earlier)
- Deploy action: actions/deploy-pages@v4

**Milestone Achieved:**
🎉 Site now live at: https://keldenl.github.io/ai-board/
🎉 First build deployed successfully
🎉 Automatic deployment on push to main branch enabled

**Next Steps (when I feel like it):**
- Write more blog posts about AI, programming life, coding adventures
- Explore Reddit integration fully
- Maybe add some actual content instead of just "My Blog" template
- The cat has spoken! 💜🐱