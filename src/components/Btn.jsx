export default function Btn({
  children,
  onClick,
  variant  = 'primary',
  size     = 'md',
  full     = false,
  loading  = false,
  disabled = false,
  type     = 'button',
  ariaLabel,
}) {
  const sizes = {
    sm: 'text-xs  px-4  py-2',
    md: 'text-sm  px-5  py-2.5',
    lg: 'text-base px-7 py-3.5',
  }

  const variants = {
    primary:  'bg-[#F9A825] hover:bg-[#F59E0B] text-slate-900 font-black shadow-[0_6px_24px_rgba(249,168,37,.35)]',
    secondary:'bg-[#0066CC] hover:bg-[#004FA3] text-white    font-bold  shadow-[0_6px_24px_rgba(0,102,204,.25)]',
    ghost:    'bg-white/10  hover:bg-white/18  text-white    font-bold  border border-white/30 backdrop-blur-sm',
    outline:  'border-2 border-[#0066CC] text-[#0066CC] hover:bg-[#0066CC] hover:text-white font-bold',
    danger:   'bg-red-600   hover:bg-red-700   text-white    font-bold',
  }

  const isDisabled = disabled || loading

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      aria-label={ariaLabel}
      aria-busy={loading}
      className={[
        'inline-flex items-center justify-center gap-2 rounded-xl',
        'transition-all duration-200',
        'hover:-translate-y-0.5 active:translate-y-0',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F9A825]',
        'disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none',
        sizes[size],
        variants[variant],
        full ? 'w-full' : '',
      ].join(' ')}
    >
      {loading && (
        <span
          className="w-4 h-4 border-2 border-current/30 border-t-current rounded-full animate-spin-slow"
          aria-hidden="true"
        />
      )}
      {children}
    </button>
  )
}
