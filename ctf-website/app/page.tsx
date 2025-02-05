import { Search } from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import Link from "next/link";
export default function FBILandingPage() {
	return (
		<div className="min-h-screen flex flex-col bg-white text-gray-800">
			{/* Header */}

			<Navbar />

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

				<section className="py-12 bg-gray-100">
					<div className="container mx-auto px-4">
						<div className="bg-white rounded-lg shadow-lg p-8">
							<h3 className="text-2xl font-bold mb-4 text-[#b41e22]">
								Urgent: Information Needed
							</h3>
							<div className="flex flex-col md:flex-row items-start md:items-center gap-8">
								<div className="flex-grow">
									<p className="text-lg mb-4">
										The FBI is seeking information on a
										serial killer known only as "Viktor".
										This individual is believed to be
										responsible for a series of violent
										crimes across multiple states. Your
										assistance could be crucial in bringing
										this dangerous criminal to justice.
									</p>
									<p className="text-lg mb-4">
										If you have any information, no matter
										how small, please contact our civilian
										tipline. Your identity will be
										protected, and you may remain anonymous
										if you wish.
									</p>
								</div>
								<div className="flex flex-col gap-4 min-w-[200px]">
									<Link href={"/sign-up"}>
										<Button className="bg-[#00285e] hover:bg-[#003c8f] text-white w-full">
											Sign Up for Tipline
										</Button>
									</Link>
									<Link href={"/sign-in"}>
										<Button
											variant="outline"
											className="border-[#00285e] text-[#00285e] hover:bg-[#00285e] hover:text-white w-full"
										>
											Log In to Tipline
										</Button>
									</Link>
								</div>
							</div>
						</div>
					</div>
				</section>

				{/* <section>
                    <div className=" flex flex-col bg-white text-gray-800 items-center justify-center">
                        <h1 className="text-4xl font-bold text-[#00285e]">
                            Investigation Starting Soon...
                        </h1>
                    </div>
                </section> */}
			</main>

			{/* Footer */}
			<Footer />
		</div>
	);
}
