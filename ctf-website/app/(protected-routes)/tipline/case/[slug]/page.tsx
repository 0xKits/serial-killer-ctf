"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FileDown, AlertTriangle, CheckCircle } from "lucide-react";
import { createClient } from "@/utils/supabase/client";
import { QueryData } from "@supabase/supabase-js";
import { redirect } from "next/navigation";
import { addOneToArray } from "@/utils/arrayUtils";
import Link from "next/link";
import { STARTED } from "@/siteconfig";

export default function CaseInformation({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const supabase = createClient();
	const [question, setQuestion] = useState<{
		id: number;
		title: string;
		description: string;
		index: number;
		task: string;
	} | null>(null);
	const [flagInput, setFlagInput] = useState("");
	const [attachments, setAttachments] = useState<
		{
			attachment: string;
			attachment_name: string;
		}[]
	>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [caseNumber, setCaseNumber] = useState<number | null>(null);
	const [flagStatus, setFlagStatus] = useState<"idle" | "success" | "error">(
		"idle"
	);
	useEffect(() => {
		params.then((p) => {
			setCaseNumber(Number(p.slug));

			supabase.auth.getUser().then((user) => {
				if (user.data.user) {
					const solvesQuery = supabase
						.from("user_solves")
						.select(`question(index)`)
						.eq("player", user.data.user.id);

					solvesQuery.then((result) => {
						if (result.data) {
							let solves: QueryData<typeof solvesQuery> =
								result.data;
							if (
								solves
									.map((s) => s.question.index)
									.includes(Number(p.slug))
							) {
								setFlagStatus("success");
							}
							if (solves.length === 0) {
								solves = [{ question: { index: 0 } }];
							}
							if (
								!addOneToArray(
									solves.map((s) => s.question.index)
								).includes(Number(p.slug))
							) {
								redirect("/tipline");
							} else if (
								addOneToArray(
									solves.map((s) => s.question.index)
								).includes(Number(p.slug))
							) {
								supabase
									.from("questions")
									.select(
										`
                id,
                title,
                description,
                index,
                task
              `
									)
									.eq("index", Number(p.slug))
									.then((fuckThis) => {
										if (fuckThis.data) {
											setQuestion(fuckThis.data[0]);
											setLoading(false);
										}
									});

								const attachmentsQuery = supabase.from(
									"attachments"
								).select(`
                  object_path,
                  object_name
                `);

								attachmentsQuery.then((result) => {
									if (result.data) {
										setAttachments(
											result.data.map((a) => {
												return {
													attachment: supabase.storage
														.from("questions")
														.getPublicUrl(
															a.object_path
														).data.publicUrl,
													attachment_name:
														a.object_name,
												};
											})
										);
									}
								});
							}
						}
					});
				}
			});
		});
	}, []);

	const handleFlagSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		fetch("/api/submit_flag", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				question_index: caseNumber,
				flag: flagInput,
			}),
		}).then((res) => {
			res.json().then((data) => {
				if (data.correct) {
					setFlagStatus("success");
					redirect("/tipline");
				} else {
					setFlagStatus("error");
				}
			});
		});
	};

	if(STARTED) {

		return (
			<div className="min-h-screen flex flex-col bg-gray-100 text-gray-800">
				{loading && (
					<div className="w-screen h-screen absolute z-50 bg-black/20 backdrop-blur-md flex flex-col justify-center items-center">
						<div className="flex justify-center items-center gap-4 text-6xl text-white bold ">
							<p>Loading</p>
							<SvgSpinnersBlocksWave className="shadow-[0_0_15px_#ffffff]" />
						</div>
					</div>
				)}
				<header className="bg-[#00285e] text-white py-4">
					<div className="container mx-auto px-4 flex items-center">
						<Link href="/tipline" className="rounded-full mr-4">
							<Image
								src="/fbi-logo.png"
								alt="FBI Seal"
								width={50}
								height={50}
								className=""
							/>
						</Link>
						<h1 className="text-2xl font-bold">
							Federal Bureau of Investigation
						</h1>
					</div>
				</header>
	
				<main className="flex-grow container mx-auto px-4 py-8">
					<div className="bg-white shadow-lg rounded-lg overflow-hidden">
						<div className="p-6 border-b border-gray-200">
							<h2 className="text-3xl font-bold text-[#00285e] mb-2">
								{question?.title}
							</h2>
							<p className="text-gray-600">
								Last Updated: {new Date().toLocaleDateString()}
							</p>
						</div>
	
						<div className="p-6">
							<h3 className="text-xl font-semibold mb-4">
								Case Overview
							</h3>
							<p className="mb-4">{question?.description}</p>
	
							<div className="mb-6">
								<h4 className="text-lg font-semibold mb-2">
									Available Evidence
								</h4>
								<ul className="list-disc pl-5 space-y-2">
									{attachments.map((a) => (
										<li key={a.attachment_name}>
											{a.attachment_name}
											<Button
												variant="link"
												asChild
												className="ml-2 text-[#b41e22]"
											>
												<a href={a.attachment}>
													<FileDown
														className="mr-1"
														size={16}
													/>
													Download
												</a>
											</Button>
										</li>
									))}
								</ul>
							</div>
	
							<div className="mb-6">
								<h4 className="text-lg font-semibold mb-2">Task</h4>
								<p>{question?.task}</p>
							</div>
	
							<form onSubmit={handleFlagSubmit} className="space-y-4">
								<div>
									<label
										htmlFor="flag"
										className="block text-sm font-medium text-gray-700 mb-1"
									>
										Submit Investigation Findings
									</label>
									<div className="flex">
										<Input
											type="text"
											id="flag"
											placeholder="Enter your findings here"
											value={flagInput}
											disabled={flagStatus === "success"}
											onChange={(e) =>
												setFlagInput(e.target.value)
											}
											className="flex-grow mr-2"
										/>
										<Button
											type="submit"
											className="bg-[#00285e] hover:bg-[#001f4b] text-white"
										>
											Submit
										</Button>
									</div>
								</div>
								{flagStatus === "success" && (
									<div className="flex items-center text-green-600">
										<CheckCircle className="mr-2" size={20} />
										Information verified. Thank you for your
										contribution to this case.
									</div>
								)}
								{flagStatus === "error" && (
									<div className="flex items-center text-[#b41e22]">
										<AlertTriangle className="mr-2" size={20} />
										Unable to verify the provided information.
										Please review and try again.
									</div>
								)}
							</form>
						</div>
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
	return(
		<div className="flex justify-center items-center font-bold text-center text-8xl">Site under maintenance until 15:30 05/02/25 IST</div>
	)
}

function SvgSpinnersBlocksWave(props: React.SVGProps<SVGSVGElement>) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="1em"
			height="1em"
			viewBox="0 0 24 24"
			{...props}
		>
			<rect width="7.33" height="7.33" x="1" y="1" fill="currentColor">
				<animate
					id="svgSpinnersBlocksWave0"
					attributeName="x"
					begin="0;svgSpinnersBlocksWave1.end+0.2s"
					dur="0.6s"
					values="1;4;1"
				></animate>
				<animate
					attributeName="y"
					begin="0;svgSpinnersBlocksWave1.end+0.2s"
					dur="0.6s"
					values="1;4;1"
				></animate>
				<animate
					attributeName="width"
					begin="0;svgSpinnersBlocksWave1.end+0.2s"
					dur="0.6s"
					values="7.33;1.33;7.33"
				></animate>
				<animate
					attributeName="height"
					begin="0;svgSpinnersBlocksWave1.end+0.2s"
					dur="0.6s"
					values="7.33;1.33;7.33"
				></animate>
			</rect>
			<rect width="7.33" height="7.33" x="8.33" y="1" fill="currentColor">
				<animate
					attributeName="x"
					begin="svgSpinnersBlocksWave0.begin+0.1s"
					dur="0.6s"
					values="8.33;11.33;8.33"
				></animate>
				<animate
					attributeName="y"
					begin="svgSpinnersBlocksWave0.begin+0.1s"
					dur="0.6s"
					values="1;4;1"
				></animate>
				<animate
					attributeName="width"
					begin="svgSpinnersBlocksWave0.begin+0.1s"
					dur="0.6s"
					values="7.33;1.33;7.33"
				></animate>
				<animate
					attributeName="height"
					begin="svgSpinnersBlocksWave0.begin+0.1s"
					dur="0.6s"
					values="7.33;1.33;7.33"
				></animate>
			</rect>
			<rect width="7.33" height="7.33" x="1" y="8.33" fill="currentColor">
				<animate
					attributeName="x"
					begin="svgSpinnersBlocksWave0.begin+0.1s"
					dur="0.6s"
					values="1;4;1"
				></animate>
				<animate
					attributeName="y"
					begin="svgSpinnersBlocksWave0.begin+0.1s"
					dur="0.6s"
					values="8.33;11.33;8.33"
				></animate>
				<animate
					attributeName="width"
					begin="svgSpinnersBlocksWave0.begin+0.1s"
					dur="0.6s"
					values="7.33;1.33;7.33"
				></animate>
				<animate
					attributeName="height"
					begin="svgSpinnersBlocksWave0.begin+0.1s"
					dur="0.6s"
					values="7.33;1.33;7.33"
				></animate>
			</rect>
			<rect
				width="7.33"
				height="7.33"
				x="15.66"
				y="1"
				fill="currentColor"
			>
				<animate
					attributeName="x"
					begin="svgSpinnersBlocksWave0.begin+0.2s"
					dur="0.6s"
					values="15.66;18.66;15.66"
				></animate>
				<animate
					attributeName="y"
					begin="svgSpinnersBlocksWave0.begin+0.2s"
					dur="0.6s"
					values="1;4;1"
				></animate>
				<animate
					attributeName="width"
					begin="svgSpinnersBlocksWave0.begin+0.2s"
					dur="0.6s"
					values="7.33;1.33;7.33"
				></animate>
				<animate
					attributeName="height"
					begin="svgSpinnersBlocksWave0.begin+0.2s"
					dur="0.6s"
					values="7.33;1.33;7.33"
				></animate>
			</rect>
			<rect
				width="7.33"
				height="7.33"
				x="8.33"
				y="8.33"
				fill="currentColor"
			>
				<animate
					attributeName="x"
					begin="svgSpinnersBlocksWave0.begin+0.2s"
					dur="0.6s"
					values="8.33;11.33;8.33"
				></animate>
				<animate
					attributeName="y"
					begin="svgSpinnersBlocksWave0.begin+0.2s"
					dur="0.6s"
					values="8.33;11.33;8.33"
				></animate>
				<animate
					attributeName="width"
					begin="svgSpinnersBlocksWave0.begin+0.2s"
					dur="0.6s"
					values="7.33;1.33;7.33"
				></animate>
				<animate
					attributeName="height"
					begin="svgSpinnersBlocksWave0.begin+0.2s"
					dur="0.6s"
					values="7.33;1.33;7.33"
				></animate>
			</rect>
			<rect
				width="7.33"
				height="7.33"
				x="1"
				y="15.66"
				fill="currentColor"
			>
				<animate
					attributeName="x"
					begin="svgSpinnersBlocksWave0.begin+0.2s"
					dur="0.6s"
					values="1;4;1"
				></animate>
				<animate
					attributeName="y"
					begin="svgSpinnersBlocksWave0.begin+0.2s"
					dur="0.6s"
					values="15.66;18.66;15.66"
				></animate>
				<animate
					attributeName="width"
					begin="svgSpinnersBlocksWave0.begin+0.2s"
					dur="0.6s"
					values="7.33;1.33;7.33"
				></animate>
				<animate
					attributeName="height"
					begin="svgSpinnersBlocksWave0.begin+0.2s"
					dur="0.6s"
					values="7.33;1.33;7.33"
				></animate>
			</rect>
			<rect
				width="7.33"
				height="7.33"
				x="15.66"
				y="8.33"
				fill="currentColor"
			>
				<animate
					attributeName="x"
					begin="svgSpinnersBlocksWave0.begin+0.3s"
					dur="0.6s"
					values="15.66;18.66;15.66"
				></animate>
				<animate
					attributeName="y"
					begin="svgSpinnersBlocksWave0.begin+0.3s"
					dur="0.6s"
					values="8.33;11.33;8.33"
				></animate>
				<animate
					attributeName="width"
					begin="svgSpinnersBlocksWave0.begin+0.3s"
					dur="0.6s"
					values="7.33;1.33;7.33"
				></animate>
				<animate
					attributeName="height"
					begin="svgSpinnersBlocksWave0.begin+0.3s"
					dur="0.6s"
					values="7.33;1.33;7.33"
				></animate>
			</rect>
			<rect
				width="7.33"
				height="7.33"
				x="8.33"
				y="15.66"
				fill="currentColor"
			>
				<animate
					attributeName="x"
					begin="svgSpinnersBlocksWave0.begin+0.3s"
					dur="0.6s"
					values="8.33;11.33;8.33"
				></animate>
				<animate
					attributeName="y"
					begin="svgSpinnersBlocksWave0.begin+0.3s"
					dur="0.6s"
					values="15.66;18.66;15.66"
				></animate>
				<animate
					attributeName="width"
					begin="svgSpinnersBlocksWave0.begin+0.3s"
					dur="0.6s"
					values="7.33;1.33;7.33"
				></animate>
				<animate
					attributeName="height"
					begin="svgSpinnersBlocksWave0.begin+0.3s"
					dur="0.6s"
					values="7.33;1.33;7.33"
				></animate>
			</rect>
			<rect
				width="7.33"
				height="7.33"
				x="15.66"
				y="15.66"
				fill="currentColor"
			>
				<animate
					id="svgSpinnersBlocksWave1"
					attributeName="x"
					begin="svgSpinnersBlocksWave0.begin+0.4s"
					dur="0.6s"
					values="15.66;18.66;15.66"
				></animate>
				<animate
					attributeName="y"
					begin="svgSpinnersBlocksWave0.begin+0.4s"
					dur="0.6s"
					values="15.66;18.66;15.66"
				></animate>
				<animate
					attributeName="width"
					begin="svgSpinnersBlocksWave0.begin+0.4s"
					dur="0.6s"
					values="7.33;1.33;7.33"
				></animate>
				<animate
					attributeName="height"
					begin="svgSpinnersBlocksWave0.begin+0.4s"
					dur="0.6s"
					values="7.33;1.33;7.33"
				></animate>
			</rect>
		</svg>
	);
}
