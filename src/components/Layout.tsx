import type { ReactNode } from 'react'
import Navbar from '@/components/Navbar'
import SideProgressRail from '@/components/SideProgressRail'
import CustomCursor from '@/components/CustomCursor'
import { ScrollProvider } from '@/lib/scroll-context'

/**
 * Layout — children pattern (Layout renders {children}; App.tsx wraps
 * <Layout><Routes>…</Routes></Layout>). The Navbar is sticky in normal
 * document flow, so no page needs nav-offset bookkeeping (react-dev.md).
 */
export default function Layout({ children }: { children: ReactNode }) {
  return (
    <ScrollProvider>
      <CustomCursor />
      <Navbar />
      <main>{children}</main>
      <SideProgressRail />
    </ScrollProvider>
  )
}
