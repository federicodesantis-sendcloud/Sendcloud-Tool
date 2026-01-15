import Link from "next/link"
import Image from "next/image"
import { LanguageSelector } from "@/components/language-selector"

export default function Navbar() {
  return (
    <nav className="bg-[#0a1e4d] border-b border-[#3db4d2]/20 py-4">
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="mr-8">
            <Image src="/images/sendcloud-logo.svg" alt="Sendcloud" width={140} height={40} className="h-10 w-auto" />
          </Link>
          {/* Voci di navigazione rimosse */}
        </div>
        <div className="flex items-center">
          <LanguageSelector />
        </div>
      </div>
    </nav>
  )
}
