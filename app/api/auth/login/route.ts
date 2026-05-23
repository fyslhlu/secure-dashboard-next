export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { email, password, turnstileToken } = body;

    if (!email || !password || !turnstileToken) {
      return Response.json(
        { message: "Email, password, and human verification are required." },
        { status: 400 },
      );
    }

    const formData = new FormData();
    formData.append("secret", process.env.TURNSTILE_SECRET_KEY as string);
    formData.append("response", turnstileToken);

    const turnstileResponse = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        body: formData,
      },
    );

    const turnstileResult = await turnstileResponse.json();

    if (!turnstileResult.success) {
      return Response.json(
        { message: "Human verification failed. Please try again." },
        { status: 403 },
      );
    }

    return Response.json(
      {
        message:
          "Human verification passed. Next step will be password checking and OTP.",
        email,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Login route error:", error);

    return Response.json(
      { message: "Something went wrong during login." },
      { status: 500 },
    );
  }
}