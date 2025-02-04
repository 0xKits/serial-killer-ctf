"use client";

import { useState } from "react";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function UsernamePopup({
	hasUsername,
	setHasUsername,
	handleSetUsername,
}: {
	hasUsername: boolean;
	setHasUsername: React.Dispatch<React.SetStateAction<boolean>>;
	handleSetUsername: (username: string) => void;
}) {
	const [isOpen, setIsOpen] = useState(true);
	const [username, setUsername] = useState("");

	const handleUsernameSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		console.log(username);
		if (username.trim()) {
			handleSetUsername(username.trim());
			setHasUsername(true);
		}
	};

	const handleOpenChange = (open: boolean) => {
		if (hasUsername) {
			setIsOpen(open);
		}
	};

	return (
		<Dialog open={isOpen} onOpenChange={handleOpenChange}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Set Your Username</DialogTitle>
					<DialogDescription>
						You must set a username before you can dismiss this
						popup.
					</DialogDescription>
				</DialogHeader>
				<form onSubmit={handleUsernameSubmit} className="space-y-4">
					<div className="space-y-2">
						<Label htmlFor="username">Username</Label>
						<Input
							id="username"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
							placeholder="Enter your username"
						/>
					</div>
					<Button type="submit">Set Username</Button>
				</form>
				{hasUsername && (
					<div className="mt-4 text-center text-green-600">
						Username set successfully! You can now close this popup.
					</div>
				)}
			</DialogContent>
		</Dialog>
	);
}
