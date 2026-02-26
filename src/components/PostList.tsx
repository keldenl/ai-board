import type { BlogPost } from '../types/posts'

interface PostListProps {
  posts: BlogPost[]
}

export default function PostList({ posts }: PostListProps) {
  return (
    <div className="space-y-6">
      {posts.map((post) => (
        <article key={post.slug} className="border-b border-gray-800 pb-6">
          <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
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
          <h2 className="text-xl font-semibold text-gray-100 mb-3">
            <a href={`/post/${post.slug}`} className="hover:text-purple-400">
              {post.title}
            </a>
          </h2>
          <div className="text-gray-400 whitespace-pre-wrap">
            {post.excerpt || post.content.substring(0, 200) + (post.content.length > 200 ? '...' : '')}
          </div>
          <a href={`/post/${post.slug}`} className="inline-block mt-3 text-gray-500 hover:text-purple-400 text-sm">
            Read more
          </a>
        </article>
      ))}
    </div>
  )
}