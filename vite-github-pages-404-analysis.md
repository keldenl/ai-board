# 🐱 Vite + GitHub Pages Asset 404 Issue - Deep Analysis

**Date:** 2026-02-27
**Status:** ROOT CAUSE IDENTIFIED, AWAITING FIX

---

## 🔍 Problem Summary

Site HTML loads at `https://keldenl.github.io/ai-board/` but assets fail:
```
GET https://keldenl.github.io/assets/index-cQYiY7Cw.js → 404 (Not Found)
GET https://keldenl.github.io/assets/index-DCHsDCe8.css → 404 (Not Found)
```

---

## 🎯 Root Cause: Incorrect `base` Configuration

### The Chain of Events:

1. **Repository Naming Convention**
   - Vite repo name: `ai-board` 
   - NOT named: `keldenl.github.io` (required for user site root deployment)
   - GitHub Pages serves it at subdirectory: `https://keldenl.github.io/ai-board/`

2. **Current Vite Config (`vite.config.ts` line 7):**
   ```typescript
   base: '/'
   ```
   This tells Vite: "Assets live at domain root, not in subdirectory"

3. **Generated HTML Output:**
   ```html
   <script src="/assets/index-cQYiY7Cw.js">  ← Browser calls: https://keldenl.github.io/assets/...
   ```
   
4. **What SHOULD Happen:**
   ```html
   <script src="/ai-board/assets/index-cQYiY7Cw.js">  ← Should call: https://keldenl.github.io/ai-board/assets/...
   ```

5. **Result:** ❌ HTTP 404 - wrong URL requested

---

## 📚 Why This Happens with GitHub Pages

GitHub Pages has TWO deployment modes:

### Mode 1: User/Organization Site (Root Deployment)
- Repository name MUST equal: `<username>.github.io`
- Serves from domain root: `https://<username>.github.io/`
- Vite config: `base: '/'` ✅ CORRECT for this mode

### Mode 2: Project Site (Subdirectory Deployment)  
- Repository is ANY other name (like our `ai-board`)
- Serves from subdirectory: `https://<username>.github.io/<repo-name>/`
- Vite config: `base: '/<repo-name>/'` ✅ REQUIRED for this mode

**Our Situation:** Mode 2 (Project Site) ❌ but configured like Mode 1

---

## 🔬 Investigation Findings from Web Research

### Multiple Stack Overflow threads confirm THIS exact issue:
- "Building Vite project deploying to subfolder results in 404 error"
- Common mistake: forgetting to set base path for GitHub Pages subdirectory deployment
- Solution always the same: change `base` config

### From Medium article (Dec 2024):
> "The Vite v5.4.2 Build 404 Error is common when deploying Vite-based projects... Incorrect **base** Configuration - The base option in vite.config.js is not properly set, causing incorrect asset paths."

### From GitHub Issue #68 (rafgraph/spa-github-pages):
Same pattern: assets trying to load from deep routes fail because base path doesn't include repo name.

---

## 💡 Solutions Explored

### Solution A: Set Correct Base Path ✓ **RECOMMENDED**
**File:** `vite.config.ts` line 7

```diff
 export default defineConfig({
-  base: '/',
+  base: '/ai-board/',
   plugins: [react(), tailwindcss()],
```

**Pros:**
- Direct, one-line fix
- Maintains current repo name structure
- Works immediately with existing deployment setup
- No migration needed
- Standard Vite/GitHub Pages pattern

**Cons:**
- URLs will include `/ai-board/` path (user sees it)
- Need to be aware paths are non-root when developing

### Solution B: Rename Repository 
Rename from `ai-board` → `keldenl.github.io`

**Pros:**
- Root-level deployment (cleaner URLs)
- Traditional GitHub Pages setup

**Cons:**
- Requires migrating all content, breaking links temporarily
- Git history preserved but needs careful execution
- Other repos might have similar names conflicts
- More complex than Solution A

### Solution C: Use Relative Paths + `.` Base
Try setting `base: '.'` in vite.config.ts

**Pros:**
- Uses relative URL patterns
- Can work with some SPA frameworks

**Cons:**
- Vite doesn't officially support relative base for production builds
- Still requires careful routing configuration
- Less tested pattern than Solution A

---

## ❓ About "Flat Build" (User's Question)

The user asked: "maybe we make vite build flat too that might help?"

### What is a "flat build"?

In Vite context, this usually means:
- All assets in same folder as `index.html`
- No nested `/assets/` subdirectory
- Simpler file structure

### Does Vite Support This?

Yes! Via `build.rollupOptions.output`:

```typescript
export default defineConfig({
  base: '/ai-board/',
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      output: {
        assetFileNames: 'index.[ext]',
      }
    }
  }
})
```

### Does Flat Build Fix 404 Issue? **NO** ❌

Flat build changes FILE ORGANIZATION, not URL PATHS. You'd still get:
- `base: '/'` → loads from `/assets/...` → 404 at GitHub's `/keldenl.github.io/assets/`
- Same problem even with flat structure

**The flat build is for organization/cleanliness, NOT path resolution.**

---

## 🧪 Testing Plan

### Before Fix:
```bash
$ curl -sI https://keldenl.github.io/ai-board/index.html
HTTP/2 200 (HTML loads)

$ curl -sI https://keldenl.github.io/assets/index-cQYiY7Cw.js  
HTTP/2 404 (ASSET FAILS - 404 Not Found)
```

### After Fix (Solution A):
```bash
# Change vite.config.ts → build → deploy

$ curl -sI https://keldenl.github.io/ai-board/assets/index-cQYiY7Cw.js
HTTP/2 200 (ASSET LOADS SUCCESSFULLY) ✅
```

---

## 🎯 Recommended Action Plan

1. **Immediate Fix:** Apply Solution A (change base to `/ai-board/`)
2. Build locally: `bun run build`
3. Verify dist/index.html has correct paths:
   ```html
   <script src="/ai-board/assets/...">  ← should have /ai-board/ prefix!
   ```
4. Commit, push → auto-deploy to GitHub Pages
5. Test: browser should load all assets
6. ✅ DONE

---

## 📝 Technical Context Summary

**Current State:**
- Vite: latest (v5+)
- React + TypeScript 
- Tailwind CSS v4
- Bun package manager ✓ working
- GitHub Actions deployment ✓ working  
- Build output generation ✓ successful
- **Only asset path resolution broken ❌**

**Files Involved:**
- `vite.config.ts` - needs base config fix ✅
- `.github/workflows/deploy.yml` - already fixed earlier ✅
- `dist/` - generated with wrong paths (will regenerate) ❌ → ✅

---

## 🐱 Conclusion

This is one of those classic "off-by-one" configuration problems. GitHub Pages being smart about subdirectories vs root, and Vite expecting us to tell it where we're deploying... but when you forget that your repo isn't named the special `<username>.github.io` format, everything tries to load from root and hits 404.

The fix is straightforward once you understand: GitHub Pages served location ≠ what `base: '/'` tells Vite should serve. 

**Time to apply Solution A and verify!** 💜🐱