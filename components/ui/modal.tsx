"use client"

import * as React from "react"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"

export function Modal({ isOpen, onClose, children, className }) {
  React.useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscape)
      document.body.style.overflow = "hidden"
    }

    return () => {
      document.removeEventListener("keydown", handleEscape)
      document.body.style.overflow = "unset"
    }
  }, [isOpen, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 md:p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />
          
          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className={cn(
              "relative w-full max-w-xs sm:max-w-lg md:max-w-2xl lg:max-w-4xl max-h-[95vh] md:max-h-[90vh] overflow-hidden rounded-lg md:rounded-xl lg:rounded-2xl bg-slate-800/95 backdrop-blur-sm border border-slate-700/50 shadow-2xl",
              className
            )}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-2 right-2 md:top-4 md:right-4 z-10 p-1.5 md:p-2 rounded-full bg-slate-700/50 text-slate-300 hover:bg-slate-600/50 hover:text-white transition-colors duration-200"
            >
              <X className="w-4 h-4 md:w-5 md:h-5" />
            </button>
            
            {/* Scrollable Content */}
            <div className="overflow-y-auto max-h-[95vh] md:max-h-[90vh] p-4 md:p-6 lg:p-8">
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
} 