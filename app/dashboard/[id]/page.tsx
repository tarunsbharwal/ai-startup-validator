"use client";

import { useEffect, useState, use } from "react"; 
import Link from "next/link";

interface IdeaDetail {
  _id: string;
  title: string;
  description: string;
  problem?: string;
  customer?: string;
  market?: string;
  competitor?: string[];
  tech_stack?: string[];
  risk_level?: string;
  profitability_score?: number;
  justification?: string;
}

interface ReportDetailProps {
  params: Promise<{ id: string }>;
}

export default function ReportDetail({ params }: ReportDetailProps) {
  const { id } = use(params); 
  
  const [report, setReport] = useState<IdeaDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/ideas/${id}`) 
      .then((res) => res.json())
      .then((data) => setReport(data.data || null))
      .catch(() => setReport(null))
      .finally(() => setLoading(false));
  }, [id]); 
  
  if (loading) {
    return <div className="p-8 text-center text-zinc-500">Loading...</div>;
  }

  if (!report) {
    return (
      <div className="p-8 text-center text-red-600">
        Unable to load report. Please return to the dashboard.
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-zinc-50 px-6 py-10 text-black">
      <div className="mx-auto max-w-4xl rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm">
        <Link href="/dashboard" className="text-blue-600 transition hover:underline">
          ← Back to Dashboard
        </Link>

        <div className="mt-6 space-y-6">
          <div className="rounded-3xl border border-zinc-200 bg-zinc-50 p-6">
            <h1 className="text-4xl font-bold">{report.title}</h1>
            <p className="mt-3 text-zinc-700">{report.description}</p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl border border-zinc-200 bg-white p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-zinc-500">Profitability Score</p>
              <p className="mt-4 text-4xl font-bold text-emerald-600">{report.profitability_score ?? "N/A"}/100</p>
            </div>
            <div className="rounded-3xl border border-zinc-200 bg-white p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-zinc-500">Risk Level</p>
              <p className="mt-4 text-4xl font-bold text-orange-600">{report.risk_level ?? "Unknown"}</p>
            </div>
          </div>

          <section className="space-y-6">
            <div className="rounded-3xl border border-zinc-200 bg-white p-6">
              <h2 className="text-2xl font-semibold">Problem & Market</h2>
              <div className="mt-4 space-y-3 text-zinc-700">
                <p>
                  <strong>Problem:</strong> {report.problem ?? "Not available"}
                </p>
                <p>
                  <strong>Market:</strong> {report.market ?? "Not available"}
                </p>
                <p>
                  <strong>Customer Persona:</strong> {report.customer ?? "Not available"}
                </p>
              </div>
            </div>

            <div className="rounded-3xl border border-zinc-200 bg-white p-6">
              <h2 className="text-2xl font-semibold">Competitors</h2>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-zinc-700">
                {report.competitor?.map((comp, idx) => (
                  <li key={idx}>{comp}</li>
                ))}
              </ul>
            </div>

            <div className="rounded-3xl border border-zinc-200 bg-white p-6">
              <h2 className="text-2xl font-semibold">Suggested Tech Stack</h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {report.tech_stack?.map((tech, idx) => (
                  <span key={idx} className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-800">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-blue-200 bg-blue-50 p-6">
              <h2 className="text-2xl font-semibold">AI Justification</h2>
              <p className="mt-4 text-zinc-700">{report.justification ?? "No justification provided."}</p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
