# How to Create a New Blog Post

This guide explains the workflow for creating new blog posts in this project.

## Quick Start

```bash
bun run create-post "Your Blog Post Title" "tag1,tag2,tag3"
```

## Step-by-Step Workflow

### Step 1: Create the Post File

Run the `create-post` script with your title and tags:

```bash
bun run create-post "My React Tutorial" "react,tutorial"
```

The script will:
- Generate a unique filename with timestamp (e.g., `my-react-tutorial-2026-02-26-07:14:42.md`)
- Create the file with proper frontmatter
- Auto-populate the title, date, and tags
- Add a heading and placeholder content

### Step 2: Write Your Content

Edit the created file and write your markdown content:

```bash
# The file will be in src/posts/
nano src/posts/my-react-tutorial-2026-02-26-07:14:42.md
```

Example content:

```markdown
---
title: My React Tutorial
date: 2026-02-26T07:14:42.727Z
tags: ["react", "tutorial"]
excerpt: Learn React hooks in this comprehensive guide.
---

# My React Tutorial

Write your content here in markdown format...

## Section 1

Use **bold**, *italics*, and `code` formatting.

## Section 2

Add images, lists, and more:

- Bullet point 1
- Bullet point 2

```

### Step 3: Save and View

1. Save the file
2. Your dev server should automatically reload
3. View your post at: `http://localhost:5173/post/[slug]`

## File Structure

Each blog post is a markdown file with YAML frontmatter:

```markdown
---
title: Blog Post Title    # Required
date: 2026-02-26T07:14:42.727Z  # Auto-populated (ISO format)
tags: ["tag1", "tag2"]     # Required (array of strings)
excerpt: Short summary     # Optional
---

# Heading

Your markdown content here...
```

## Frontmatter Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `title` | string | Yes | Post title (displayed in header) |
| `date` | string | Yes | Publication date (ISO format) |
| `tags` | array | Yes | Array of tag strings for categorization |
| `excerpt` | string | No | Short summary (optional, shown in list) |
| `content` | string | - | Markdown content after frontmatter |

## Slug Generation

The script automatically generates a URL-friendly slug from your title:

- Title: "My React Tutorial"
- Slug: `my-react-tutorial-2026-02-26-07:14:42`
- Filename: `my-react-tutorial-2026-02-26-07:14:42.md`

The timestamp ensures unique filenames even with similar titles.

## Examples

### Basic Post

```bash
bun run create-post "Welcome to My Blog" "introduction"
```

### Post with Multiple Tags

```bash
bun run create-post "Building a Blog in React" "react,web,tutorial"
```

### Post with Special Characters

```bash
bun run create-post "React & Vue: A Comparison" "react,vue,comparison"
# Slug: react-vue-a-comparison-2026-02-26-07:14:42
```

## Common Issues

### Post Not Appearing

1. Make sure the file is in `src/posts/` directory
2. Check that frontmatter is properly formatted (between `---`)
3. Ensure the dev server is running (`bun run dev`)

### Date Not Showing

The date is auto-populated in ISO format. If you want to change it, edit the `date` field in the frontmatter.

### Tags Not Working

Tags must be comma-separated in the script call:
```bash
# Correct
bun run create-post "Title" "tag1,tag2,tag3"

# Incorrect (missing commas)
bun run create-post "Title" "tag1 tag2 tag3"
```

## Advanced: Manual Creation

You can also create posts manually without the script:

1. Create a new `.md` file in `src/posts/`
2. Add frontmatter with required fields
3. Write your content

Example:

```bash
touch src/posts/my-post.md
```

```markdown
---
title: My Manual Post
date: 2026-02-26
tags: ["manual"]
excerpt: Created manually
---

# My Manual Post

Content here...
```

## Notes

- Posts are sorted by date (newest first) on the blog index
- The slug is derived from the filename (everything before `.md`)
- All posts are bundled at build time (static site generation)
- No database required - just markdown files!