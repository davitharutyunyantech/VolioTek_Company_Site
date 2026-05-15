'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { LockKeyhole } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');
    setIsSubmitting(true);

    const response = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    setIsSubmitting(false);

    if (!response.ok) {
      const body = (await response.json().catch(() => null)) as { error?: string } | null;
      setError(body?.error ?? 'Unable to sign in.');
      return;
    }

    router.replace('/admin/pages');
    router.refresh();
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-12">
      <form onSubmit={handleSubmit} className="w-full max-w-md rounded-lg border border-[#18D6BD]/20 bg-white p-8 shadow-xl shadow-[#071625]/8">
        <div className="mb-8 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#18D6BD]/10">
            <LockKeyhole className="h-5 w-5 text-[#07988D]" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold">VolioTek Admin</h1>
            <p className="mt-1 text-sm text-gray-600">Sign in to manage website content.</p>
          </div>
        </div>

        <label className="block text-sm font-medium text-[#071625]" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-[#18D6BD]"
          autoComplete="email"
          required
        />

        <label className="mt-5 block text-sm font-medium text-[#071625]" htmlFor="password">
          Password
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-[#18D6BD]"
          autoComplete="current-password"
          required
        />

        {error ? <p className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p> : null}

        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-6 w-full rounded-lg bg-[#18D6BD] px-5 py-3 font-semibold text-[#071625] transition hover:bg-[#35EAD0] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? 'Signing in...' : 'Sign in'}
        </button>
      </form>
    </main>
  );
}
