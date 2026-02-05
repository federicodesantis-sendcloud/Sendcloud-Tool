"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, BarChart3, MessageCircle, Star, TrendingUp, Users } from "lucide-react"
import { useTranslations, useLocale } from 'next-intl'
import { getLocalizedImage } from '@/lib/utils'

export default function LaScarpoLogaCaseStudy() {
  const t = useTranslations('laScarpologa')
  const tCommon = useTranslations('common')
  const locale = useLocale()
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

      {/* Navigation Bar */}
      <div className="bg-[#081638]/80 backdrop-blur-md border-b border-[#3db4d2]/10 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <ArrowLeft className="h-5 w-5 text-[#3db4d2]" />
            <span className="text-white font-medium">{tCommon('backToCaseStudies')}</span>
          </Link>
          <div className="flex items-center space-x-4">
            <Link href="/augusto-abbigliamento" className="text-white/70 hover:text-white transition-colors">
              {tCommon('previousCaseStudy')}
            </Link>
            <Link href="/rossi-ricambi" className="text-white/70 hover:text-white transition-colors">
              {tCommon('nextCaseStudy')}
            </Link>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/pattern-bg.png')] opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left column - Headline and Stats */}
            <div>
              <div className="inline-block bg-[#1a4080] text-white px-4 py-1 rounded-full text-sm font-medium mb-6">
                {t('category')}
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                {t('title')}
              </h1>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-6 mt-10">
                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 transform transition-all hover:border-[#3db4d2]/40">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[#3db4d2]/20 mb-4">
                    <TrendingUp className="h-6 w-6 text-[#3db4d2]" />
                  </div>
                  <div className="text-4xl font-bold text-white mb-2">€ 61,70</div>
                  <div className="text-[#3db4d2] font-medium">{t('budgetSpent')}</div>
                </div>

                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 transform transition-all hover:border-[#3db4d2]/40">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[#3db4d2]/20 mb-4">
                    <BarChart3 className="h-6 w-6 text-[#3db4d2]" />
                  </div>
                  <div className="text-4xl font-bold text-white mb-2">€ 1935</div>
                  <div className="text-[#3db4d2] font-medium">{t('revenue')}</div>
                </div>

                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 transform transition-all hover:border-[#3db4d2]/40">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[#3db4d2]/20 mb-4">
                    <Star className="h-6 w-6 text-[#3db4d2]" />
                  </div>
                  <div className="text-4xl font-bold text-white mb-2">+ 43</div>
                  <div className="text-[#3db4d2] font-medium">{t('sales')}</div>
                </div>

                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 transform transition-all hover:border-[#3db4d2]/40">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[#3db4d2]/20 mb-4">
                    <TrendingUp className="h-6 w-6 text-[#3db4d2]" />
                  </div>
                  <div className="text-4xl font-bold text-white mb-2">6%</div>
                  <div className="text-[#3db4d2] font-medium">{t('conversionRate')}</div>
                </div>
              </div>
            </div>

            {/* Right column - Image and info card */}
            <div>
              <div className="bg-gradient-to-br from-[#0c2a6a] to-[#081638] rounded-2xl overflow-hidden border border-[#3db4d2]/20 shadow-xl">
                {/* Image section */}
                <div className="w-full relative">
                  <Image
                    src="/images/la-scarpologa-cover.png"
                    alt="La Scarpologa - Elegant footwear"
                    width={600}
                    height={400}
                    className="w-full object-cover h-64"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a1e4d] via-transparent to-transparent"></div>
                </div>

                {/* Stats grid */}
                <div className="grid grid-cols-2 gap-6 p-6">
                  {/* Sector */}
                  <div className="flex items-start gap-3">
                    <div className="mt-1 text-[#3db4d2]">
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
                      <p className="text-sm uppercase font-medium text-[#3db4d2]">SECTOR</p>
                      <p className="font-medium text-white">Footwear</p>
                    </div>
                  </div>

                  {/* Size */}
                  <div className="flex items-start gap-3">
                    <div className="mt-1 text-[#3db4d2]">
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
                      <p className="text-sm uppercase font-medium text-[#3db4d2]">{tCommon('size')}</p>
                      <p className="font-medium text-white">250 {t('ordersPerMonth')}</p>
                    </div>
                  </div>

                  {/* Region */}
                  <div className="flex items-start gap-3">
                    <div className="mt-1 text-[#3db4d2]">
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
                      <p className="text-sm uppercase font-medium text-[#3db4d2]">REGION</p>
                      <p className="font-medium text-white">Florence, Italy</p>
                    </div>
                  </div>

                  {/* Platform */}
                  <div className="flex items-start gap-3">
                    <div className="mt-1 text-[#3db4d2]">
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
                      <p className="text-sm uppercase font-medium text-[#3db4d2]">WEBSITE</p>
                      <p className="font-medium text-white">lascarpologa.com</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Sections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        {/* About section */}
        <div className="mb-16">
          <div className="bg-gradient-to-br from-[#0c2a6a] to-[#081638] p-8 rounded-2xl border border-[#3db4d2]/20 shadow-xl">
            <h2 className="text-3xl font-bold text-[#3db4d2] mb-6">{tCommon('aboutUs')}</h2>
            <p className="text-white leading-relaxed text-lg mb-8">
              {t('aboutText')}
            </p>

            <div className="mt-8 bg-white/5 p-6 rounded-xl">
              <Image
                src="/images/la-scarpologa-website.png"
                alt="La Scarpologa website"
                width={800}
                height={450}
                className="w-full rounded-lg shadow-lg mb-6"
              />
              <div className="flex items-center">
                <div className="w-16 h-16 rounded-full bg-[#3db4d2] flex items-center justify-center mr-4 shrink-0">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <div>
                  <p className="text-white/80 text-sm">Antonella Ritondale / Owner "La Scarpologa"</p>
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
          <div className="bg-gradient-to-br from-[#0c2a6a] to-[#081638] p-8 rounded-2xl border border-[#3db4d2]/20 shadow-xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-4">
                  <span className="text-white">{tCommon('theChallenge')}</span>{" "}
                  <span className="text-[#3db4d2]">{tCommon('beforeSendcloud')}</span>
                </h2>
                <p className="text-white leading-relaxed text-lg">
                  {t('challengeText1')}
                </p>
                <p className="text-white leading-relaxed text-lg mt-4">
                  {t('challengeText2')}
                </p>
              </div>
              <div>
                <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-[#3db4d2]/30 to-[#3db4d2]/10 rounded-xl blur-sm"></div>
                  <Image
                    src="/images/la-scarpologa-website.png"
                    alt="La Scarpologa website"
                    width={600}
                    height={400}
                    className="w-full rounded-lg shadow-lg relative"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Strategy section */}
        <div className="mb-16">
          <div className="bg-gradient-to-br from-[#0c2a6a] to-[#081638] p-8 rounded-2xl border border-[#3db4d2]/20 shadow-xl">
            <h2 className="text-3xl font-bold text-[#3db4d2] mb-8">{t('strategyTitle')}</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
              <div>
                <p className="text-white leading-relaxed text-lg mb-6">
                  {t('strategyText1')}
                </p>
                <p className="text-white leading-relaxed text-lg mb-6">
                  {t('strategyText2')}
                </p>
                <p className="text-white leading-relaxed text-lg mb-6">
                  {t('strategyText3')}
                </p>
              </div>
              <div>
                <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-[#3db4d2]/30 to-[#3db4d2]/10 rounded-xl blur-sm"></div>
                  <Image
                    src={getLocalizedImage('la-scarpologa-whatsapp-review.png', locale)}
                    alt="La Scarpologa WhatsApp review message"
                    width={600}
                    height={600}
                    className="w-full rounded-lg shadow-lg relative"
                  />
                </div>
              </div>
            </div>

            <div className="mt-10">
              <h3 className="text-xl font-bold text-[#3db4d2] mb-4">{t('additionalStrategies')}</h3>
              <p className="text-white leading-relaxed text-lg mb-6">
                {t('additionalStrategiesText')}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-white/5 p-6 rounded-xl">
                  <h4 className="text-lg font-bold text-white mb-3">{t('oneTimeOfferTitle')}</h4>
                  <p className="text-white/80 mb-4">
                    {t('oneTimeOfferText')}
                  </p>
                  <div className="bg-gray-100 rounded-lg p-4 max-w-xs mx-auto">
                    <div className="flex items-center mb-3">
                      <div className="w-8 h-8 rounded-full bg-pink-500 flex items-center justify-center text-white font-bold mr-2">
                        LS
                      </div>
                      <div>
                        <p className="text-gray-800 font-medium text-sm">La Scarpologa: Hi Eleonora!</p>
                      </div>
                    </div>
                    <div className="space-y-2 text-gray-700 text-sm">
                      <p>I'm Antonella, La Scarpologa.</p>
                      <p>Thank you Gazzella for your purchase, really an excellent choice!</p>
                      <p>
                        We're preparing your package and I can add another product to the shipment with a discount valid
                        only now.
                      </p>
                      <p>Can I help you choose something else?</p>
                    </div>
                    <div className="text-right text-xs text-gray-500 mt-2">12:30</div>
                  </div>
                </div>

                <div className="bg-white/5 p-6 rounded-xl">
                  <h4 className="text-lg font-bold text-white mb-3">{t('seasonalCouponTitle')}</h4>
                  <p className="text-white/80 mb-4">
                    {t('seasonalCouponText')}
                  </p>
                  <div className="bg-gray-100 rounded-lg p-4 max-w-xs mx-auto">
                    <div className="flex items-center mb-3">
                      <div className="w-8 h-8 rounded-full bg-pink-500 flex items-center justify-center text-white font-bold mr-2">
                        LS
                      </div>
                      <div>
                        <p className="text-gray-800 font-medium text-sm">Dear Gazella!</p>
                      </div>
                    </div>
                    <div className="space-y-2 text-gray-700 text-sm">
                      <p>I'm Antonella, La Scarpologa 👠</p>
                      <p>Thank you ❤️ for participating in Black Friday, it was a real success 🤗!</p>
                      <p>
                        To celebrate together 😊 I'm sending you a preview 20% discount code on the new Christmas
                        collection 🎄 coming out on 7/12/2022 at 9:30 PM 😊❤️
                      </p>
                      <p>Discount code: Gazzelladinatale20</p>
                    </div>
                    <div className="text-right text-xs text-gray-500 mt-2">15:45</div>
                  </div>
                </div>
              </div>

              <div className="bg-[#3db4d2]/20 p-6 rounded-xl border border-[#3db4d2]/30">
                <p className="text-white text-lg font-medium">
                  {t('additionalResults')}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Results section */}
        <div className="mb-16">
          <div className="bg-gradient-to-br from-[#0c2a6a] to-[#081638] p-8 rounded-2xl border border-[#3db4d2]/20 shadow-xl">
            <h2 className="text-3xl font-bold text-[#3db4d2] mb-8 text-center">
              {t('resultsTitle')}
            </h2>

            <div className="grid grid-cols-1 gap-8 items-center">
              <div className="relative mx-auto max-w-3xl">
                <div className="absolute -inset-1 bg-gradient-to-r from-[#3db4d2]/30 to-[#3db4d2]/10 rounded-xl blur-sm"></div>
                <Image
                  src={getLocalizedImage('la-scarpologa-results.png', locale)}
                  alt="La Scarpologa campaign results"
                  width={700}
                  height={400}
                  className="w-full rounded-lg shadow-lg relative"
                />
              </div>
              <div className="text-center">
                <p className="text-white leading-relaxed text-lg">
                  {t('resultsText')}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Key Benefits Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-10 text-center">
            <span className="text-white">{tCommon('keyBenefits')}</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-[#3db4d2]/30 transition-all">
              <div className="w-14 h-14 rounded-full bg-[#3db4d2]/20 flex items-center justify-center mb-4">
                <TrendingUp className="h-7 w-7 text-[#3db4d2]" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{t('benefit1Title')}</h3>
              <p className="text-white/70">
                {t('benefit1Text')}
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-[#3db4d2]/30 transition-all">
              <div className="w-14 h-14 rounded-full bg-[#3db4d2]/20 flex items-center justify-center mb-4">
                <MessageCircle className="h-7 w-7 text-[#3db4d2]" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{t('benefit2Title')}</h3>
              <p className="text-white/70">
                {t('benefit2Text')}
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-[#3db4d2]/30 transition-all">
              <div className="w-14 h-14 rounded-full bg-[#3db4d2]/20 flex items-center justify-center mb-4">
                <Star className="h-7 w-7 text-[#3db4d2]" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{t('benefit3Title')}</h3>
              <p className="text-white/70">
                {t('benefit3Text')}
              </p>
            </div>
          </div>
        </div>

        {/* CTA section */}
        <div>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-[#3db4d2]/20 to-[#0c2a6a]/20 rounded-2xl blur-xl"></div>
            <div className="bg-gradient-to-r from-[#0c2a6a] to-[#081638] p-8 rounded-2xl border border-[#3db4d2]/30 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#3db4d2] rounded-full filter blur-3xl opacity-10 -mr-20 -mt-20"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#3db4d2] rounded-full filter blur-3xl opacity-10 -ml-20 -mb-20"></div>

              <div className="text-center max-w-3xl mx-auto relative z-10">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  <span className="text-white">{t('ctaTitle')}</span>
                </h2>
                <p className="text-white/80 text-lg leading-relaxed mb-8">
                  {t('ctaText')}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button className="bg-[#3db4d2] hover:bg-[#2a8ca6] text-white px-8 py-6 text-lg font-medium">
                    {tCommon('requestDemo')}
                  </Button>
                  <Button
                    variant="outline"
                    className="border-[#3db4d2] text-[#3db4d2] hover:bg-[#3db4d2] hover:text-white px-8 py-6 text-lg font-medium"
                  >
                    {tCommon('contactUs')}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-white/10 mt-16 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <Image src="/images/sendcloud-logo.svg" alt="Sendcloud" width={150} height={40} className="h-10 w-auto" />
            </div>
            <div className="flex space-x-8">
              <Link href="/" className="text-white/60 hover:text-[#3db4d2] transition-colors">
                {tCommon('home')}
              </Link>
              <Link href="/augusto-abbigliamento" className="text-white/60 hover:text-[#3db4d2] transition-colors">
                {tCommon('previousCaseStudy')}
              </Link>
              <Link href="/rossi-ricambi" className="text-white/60 hover:text-[#3db4d2] transition-colors">
                {tCommon('nextCaseStudy')}
              </Link>
            </div>
          </div>
          <div className="text-center mt-8">
            <p className="text-white/40 text-sm">{tCommon('allRightsReserved', { year: new Date().getFullYear() })}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
