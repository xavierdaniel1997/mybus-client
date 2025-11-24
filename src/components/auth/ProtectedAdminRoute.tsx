// ProtectedAdminRoute.tsx
'use client'

import { useAuthStore } from "@/app/(store)/useAuthStore"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import AppLoader from "../layouts/AppLoader"

export default function ProtectedAdminRoute({
  children,
}: {
  children: React.ReactNode
}) {
  const { isAuthenticated, user, _hasHydrated } = useAuthStore();
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  // useEffect(() => {
  //   if (!_hasHydrated) {
  //     return;
  //   }
  //   const tokenExpiry = useAuthStore.getState().tokenExpiry;
  //   if (tokenExpiry && tokenExpiry < Date.now()) {
  //     useAuthStore.getState().clearAuth();
  //     router.replace("/");
  //     return;
  //   }
  //   if (!isAuthenticated) {
  //     router.replace("/");
  //   } else if (user?.role !== "ADMIN") {
  //     router.replace("/");
  //   } else {
  //     setChecking(false);
  //   }
  // }, [_hasHydrated, isAuthenticated, user, router]);


    useEffect(() => {
    if (!_hasHydrated) return;

    if (!isAuthenticated) {
      router.replace("/");
    } else if (user?.role !== "ADMIN") {
      router.replace("/");
    } else {
      setChecking(false);
    }
  }, [_hasHydrated, isAuthenticated, user, router]);

  if (checking) {
    return (
      <div className="flex h-screen items-center justify-center text-lg font-semibold">
        <AppLoader/> 
      </div>
    );
  }

  return <>{children}</>;
}
