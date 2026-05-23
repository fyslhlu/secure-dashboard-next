import { Suspense } from "react";
import VerifyOtpForm from "./VerifyOtpForm";

export default function VerifyOtpPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center bg-slate-950 p-6 text-slate-100">
          <p className="text-slate-400">Loading OTP page...</p>
        </main>
      }
    >
      <VerifyOtpForm />
    </Suspense>
  );
}