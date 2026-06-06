import { motion } from 'framer-motion'

/** Play Takbeer + language — fixed top-left on every page */
export default function PageControls({
  isPlaying,
  onTogglePlay,
  playLabel,
  pauseLabel,
  lang,
  onSetLang,
  isRtl,
}) {
  return (
    <motion.div
      dir="ltr"
      className="fixed top-4 left-4 z-[60] flex flex-wrap items-center gap-2 sm:top-5 sm:left-5 sm:gap-3"
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
    >
      <motion.button
        type="button"
        onClick={onTogglePlay}
        className={`cursor-pointer rounded-xl bg-gradient-to-r from-amber-600 to-amber-500 px-4 py-2.5 text-xs font-semibold text-[#0a1628] shadow-[0_4px_20px_rgba(212,175,55,0.45)] sm:px-5 sm:py-3 sm:text-sm ${isRtl ? 'font-arabic-display' : ''}`}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.97 }}
        aria-label={isPlaying ? pauseLabel : playLabel}
      >
        {isPlaying ? pauseLabel : playLabel}
      </motion.button>

      <div
        className="flex overflow-hidden rounded-xl border border-amber-400/40 bg-transparent"
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
    </motion.div>
  )
}

function LangButton({ children, active, onClick, arabic = false }) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      className={`cursor-pointer bg-transparent px-3 py-2.5 text-xs font-semibold sm:px-4 sm:py-3 sm:text-sm ${arabic ? 'font-arabic-display' : ''} ${
        active
          ? 'bg-gradient-to-r from-amber-600 to-amber-500 text-[#0a1628]'
          : 'text-amber-100/90 hover:text-amber-50'
      }`}
      whileTap={{ scale: 0.97 }}
      aria-pressed={active}
    >
      {children}
    </motion.button>
  )
}
