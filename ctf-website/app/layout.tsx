import { Geist, Ubuntu_Mono, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";

const defaultUrl = process.env.VERCEL_URL
	? `https://${process.env.VERCEL_URL}`
	: "http://localhost:3000";

export const metadata = {
	metadataBase: new URL(defaultUrl),
	title: "FBI",
	description: "Serial Killer Track Down and Investigation",
};

const jetBrainsMono = JetBrains_Mono({
  weight: ["400", "700", "800"],
  display: "swap",
  subsets: ["latin"],
})


export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			lang="en"
			className={jetBrainsMono.className}
			suppressHydrationWarning
		>
			<head>
				<link rel="icon" href="/favicon.ico" />
			</head>
			<body className="bg-background text-foreground">
				<ThemeProvider
					attribute="class"
					defaultTheme="light"
					enableSystem
					disableTransitionOnChange
				>
					{children}
				</ThemeProvider>
			</body>
		</html>
	);
}
