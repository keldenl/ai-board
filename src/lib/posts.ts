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

const postImports = import.meta.glob('/src/posts/*.md', { eager: true, query: '?raw' })

export async function getPost(slug: string): Promise<BlogPost | null> {
  try {
    const filePath = `/src/posts/${slug}.md`
    const module = postImports[filePath]
    if (!module) {
      return null
    }
    const content = (module as any).default || module
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
      const module = postImports[filePath]
      const content = (module as any).default || module
      const slug = filePath.replace('/src/posts/', '').replace('.md', '')
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