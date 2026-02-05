"use client"

import Image from "next/image"
import { Card } from "@/components/ui/card"
import { useTranslations, useLocale } from 'next-intl'

export default function ColtelleriaStoreCaseStudy() {
  const t = useTranslations('coltelleriaStore')
  const tCommon = useTranslations('common')
  const locale = useLocale()
  return (
    <div className="min-h-screen bg-[#0a1e4d] text-white p-4 md:p-8 lg:p-12 relative overflow-hidden">
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

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Left column - Headline and CTA */}
          <div className="flex flex-col justify-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
              {t('title')}
            </h1>
            <div className="mt-6">{/* CTA rimossa */}</div>
          </div>

          {/* Right column - Image and stats */}
          <div>
            <Card className="bg-[#b3e0e8] text-[#0a1e4d] rounded-lg overflow-hidden">
              {/* Image section */}
              <div className="w-full">
                <Image
                  src="/images/coltelleria-knives.png"
                  alt="Collezione di coltelli da cucina"
                  width={600}
                  height={400}
                  className="w-full object-cover"
                />
              </div>

              {/* Stats grid */}
              <div className="grid grid-cols-2 gap-4 p-6">
                {/* Sector */}
                <div className="flex items-start gap-3">
                  <div className="mt-1 text-[#0a1e4d]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"></path>
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm uppercase font-medium">{tCommon('sector')}</p>
                    <p className="font-medium">{t('category')}</p>
                  </div>
                </div>

                {/* Size */}
                <div className="flex items-start gap-3">
                  <div className="mt-1 text-[#0a1e4d]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
                      <path d="M12 3a6 6 0 0 1-9 9 9 9 0 0 0 9 9Z"></path>
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm uppercase font-medium">{tCommon('size')}</p>
                    <p className="font-medium">500 {t('ordersPerMonth')}</p>
                  </div>
                </div>

                {/* Region */}
                <div className="flex items-start gap-3">
                  <div className="mt-1 text-[#0a1e4d]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="12" r="10"></circle>
                      <path d="M12 2a14.5 14.5 0 0 0 0 20a14.5 14.5 0 0 0 0-20"></path>
                      <path d="M2 12h20"></path>
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm uppercase font-medium">REGION</p>
                    <p className="font-medium">Italy</p>
                  </div>
                </div>

                {/* Platform */}
                <div className="flex items-start gap-3">
                  <div className="mt-1 text-[#0a1e4d]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M12.5 2h-1V1h1zm0 21h-1v1h1zm9.5-10.5v-1h1v1zM2 11.5v-1H1v1zm15.5-5.5h-1V5h1zm0 13h-1v1h1zm-11-13v1H5v-1zm0 13v1H5v-1z"></path>
                      <path d="M7.5 8a4.5 4.5 0 1 0 9 0 4.5 4.5 0 1 0-9 0z"></path>
                      <path d="M7.5 16a4.5 4.5 0 1 0 9 0 4.5 4.5 0 1 0-9 0z"></path>
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm uppercase font-medium">WEBSITE</p>
                    <p className="font-medium">le-migliori-lame.com</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Stats section - Horizontal layout */}
        <div className="mb-16">
          <div className="bg-[#0c2a6a] p-8 rounded-lg mb-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="bg-[#0a1e4d] p-6 rounded-lg text-center transform hover:scale-105 transition-transform">
                <div className="text-5xl font-bold text-white mb-2">€ 205</div>
                <div className="text-[#3db4d2] font-medium">{t('budgetSpent')}</div>
              </div>

              <div className="bg-[#0a1e4d] p-6 rounded-lg text-center transform hover:scale-105 transition-transform">
                <div className="text-5xl font-bold text-white mb-2">€ 2840</div>
                <div className="text-[#3db4d2] font-medium">{t('revenue')}</div>
              </div>

              <div className="bg-[#0a1e4d] p-6 rounded-lg text-center transform hover:scale-105 transition-transform">
                <div className="text-5xl font-bold text-white mb-2">+ 71</div>
                <div className="text-[#3db4d2] font-medium">{t('sales')}</div>
              </div>

              <div className="bg-[#0a1e4d] p-6 rounded-lg text-center transform hover:scale-105 transition-transform">
                <div className="text-5xl font-bold text-white mb-2">1385%</div>
                <div className="text-[#3db4d2] font-medium">{t('roi')}</div>
              </div>
            </div>
          </div>

          <div className="bg-[#0c2a6a] p-8 rounded-lg">
            <h2 className="text-3xl font-bold text-[#3db4d2] mb-6">{t('aboutTitle')}</h2>
            <p className="text-white leading-relaxed mb-6">
              {t('aboutText')}
            </p>
            <div className="mt-8 bg-white/5 p-4 rounded-lg">
              <div className="flex items-center">
                <div className="w-16 h-16 rounded-full bg-[#3db4d2] flex items-center justify-center mr-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                </div>
                <div>
                  <p className="text-white/80 text-sm">Michele / Owner "Coltelleria Store"</p>
                  <p className="text-white font-medium">
                    {t('founderQuote')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Challenge section */}
        <div className="mb-16">
          <Card className="bg-[#0a1e4d] border-[#3db4d2] border-2 p-8 rounded-lg">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-4">
                  <span className="text-white">{tCommon('theChallenge')}</span>{" "}
                  <span className="text-[#3db4d2]">{tCommon('beforeSendcloud')}</span>
                </h2>
                <p className="text-white leading-relaxed">
                  {t('challengeText')}
                </p>
              </div>
              <div>
                <Image
                  src={
                    locale === "en"
                      ? "/images/coltelleria-whatsapp-map-en.png"
                      : "/images/coltelleria-whatsapp.png"
                  }
                  alt="Messaggio WhatsApp di Coltelleria Store"
                  width={600}
                  height={400}
                  className="w-full rounded-lg shadow-lg"
                />
              </div>
            </div>
          </Card>
        </div>

        {/* Implementation section */}
        <div className="mb-16">
          <Card className="bg-[#0c2a6a] p-8 rounded-lg">
            <h2 className="text-3xl font-bold text-[#3db4d2] mb-6">{t('strategyTitle')}</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
              <div>
                <p className="text-white leading-relaxed mb-6">
                  {t('strategyText1')}
                </p>
                <p className="text-white leading-relaxed mb-6">
                  {t('strategyText2')}
                </p>
              </div>
              <div>
                <Image
                  src={
                    locale === "en"
                      ? "/images/coltelleria-whatsapp-template-en.png"
                      : "/images/coltelleria-whatsapp.png"
                  }
                  alt="Messaggio WhatsApp di Coltelleria Store"
                  width={600}
                  height={600}
                  className="w-full rounded-lg shadow-lg"
                />
              </div>
            </div>
          </Card>
        </div>

        {/* Results section */}
        <div className="mb-16">
          <Card className="bg-[#0a1e4d] border-[#3db4d2] border-2 p-8 rounded-lg">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-4">
                  <span className="text-white">{t('resultsTitle')}</span>
                </h2>
                <p className="text-white leading-relaxed mb-6">
                  {t('resultsText1')}
                </p>
                <p className="text-white leading-relaxed mb-6">
                  {t('resultsText2')}
                </p>
              </div>
              <div>
                <Image
                  src="/images/coltelleria-results.png"
                  alt="Risultati della campagna WhatsApp"
                  width={600}
                  height={400}
                  className="w-full rounded-lg shadow-lg"
                />
              </div>
            </div>
          </Card>
        </div>

        {/* Why WhatsApp works section */}
        <div className="mb-16">
          <Card className="bg-[#0c2a6a] p-8 rounded-lg">
            <h2 className="text-3xl font-bold text-[#3db4d2] mb-6">{t('whyWhatsappTitle')}</h2>
            <p className="text-white leading-relaxed mb-6">
              {t('whyWhatsappText')}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-[#0a1e4d] p-6 rounded-lg">
                <h3 className="text-xl font-bold text-[#3db4d2] mb-4">{t('highCoverage')}</h3>
                <p className="text-white">
                  {t('highCoverageText')}
                </p>
              </div>
              <div className="bg-[#0a1e4d] p-6 rounded-lg">
                <h3 className="text-xl font-bold text-[#3db4d2] mb-4">{t('lowCompetition')}</h3>
                <p className="text-white">
                  {t('lowCompetitionText')}
                </p>
              </div>
              <div className="bg-[#0a1e4d] p-6 rounded-lg">
                <h3 className="text-xl font-bold text-[#3db4d2] mb-4">{t('highDeliverability')}</h3>
                <p className="text-white">
                  {t('highDeliverabilityText')}
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* CTA section */}
        <div>
          <Card className="bg-[#0c2a6a] p-8 rounded-lg">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                <span className="text-white">{t('ctaTitle')}</span>
              </h2>
              <p className="text-white leading-relaxed mb-8">
                {t('ctaText')}
              </p>
              {/* CTA rimossa */}
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
