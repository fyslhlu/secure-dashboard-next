import Link from "next/link";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import PageHeader from "@/components/ui/PageHeader";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-950 p-6 text-slate-100">
      <section className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[260px_1fr]">
        <aside className="rounded-3xl border border-slate-800 bg-slate-900 p-5 shadow-2xl">
          <div className="mb-8">
            <div className="mb-2 h-10 w-10 rounded-2xl bg-violet-600" />
            <h2 className="text-lg font-bold">SecureDash</h2>
            <p className="text-sm text-slate-400">Admin Dashboard</p>
          </div>

          <nav className="space-y-2">
            {["Dashboard", "Users", "Security", "Reports", "Settings"].map(
              (item) => (
                <div
                  key={item}
                  className="rounded-2xl px-4 py-3 text-sm font-medium text-slate-300 hover:bg-slate-800 hover:text-white"
                >
                  {item}
                </div>
              ),
            )}
          </nav>
        </aside>

        <section className="space-y-6">
          <Card>
            <PageHeader
              label="Secure Dashboard Next"
              title="Full-Stack Authentication Dashboard"
              description="Next.js, TypeScript, Tailwind, Cloudflare Turnstile, email OTP, JWT authentication, protected routes, and role-based access."
            />

            <div className="flex gap-4">
              <Link href="/login">
                <Button>Start Login</Button>
              </Link>

              <Button variant="secondary">View Features</Button>
            </div>
          </Card>

          <div className="grid gap-4 md:grid-cols-3">
            {[
              { label: "Protected Users", value: "128" },
              { label: "Admin Actions", value: "42" },
              { label: "Security Checks", value: "99%" },
            ].map((card) => (
              <Card key={card.label}>
                <p className="text-sm text-slate-400">{card.label}</p>
                <p className="mt-3 text-3xl font-bold text-white">
                  {card.value}
                </p>
              </Card>
            ))}
          </div>

          <Card>
            <div className="mb-5 flex items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold">Authentication Flow</h2>
                <p className="text-sm text-slate-400">
                  Human check, password validation, OTP, then dashboard access.
                </p>
              </div>

              <Link href="/login">
                <Button>Start Login</Button>
              </Link>
            </div>

            <div className="grid gap-3 md:grid-cols-4">
              {["Turnstile", "bcrypt", "Email OTP", "JWT"].map((step) => (
                <div
                  key={step}
                  className="rounded-2xl border border-slate-800 bg-slate-950 p-4 text-center text-sm font-semibold text-slate-200"
                >
                  {step}
                </div>
              ))}
            </div>
          </Card>
        </section>
      </section>
    </main>
  );
}