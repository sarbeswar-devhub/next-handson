"use client"

import Cookies from "js-cookie"
import { useRouter } from "next/navigation"

export default function Navbar() {

  const router = useRouter()

  const handleLogout = () => {

    Cookies.remove("access_token")

    router.replace("/login")
  }

  return (
    <header className="h-16 bg-white shadow-sm flex items-center justify-between px-6 dark:bg-zinc-800 dark:text-zinc-100">

      <h2 className="text-xl font-semibold">
        Dashboard
      </h2>

      <button
        onClick={handleLogout}
        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
      >
        Logout
      </button>

    </header>
  )
}