#!/usr/bin/env bun

export {}

/**
 * create-post.bun.ts - Create a new blog post
 * 
 * Usage:
 *   bun run create-post.bun.ts "My Blog Post Title" "tag1,tag2,tag3"
 * 
 * This script creates a new blog post with:
 * - Auto-generated filename (slug + timestamp)
 * - Auto-populated frontmatter (title, date, tags)
 * - Empty content body for you to fill in
 * 
 * Workflow:
 * 1. Run this script to create the post file
 * 2. Edit the file and write your markdown content
 * 3. Save and the post will appear in your blog
 */

const args = process.argv.slice(2)

if (args.length < 2) {
  console.error('Error: Missing required arguments')
  console.error('')
  console.error('Usage: bun run create-post.bun.ts "Title" "tag1,tag2,tag3"')
  console.error('')
  console.error('Examples:')
  console.error('  bun run create-post.bun.ts "My First Post" "introduction"')
  console.error('  bun run create-post.bun.ts "React Tutorial" "react,tutorial,web"')
  process.exit(1)
}

const [title, tagsString] = args

// Validate title
if (!title || title.trim() === '') {
  console.error('Error: Title cannot be empty')
  process.exit(1)
}

// Validate and parse tags
const tags = tagsString
  .split(',')
  .map((tag) => tag.trim())
  .filter((tag) => tag !== '')

if (tags.length === 0) {
  console.error('Error: No valid tags provided')
  console.error('Usage: bun run create-post.bun.ts "Title" "tag1,tag2,tag3"')
  process.exit(1)
}

// Generate slug from title (lowercase, replace spaces with hyphens)
const slugBase = title
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/^-+|-+$/g, '')

// Generate timestamp: YYYY-MM-DD-HH-MM-SS
const now = new Date()
const timestamp = now
  .toISOString()
  .replace('T', '-')
  .replace(/\..+/, '')
  .replace(/-00:00/, '')

// Full slug with timestamp to avoid collisions
const slug = `${slugBase}-${timestamp}`

// Create frontmatter
const frontmatter = `---
title: ${title}
date: ${now.toISOString()}
tags: [${tags.map((tag) => `"${tag}"`).join(', ')}]
excerpt: 
---
`

// Create content body with heading
const content = `
# ${title}

Write your blog post content here...

`

// Full markdown content
const markdown = frontmatter + content

// File path
const filePath = `src/posts/${slug}.md`

// Write file
try {
  await Bun.write(filePath, markdown)
  console.log(`✓ Created: ${filePath}`)
  console.log('')
  console.log('Next steps:')
  console.log(`  1. Edit ${filePath} and write your content`)
  console.log('  2. Save the file')
  console.log('  3. Your post will appear at http://localhost:5173/post/${slug}')
} catch (error) {
  console.error('Error writing file:', error)
  process.exit(1)
}