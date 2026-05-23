type StoredOtp = {
  email: string;
  code: string;
  expiresAt: number;
  role: "ADMIN" | "USER";
  name: string;
};

const otpStore = new Map<string, StoredOtp>();

export function generateOtpCode() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export function saveOtp({
  email,
  code,
  role,
  name,
}: {
  email: string;
  code: string;
  role: "ADMIN" | "USER";
  name: string;
}) {
  const expiresAt = Date.now() + 5 * 60 * 1000;

  otpStore.set(email.toLowerCase(), {
    email: email.toLowerCase(),
    code,
    expiresAt,
    role,
    name,
  });
}

export function verifyOtp(email: string, code: string) {
  const storedOtp = otpStore.get(email.toLowerCase());

  if (!storedOtp) {
    return {
      success: false,
      message: "No OTP found. Please login again.",
    };
  }

  if (Date.now() > storedOtp.expiresAt) {
    otpStore.delete(email.toLowerCase());

    return {
      success: false,
      message: "OTP expired. Please login again.",
    };
  }

  if (storedOtp.code !== code) {
    return {
      success: false,
      message: "Invalid OTP code.",
    };
  }

  otpStore.delete(email.toLowerCase());

  return {
    success: true,
    message: "OTP verified successfully.",
    user: {
      email: storedOtp.email,
      name: storedOtp.name,
      role: storedOtp.role,
    },
  };
}