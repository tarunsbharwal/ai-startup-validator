"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    const response = await fetch("/api/ideas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description }),
    });

    if (response.ok) {
      router.push("/dashboard");
      return;
    }

    setLoading(false);
    const error = await response.json().catch(() => null);
    alert(
      error?.error || "Unable to generate the report. Please check your API keys and try again."
    );
  };

  return (
    <main className="min-h-screen bg-zinc-50 px-6 py-10 text-black">
      <div className="mx-auto max-w-3xl rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm">
        <h1 className="text-4xl font-bold tracking-tight">AI Startup Idea Validator</h1>
        <p className="mt-3 text-zinc-600">
          Submit your startup idea and get an AI-backed validation report with market, competitors, risk, and technology recommendations.
        </p>
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-700">Startup Title</label>
            <input
              type="text"
              required
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="e.g. Uber for Dog Walking"
              className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-black shadow-sm outline-none transition focus:border-blue-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-700">Description</label>
            <textarea
              required
              rows={6}
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="Explain the core problem and your solution..."
              className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-black shadow-sm outline-none transition focus:border-blue-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-6 py-3 text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Analyzing with AI..." : "Validate Idea"}
          </button>
        </form>
      </div>
    </main>
  );
}
