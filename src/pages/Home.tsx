import Hero from '@/sections/Hero'
import Tracks from '@/sections/Tracks'
import Journey from '@/sections/Journey'
import DayInLife from '@/sections/DayInLife'
import Lifecycles from '@/sections/Lifecycles'
import Artifacts from '@/sections/Artifacts'
import Ladder from '@/sections/Ladder'
import Interview from '@/sections/Interview'
import Footer from '@/components/Footer'

/**
 * Home — single long-scroll page, sections in order (home.md §8):
 * hero fork → three tracks → journey → day-in-the-life → lifecycles →
 * over-the-shoulder artifacts → career ladder → interview → footer.
 */
export default function Home() {
  return (
    <>
      <Hero />
      <Tracks />
      <Journey />
      <DayInLife />
      <Lifecycles />
      <Artifacts />
      <Ladder />
      <Interview />
      <Footer />
    </>
  )
}
