"use client";

import { useAuthModal } from "@account-kit/react";

export function TestAuthButton() {
  const { openAuthModal } = useAuthModal();
  
  return (
    <button className="akui-btn akui-btn-primary" onClick={openAuthModal}>
      Test Auth Modal
    </button>
  );
}
