"use client";

// This component previously used @account-kit/react, which is not compatible with Next.js Turbopack in client code.
// TODO: Refactor to use server-side logic or API routes for authentication.
export function TestAuthButton() {
  return (
    <button className="akui-btn akui-btn-primary" disabled>
      Test Auth Modal (Unavailable)
    </button>
  );
}
