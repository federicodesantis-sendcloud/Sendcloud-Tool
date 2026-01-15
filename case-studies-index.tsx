"use client"

import { useState } from "react"
import Image from "next/image"
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/routing'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowRight, ChevronLeft, ChevronRight, Star } from "lucide-react"

// Definition of case studies
const caseStudies = [
  // First page - required case studies
  {
    id: "rossi-ricambi",
    title: "Rossi Ricambi",
    category: "Automotive",
    image: "/images/rossi-ricambi-team.png",
    badges: ["reviews"],
    stats: [
      { label: "REVIEWS", value: "5390" },
      { label: "RATING", value: "4.9" },
      { label: "PERIOD", value: "7 months" },
      { label: "CONVERSION", value: "19%" },
    ],
    description:
      "Rossi Ricambi collected over 5,390 reviews in just 7 months using Sendcloud's automated communications, achieving a 19% conversion rate.",
    link: "/rossi-ricambi",
    buttonText: "Read case study",
  },
  {
    id: "coltelleria-store",
    title: "Coltelleria Store",
    category: "Tools",
    image: "/images/coltelleria-knives.png",
    badges: ["sales"],
    stats: [
      { label: "BUDGET", value: "€205" },
      { label: "REVENUE", value: "€2840" },
      { label: "SALES", value: "+71" },
      { label: "ROI", value: "1385%" },
    ],
    description:
      "Coltelleria Store achieved 71 new sales worth €2,840 with a budget of only €205, resulting in an impressive 1385% ROI.",
    link: "/coltelleria-store",
    buttonText: "Read case study",
  },
  {
    id: "la-scarpologa",
    title: "La Scarpologa",
    category: "Footwear",
    image: "/images/la-scarpologa-cover.png",
    badges: ["reviews", "sales"],
    stats: [
      { label: "BUDGET", value: "€61.70" },
      { label: "REVENUE", value: "€1935" },
      { label: "SALES", value: "+43" },
      { label: "CONVERSION", value: "6%" },
    ],
    description:
      "La Scarpologa generated €1,935 in revenue with 43 new sales from a minimal investment of €61.70, demonstrating the effectiveness of post-purchase communications.",
    link: "/la-scarpologa",
    buttonText: "Read case study",
  },
  {
    id: "augusto-abbigliamento",
    title: "Augusto Abbigliamento",
    category: "Sportswear",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-b8FH9psrtjPP83ebPCR8Zf4E4EtZFj.png",
    badges: ["sales"],
    stats: [
      { label: "ROI", value: "3050%" },
      { label: "REVENUE", value: "€1890" },
      { label: "BUDGET", value: "€60" },
      { label: "SALES", value: "+27" },
    ],
    description:
      "Augusto Abbigliamento invested only €60 in a post-sale campaign and generated €1890 in revenue with 27 new sales, achieving a 3050% ROI.",
    link: "/augusto-abbigliamento",
    buttonText: "Read case study",
  },
  // Second page - other case studies
  {
    id: "coral-bay",
    title: "Coral Bay",
    category: "Pets",
    image: "/aquarium-store.png",
    badges: ["reviews"],
    stats: [
      { label: "CONVERSION", value: "84%" },
      { label: "REVIEWS", value: "83" },
      { label: "PERIOD", value: "2 months" },
      { label: "INCREASE", value: "10.5x" },
    ],
    description:
      "Coral Bay transformed 84% of orders into positive reviews using Sendcloud's automated communications, achieving in 2 months results that would have taken 2 years.",
    link: "/coral-bay",
    buttonText: "Read case study",
  },
  {
    id: "cura-farma",
    title: "Cura Farma",
    category: "Pharmacy",
    image: "/pharmacy-shelves.png",
    badges: ["reviews"],
    stats: [
      { label: "REVIEWS", value: "309" },
      { label: "INCREASE", value: "10,200%" },
      { label: "AVG RATING", value: "4.8" },
      { label: "PERIOD", value: "90 days" },
    ],
    description:
      "Cura Farma went from 3 to 309 reviews in just 90 days using Sendcloud's communications and insurance solutions, with a 10,200% increase.",
    link: "/cura-farma",
    buttonText: "Read case study",
  },
  {
    id: "ivan-basile",
    title: "Ivan Basile",
    category: "Jewelry",
    image: "/handmade-jewelry-workshop.png",
    badges: ["reviews"],
    stats: [
      { label: "REVIEWS", value: "124" },
      { label: "RATING", value: "5.0" },
      { label: "PERIOD", value: "60 days" },
      { label: "INCREASE", value: "620%" },
    ],
    description:
      "Ivan Basile obtained 124 5-star reviews in just 60 days using Sendcloud's automated communications and insurance options, increasing the credibility of his handcrafted jewelry brand.",
    link: "/ivan-basile",
    buttonText: "Read case study",
  },
]

// Badge configuration with colors and labels
const badgeConfig = {
  reviews: { label: "Reviews", color: "bg-green-500/20 text-green-400 border-green-500/30" },
  sales: { label: "Sales", color: "bg-blue-500/20 text-blue-400 border-blue-500/30" },
  automation: { label: "Automation", color: "bg-purple-500/20 text-purple-400 border-purple-500/30" },
  insurance: { label: "Insurance", color: "bg-amber-500/20 text-amber-400 border-amber-500/30" },
}

// Componente per la scheda del case study
function CaseStudyCard({ caseStudy }) {
  return (
    <Card className="bg-gradient-to-br from-[#0c2a6a] to-[#0a1e4d] overflow-hidden flex flex-col h-full border border-[#3db4d2]/10 rounded-xl shadow-xl hover:shadow-[#3db4d2]/20 transition-all hover:scale-[1.02] group">
      <div className="relative h-64">
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a1e4d] via-transparent to-transparent z-10"></div>
        <Image
          src={caseStudy.image || "/placeholder.svg"}
          alt={caseStudy.title}
          fill
          className="object-cover transition-transform group-hover:scale-105"
        />
        <div className="absolute top-4 left-4 bg-[#1a4080] text-white px-3 py-1 rounded-full text-sm font-medium z-20">
          {caseStudy.category}
        </div>

        {/* Badges */}
      </div>
      <div className="p-6 flex-grow relative">
        <div className="absolute top-0 right-0 -mt-12 mr-6 bg-[#3db4d2] text-white rounded-full p-3 shadow-lg z-20">
          <Star className="h-6 w-6" />
        </div>
        <h2 className="text-3xl font-bold mb-4 text-white text-center">{caseStudy.title}</h2>

        {/* Badges */}
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {caseStudy.badges.map((badge, index) => (
            <span
              key={index}
              className={`px-3 py-1 rounded-full text-sm font-medium border ${badgeConfig[badge]?.color || "bg-gray-500/20 text-gray-400 border-gray-500/30"}`}
            >
              {badgeConfig[badge]?.label || badge}
            </span>
          ))}
        </div>

        {/* Results Grid */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {caseStudy.stats.map((stat, index) => (
            <div key={index} className="bg-white/5 p-3 rounded-lg">
              <div className="text-sm text-[#3db4d2] font-medium">{stat.label}</div>
              <div className="text-2xl font-bold text-white">{stat.value}</div>
            </div>
          ))}
        </div>

        <p className="text-white/80 mb-6 line-clamp-3">{caseStudy.description}</p>
        <div className="mt-auto">
          <Link href={caseStudy.link}>
            <Button className="w-full bg-[#2a8ca6] hover:bg-[#236f83] text-white font-medium group-hover:bg-[#3db4d2] transition-colors flex items-center justify-center">
              {caseStudy.buttonText}
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  )
}

export default function CaseStudiesIndex() {
  const t = useTranslations()
  const [currentPage, setCurrentPage] = useState(1)
  const casesPerPage = 6
  const totalPages = Math.ceil(caseStudies.length / casesPerPage)

  // Calcola gli indici per la paginazione
  const indexOfLastCase = currentPage * casesPerPage
  const indexOfFirstCase = indexOfLastCase - casesPerPage
  const currentCases = caseStudies.slice(indexOfFirstCase, indexOfLastCase)

  // Funzioni per la navigazione
  const goToNextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages))
  const goToPrevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1))

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a1e4d] to-[#081638] text-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] opacity-20 z-0">
        <Image src="/images/ellipse-gradient.svg" alt="" fill className="object-contain" />
      </div>
      <div className="absolute bottom-0 left-0 w-[800px] h-[800px] opacity-15 z-0">
        <Image src="/images/fluid-shape.png" alt="" fill className="object-contain" />
      </div>
      <div className="absolute top-[40%] left-[-200px] w-[600px] h-[600px] opacity-10 z-0">
        <Image src="/images/circle-gradient.png" alt="" fill className="object-contain" />
      </div>
      <div className="absolute bottom-[20%] right-[-200px] w-[500px] h-[500px] opacity-10 z-0 rotate-180">
        <Image src="/images/ellipse-gradient.svg" alt="" fill className="object-contain" />
      </div>

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/pattern-bg.png')] opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 relative z-10">
          <div className="flex flex-col items-center text-center">
            <div className="mb-8 relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#3db4d2] to-[#2a8ca6] rounded-full blur opacity-30"></div>
              <Image
                src="/images/sendcloud-logo.svg"
                alt="Sendcloud"
                width={240}
                height={70}
                className="relative h-16 w-auto"
              />
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-[#3db4d2]">
              {t('home.title')}
            </h1>
            <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto mb-12 leading-relaxed">
              {t('home.subtitle')}
            </p>

            {/* Services Diagram */}
            <div className="flex justify-center mb-16">
              <div className="relative">
                <Image
                  src="/images/sendcloud-services-diagram.png"
                  alt="Sendcloud Services Ecosystem"
                  width={400}
                  height={400}
                  className="w-80 h-80 md:w-96 md:h-96 object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Case Studies Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-3xl font-bold">
            <span className="text-white">Our</span> <span className="text-[#3db4d2]">Case Studies</span>
          </h2>
          <div className="hidden md:flex space-x-4">
            <Button variant="outline" className="border-[#3db4d2] text-[#3db4d2] hover:bg-[#3db4d2] hover:text-white">
              All Industries
            </Button>
            <Button variant="outline" className="border-[#3db4d2] text-[#3db4d2] hover:bg-[#3db4d2] hover:text-white">
              Most Recent
            </Button>
            <Button variant="outline" className="border-[#3db4d2] text-[#3db4d2] hover:bg-[#3db4d2] hover:text-white">
              Highest ROI
            </Button>
          </div>
        </div>

        {/* Case studies grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {currentCases.map((caseStudy) => (
            <CaseStudyCard key={caseStudy.id} caseStudy={caseStudy} />
          ))}
        </div>

        {/* Pagination controls */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 mb-16">
            <Button
              variant="outline"
              onClick={goToPrevPage}
              disabled={currentPage === 1}
              className="border-[#3db4d2] text-[#3db4d2] hover:bg-[#3db4d2] hover:text-white disabled:opacity-50"
            >
              <ChevronLeft className="h-5 w-5 mr-2" />
              Previous
            </Button>

            <div className="flex items-center gap-2">
              {Array.from({ length: totalPages }, (_, i) => (
                <Button
                  key={i}
                  variant={currentPage === i + 1 ? "default" : "outline"}
                  onClick={() => setCurrentPage(i + 1)}
                  className={
                    currentPage === i + 1
                      ? "bg-[#3db4d2] text-white"
                      : "border-[#3db4d2] text-[#3db4d2] hover:bg-[#3db4d2] hover:text-white"
                  }
                >
                  {i + 1}
                </Button>
              ))}
            </div>

            <Button
              variant="outline"
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
              className="border-[#3db4d2] text-[#3db4d2] hover:bg-[#3db4d2] hover:text-white disabled:opacity-50"
            >
              Next
              <ChevronRight className="h-5 w-5 ml-2" />
            </Button>
          </div>
        )}

        {/* CTA section */}
        <div className="mb-16">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-[#3db4d2]/20 to-[#0c2a6a]/20 rounded-2xl blur-xl"></div>
            <Card className="bg-gradient-to-r from-[#0c2a6a] to-[#081638] p-8 rounded-2xl border border-[#3db4d2]/30 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#3db4d2] rounded-full filter blur-3xl opacity-10 -mr-20 -mt-20"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#3db4d2] rounded-full filter blur-3xl opacity-10 -ml-20 -mb-20"></div>

              <div className="text-center max-w-3xl mx-auto relative z-10">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  <span className="text-white">Want to become our next</span>{" "}
                  <span className="text-[#3db4d2]">success story?</span>
                </h2>
                <p className="text-white/80 text-lg leading-relaxed mb-8">
                  Discover how Sendcloud can help your business increase sales, reviews and customer loyalty through
                  automated and personalized communications.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button className="bg-[#3db4d2] hover:bg-[#2a8ca6] text-white px-8 py-6 text-lg font-medium">
                    Request a demo
                  </Button>
                  <Button
                    variant="outline"
                    className="border-[#3db4d2] text-[#3db4d2] hover:bg-[#3db4d2] hover:text-white px-8 py-6 text-lg font-medium"
                  >
                    Contact us
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-white/10 pt-12 pb-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div>
              <Image
                src="/images/sendcloud-logo.svg"
                alt="Sendcloud"
                width={150}
                height={40}
                className="h-10 w-auto mb-4"
              />
              <p className="text-white/60 text-sm">
                Sendcloud is the leading post-purchase communication platform that helps e-commerce businesses grow.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Solutions</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-white/60 hover:text-[#3db4d2] transition-colors">
                    WhatsApp Business
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-white/60 hover:text-[#3db4d2] transition-colors">
                    Transactional Emails
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-white/60 hover:text-[#3db4d2] transition-colors">
                    Review Management
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-white/60 hover:text-[#3db4d2] transition-colors">
                    Shipment Tracking
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Case Studies</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/cura-farma" className="text-white/60 hover:text-[#3db4d2] transition-colors">
                    Cura Farma
                  </Link>
                </li>
                <li>
                  <Link href="/coral-bay" className="text-white/60 hover:text-[#3db4d2] transition-colors">
                    Coral Bay
                  </Link>
                </li>
                <li>
                  <Link href="/augusto-abbigliamento" className="text-white/60 hover:text-[#3db4d2] transition-colors">
                    Augusto Abbigliamento
                  </Link>
                </li>
                <li>
                  <Link href="/" className="text-white/60 hover:text-[#3db4d2] transition-colors">
                    All Case Studies
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Resources</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-white/60 hover:text-[#3db4d2] transition-colors">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-white/60 hover:text-[#3db4d2] transition-colors">
                    Guides
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-white/60 hover:text-[#3db4d2] transition-colors">
                    Webinars
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-white/60 hover:text-[#3db4d2] transition-colors">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="text-center">
            <p className="text-white/40 text-sm">© {new Date().getFullYear()} Sendcloud. All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
