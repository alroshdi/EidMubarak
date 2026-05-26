import { motion } from 'framer-motion'

export const PAGES = {
  home: 'home',
  game: 'game',
  memory: 'memory',
}

/** Fixed top navigation — always visible when switching pages */
export default function TopNav({
  activePage,
  onNavigate,
  navCopy,
  isPlaying,
  onTogglePlay,
  playLabel,
  pauseLabel,
  lang,
  onSetLang,
  isRtl,
}) {
  const links = [
    { id: PAGES.home, label: navCopy.home },
    { id: PAGES.game, label: navCopy.game },
    { id: PAGES.memory, label: navCopy.memory },
  ]

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-[#0a1628]/85 shadow-[0_4px_30px_rgba(0,0,0,0.4)] backdrop-blur-xl"
    >
      <div
        dir="ltr"
        className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-3 py-2 sm:gap-4 sm:px-6 sm:py-2.5"
      >
        {/* Brand logo — large, transparent PNG */}
        <motion.button
          type="button"
          onClick={() => onNavigate(PAGES.home)}
          className="cursor-pointer shrink-0 bg-transparent p-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a1628]"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.98 }}
          aria-label={navCopy.home}
        >
          <img
            src="/assets/images/logo.png"
            alt="Eid Mubarak"
            className="h-14 w-auto max-w-[200px] object-contain sm:h-16 sm:max-w-[240px] md:h-[4.5rem] md:max-w-[280px]"
            draggable={false}
          />
        </motion.button>

        {/* Page links — RTL order in Arabic (الرئيسية → اللعبة → جدار التهاني) */}
        <nav
          dir={isRtl ? 'rtl' : 'ltr'}
          className={`flex flex-1 items-center gap-0.5 sm:gap-1 ${
            isRtl ? 'justify-start font-arabic-display' : 'justify-center'
          }`}
          aria-label="Main navigation"
        >
          {links.map((link) => {
            const active = activePage === link.id
            return (
              <motion.button
                key={link.id}
                type="button"
                onClick={() => onNavigate(link.id)}
                className={`cursor-pointer relative rounded-lg px-3 py-2 text-xs font-medium transition-colors sm:px-4 sm:text-sm ${
                  active
                    ? 'bg-amber-500/20 text-amber-100'
                    : 'text-white/60 hover:bg-white/5 hover:text-amber-100/90'
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

        {/* Audio + language — always visible */}
        <div className="flex shrink-0 items-center gap-2">
          <motion.button
            type="button"
            onClick={onTogglePlay}
            className={`cursor-pointer rounded-lg bg-gradient-to-r from-amber-600 to-amber-500 px-3 py-2 text-xs font-semibold text-[#0a1628] shadow-[0_2px_16px_rgba(212,175,55,0.4)] sm:px-4 sm:text-sm ${isRtl ? 'font-arabic-display' : ''}`}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            aria-label={isPlaying ? pauseLabel : playLabel}
          >
            <span className="hidden sm:inline">
              {isPlaying ? pauseLabel : playLabel}
            </span>
            <span className="sm:hidden" aria-hidden>
              {isPlaying ? '⏸' : '▶'}
            </span>
          </motion.button>

          <div
            className="flex overflow-hidden rounded-lg border border-amber-400/40 bg-white/5 backdrop-blur-md"
            role="group"
            aria-label="Language"
          >
            <LangButton active={lang === 'en'} onClick={() => onSetLang('en')}>
              EN
            </LangButton>
            <LangButton active={lang === 'ar'} onClick={() => onSetLang('ar')} arabic>
              عربي
            </LangButton>
          </div>
        </div>
      </div>
    </header>
  )
}

function LangButton({ children, active, onClick, arabic = false }) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      className={`cursor-pointer px-3 py-2 text-xs font-semibold sm:text-sm ${arabic ? 'font-arabic-display' : ''} ${
        active
          ? 'bg-gradient-to-r from-amber-600 to-amber-500 text-[#0a1628]'
          : 'text-amber-100/90 hover:bg-white/10'
      }`}
      whileTap={{ scale: 0.97 }}
      aria-pressed={active}
    >
      {children}
    </motion.button>
  )
}
