import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

type SubmitFlagRequest = {
	question_index: number;
	flag: string;
};

export async function POST(req: NextRequest) {
	const data: SubmitFlagRequest = await req.json();
	if (!data.question_index || !data.flag) {
		return NextResponse.json(
			{ error: "Missing required fields" },
			{ status: 400 }
		);
	}
	const supabase = await createClient();
	const user = await supabase.auth.getUser();
	const correctFlag = await supabase
		.from("questions")
		.select("flag")
		.eq("index", data.question_index);

	if (user.data.user) {
		if (correctFlag.data) {
			if (correctFlag.data[0].flag === data.flag) {
				const q_id = await supabase
					.from("questions")
					.select("id")
					.eq("index", data.question_index);
				if (!q_id.data) {
					return NextResponse.json({ correct: false });
				}

				await supabase.from("user_solves").insert([
					{
						player: user.data.user.id,
						question: q_id.data[0].id,
					},
				]);
				return NextResponse.json({ correct: true });
			}
		}
	}

	return NextResponse.json({ correct: false });
}
