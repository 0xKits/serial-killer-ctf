"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Folder, Lock, CheckCircle } from "lucide-react";
import { createClient } from "@/utils/supabase/client";
import UsernamePopup from "@/components/ui/username-popup";
import { QueryData } from "@supabase/supabase-js";
import { addOneToArray } from "@/utils/arrayUtils";
import { STARTED } from "@/siteconfig";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function CaseFilesLanding() {
	const supabase = createClient();
	const [username, setUsername] = useState<string | null>(null);
	const [solves, setSolves] = useState<number[] | null>();
	const [questions, setQuestions] = useState<
		| {
				id: number;
				title: string;
				description: string;
				index: number;
		  }[]
		| []
	>([]);
	const [hasUsername, setHasUsername] = useState<boolean>(true);

	const router = useRouter();
	useEffect(() => {
		supabase.auth.getUser().then((user) => {
			if (user.data.user) {
				supabase
					.from("profiles")
					.select(`*`)
					.eq("user", user.data.user.id)
					.then((r) => {
						if (r.data) {
							console.log(r.data);
							if (!r.data[0]) {
								setHasUsername(false);
							}
							if (r.data[0]) {
								setHasUsername(true);
								setUsername(r.data[0].username);
							}
						}
					});
				const solvesQuery = supabase
					.from("user_solves")
					.select(`question(index)`)
					.eq("player", user.data.user.id);

				solvesQuery.then((result) => {
					if (result.data) {
						let solves: QueryData<typeof solvesQuery> = result.data;
						if (solves.length === 0) {
							solves = [{ question: { index: 0 } }];
						}
						setSolves(
							solves.map((s) => {
								return s.question.index;
							})
						);
						supabase
							.from("questions")
							.select(
								`
								id,
								title,
								description,
								index
							`
							)
							.in(
								"index",
								addOneToArray(
									solves.map((s) => s.question.index)
								)
							)
							.then((fuckThis) => {
								if (fuckThis.data) {
									setQuestions(fuckThis.data);
								}
							});
					}
				});
			}
		});
	}, []);

	function handleSetUsername(username: string) {
		supabase.auth.getUser().then((user) => {
			if (user.data.user) {
				console.log(user.data.user.id, username);
				supabase
					.from("profiles")
					.insert([
						{
							user: user.data.user.id,
							username: username,
						},
					])
					.select()
					.then((result) => {
						console.log(result);
						if (result.error) {
							console.log(result.error);
						}
						setUsername(username);
					});
			}
		});

		setUsername(username);
	}

	const [expandedCase, setExpandedCase] = useState<number | null>(null);

	const toggleCase = (id: number) => {
		setExpandedCase(expandedCase === id ? null : id);
	};

	if (STARTED) {
		return (
			<div className="min-h-screen flex flex-col bg-gray-100 text-gray-800">
				{!hasUsername && (
					<UsernamePopup
						hasUsername={hasUsername}
						setHasUsername={setHasUsername}
						handleSetUsername={(username: string) => {
							handleSetUsername(username);
						}}
					/>
				)}
				<header className="bg-[#00285e] text-white py-4">
					<div className="container mx-auto px-4 flex items-center justify-between">
						<div className="flex items-center">
							<Image
								src="/fbi-logo.png"
								alt="FBI Seal"
								width={50}
								height={50}
								className="rounded-full mr-4"
							/>
							<h1 className="text-2xl font-bold">
								Federal Bureau of Investigation
							</h1>
						</div>
						<div>
							{hasUsername && (
								<div className="flex justify-center items-center gap-4">
									<p>
										Logged in as{" "}
										<b className="text-lg">{username}</b>
									</p>
									<Button
										variant={"secondary"}
										className=""
										onClick={() => {
											supabase.auth.signOut();
											router.refresh();
										}}
									>
										Log Out
									</Button>
								</div>
							)}
						</div>
					</div>
				</header>

				<main className="flex-grow container mx-auto px-4 py-8">
					<div className="bg-white shadow-lg rounded-lg overflow-hidden">
						<div className="p-6 border-b border-gray-200">
							<h2 className="text-3xl font-bold text-[#00285e] mb-2">
								Ongoing Investigations
							</h2>
							<p className="text-gray-600">
								Classified Case Files - Authorized Personnel
								Only
							</p>
						</div>

						<div className="p-6">
							<div className="grid gap-6 md:grid-cols-2">
								{questions
									?.sort((a, b) => a.index - b.index)
									.map((caseFile) => (
										<div
											key={caseFile.id}
											className={`border h-fit rounded-lg overflow-hidden transition-shadow duration-300 ${
												expandedCase === caseFile.id
													? "shadow-lg"
													: "shadow"
											}`}
										>
											<div
												className={`p-4 flex items-center cursor-pointer `}
												onClick={() =>
													toggleCase(caseFile.id)
												}
											>
												{solves?.includes(
													caseFile.index
												) && (
													<CheckCircle className="mr-3 text-green-500" />
												)}
												{!solves?.includes(
													caseFile.index
												) && (
													<Folder className="mr-3 text-[#00285e]" />
												)}
												<h3 className="text-lg font-semibold flex-grow">
													{caseFile.title}
												</h3>
											</div>
											{expandedCase === caseFile.id && (
												<div className="p-4 bg-gray-50 border-t">
													<p className="text-sm mb-4">
														{caseFile.description}
													</p>
													<Link
														href={`/tipline/case/${caseFile.index}`}
														className="inline-block bg-[#b41e22] text-white px-4 py-2 rounded hover:bg-[#8e1518] transition-colors duration-300"
													>
														View Case Details
													</Link>
												</div>
											)}
										</div>
									))}
							</div>
						</div>
						{solves?.includes(8) && (
							<div className="w-full flex flex-col justify-center items-center p-6 bg-green-100 border-t border-green-200">
								<h3 className="text-2xl font-bold text-green-700 mb-4">
									Congratulations, Special Agent!
								</h3>
								<p className="text-lg text-center text-green-600 mb-4">
									The Federal Bureau of Investigation extends
									its deepest gratitude for your exceptional
									work on this case. Your dedication and skill
									have been instrumental in bringing this
									investigation to a successful conclusion.
									Due to the exceptional skill you have demonstrated
									in solving this case, we would like to offer you a position
									as cybersecurity analyst at the FBI. Reach out to our recruiter, <b>@0xKits</b>, on
									Discord with the following message: <b>SSN_FB1_CTF_2o25</b>
									
								</p>
								<div className="bg-white p-4 rounded-lg shadow-md border border-green-300">
									<h4 className="text-xl font-semibold text-[#00285e] mb-2">
										OFFICIAL ANNOUNCEMENT
									</h4>
									<p className="text-gray-700">
										We are pleased to announce that the notorious serial killer known as 
										"Viktor Kane Doom" has been apprehended. We extend our sincere thanks to
										the civilian investigators who were instrumental in gathering the required evidence
										
									</p>
								</div>
							</div>
						)}
					</div>
				</main>

				<footer className="bg-[#00285e] text-white py-4 mt-8">
					<div className="container mx-auto px-4 text-center">
						<p>
							&copy; {new Date().getFullYear()} Federal Bureau of
							Investigation
						</p>
					</div>
				</footer>
			</div>
		);
	}

	return (
		<div className="flex justify-center items-center font-bold text-center text-8xl">
			Site under maintenance until 15:30 05/02/25 IST
		</div>
	);
}
