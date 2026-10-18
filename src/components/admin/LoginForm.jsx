"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const router = useRouter();

  async function submit(e) {
    e.preventDefault(); setBusy(true); setError("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Unable to sign in.");
      router.replace("/admin/updates"); router.refresh();
    } catch (err) { setError(err.message); }
    finally { setBusy(false); }
  }

  return <form className="admin-form" onSubmit={submit}>
    <label htmlFor="password">Admin password</label>
    <input id="password" type="password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={1} />
    {error && <p className="form-error" role="alert">{error}</p>}
    <button className="button button-primary button-full" disabled={busy}>{busy ? "Signing in…" : "Sign in securely"}</button>
  </form>;
}
