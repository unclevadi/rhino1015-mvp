// pages/auth/callback.tsx
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { supabase } from '../../lib/supabaseClient'

export default function AuthCallback() {
  const router = useRouter()

  useEffect(() => {
    const hash = window.location.hash
    const query = new URLSearchParams(hash.replace('#', '?'))
    const access_token = query.get('access_token')
    const refresh_token = query.get('refresh_token')

    if (access_token && refresh_token) {
      supabase.auth.setSession({ access_token, refresh_token })
        .then(() => {
          router.push('/') // после входа отправляем на главную
        })
    } else {
      router.push('/login')
    }
  }, [])

  return <p>Авторизация...</p>
}
