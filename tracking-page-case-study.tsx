"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import {
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  BarChart4,
  ShieldCheck,
  Palette,
  Bell,
  Truck,
  Users,
  BadgePercent,
  Smartphone,
  Layers,
  Repeat,
} from "lucide-react"
import { useTranslations } from 'next-intl'

export function TrackingPageCaseStudy() {
  const t = useTranslations('trackingPageCaseStudy')
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isZooming, setIsZooming] = useState(false)
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 })
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })
  const imageContainerRef = useRef<HTMLDivElement>(null)

  const slides = [
    {
      image: "/images/tracking-page-alessi.png",
      title: "Alessi",
    },
    {
      image: "/images/tracking-page-snack.png",
      title: "Snack",
    },
    {
      image: "/images/tracking-page-armixx.png",
      title: "Armixx",
    },
    {
      image: "/images/tracking-page-biffi.png",
      title: "BIFFI Boutiques",
    },
    {
      image: "/images/tracking-page-bottegaverde.png",
      title: "Bottega Verde",
    },
    {
      image: "/images/tracking-page-callipo.png",
      title: "Callipo",
    },
    {
      image: "/images/tracking-page-carrera.png",
      title: "Carrera",
    },
    {
      image: "/images/tracking-page-errea.png",
      title: "Erreà",
    },
  ]

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1))
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageContainerRef.current) return

    const rect = imageContainerRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100

    setCursorPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top })
    setZoomPosition({ x, y })
  }

  const toggleZoom = () => {
    setIsZooming(!isZooming)
  }

  // Reset zoom when changing slides
  useEffect(() => {
    setIsZooming(false)
  }, [currentSlide])

  // Vantaggi e caratteristiche con icone
  const vantaggi = [
    { icon: ShieldCheck, text: t('benefits.brandConsistency') },
    { icon: Users, text: t('benefits.customerTrust') },
    { icon: BadgePercent, text: t('benefits.reducedSupport') },
    { icon: BarChart4, text: t('benefits.crossSelling') },
    { icon: Repeat, text: t('benefits.conversionIncrease') },
  ]

  const caratteristiche = [
    { icon: Palette, text: t('features.customizableDesign') },
    { icon: Layers, text: t('features.logoIntegration') },
    { icon: Truck, text: t('features.realTimeUpdates') },
    { icon: Smartphone, text: t('features.carrierIntegration') },
    { icon: Bell, text: t('features.automaticNotifications') },
  ]

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

      <div className="w-full max-w-6xl mx-auto px-4 py-12 md:py-24 relative z-10">
        <div className="flex flex-col gap-8">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">{t('title')}</h1>
            <p className="text-xl text-white/80 max-w-3xl">
              {t('subtitle')}
            </p>
          </div>

          {/* Tracking Page Carousel - Reduced size (30% smaller) */}
          <div className="relative w-full bg-transparent rounded-xl overflow-hidden">
            <div
              ref={imageContainerRef}
              className="relative aspect-[9/16] w-full max-w-md mx-auto overflow-hidden cursor-zoom-in bg-white p-1 rounded-xl drop-shadow-[0_15px_35px_rgba(61,180,210,0.6)]"
              style={{ maxWidth: "calc(1.5 * 1.3 * 384px * 0.7 * 1.2)" }} // 150% * 130% * 70% of sm (384px)
              onMouseMove={handleMouseMove}
              onClick={toggleZoom}
            >
              <Image
                src={slides[currentSlide].image || "/placeholder.svg"}
                alt={`${slides[currentSlide].title} tracking page`}
                fill
                className="object-contain"
                priority
              />

              {/* Zoom indicator */}
              <div className="absolute bottom-4 right-4 bg-white/80 p-2 rounded-full shadow-md">
                <ZoomIn className="h-6 w-6 text-gray-800" />
              </div>

              {/* Magnifying glass */}
              {isZooming && (
                <div
                  className="absolute pointer-events-none z-10 border-2 border-white shadow-lg rounded-full overflow-hidden"
                  style={{
                    width: "150px",
                    height: "150px",
                    left: `${Math.min(Math.max(cursorPosition.x - 75, 0), imageContainerRef.current?.clientWidth! - 150)}px`,
                    top: `${Math.min(Math.max(cursorPosition.y - 75, 0), imageContainerRef.current?.clientHeight! - 150)}px`,
                    backgroundImage: `url(${slides[currentSlide].image})`,
                    backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
                    backgroundSize: "300%",
                    backgroundRepeat: "no-repeat",
                  }}
                />
              )}
            </div>

            <div className="absolute inset-0 flex items-center justify-between p-4">
              <button
                onClick={prevSlide}
                className="p-2 rounded-full bg-white/80 text-gray-800 hover:bg-white shadow-md"
                aria-label={t('previousSlide')}
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                onClick={nextSlide}
                className="p-2 rounded-full bg-white/80 text-gray-800 hover:bg-white shadow-md"
                aria-label={t('nextSlide')}
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </div>

            <div className="absolute bottom-4 inset-x-0 flex justify-center gap-2 flex-wrap">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full ${currentSlide === index ? "bg-white" : "bg-white/50"}`}
                  aria-label={t('goToSlide', { index: index + 1 })}
                />
              ))}
            </div>

            {/* Current slide title */}
            <div className="absolute bottom-10 inset-x-0 text-center">
              <span className="bg-[#0a1e4d]/80 text-white px-3 py-1 rounded-full text-sm font-medium">
                {slides[currentSlide].title}
              </span>
            </div>
          </div>

          {/* Redesigned Features and Benefits Card with Graphics */}
          <div className="bg-gradient-to-br from-[#0c2a6a] to-[#081638] p-8 rounded-xl border border-[#3db4d2]/20 shadow-xl relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#3db4d2] rounded-full filter blur-3xl opacity-5 -mr-20 -mt-20"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#3db4d2] rounded-full filter blur-3xl opacity-5 -ml-20 -mb-20"></div>

            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-8 text-center text-[#3db4d2]">
                <span className="relative">
                  {t('benefitsAndFeatures')}
                  <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-transparent via-[#3db4d2] to-transparent"></span>
                </span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-6">
                  <h4 className="text-xl font-semibold mb-6 text-white flex items-center">
                    <span className="inline-block p-2 bg-[#3db4d2]/10 rounded-lg mr-3">
                      <BarChart4 className="h-6 w-6 text-[#3db4d2]" />
                    </span>
                    {t('businessBenefits')}
                  </h4>

                  <div className="space-y-4">
                    {vantaggi.map((item, index) => (
                      <div key={index} className="flex items-start gap-4 group">
                        <div className="flex-shrink-0 p-2 bg-[#3db4d2]/10 rounded-lg group-hover:bg-[#3db4d2]/20 transition-colors">
                          <item.icon className="h-5 w-5 text-[#3db4d2]" />
                        </div>
                        <p className="text-white/80 group-hover:text-white transition-colors">{item.text}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-6">
                  <h4 className="text-xl font-semibold mb-6 text-white flex items-center">
                    <span className="inline-block p-2 bg-[#3db4d2]/10 rounded-lg mr-3">
                      <Layers className="h-6 w-6 text-[#3db4d2]" />
                    </span>
                    {t('keyFeatures')}
                  </h4>

                  <div className="space-y-4">
                    {caratteristiche.map((item, index) => (
                      <div key={index} className="flex items-start gap-4 group">
                        <div className="flex-shrink-0 p-2 bg-[#3db4d2]/10 rounded-lg group-hover:bg-[#3db4d2]/20 transition-colors">
                          <item.icon className="h-5 w-5 text-[#3db4d2]" />
                        </div>
                        <p className="text-white/80 group-hover:text-white transition-colors">{item.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-[#0c2a6a] to-[#081638] p-8 rounded-xl border border-[#3db4d2]/30 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#3db4d2] rounded-full filter blur-3xl opacity-10 -mr-20 -mt-20"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#3db4d2] rounded-full filter blur-3xl opacity-10 -ml-20 -mb-20"></div>

            <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-4">{t('improvePostPurchase')}</h3>
                <p>
                  {t('improvePostPurchaseText')}
                </p>
              </div>
              <div className="flex-shrink-0">
                <div className="bg-white text-[#0a1e4d] px-6 py-3 rounded-lg font-bold text-lg cursor-pointer hover:bg-gray-100 transition-colors">
                  {t('requestInformation')}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
