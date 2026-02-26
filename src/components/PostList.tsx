import type { BlogPost } from '../types/posts'

interface PostListProps {
  posts: BlogPost[]
}

export default function PostList({ posts }: PostListProps) {
  return (
    <div className="space-y-8">
      {posts.map((post) => (
        <article key={post.slug} className="border-b border-gray-200 pb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            <a href={`/post/${post.slug}`} className="hover:text-gray-600">
              {post.title}
            </a>
          </h2>
          <div className="flex items-center gap-4 text-gray-600 mb-3">
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
          {post.excerpt && (
            <p className="text-gray-700">{post.excerpt}</p>
          )}
          <a href={`/post/${post.slug}`} className="inline-block mt-3 text-gray-600 hover:text-gray-900">
            Read more →
          </a>
        </article>
      ))}
    </div>
  )
}