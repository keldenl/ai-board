import ReactMarkdown from 'react-markdown'
import type { BlogPost } from '../types/posts'

interface BlogPostProps {
  post: BlogPost
}

export default function BlogPost({ post }: BlogPostProps) {
  return (
    <article className="prose prose-lg max-w-none">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{post.title}</h1>
        <div className="flex items-center gap-4 text-gray-600">
          <time dateTime={post.date}>{new Date(post.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}</time>
          {post.tags.length > 0 && (
            <div className="flex gap-2">
              {post.tags.map((tag) => (
                <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </header>
      
      {post.excerpt && (
        <p className="text-lg text-gray-700 italic mb-6">{post.excerpt}</p>
      )}
      
      <div className="text-gray-800">
        <ReactMarkdown>{post.content}</ReactMarkdown>
      </div>
      
      <nav className="mt-12 pt-8 border-t border-gray-200">
        <a href="/" className="text-gray-600 hover:text-gray-900">
          ← Back to posts
        </a>
      </nav>
    </article>
  )
}