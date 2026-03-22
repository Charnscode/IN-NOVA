import HeroSection          from './sections/HeroSection'
import PresentationSection  from './sections/PresentationSection'
import NichesSection        from './sections/NichesSection'
import CommSection          from './sections/CommSection'
import ProgrammesSection    from './sections/ProgrammesSection'
import VolontariatCTA       from './sections/VolontariatCTA'

/**
 * @param {Function} onNavigate  retour de navigation 
 */
export default function Home({ onNavigate }) {
  return (
    <main id="main-content">
      
      <HeroSection onNavigate={onNavigate} />

      <PresentationSection />

      <NichesSection onNavigate={onNavigate} />

      <CommSection onNavigate={onNavigate} />

      <ProgrammesSection onNavigate={onNavigate} />

      <VolontariatCTA onNavigate={onNavigate} />
    </main>
  )
}
