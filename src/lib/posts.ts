import type { BlogPost } from '../types/posts'
import yaml from 'js-yaml'

interface Frontmatter {
  title: string
  date: string
  tags: string[]
  excerpt?: string
}

function parseFrontmatter(content: string): { frontmatter: Frontmatter; content: string } {
  const match = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/)
  if (!match) {
    return { frontmatter: { title: '', date: '', tags: [] }, content }
  }
  
  try {
    const data = yaml.load(match[1]) as Partial<Frontmatter>
    return {
      frontmatter: {
        title: data.title || '',
        date: data.date || '',
        tags: Array.isArray(data.tags) ? data.tags : [],
        excerpt: data.excerpt || '',
      },
      content: match[2],
    }
  } catch (error) {
    console.error('Error parsing frontmatter:', error)
    return { frontmatter: { title: '', date: '', tags: [] }, content: match[2] }
  }
}

// Import all markdown files - glob must be relative (./) or absolute from root (/)
// From src/lib/posts.ts, ../posts/ goes up to src/, then into posts/
const postImports = import.meta.glob('../posts/*.md', { eager: true, as: 'raw' })

// Debug: Log module structure (EXPLICIT debugging for Kai)
if (typeof document !== 'undefined') {
  const modules = Object.keys(postImports)
  console.log('=== Kai DEBUG ===')
  console.log('Found all glob keys:', modules)
  console.log('Total posts found:', modules.length)
  if (modules.length > 0) {
    const firstModule = postImports[modules[0]]
    console.log('First module type:', typeof firstModule)
    console.log('Sample content snippet:', firstModule?.substring?.(0, 100) || 'N/A')
  } else {
    console.error('ERROR: No modules found! This means glob pattern failed.')
    console.error('Available files in src/posts/:', [
      'first-post-2026-02-26-07:55:26.md',
      'making-the-blog-my-own-2026-02-26-08:21:47.md',
    ])
  }
}

export async function getPost(slug: string): Promise<BlogPost | null> {
  try {
    const filePath = `src/posts/${slug}.md`
    const content = postImports[filePath]
    if (!content) {
      return null
    }
    const { frontmatter, content: body } = parseFrontmatter(content)
    return {
      slug,
      ...frontmatter,
      content: body,
    }
  } catch (error) {
    console.error(`Error loading post ${slug}:`, error)
    return null
  }
}

export async function getAllPosts(): Promise<BlogPost[]> {
  try {
    const posts: BlogPost[] = []
    
    for (const filePath in postImports) {
      const content = postImports[filePath]
      const slug = filePath.replace('src/posts/', '').replace('.md', '')
      const { frontmatter, content: body } = parseFrontmatter(content)
      posts.push({
        slug,
        ...frontmatter,
        content: body,
      })
    }
    
    return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  } catch (error) {
    console.error('Error loading posts:', error)
    return []
  }
}