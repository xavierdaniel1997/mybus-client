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
      router.replace("/login")
    } else if (user?.role !== "admin") {
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
