"use client";

import { useAuthStore } from "@/app/(store)/useAuthStore";
import { useAuthDialogStore } from "@/app/(store)/useAuthDialogStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import AppLoader from "../layouts/AppLoader";

export default function ProtectedUserRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, user, _hasHydrated } = useAuthStore();
  const openDialog = useAuthDialogStore((s) => s.openDialog);
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    if (!_hasHydrated) return;

    const { tokenExpiry, clearAuth } = useAuthStore.getState();

    // Token expiry check
    if (tokenExpiry && tokenExpiry < Date.now()) {
      clearAuth();
      openDialog();
      return;
    }

    // Block if not logged in
    if (!isAuthenticated) {
      openDialog();
      return;
    }

    // Block if wrong role
    if (user?.role !== "USER") {
      router.replace("/");
      return;
    }

    setChecking(false);
  }, [_hasHydrated, isAuthenticated, user, router, openDialog]);

  // While loading store
  if (checking) {
    return (
      <div className="flex h-screen items-center justify-center">
        <AppLoader />
      </div>
    );
  }

  // If not logged in -> do NOT render page (dialog is already open)
  if (!isAuthenticated) return null;

  return <>{children}</>;
}
