"use client"

// import { createClient } from "@/utils/supabase/server";
// import { redirect } from "next/navigation";

// export default async function ProtectedPage() {
// 	const supabase = await createClient();

// 	const {
// 		data: { user },
// 	} = await supabase.auth.getUser();

// 	if (!user) {
// 		return redirect("/sign-in");
// 	}

// 	return <div className="flex-1 w-full flex flex-col gap-12">hello</div>;
// }

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Folder, Lock, CheckCircle } from "lucide-react"

// This would typically come from your backend or state management
const caseFiles = [
  {
    id: 1,
    title: "Operation Cyber Sentinel",
    status: "solved",
    description: "A series of sophisticated cyber attacks on critical infrastructure.",
  },
  {
    id: 2,
    title: "Project Dark Web",
    status: "unlocked",
    description: "Investigation into illegal activities on hidden internet networks.",
  },
  {
    id: 3,
    title: "Enigma Decryption",
    status: "locked",
    description: "Breaking a complex encryption used by an international crime syndicate.",
  },
  {
    id: 4,
    title: "Operation Ghost Protocol",
    status: "locked",
    description: "Tracking an elusive hacker group known for their stealth tactics.",
  },
]

export default function CaseFilesLanding() {
  const [expandedCase, setExpandedCase] = useState<number | null>(null)

  const toggleCase = (id: number) => {
    setExpandedCase(expandedCase === id ? null : id)
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 text-gray-800">
      <header className="bg-[#00285e] text-white py-4">
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

      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-3xl font-bold text-[#00285e] mb-2">Ongoing Investigations</h2>
            <p className="text-gray-600">Classified Case Files - Authorized Personnel Only</p>
          </div>

          <div className="p-6">
            <div className="grid gap-6 md:grid-cols-2">
              {caseFiles.map((caseFile) => (
                <div
                  key={caseFile.id}
                  className={`border h-fit rounded-lg overflow-hidden transition-shadow duration-300 ${
                    expandedCase === caseFile.id ? "shadow-lg" : "shadow"
                  }`}
                >
                  <div
                    className={`p-4 flex items-center cursor-pointer ${
                      caseFile.status === "locked" ? "bg-gray-100" : "bg-white"
                    }`}
                    onClick={() => caseFile.status !== "locked" && toggleCase(caseFile.id)}
                  >
                    {caseFile.status === "solved" && <CheckCircle className="mr-3 text-green-500" />}
                    {caseFile.status === "unlocked" && <Folder className="mr-3 text-[#00285e]" />}
                    {caseFile.status === "locked" && <Lock className="mr-3 text-gray-400" />}
                    <h3 className="text-lg font-semibold flex-grow">{caseFile.title}</h3>
                    {caseFile.status !== "locked" && (
                      <span className="text-sm text-gray-500">{expandedCase === caseFile.id ? "Close" : "Open"}</span>
                    )}
                  </div>
                  {expandedCase === caseFile.id && (
                    <div className="p-4 bg-gray-50 border-t">
                      <p className="text-sm mb-4">{caseFile.description}</p>
                      <Link
                        href={`/tipline/case/${caseFile.id}`}
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
        </div>
      </main>

      <footer className="bg-[#00285e] text-white py-4 mt-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; {new Date().getFullYear()} Federal Bureau of Investigation</p>
        </div>
      </footer>
    </div>
  )
}


