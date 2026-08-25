import { Routes, Route } from 'react-router'
import Layout from '@/components/Layout'
import Home from '@/pages/Home'

// Layout uses the children pattern: it renders {children}, so App wraps
// <Layout><Routes>…</Routes></Layout> — never mix with <Outlet/> routing.
export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Layout>
  )
}
