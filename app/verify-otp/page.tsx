"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import PageHeader from "@/components/ui/PageHeader";

export default function VerifyOtpPage() {
  const searchParams = useSearchParams();

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");

  useEffect(() => {
    const emailFromUrl = searchParams.get("email");

    if (emailFromUrl) {
      setEmail(emailFromUrl);
    }
  }, [searchParams]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      const response = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          otp,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "OTP verification failed.");
        return;
      }

      alert(`${data.message} Role: ${data.user.role}`);
    } catch (error) {
      console.error("OTP verification error:", error);
      alert("Something went wrong. Please try again.");
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 p-6 text-slate-100">
      <Card className="w-full max-w-md border-slate-800 bg-slate-900">
        <PageHeader
          label="Two-Factor Authentication"
          title="Verify OTP"
          description="Enter the 6-digit OTP generated after login."
        />

        <form onSubmit={handleSubmit} className="space-y-5">
          <Input
            label="Email address"
            type="email"
            placeholder="admin@example.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />

          <Input
            label="OTP code"
            type="text"
            placeholder="Enter 6-digit OTP"
            value={otp}
            onChange={(event) => setOtp(event.target.value)}
            required
          />

          <Button type="submit">Verify OTP</Button>
        </form>

        <p className="mt-6 text-sm text-slate-500">
          For now, the OTP appears in the terminal. Later, we will send it by
          email.
        </p>
      </Card>
    </main>
  );
}