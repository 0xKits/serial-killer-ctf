"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { FileDown, AlertTriangle, CheckCircle } from "lucide-react"

export default function CaseInformation() {
  const [flagInput, setFlagInput] = useState("")
  const [flagStatus, setFlagStatus] = useState<"idle" | "success" | "error">("idle")

  const handleFlagSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // This is where you'd typically validate the flag
    // For this example, let's say the correct flag is "FBI_FLAG_123"
    if (flagInput === "FBI_FLAG_123") {
      setFlagStatus("success")
    } else {
      setFlagStatus("error")
    }
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
            <h2 className="text-3xl font-bold text-[#00285e] mb-2">Case #23-007: Operation Cyber Sentinel</h2>
            <p className="text-gray-600">Last Updated: {new Date().toLocaleDateString()}</p>
          </div>

          <div className="p-6">
            <h3 className="text-xl font-semibold mb-4">Case Overview</h3>
            <p className="mb-4">
              The FBI is currently investigating a series of sophisticated cyber attacks targeting critical
              infrastructure. We are seeking assistance from skilled cybersecurity experts to analyze the provided data
              and uncover crucial information.
            </p>

            <div className="mb-6">
              <h4 className="text-lg font-semibold mb-2">Available Evidence</h4>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  Network traffic logs
                  <Button variant="link" className="ml-2 text-[#b41e22]">
                    <FileDown className="mr-1" size={16} />
                    Download
                  </Button>
                </li>
                <li>
                  Encrypted communication transcripts
                  <Button variant="link" className="ml-2 text-[#b41e22]">
                    <FileDown className="mr-1" size={16} />
                    Download
                  </Button>
                </li>
                <li>
                  Suspect's hard drive image
                  <Button variant="link" className="ml-2 text-[#b41e22]">
                    <FileDown className="mr-1" size={16} />
                    Download
                  </Button>
                </li>
              </ul>
            </div>

            <div className="mb-6">
              <h4 className="text-lg font-semibold mb-2">Task</h4>
              <p>
                Analyze the provided evidence and submit your findings using the secure form below. Each correct piece
                of information will help advance our investigation.
              </p>
            </div>

            <form onSubmit={handleFlagSubmit} className="space-y-4">
              <div>
                <label htmlFor="flag" className="block text-sm font-medium text-gray-700 mb-1">
                  Submit Investigation Findings
                </label>
                <div className="flex">
                  <Input
                    type="text"
                    id="flag"
                    placeholder="Enter your findings here"
                    value={flagInput}
                    onChange={(e) => setFlagInput(e.target.value)}
                    className="flex-grow mr-2"
                  />
                  <Button type="submit" className="bg-[#00285e] hover:bg-[#001f4b] text-white">
                    Submit
                  </Button>
                </div>
              </div>
              {flagStatus === "success" && (
                <div className="flex items-center text-green-600">
                  <CheckCircle className="mr-2" size={20} />
                  Information verified. Thank you for your contribution to this case.
                </div>
              )}
              {flagStatus === "error" && (
                <div className="flex items-center text-[#b41e22]">
                  <AlertTriangle className="mr-2" size={20} />
                  Unable to verify the provided information. Please review and try again.
                </div>
              )}
            </form>
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

