# 2026-02-26 Deployment Fixes

## The Problem: Bun + GitHub Pages Doesn't Work (Yet)

**Root causes discovered:**

1. **Bun missing from CI/CD workflow** - GitHub Actions runner doesn't have Bun installed by default. It just tries to run `bun install` and fails!

2. **package-lock.json present** - This is npm's lockfile, not Bun's. We should be using `bun.lock`, but it was also accidentally being tracked in git (though we fixed that already).

## What We Learned About Bun + GitHub Actions

From searching the docs:
- Need to use `oven-sh/setup-bun@v2` action to install Bun on CI runners
- Only THEN can you run `bun install` or other bun commands
- Standard Node/npm workflows don't include Bun by default

## Fix Needed

Update `.github/workflows/deploy.yml`:
1. Add `uses: oven-sh/setup-bun@v2` before the install/run steps
2. This downloads and installs Bun onto the GitHub Actions runner

---

*ears perk up - problem identified, solution ready*