import Link from "next/link"

export default function Sidebar() {

  return (
    <aside className="w-64 bg-white shadow-md hidden md:block dark:bg-zinc-800">

      <div className="p-6 border-b border-zinc-200 dark:border-zinc-700">

        <h1 className="text-2xl font-bold text-blue-600">
          Admin Panel
        </h1>

      </div>

      <nav className="p-4 space-y-2">

        <Link
          href="/dashboard"
          className="block px-4 py-3 rounded-xl hover:bg-blue-50 text-gray-700 dark:text-zinc-200 dark:hover:bg-zinc-700"
        >
          Dashboard
        </Link>

        <Link
          href="/users"
          className="block px-4 py-3 rounded-xl hover:bg-blue-50 text-gray-700 dark:text-zinc-200 dark:hover:bg-zinc-700"
        >
          Users
        </Link>

        <Link
          href="/settings"
          className="block px-4 py-3 rounded-xl hover:bg-blue-50 text-gray-700 dark:text-zinc-200 dark:hover:bg-zinc-700"
        >
          Settings
        </Link>

      </nav>

    </aside>
  )
}