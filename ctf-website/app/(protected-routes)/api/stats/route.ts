import { createClient } from "@/utils/supabase/server";
import { type NextRequest, NextResponse } from "next/server";

export type EventStatsResponse = {
	user: {
		completed: boolean;
		completionTimestamp?: number;
		startTimestamp: number;
		solves: number[];
	};
	overall: {
		winners: ({
			id: string;
			username: string;
			completionTimestamp: number;
			startTimestamp: number;
		} | null)[];
		questions: {
			number: number;
			solves: number;
		}[];
	};
};

export async function GET(req: NextRequest) {
	const supabase = await createClient();
	const user = await supabase.auth.getUser();

	if (user.data.user) {
		const { data: solvesData, error: solvesError } = await supabase.from(
			"user_solves"
		).select(`
        player,
        question,
        created_at    
      `);

		const { data: userData, error: userError } = await supabase.from(
			"profiles"
		).select(`       
        user,
        username,
        created_at
      `);

		const { data: questionsData, error: questionsError } =
			await supabase.from("questions").select(`
        id,
        index,
        title    
      `);

		if (solvesError || userError || questionsError) {
			return NextResponse.json(
				{ error: "Failed to retrieve stats" },
				{ status: 500 }
			);
		}

		// Process the data
		const questionIdToIndex = new Map(
			questionsData.map((q) => [q.id, q.index])
		);
		const finalQuestionId = questionsData.find((q) => q.index === 7)?.id;

		// User stats
		const userSolves = solvesData.filter(
			(solve) => solve.player === user.data.user?.id
		);
		const userProfile = userData.find(
			(profile) => profile.user === user.data.user?.id
		);
		if (userProfile) {
			const userStats: EventStatsResponse["user"] = {
				completed: userSolves.some(
					(solve) => solve.question === finalQuestionId
				),
				startTimestamp: new Date(userProfile.created_at).getTime(),
				solves: userSolves.map((s) => {
					return questionIdToIndex.get(s.question) as number;
				}),
			};

			if (userStats.completed) {
				const finalSolve = userSolves.find(
					(solve) => solve.question === finalQuestionId
				);
				if (finalSolve) {
					userStats.completionTimestamp = new Date(
						finalSolve.created_at
					).getTime();
				}
			}

			// Overall stats
			const winners = userData
				.map((profile) => {
					const profileSolves = solvesData.filter(
						(solve) => solve.player === profile.user
					);
					const completed = profileSolves.some(
						(solve) => solve.question === finalQuestionId
					);

					const startTimestamp = new Date(
						profile.created_at
					).getTime();
					if (!completed) return null;

					const completionSolve = profileSolves.find(
						(solve) => solve.question === finalQuestionId
					);

					const completionTimestamp = new Date(
						completionSolve ? completionSolve.created_at : ""
					).getTime();

					return {
						id: profile.user,
						username: profile.username,
						completionTimestamp,
						startTimestamp,
					};
				})
				.filter(Boolean);

			const questionSolves = questionsData.map((question) => ({
				number: question.index,
				solves: solvesData.filter(
					(solve) => solve.question === question.id
				).length,
			}));

			const response: EventStatsResponse = {
				user: userStats,
				overall: {
					winners: winners,
					questions: questionSolves,
				},
			};

			return NextResponse.json(response);
		}
	} else {
		return NextResponse.json(
			{ error: "User not authenticated" },
			{ status: 401 }
		);
	}
}
