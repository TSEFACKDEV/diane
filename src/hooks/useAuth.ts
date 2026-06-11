'use client'
import { useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { useAppDispatch, useAppSelector } from '@/store'
import { setCredentials, setLoading, logout as logoutAction } from '@/store/slices/authSlice'
import { toast } from 'react-toastify'

export function useAuth() {
  const dispatch = useAppDispatch()
  const router   = useRouter()
  const { user, isAuthenticated, isLoading } = useAppSelector(s => s.auth)

  // Rehydrater depuis /api/auth/me au montage
  useEffect(() => {
    if (isAuthenticated) return
    dispatch(setLoading(true))
    fetch('/api/auth/me')
      .then(r => r.json())
      .then(data => {
        if (data.user) {
          dispatch(setCredentials({ user: data.user, token: '' }))
        }
      })
      .catch(() => {})
      .finally(() => dispatch(setLoading(false)))
  }, [])

  const login = useCallback(async (email: string, password: string) => {
    dispatch(setLoading(true))
    try {
      const res  = await fetch('/api/auth/login', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ email, password }),
      })
      const data = await res.json()

      if (!data.success) {
        toast.error(data.message ?? 'Identifiants invalides')
        return false
      }

      dispatch(setCredentials({ user: data.user, token: data.token }))
      toast.success(`Bienvenue, ${data.user.name} !`)
      router.push('/admin/dashboard')
      return true
    } catch {
      toast.error('Erreur de connexion au serveur')
      return false
    } finally {
      dispatch(setLoading(false))
    }
  }, [dispatch, router])

  const logout = useCallback(async () => {
    await fetch('/api/auth/logout', { method: 'POST' })
    dispatch(logoutAction())
    toast.info('Vous avez été déconnecté')
    router.push('/auth/login')
  }, [dispatch, router])

  const isAdmin = user?.role === 'ADMIN' || user?.role === 'SUPER_ADMIN'

  return { user, isAuthenticated, isLoading, isAdmin, login, logout }
}