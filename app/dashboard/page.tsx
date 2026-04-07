"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface IdeaSummary {
  _id: string;
  title: string;
  description: string;
  profitability_score?: number;
  risk_level?: string;
}

export default function Dashboard() {
  const [ideas, setIdeas] = useState<IdeaSummary[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/ideas")
      .then((res) => res.json())
      .then((data) => {
        setIdeas(data.data || []);
      })
      .catch(() => setIdeas([]))
      .finally(() => setLoading(false));
  }, []);

  const deleteIdea = async (id: string) => {
    await fetch(`/api/ideas/${id}`, { method: "DELETE" });
    setIdeas((current) => current.filter((idea) => idea._id !== id));
  };

  return (
    <main className="min-h-screen bg-zinc-50 px-6 py-10 text-black">
      <div className="mx-auto max-w-5xl rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-4xl font-bold">Your Ideas</h1>
            <p className="mt-2 text-zinc-600">Review AI validation reports and manage saved startup ideas.</p>
          </div>
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-5 py-3 text-white transition hover:bg-blue-700"
          >
            + New Idea
          </Link>
        </div>

        {loading ? (
          <div className="rounded-3xl border border-dashed border-zinc-200 bg-zinc-50 p-10 text-center text-zinc-500">
            Loading your ideas...
          </div>
        ) : ideas.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-zinc-200 bg-zinc-50 p-10 text-center text-zinc-500">
            No ideas yet. Start with a new submission.
          </div>
        ) : (
          <div className="grid gap-4">
            {ideas.map((idea) => (
              <div key={idea._id} className="flex flex-col gap-4 rounded-3xl border border-zinc-200 bg-zinc-50 p-5 shadow-sm sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h2 className="text-2xl font-semibold text-zinc-950">{idea.title}</h2>
                  <p className="mt-2 text-zinc-600 line-clamp-2">{idea.description}</p>
                  <div className="mt-4 flex flex-wrap gap-3 text-sm text-zinc-700">
                    <span className="rounded-full bg-white px-3 py-2 shadow-sm">Score: {idea.profitability_score ?? "N/A"}/100</span>
                    <span className="rounded-full bg-white px-3 py-2 shadow-sm">Risk: {idea.risk_level ?? "Unknown"}</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Link
                    href={`/dashboard/${idea._id}`}
                    className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-emerald-700"
                  >
                    View Report
                  </Link>
                  <button
                    type="button"
                    onClick={() => deleteIdea(idea._id)}
                    className="rounded-xl bg-white px-4 py-2 text-sm font-medium text-red-600 ring-1 ring-red-200 transition hover:bg-red-50"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
