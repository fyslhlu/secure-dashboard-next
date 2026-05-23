"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import PageHeader from "@/components/ui/PageHeader";

import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    console.log("Login submitted:", {
      email,
      password,
    });
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 p-6 text-slate-100">
      <section className="grid w-full max-w-6xl overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 shadow-2xl lg:grid-cols-[1.1fr_0.9fr]">
        <div className="hidden bg-linear-to-br from-violet-700 via-slate-950 to-slate-950 p-10 lg:block">
          <div className="flex h-full flex-col justify-between">
            <div>
              <div className="mb-6 h-12 w-12 rounded-2xl bg-white/20" />
              <p className="text-sm font-semibold uppercase tracking-wide text-violet-200">
                Secure Dashboard Next
              </p>

              <h1 className="mt-4 max-w-md text-4xl font-bold leading-tight text-white">
                Protected access for admins and users.
              </h1>

              <p className="mt-4 max-w-md text-slate-300">
                Login with email and password, pass human verification, confirm
                OTP by email, then access the correct dashboard based on your
                role.
              </p>
            </div>

            <div className="grid gap-3">
              {["Cloudflare Turnstile", "bcrypt password hashing", "Email OTP", "JWT token access"].map(
                (item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm font-medium text-slate-100"
                  >
                    {item}
                  </div>
                ),
              )}
            </div>
          </div>
        </div>

        <div className="p-6 sm:p-10">
          <Card className="border-slate-800 bg-slate-950 shadow-none">
            <PageHeader
              label="Authentication"
              title="Login"
              description="Enter your account credentials to continue to the security verification step."
            />

            <form onSubmit={handleSubmit} className="space-y-5">
              <Input
                label="Email address"
                type="email"
                placeholder="admin@example.com"
                value={email}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => setEmail(event.target.value)}
                required
              />

              <Input
                label="Password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => setPassword(event.target.value)}
                required
              />

              <div className="rounded-2xl border border-dashed border-slate-700 bg-slate-900 p-4 text-center text-sm text-slate-400">
                Cloudflare Turnstile human verification will be added here.
              </div>

              <Button type="submit">Continue</Button>
            </form>

            <p className="mt-6 text-sm text-slate-500">
              Demo flow: email + password → human verification → email OTP →
              dashboard access.
            </p>
          </Card>
        </div>
      </section>
    </main>
  );
}