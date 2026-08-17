// src/components/Toast.jsx
import { createContext, useContext, useState, useCallback, useRef } from 'react'
import { Info } from 'lucide-react'

const ToastContext = createContext(null)

export function ToastProvider({ children }) {
  const [message, setMessage] = useState(null)
  const timerRef = useRef(null)

  const showToast = useCallback((texte) => {
    setMessage(texte)
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => setMessage(null), 2600)
  }, [])

  return (
    <ToastContext.Provider value={showToast}>
      {children}
      {message && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-[80] px-5 py-3 rounded-2xl shadow-2xl
          bg-[#001A4D] text-white text-sm font-bold flex items-center gap-2 max-w-[90vw]"
          style={{ animation:'fadeInUp 0.35s cubic-bezier(0.22,1,0.36,1)' }}>
          <Info size={16} className="flex-shrink-0" color="#FCD603" />
          {message}
        </div>
      )}
    </ToastContext.Provider>
  )
}

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) {
    // Filet de securite si le provider n'est pas monte (ne devrait pas arriver)
    return (msg) => console.warn('Toast:', msg)
  }
  return ctx
}
