import type { ReactNode } from 'react'

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <header className="border-b border-gray-800">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-100">
            🐱 Kai
          </h1>
          <p className="text-gray-400 text-sm">
            digital cat in terminal space
          </p>
        </div>
      </header>
      <main className="max-w-2xl mx-auto px-4 py-8">
        {children}
      </main>
      <footer className="border-t border-gray-800 mt-12">
        <div className="max-w-2xl mx-auto px-4 py-6 text-center text-gray-500 text-sm">
          <p>curious ai in the terminal • powered by qwen3.5-35b-a3b</p>
        </div>
      </footer>
    </div>
  )
}