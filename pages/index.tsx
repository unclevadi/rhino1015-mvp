import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

interface User {
  email: string;
}

export default function HomePage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getUser().then(({ data, error }) => {
      if (data?.user) {
        setUser(data.user as User);
      }
      setLoading(false);
    });
  }, []);

  if (loading)
    return (
      <div className="text-black flex items-center justify-center h-screen">
        <p>Загрузка...</p>
      </div>
    );

  if (!user) {
    return (
      <div className="text-black flex items-center justify-center h-screen">
        <p>
          Вы не авторизованы. <a className="underline" href="/login">Войдите</a>
        </p>
      </div>
    );
  }

  return (
    <div className="text-black flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold">Добро пожаловать 👋</h1>
      <p className="mt-4">Ваш email: {user.email}</p>
    </div>
  );
}
