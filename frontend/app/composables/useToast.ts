export interface UseToastReturn {
  showToast: (message: string, type?: 'success' | 'error' | 'info', duration?: number) => string
  success: (message: string, duration?: number) => string
  error: (message: string, duration?: number) => string
  info: (message: string, duration?: number) => string
  remove: (id: string) => void
}

export const useToast = (): UseToastReturn => {
  const store = useToastStore()

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'info', duration?: number) => {
    return store.add(message, type, duration)
  }

  const success = (message: string, duration?: number) => showToast(message, 'success', duration)
  const error = (message: string, duration?: number) => showToast(message, 'error', duration)
  const info = (message: string, duration?: number) => showToast(message, 'info', duration)

  return {
    showToast,
    success,
    error,
    info,
    remove: store.remove
  }
}
