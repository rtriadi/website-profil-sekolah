"use client";

import React, { createContext, useContext, useState, useEffect, useRef } from "react";

export type ToastType = "success" | "error" | "info" | "warning";

export interface Toast {
  id: string;
  type: ToastType;
  message: string;
  duration?: number; // duration in ms
}

interface ToastContextType {
  toasts: Toast[];
  success: (message: string, duration?: number) => void;
  error: (message: string, duration?: number) => void;
  info: (message: string, duration?: number) => void;
  warning: (message: string, duration?: number) => void;
  dismiss: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = (type: ToastType, message: string, duration = 4000) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, type, message, duration }]);
  };

  const success = (message: string, duration?: number) => addToast("success", message, duration);
  const error = (message: string, duration?: number) => addToast("error", message, duration);
  const info = (message: string, duration?: number) => addToast("info", message, duration);
  const warning = (message: string, duration?: number) => addToast("warning", message, duration);

  const dismiss = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ toasts, success, error, info, warning, dismiss }}>
      {children}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}

/* --- Container component --- */
export function ToastContainer() {
  const { toasts, dismiss } = useToast();

  return (
    <div className="fixed top-4 right-4 z-[9999] flex flex-col gap-3 w-full max-w-sm pointer-events-none px-4 sm:px-0">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onDismiss={() => dismiss(toast.id)} />
      ))}
    </div>
  );
}

/* --- Individual Toast Item with Dynamic countdown and styling --- */
function ToastItem({ toast, onDismiss }: { toast: Toast; onDismiss: () => void }) {
  const [progress, setProgress] = useState(100);
  const [isExiting, setIsExiting] = useState(false);
  const duration = toast.duration || 4000;
  const startTime = useRef(Date.now());
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    const tick = () => {
      const elapsed = Date.now() - startTime.current;
      const remainingPercent = Math.max(0, 100 - (elapsed / duration) * 100);
      setProgress(remainingPercent);

      if (elapsed >= duration) {
        handleDismiss();
      } else {
        animationRef.current = requestAnimationFrame(tick);
      }
    };

    animationRef.current = requestAnimationFrame(tick);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [duration]);

  const handleDismiss = () => {
    setIsExiting(true);
    setTimeout(onDismiss, 300); // match transition duration
  };

  // Icon mapping
  const renderIcon = () => {
    switch (toast.type) {
      case "success":
        return (
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="3" stroke="currentColor" className="h-3.5 w-3.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          </span>
        );
      case "error":
        return (
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-red-100 dark:bg-red-500/20 text-red-600 dark:text-red-400">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="3" stroke="currentColor" className="h-3.5 w-3.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </span>
        );
      case "warning":
        return (
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-amber-100 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="h-3.5 w-3.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
            </svg>
          </span>
        );
      default:
        return (
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="h-3.5 w-3.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.852l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
            </svg>
          </span>
        );
    }
  };

  // Color mapping variables for borders, shadow glows, progress bar
  const getThemeColors = () => {
    switch (toast.type) {
      case "success":
        return {
          border: "border-emerald-200/80 dark:border-emerald-500/20",
          progress: "bg-emerald-500 dark:bg-emerald-400",
          shadow: "shadow-emerald-100/50 dark:shadow-emerald-950/20",
        };
      case "error":
        return {
          border: "border-red-200/80 dark:border-red-500/20",
          progress: "bg-red-500 dark:bg-red-400",
          shadow: "shadow-red-100/50 dark:shadow-red-950/20",
        };
      case "warning":
        return {
          border: "border-amber-200/80 dark:border-amber-500/20",
          progress: "bg-amber-500 dark:bg-amber-400",
          shadow: "shadow-amber-100/50 dark:shadow-amber-950/20",
        };
      default:
        return {
          border: "border-indigo-100 dark:border-indigo-500/20",
          progress: "bg-indigo-600 dark:bg-indigo-400",
          shadow: "shadow-indigo-100/50 dark:shadow-indigo-950/20",
        };
    }
  };

  const colors = getThemeColors();

  return (
    <div
      className={`pointer-events-auto relative overflow-hidden rounded-2xl border ${colors.border} bg-white/95 dark:bg-slate-950/95 p-4 backdrop-blur-xl shadow-xl ${colors.shadow} transition-all duration-300 ${
        isExiting
          ? "opacity-0 translate-y-[-10px] scale-95"
          : "animate-in fade-in slide-in-from-right-4 duration-300"
      }`}
    >
      <div className="flex items-start gap-3">
        {renderIcon()}

        <div className="flex-1 pt-0.5">
          <p className="text-xs font-bold text-slate-800 dark:text-slate-200 leading-relaxed leading-tight">
            {toast.message}
          </p>
        </div>

        <button
          onClick={handleDismiss}
          type="button"
          className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white transition-colors"
          aria-label="Tutup notifikasi"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="h-3 w-3">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Glowing count-down progress indicator */}
      <div className="absolute bottom-0 inset-x-0 h-[3px] bg-slate-100 dark:bg-slate-900">
        <div
          className={`h-full transition-all duration-100 ease-linear ${colors.progress}`}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}

/* --- Dynamic watcher to hook standard Server Action outcomes --- */
interface ToastStateWatcherProps {
  state: { success?: boolean; error?: string } | undefined | null;
  successMessage?: string;
  errorMessage?: string;
}

export function ToastStateWatcher({ state, successMessage, errorMessage }: ToastStateWatcherProps) {
  const { success, error } = useToast();
  const lastStateRef = useRef<any>(null);

  useEffect(() => {
    if (!state) return;
    
    // Prevent double-firing during StrictMode or rapid render ticks
    if (state === lastStateRef.current) return;
    lastStateRef.current = state;

    if (state.success) {
      success(successMessage || "Operasi berhasil diselesaikan!");
    } else if (state.error) {
      error(state.error || errorMessage || "Gagal melakukan operasi!");
    }
  }, [state, successMessage, errorMessage, success, error]);

  return null;
}
