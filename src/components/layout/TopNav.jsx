import { motion } from 'framer-motion'

export const PAGES = {
  home: 'home',
  game: 'game',
  memory: 'memory',
}

/** Top navigation — centered page links only */
export default function TopNav({ activePage, onNavigate, navCopy, isRtl }) {
  const links = [
    { id: PAGES.home, label: navCopy.home },
    { id: PAGES.game, label: navCopy.game },
    { id: PAGES.memory, label: navCopy.memory },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-transparent">
      <nav
        dir={isRtl ? 'rtl' : 'ltr'}
        className={`mx-auto flex max-w-6xl items-center justify-center gap-1 px-4 py-3 sm:gap-2 sm:px-6 sm:py-4 ${isRtl ? 'font-arabic-display' : ''}`}
        aria-label="Main navigation"
      >
        {links.map((link) => {
          const active = activePage === link.id
          return (
            <motion.button
              key={link.id}
              type="button"
              onClick={() => onNavigate(link.id)}
              className={`cursor-pointer relative bg-transparent px-3 py-2 text-xs font-medium transition-colors sm:px-4 sm:text-sm ${
                active
                  ? 'text-amber-200'
                  : 'text-white/65 hover:text-amber-100/90'
              }`}
              whileTap={{ scale: 0.97 }}
              aria-current={active ? 'page' : undefined}
            >
              {link.label}
              {active && (
                <motion.span
                  layoutId="nav-indicator"
                  className="absolute bottom-0 left-2 right-2 h-0.5 rounded-full bg-amber-400"
                  transition={{ type: 'spring', stiffness: 380, damping: 28 }}
                />
              )}
            </motion.button>
          )
        })}
      </nav>
    </header>
  )
}
