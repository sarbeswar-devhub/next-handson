export default function Header() {
    return (
        <>
            <header className="bg-gray-800 text-white p-4 flex flex-row items-center justify-between">
                <div className="left">
                    <h1 className="text-2xl font-bold">My Next.js App</h1>
                </div>
                <nav>
                    <ul className="flex space-x-4">
                        <li>
                            <a href="/" className="hover:underline">
                                Home
                            </a>
                        </li>
                        <li>
                            <a href="/about" className="hover:underline">
                                About
                            </a>
                        </li>
                        <li>
                            <a href="/services" className="hover:underline">
                                Services
                            </a>
                        </li>
                        <li>
                            <a href="/contact" className="hover:underline">
                                Contact
                            </a>
                        </li>
                        <li>
                            <a href="/login" className="hover:underline">
                                Login
                            </a>
                        </li>
                    </ul>
                </nav>
            </header>
        </>
    )
}