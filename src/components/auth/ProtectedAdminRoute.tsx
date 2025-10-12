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

  useEffect(() => {
    // Wait until store is hydrated from localStorage
    if (!_hasHydrated) {
      return;
    }

    // Once hydrated, validate token expiry (optional)
    const tokenExpiry = useAuthStore.getState().tokenExpiry;
    if (tokenExpiry && tokenExpiry < Date.now()) {
      // token expired -> clear and redirect to home
      useAuthStore.getState().clearAuth();
      router.replace("/");
      return;
    }

    // Now decide on redirect
    if (!isAuthenticated) {
      router.replace("/");
    } else if (user?.role !== "ADMIN") {
      router.replace("/");
    } else {
      setChecking(false);
    }
  }, [_hasHydrated, isAuthenticated, user, router]);

  if (checking) {
    // This shows while we wait for rehydration + check
    return (
      <div className="flex h-screen items-center justify-center text-lg font-semibold">
        {/* Checking admin access... */}
        <AppLoader/> 
      </div>
    );
  }

  return <>{children}</>;
}




/*
"use client"

import { useAuthStore } from "@/app/(store)/useAuthStore" 
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function ProtectedAdminRoute({
  children,
}: {
  children: React.ReactNode
}) {
  const { isAuthenticated, user } = useAuthStore()
  const router = useRouter()
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/")
    }else if (user?.role !== "ADMIN") {
      router.replace("/")
    } else {
      setChecking(false)
    }
  }, [isAuthenticated, user, router])

  if (checking) {
    return (
      <div className="flex h-screen items-center justify-center text-lg font-semibold">
        Checking admin access...
      </div>
    )
  }

  return <>{children}</>
}
*/