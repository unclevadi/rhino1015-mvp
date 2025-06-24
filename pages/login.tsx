// pages/login.tsx
import { useState } from 'react'
import { supabase } from '../lib/supabaseClient'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const { error } = await supabase.auth.signInWithOtp({ email })

    if (error) {
      setMessage(`Ошибка: ${error.message}`)
    } else {
      setMessage('Ссылка для входа отправлена на почту!')
    }

    setLoading(false)
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-900">
      <form onSubmit={handleLogin} className="bg-gray-800 p-8 rounded shadow-md w-96">
        <h2 className="text-white text-2xl mb-6 text-center">🦏 Rhino 1015 Login</h2>
        <input
          className="w-full p-2 rounded mb-4 text-black"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          type="submit"
          disabled={loading}
        >
          {loading ? 'Sending...' : 'Send Magic Link'}
        </button>
        {message && <p className="text-white mt-4 text-center">{message}</p>}
      </form>
    </div>
  )
}
