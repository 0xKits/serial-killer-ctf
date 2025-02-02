import { Button } from "@/components/ui/button";
import { Search, Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function FBILandingPage() {
	return (
		<div className="min-h-screen flex flex-col bg-white text-gray-800">
			{/* Header */}
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

			{/* Main Content */}
			<main className="flex-grow">
				{/* Hero Section */}
				<section className="bg-[#0a4275] text-white py-12">
					<div className="container mx-auto px-4">
						<h2 className="text-4xl font-bold mb-4">
							Welcome to the FBI
						</h2>
						<p className="text-xl mb-8">
							The Federal Bureau of Investigation is the domestic
							intelligence and security service of the United
							States.
						</p>
						<div className="flex items-center bg-white rounded-full p-2 max-w-2xl">
							<input
								type="text"
								placeholder="Search FBI"
								className="flex-grow px-4 py-2 bg-transparent text-gray-800 focus:outline-none"
							/>
							<button className="bg-[#b41e22] text-white p-2 rounded-full">
								<Search />
							</button>
						</div>
					</div>
                </section>
                <section>
                    <div className="min-h-screen flex flex-col bg-white text-gray-800 items-center justify-center">
                        <h1 className="text-4xl font-bold text-[#00285e]">
                            Investigation Starting Soon...
                        </h1>
                    </div>
                </section>
			</main>

			{/* Footer */}
			<footer className="bg-[#00285e] text-white py-8">
				<div className="container mx-auto px-4">
					<div className="flex flex-col md:flex-row justify-between items-center">
						<div className="mb-4 md:mb-0">
							<p>
								&copy; {new Date().getFullYear()} Federal Bureau
								of Investigation
							</p>
						</div>
						<div className="flex space-x-4"></div>
					</div>
				</div>
			</footer>
		</div>
	);
}
