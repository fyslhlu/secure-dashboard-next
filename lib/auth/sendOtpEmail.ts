export async function sendOtpEmail({
  to,
  name,
  otpCode,
}: {
  to: string;
  name: string;
  otpCode: string;
}) {
  if (!process.env.RESEND_API_KEY) {
    throw new Error("RESEND_API_KEY is missing from .env.local");
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: process.env.EMAIL_FROM || "SecureDash <onboarding@resend.dev>",
      to: [to],
      subject: "Your SecureDash OTP Code",
      html: `
        <div style="font-family: Arial, sans-serif; background-color: #0f172a; padding: 32px; color: #f8fafc;">
          <div style="max-width: 520px; margin: 0 auto; background-color: #111827; border: 1px solid #334155; border-radius: 18px; padding: 28px;">
            <h1 style="margin: 0 0 12px; color: #ffffff;">SecureDash Verification</h1>
            <p style="color: #cbd5e1;">Hello ${name},</p>
            <p style="color: #cbd5e1;">Use the OTP code below to finish signing in to your account.</p>

            <div style="font-size: 32px; letter-spacing: 8px; font-weight: bold; color: #a78bfa; background-color: #020617; border-radius: 14px; padding: 18px; text-align: center; margin: 24px 0;">
              ${otpCode}
            </div>

            <p style="color: #94a3b8;">This code expires in 5 minutes.</p>
            <p style="color: #64748b; font-size: 13px;">If you did not request this login, you can ignore this email.</p>
          </div>
        </div>
      `,
    }),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(`Failed to send OTP email: ${JSON.stringify(result)}`);
  }

  return result;
}