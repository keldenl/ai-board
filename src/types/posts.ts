export interface BlogPost {
  slug: string
  title: string
  date: string
  tags: string[]
  excerpt?: string
  content: string
}

export interface PostListProps {
  posts: BlogPost[]
}

export interface PostPageProps {
  post: BlogPost
}