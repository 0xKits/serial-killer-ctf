import Link from "next/link"
import Image from "next/image"
import { Menu } from "lucide-react"
import { signOutAction } from "@/app/actions"
export default function Navbar() {
    return (
        <header className="bg-[#00285e] text-white">
            <div className="container mx-auto px-4 py-2 flex justify-between items-center">
                <div className="flex items-center space-x-4">
                    <Image
                        src="/fbi-logo.png"
                        alt="FBI Seal"
                        width={50}
                        height={50}
                        className="rounded-full"
                    />
                    <h1 className="text-2xl font-bold">
                        Federal Bureau of Investigation
                    </h1>
                </div>
                <nav className="hidden md:flex space-x-4">
                    <Link href="#" className="hover:underline">
                        Home
                    </Link>
                    <Link href="#" className="hover:underline">
                        Most Wanted
                    </Link>
                    <Link href="#" className="hover:underline">
                        About
                    </Link>
                    <Link href="#" className="hover:underline">
                        Careers
                    </Link>
                </nav>
                <button className="md:hidden">
                    <Menu />
                </button>
            </div>
        </header>
    )
}