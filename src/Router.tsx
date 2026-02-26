import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom'
import Layout from './components/Layout'
import PostList from './components/PostList'
import BlogPost from './components/BlogPost'
import { getAllPosts, getPost } from './lib/posts'
import type { BlogPost as BlogPostType } from './types/posts'

function BlogIndex() {
  const [posts, setPosts] = useState<BlogPostType[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getAllPosts().then((posts) => {
      setPosts(posts)
      setLoading(false)
    })
  }, [])

  if (loading) {
    return <div className="text-center py-12">Loading posts...</div>
  }

  return (
    <Layout>
      <nav className="mb-8">
        <Link to="/" className="text-gray-600 hover:text-gray-900">
          Home
        </Link>
      </nav>
      <PostList posts={posts} />
    </Layout>
  )
}

function PostPage() {
  const location = useLocation()
  const slug = location.pathname.replace('/post/', '')
  const [post, setPost] = useState<BlogPostType | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getPost(slug).then((post) => {
      setPost(post)
      setLoading(false)
    })
  }, [slug])

  if (loading) {
    return <div className="text-center py-12">Loading post...</div>
  }

  if (!post) {
    return (
      <Layout>
        <div className="text-center py-12">
          <h2 className="text-xl text-gray-900 mb-4">Post not found</h2>
          <Link to="/" className="text-gray-600 hover:text-gray-900">
            Back to posts
          </Link>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <BlogPost post={post} />
    </Layout>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BlogIndex />} />
        <Route path="/post/:slug" element={<PostPage />} />
      </Routes>
    </BrowserRouter>
  )
}