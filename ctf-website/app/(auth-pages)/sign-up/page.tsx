import { signUpAction } from "@/app/actions"
import { FormMessage, type Message } from "@/components/form-message"
import { SubmitButton } from "@/components/submit-button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { SmtpMessage } from "../smtp-message"
import Image from "next/image"

export default async function Signup(props: {
  searchParams: Promise<Message>
}) {
  const searchParams = await props.searchParams
  if ("message" in searchParams) {
    return (
      <div className="w-full flex-1 flex items-center h-screen sm:max-w-md justify-center gap-2 p-4 bg-[#0a4275]">
        <FormMessage message={searchParams} />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#0a4275] text-white w-screen">
      <header className="bg-[#00285e] py-4">
        <div className="container mx-auto px-4 flex items-center">
          <Image
            src="/fbi-logo.png"
            alt="FBI Seal"
            width={50}
            height={50}
            className="rounded-full mr-4"
          />
          <h1 className="text-2xl font-bold">Federal Bureau of Investigation</h1>
        </div>
      </header>

      <main className="flex-grow flex items-center justify-center py-12">
        <div className="bg-white text-gray-800 p-8 rounded-lg shadow-lg max-w-md w-full">
          <form className="flex flex-col">
            <h2 className="text-3xl font-bold mb-2 text-[#00285e]">Sign up</h2>
            <p className="text-sm text-gray-600 mb-6">
              Already have an account?{" "}
              <Link className="text-[#b41e22] font-medium hover:underline" href="/sign-in">
                Sign in
              </Link>
            </p>
            <div className="flex flex-col gap-4">
              <div>
                <Label htmlFor="email" className="text-gray-700">
                  Email
                </Label>
                <Input
                  name="email"
                  placeholder="you@example.com"
                  required
                  className="mt-1 bg-gray-100 border-gray-300 focus:border-[#00285e] focus:ring-[#00285e]"
                />
              </div>
              <div>
                <Label htmlFor="password" className="text-gray-700">
                  Password
                </Label>
                <Input
                  type="password"
                  name="password"
                  placeholder="Your password"
                  minLength={6}
                  required
                  className="mt-1 bg-gray-100 border-gray-300 focus:border-[#00285e] focus:ring-[#00285e]"
                />
              </div>
              <SubmitButton
                formAction={signUpAction}
                pendingText="Signing up..."
                className="bg-[#b41e22] hover:bg-[#8e1518] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4"
              >
                Sign up
              </SubmitButton>
              <FormMessage message={searchParams} />
            </div>
          </form>
        </div>
      </main>

      <footer className="bg-[#00285e] py-4 mt-auto">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; {new Date().getFullYear()} Federal Bureau of Investigation</p>
        </div>
      </footer>
    </div>
  )
}

