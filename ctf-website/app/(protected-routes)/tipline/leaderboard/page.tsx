"use client";

import React, { useEffect, useState, useMemo } from "react";
import type { EventStatsResponse } from "../../api/stats/route";
import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Clock, Trophy, ArrowUpDown, Loader2 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const formatTime = (timestamp: number) => {
	return new Date(timestamp).toLocaleString();
};

const formatDuration = (start: number, end: number) => {
	const duration = Math.floor((end - start) / 1000); // Convert to seconds
	const hours = Math.floor(duration / 3600);
	const minutes = Math.floor((duration % 3600) / 60);
	const seconds = duration % 60;
	return `${hours}h ${minutes}m ${seconds}s`;
};

const CTFStatsPage = () => {
	const [stats, setStats] = useState<EventStatsResponse | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [sortBy, setSortBy] = useState<"completion" | "duration">(
		"completion"
	);

	useEffect(() => {
		const fetchStats = async () => {
			try {
				const response = await fetch("/api/stats", {
					next: {
						revalidate: 300,
					},
				});
				if (!response.ok) {
					throw new Error(
						`Failed to fetch stats: ${response.statusText}`
					);
				}
				const data: EventStatsResponse = await response.json();
				setStats(data);
			} catch (err) {
				setError(
					err instanceof Error ? err.message : "Failed to fetch stats"
				);
			} finally {
				setLoading(false);
			}
		};

		fetchStats();
	}, []);

	const sortedWinners = useMemo(() => {
		if (!stats) return [];

		const validWinners = stats.overall.winners.filter(
			(w): w is NonNullable<typeof w> => w !== null
		);

		return validWinners.sort((a, b) => {
			if (sortBy === "completion") {
				return a.completionTimestamp - b.completionTimestamp;
			} else {
				const durationA = a.completionTimestamp - a.startTimestamp;
				const durationB = b.completionTimestamp - b.startTimestamp;
				return durationA - durationB;
			}
		});
	}, [stats?.overall.winners, sortBy]);

	if (loading) {
		return (
			<div className="flex items-center justify-center min-h-[400px]">
				<Loader2 className="w-8 h-8 animate-spin" />
			</div>
		);
	}

	if (error) {
		return (
			<Alert variant="destructive" className="max-w-lg mx-auto mt-8">
				<AlertDescription>{error}</AlertDescription>
			</Alert>
		);
	}

	if (!stats) {
		return (
			<Alert className="max-w-lg mx-auto mt-8">
				<AlertDescription>No stats available</AlertDescription>
			</Alert>
		);
	}

	const userCompletionTime =
		stats.user.completed && stats.user.completionTimestamp
			? formatDuration(
					stats.user.startTimestamp,
					stats.user.completionTimestamp
				)
			: "Not completed";

	return (
		<div className="p-6 space-y-6 max-w-6xl mx-auto">
			{/* User Stats */}
			<Card>
				<CardHeader>
					<CardTitle>Your Performance</CardTitle>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="grid grid-cols-1 md:grid-cols-2 place-items-center text-center gap-4">
						<div className="flex items-center space-x-2 text-center">
							<Clock className="w-4 h-4" />
							<span>
								<b>Start Time:</b>{" "}
								{formatTime(stats.user.startTimestamp)}
							</span>
						</div>
						<div className="flex items-center space-x-2">
							<Trophy className="w-4 h-4" />
							<span>
								<b>Status:</b>{" "}
								{stats.user.completed
									? "Completed"
									: "In Progress"}
							</span>
						</div>
						<div>
							<b>Time Taken:</b> {userCompletionTime}
						</div>
						<div>
							<b>Last Solved:</b> Q
							{stats.user.solves.sort().reverse()[0]}
						</div>
					</div>
				</CardContent>
			</Card>

			{/* Question Stats */}
			<Card className="">
				<CardHeader>
					<CardTitle>Question Statistics</CardTitle>
				</CardHeader>
				<CardContent className="">
					<div className="h-[300px]">
						<ResponsiveContainer width="100%" height="100%">
							<BarChart
								data={stats.overall.questions.sort(
									(a, b) => a.number - b.number
								)}
							>
								<CartesianGrid strokeDasharray="3 3" />
								<XAxis dataKey="number" />
								<YAxis />
								<Tooltip />
								<Bar dataKey="solves" fill="#3b82f6" />
							</BarChart>
						</ResponsiveContainer>
					</div>
				</CardContent>
			</Card>

			{/* Winners Table */}
			<Card>
				<CardHeader>
					<CardTitle>Winners Leaderboard</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="space-y-4">
						<div className="flex justify-end space-x-2">
							<Button
								variant={
									sortBy === "completion"
										? "default"
										: "outline"
								}
								onClick={() => setSortBy("completion")}
								className="flex items-center gap-2"
							>
								<ArrowUpDown className="w-4 h-4" />
								Sort by Completion Time
							</Button>
							<Button
								variant={
									sortBy === "duration"
										? "default"
										: "outline"
								}
								onClick={() => setSortBy("duration")}
								className="flex items-center gap-2"
							>
								<ArrowUpDown className="w-4 h-4" />
								Sort by Duration
							</Button>
						</div>
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>Rank</TableHead>
									<TableHead>Username</TableHead>
									<TableHead>Start Time</TableHead>
									<TableHead>Completion Time</TableHead>
									<TableHead>Duration</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{sortedWinners.map((winner, index) => (
									<TableRow key={winner.id}>
										<TableCell>{index + 1}</TableCell>
										<TableCell>{winner.username}</TableCell>
										<TableCell>
											{formatTime(winner.startTimestamp)}
										</TableCell>
										<TableCell>
											{formatTime(
												winner.completionTimestamp
											)}
										</TableCell>
										<TableCell>
											{formatDuration(
												winner.startTimestamp,
												winner.completionTimestamp
											)}
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</div>
				</CardContent>
			</Card>
		</div>
	);
};


export default CTFStatsPage;
