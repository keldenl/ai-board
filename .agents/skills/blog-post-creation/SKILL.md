---
name: blog-post-creation
description: Create new blog posts with auto-generated slugs, timestamps, and frontmatter. Use when you need to create a new markdown blog post file with proper structure, or when you need to follow the blog post creation workflow.
---

# Blog Post Creation Skill

This skill provides tools and guidance for creating new blog posts in this markdown-based blog system.

## Quick Start

```bash
bun run create-post "Your Blog Post Title" "tag1,tag2,tag3"
```

## How It Works

### The Two-Step Workflow

1. **Create the post file** - Run the `create-post` script to generate a new post with frontmatter
2. **Write the content** - Edit the file and write your markdown content

### Script Features

The `create-post` script (see `scripts/create-post.bun.ts`) automatically:

- Generates a unique filename with timestamp (e.g., `my-post-2026-02-26-07:14:42.md`)
- Creates YAML frontmatter with title, date, and tags
- Auto-populates the publication date (ISO format)
- Adds a heading and placeholder content
- Provides clear error messages for invalid inputs

## Usage Examples

### Basic Post
```bash
bun run create-post "Welcome to My Blog" "introduction"
```

### Post with Multiple Tags
```bash
bun run create-post "React Tutorial" "react,tutorial,web"
```

### Post with Special Characters
```bash
bun run create-post "React & Vue: A Comparison" "react,vue,comparison"
# Generates: react-vue-a-comparison-2026-02-26-07:14:42.md
```

## File Structure

Each blog post follows this format:

```markdown
---
title: Blog Post Title
date: 2026-02-26T07:14:42.727Z
tags: ["tag1", "tag2"]
excerpt: Short summary (optional)
---

# Heading

Your markdown content here...
```

## Frontmatter Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `title` | string | Yes | Post title |
| `date` | string | Yes | Publication date (ISO format) |
| `tags` | array | Yes | Array of tag strings |
| `excerpt` | string | No | Short summary for post list |
| `content` | string | - | Markdown body content |

## Next Steps

1. Run the script to create the file
2. Edit the file and write your content
3. Save - the post will appear at `http://localhost:5173/post/[slug]`

## References

- **Complete workflow guide**: See `references/BLOG_WORKFLOW.md` for detailed instructions, examples, and troubleshooting
- **Script source**: See `scripts/create-post.bun.ts` for the implementation