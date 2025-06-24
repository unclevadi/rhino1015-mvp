import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function HomePage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getUser().then(({ data, error }) => {
      if (data?.user) {
        setUser(data.user);
      }
      setLoading(false);
    });
  }, []);

  if (loading) return <p className="text-white">Загрузка...</p>;

  if (!user) {
    return (
      <div className="text-white flex items-center justify-center h-screen">
        <p>Вы не авторизованы. Пожалуйста, <a className="underline" href="/login">войдите</a>.</p>
      </div>
    );
  }

  return (
    <div className="text-white flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold">Добро пожаловать 👋</h1>
      <p className="mt-4">Ваш email: {user.email}</p>
    </div>
  );
}
