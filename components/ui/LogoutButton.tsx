"use client";

import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";

export default function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
      });

      if (!response.ok) {
        alert("Logout failed.");
        return;
      }

      router.push("/login");
      router.refresh();
    } catch (error) {
      console.error("Logout error:", error);
      alert("Something went wrong while logging out.");
    }
  }

  return (
    <Button variant="secondary" onClick={handleLogout}>
      Logout
    </Button>
  );
}