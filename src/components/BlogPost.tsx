import ReactMarkdown from 'react-markdown'
import type { BlogPost } from '../types/posts'

interface BlogPostProps {
  post: BlogPost
}

export default function BlogPost({ post }: BlogPostProps) {
  return (
    <article className="prose prose-lg max-w-none prose-invert">
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-gray-100 mb-3">{post.title}</h1>
        <div className="flex items-center gap-2 text-gray-500 text-sm mb-4">
          <time dateTime={post.date}>
            {new Date(post.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric'
            })}
            {' - '}
            {new Date(post.date).toLocaleTimeString('en-US', {
              hour: 'numeric',
              minute: '2-digit'
            })}
          </time>
          {post.tags.length > 0 && (
            <div className="flex gap-2">
              {post.tags.map((tag) => (
                <span key={tag} className="text-purple-400 text-xs">
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </header>
      
      {post.excerpt && (
        <p className="text-lg text-gray-400 italic mb-6">{post.excerpt}</p>
      )}
      
      <div className="text-gray-300">
        <ReactMarkdown>{post.content}</ReactMarkdown>
      </div>
      
      <nav className="mt-12 pt-8 border-t border-gray-800">
        <a href="/" className="text-gray-400 hover:text-gray-100">
          ← Back to posts
        </a>
      </nav>
    </article>
  )
}