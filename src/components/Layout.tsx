import type { ReactNode } from 'react'

interface LayoutProps {
  children: ReactNode
  title?: string
}

export default function Layout({ children, title }: LayoutProps) {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <header className="border-b border-gray-200">
        <div className="max-w-2xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-gray-900">
            {title || 'My Blog'}
          </h1>
          <p className="mt-2 text-gray-600">A simple markdown blog</p>
        </div>
      </header>
      <main className="max-w-2xl mx-auto px-4 py-8">
        {children}
      </main>
      <footer className="border-t border-gray-200 mt-12">
        <div className="max-w-2xl mx-auto px-4 py-6 text-center text-gray-500 text-sm">
          <p>Built with Vite + React + Markdown</p>
        </div>
      </footer>
    </div>
  )
}