"use client"

import { useState, useEffect } from "react"
import { CreditCard, Sparkles, Truck, MessageCircle, AlertCircle, Package, Zap } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"
import { CaseStudiesSidebar } from "@/components/ui/case-studies-sidebar"
import { useTranslations } from 'next-intl'

export default function PricingPage() {
  const t = useTranslations('pricing')
  const [shipments, setShipments] = useState(0)
  const [shipmentsInput, setShipmentsInput] = useState("0")
  const [whatsappMessages, setWhatsappMessages] = useState(0)
  const [whatsappInput, setWhatsappInput] = useState("0")
  const [selectedPlan, setSelectedPlan] = useState("lite")
  const [isAnnual, setIsAnnual] = useState(false)

  const plans = [
    {
      id: "lite",
      name: t('lite.name'),
      price: 35,
      annualPrice: 28,
      pricePerLabel: 0.11,
      pricePerLabelAnnual: 0.10,
      whatsappPrice: 0.14,
      maxShipments: 400,
      shipmentsLabel: t('lite.shipmentsLabel'),
      description: t('lite.description'),
      subDescription: t('lite.subDescription'),
      whatsappIncluded: t('lite.whatsappIncluded'),
      features: [
        "Store integration (up to 3)",
        "Carrier integration",
        "Sendcloud shipping rates",
        "PUDO map at checkout",
        "Returns management",
        "Email notifications",
        "WhatsApp notifications",
        "Automatic review collection",
        "XCover insurance",
      ],
      cta: "Contact us",
      color: "#64B6AC",
    },
    {
      id: "growth",
      name: t('growth.name'),
      price: 99,
      annualPrice: 79,
      pricePerLabel: 0.10,
      pricePerLabelAnnual: 0.09,
      whatsappPrice: 0.12,
      maxShipments: 1000,
      shipmentsLabel: t('growth.shipmentsLabel'),
      description: t('growth.description'),
      subDescription: t('growth.subDescription'),
      whatsappIncluded: t('growth.whatsappIncluded'),
      features: ["Tracking page", "WhatsApp marketing", "Pack & Go"],
      additionalInfo: "In addition to Lite:",
      cta: "Contact us",
      color: "#5D9CEC",
    },
    {
      id: "premium",
      name: t('premium.name'),
      price: 199,
      annualPrice: 159,
      pricePerLabel: 0.09,
      pricePerLabelAnnual: 0.08,
      whatsappPrice: 0.1,
      maxShipments: 10000,
      shipmentsLabel: t('premium.shipmentsLabel'),
      description: t('premium.description'),
      subDescription: t('premium.subDescription'),
      whatsappIncluded: t('premium.whatsappIncluded'),
      features: ["Returns portal", "Tracking page analytics", "Advanced shipping analytics", "Complete branding"],
      additionalInfo: "In addition to Growth:",
      cta: "Contact us",
      isBest: true,
      color: "#3DB4D2",
    },
    {
      id: "pro",
      name: t('pro.name'),
      price: 799,
      annualPrice: 639,
      pricePerLabel: 0.07,
      pricePerLabelAnnual: 0.06,
      whatsappPrice: 0.1,
      maxShipments: 50000,
      shipmentsLabel: t('pro.shipmentsLabel'),
      description: t('pro.description'),
      subDescription: t('pro.subDescription'),
      whatsappIncluded: t('pro.whatsappIncluded'),
      features: [
        "International shipping partnerships",
        "Dynamic delivery options at checkout",
        "Marketplace shipping solution",
        "Customer Success Manager",
        "Guided onboarding",
        "Shipping strategy analysis and optimization",
      ],
      additionalInfo: "In addition to Premium:",
      cta: "Contact us",
      color: "#AC6DDE",
    },
  ]

  // Aggiorna il numero di spedizioni quando cambia il piano selezionato
  useEffect(() => {
    const currentPlan = plans.find((p) => p.id === selectedPlan)
    if (shipments > currentPlan.maxShipments) {
      setShipments(currentPlan.maxShipments)
      setShipmentsInput(currentPlan.maxShipments.toString())
    }
  }, [selectedPlan])

  const handleShipmentsInputChange = (e) => {
    const value = e.target.value
    setShipmentsInput(value)

    // Converti in numero e valida
    const numValue = value === "" ? 0 : Number.parseInt(value.replace(/\D/g, ""), 10)
    const maxShipments = getCurrentPlanMaxShipments()

    // Aggiorna lo slider solo se è un numero valido
    if (!isNaN(numValue)) {
      // Limita al massimo consentito dal piano
      const validValue = Math.min(numValue, maxShipments)
      setShipments(validValue)
    }
  }

  const handleShipmentsInputBlur = () => {
    // Quando l'utente esce dal campo, formatta il valore
    const numValue = shipmentsInput === "" ? 0 : Number.parseInt(shipmentsInput.replace(/\D/g, ""), 10)
    const maxShipments = getCurrentPlanMaxShipments()

    if (isNaN(numValue)) {
      setShipmentsInput("0")
      setShipments(0)
    } else {
      const validValue = Math.min(Math.max(1, numValue), maxShipments)
      setShipmentsInput(validValue.toString())
      setShipments(validValue)
    }
  }

  const handleWhatsappInputChange = (e) => {
    const value = e.target.value
    setWhatsappInput(value)

    // Converti in numero e valida
    const numValue = value === "" ? 0 : Number.parseInt(value.replace(/\D/g, ""), 10)

    // Aggiorna lo slider solo se è un numero valido
    if (!isNaN(numValue)) {
      // Limita al massimo consentito
      const validValue = Math.min(numValue, 5000)
      setWhatsappMessages(validValue)
    }
  }

  const handleWhatsappInputBlur = () => {
    // Quando l'utente esce dal campo, formatta il valore
    const numValue = whatsappInput === "" ? 0 : Number.parseInt(whatsappInput.replace(/\D/g, ""), 10)

    if (isNaN(numValue)) {
      setWhatsappInput("0")
      setWhatsappMessages(0)
    } else {
      const validValue = Math.min(Math.max(0, numValue), 5000)
      setWhatsappInput(validValue.toString())
      setWhatsappMessages(validValue)
    }
  }

  const calculateCost = (plan) => {
    const planData = plans.find((p) => p.id === plan)
    const pricePerLabel = isAnnual && planData.pricePerLabelAnnual ? planData.pricePerLabelAnnual : planData.pricePerLabel
    const labelCost = shipments * pricePerLabel
    const whatsappCost = whatsappMessages * planData.whatsappPrice

    if (isAnnual) {
      // Per l'annuale: sconto 20% solo sul canone base, fee rimangono normali
      const discountedBaseCost = planData.annualPrice * 12 * 0.80
      const annualLabelCost = labelCost * 12
      const annualWhatsappCost = whatsappCost * 12
      return (discountedBaseCost + annualLabelCost + annualWhatsappCost).toFixed(2)
    } else {
      // Per il mensile: tutto normale
      return (planData.price + labelCost + whatsappCost).toFixed(2)
    }
  }

  const getCurrentPlanMaxShipments = () => {
    return plans.find((p) => p.id === selectedPlan).maxShipments
  }

  const formatMaxShipments = (maxShipments) => {
    if (maxShipments >= 50000) return t('unlimited')
    return maxShipments.toLocaleString("en-US")
  }

  const getCurrentPlan = () => {
    return plans.find((p) => p.id === selectedPlan)
  }

  const getBaseCost = () => {
    const plan = getCurrentPlan()
    if (isAnnual) {
      return (plan.annualPrice * 12).toFixed(2)
    } else {
      return plan.price.toFixed(2)
    }
  }

  const getLabelCost = () => {
    const plan = getCurrentPlan()
    const pricePerLabel = isAnnual && plan.pricePerLabelAnnual ? plan.pricePerLabelAnnual : plan.pricePerLabel
    const cost = shipments * pricePerLabel
    if (isAnnual) {
      return (cost * 12).toFixed(2)
    } else {
      return cost.toFixed(2)
    }
  }

  const getWhatsappCost = () => {
    const plan = getCurrentPlan()
    const cost = whatsappMessages * plan.whatsappPrice
    if (isAnnual) {
      return (cost * 12).toFixed(2)
    } else {
      return cost.toFixed(2)
    }
  }

  const getDiscountAmount = () => {
    const plan = getCurrentPlan()
    return (plan.price * 12 * 0.15).toFixed(2)
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-b from-[#0a1e4d] to-[#081638] text-white">
      <CaseStudiesSidebar />
      <div className="flex-1 p-6 md:p-10 overflow-auto">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 text-center">
            <div className="inline-flex items-center justify-center p-1 mb-6 rounded-full bg-white/10 backdrop-blur-sm">
              <CreditCard className="w-5 h-5 mr-2 text-[#3DB4D2]" />
              <span className="text-white/90 text-sm font-medium">{t('plansAndPrices')}</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">
              {t('title')}
            </h1>
            <p className="text-lg text-white/80 max-w-3xl mx-auto">
              {t('subtitle')}
            </p>
          </div>

          <div className="flex items-center justify-center mb-12">
            <span className={`mr-3 ${!isAnnual ? "text-white" : "text-white/60"} font-medium`}>{t('monthly')}</span>
            <Switch checked={isAnnual} onCheckedChange={setIsAnnual} className="data-[state=checked]:bg-[#3DB4D2]" />
            <span className={`ml-3 ${isAnnual ? "text-white" : "text-white/60"} font-medium`}>
              {t('annual')} <span className="text-[#3DB4D2] font-medium ml-1">{t('discountOnSubscription')}</span>
            </span>
          </div>

          <div className="bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-sm rounded-xl overflow-hidden mb-16 shadow-[0_10px_50px_rgba(0,0,0,0.1)]">
            <div className="bg-[#3DB4D2]/20 p-6 border-b border-white/10">
              <h2 className="text-2xl font-bold text-white flex items-center">
                <CreditCard className="w-6 h-6 mr-3 text-[#3DB4D2]" />
                {t('costCalculator')}
              </h2>
            </div>

            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-10">
                  <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                    <div className="flex justify-between mb-3 items-center">
                      <div className="flex items-center">
                        <Truck className="h-5 w-5 mr-2 text-[#3DB4D2]" />
                        <Label htmlFor="shipments" className="text-white/90 font-medium">
                          {t('monthlyShipments')}
                        </Label>
                      </div>
                      <div className="flex items-center">
                        <div className="w-24">
                          <Input
                            id="shipmentsInput"
                            type="text"
                            value={shipmentsInput}
                            onChange={handleShipmentsInputChange}
                            onBlur={handleShipmentsInputBlur}
                            className="h-8 text-right font-medium text-white bg-white/10 border-white/20 focus:border-[#3DB4D2]"
                          />
                        </div>
                      </div>
                    </div>
                    <Slider
                      id="shipments"
                      min={1}
                      max={getCurrentPlanMaxShipments()}
                      step={1}
                      value={[shipments]}
                      onValueChange={(value) => {
                        setShipments(value[0])
                        setShipmentsInput(value[0].toString())
                      }}
                    />
                    <div className="flex justify-between text-xs text-white/60 mt-2">
                      <span>1</span>
                      <span>{formatMaxShipments(getCurrentPlanMaxShipments())}</span>
                    </div>

                    <div className="mt-4 flex items-start text-xs text-white/70">
                      <AlertCircle className="h-4 w-4 mr-1.5 shrink-0 mt-0.5 text-[#3DB4D2]" />
                      <span>
                        {t('planAllowsUpTo', { plan: plans.find((p) => p.id === selectedPlan).name, max: formatMaxShipments(getCurrentPlanMaxShipments()) })}
                      </span>
                    </div>
                  </div>

                  <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                    <div className="flex justify-between mb-3 items-center">
                      <div className="flex items-center">
                        <MessageCircle className="h-5 w-5 mr-2 text-[#3DB4D2]" />
                        <Label htmlFor="whatsapp" className="text-white/90 font-medium">
                          {t('monthlyWhatsappMessages')}
                        </Label>
                      </div>
                      <div className="flex items-center">
                        <div className="w-24">
                          <Input
                            id="whatsappInput"
                            type="text"
                            value={whatsappInput}
                            onChange={handleWhatsappInputChange}
                            onBlur={handleWhatsappInputBlur}
                            className="h-8 text-right font-medium text-white bg-white/10 border-white/20 focus:border-[#3DB4D2]"
                          />
                        </div>
                      </div>
                    </div>
                    <Slider
                      id="whatsapp"
                      min={0}
                      max={5000}
                      step={50}
                      value={[whatsappMessages]}
                      onValueChange={(value) => {
                        setWhatsappMessages(value[0])
                        setWhatsappInput(value[0].toString())
                      }}
                    />
                    <div className="flex justify-between text-xs text-white/60 mt-2">
                      <span>0</span>
                      <span>5.000</span>
                    </div>
                    <div className="mt-3 text-xs text-white/70">
                      {getCurrentPlan().whatsappIncluded}
                    </div>
                  </div>

                  <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                    <Label className="text-white/90 font-medium mb-4 block flex items-center">
                      <CreditCard className="h-5 w-5 mr-2 text-[#3DB4D2]" />
                      {t('selectedPlan')}
                    </Label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {plans.map((plan) => (
                        <Button
                          key={plan.id}
                          variant="outline"
                          className={`border transition-all duration-200 ${
                            selectedPlan === plan.id
                              ? "bg-white/10 border-white text-white"
                              : "bg-transparent border-white/20 text-white/70 hover:border-white/40 hover:text-white/90"
                          }`}
                          onClick={() => setSelectedPlan(plan.id)}
                        >
                          {plan.name}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-[#3DB4D2]/20 to-[#3DB4D2]/5 backdrop-blur-sm rounded-xl border border-white/10 overflow-hidden">
                  <div className="bg-[#3DB4D2]/30 p-4 border-b border-white/10">
                    <h3 className="text-xl font-bold text-white flex items-center">
                      <Zap className="w-5 h-5 mr-2 text-white" />
                      {t('yourPersonalizedPlan')}
                    </h3>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center">
                        <div
                          className="w-10 h-10 rounded-full flex items-center justify-center mr-3"
                          style={{ backgroundColor: `${getCurrentPlan().color}30` }}
                        >
                          <div
                            className="w-6 h-6 rounded-full"
                            style={{ backgroundColor: getCurrentPlan().color }}
                          ></div>
                        </div>
                        <div>
                          <div className="text-lg font-bold text-white">{getCurrentPlan().name}</div>
                          <div className="text-sm text-white/70">{isAnnual ? t('annualBilling') : t('monthlyBilling')}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-5xl font-bold text-white">
                          €{calculateCost(selectedPlan).replace(".", ",")}
                        </div>
                        <div className="text-sm text-white/70">{isAnnual ? t('perYear') : t('perMonth')}</div>
                      </div>
                    </div>

                    <div className="space-y-4 mb-6">
                      <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                        <div className="flex items-center">
                          <CreditCard className="h-5 w-5 mr-2 text-[#3DB4D2]" />
                          <span className="text-white/90">{t('baseSubscription')}</span>
                        </div>
                        <span className="text-white font-medium">€{getBaseCost().replace(".", ",")}</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                        <div className="flex items-center">
                          <Package className="h-5 w-5 mr-2 text-[#3DB4D2]" />
                          <span className="text-white/90">
                            {t('shipments', { count: shipments.toLocaleString("en-US") })}
                            <span className="text-white/60 text-xs ml-1">
                              {t('perLabel', { price: (isAnnual && plans.find((p) => p.id === selectedPlan).pricePerLabelAnnual ? plans.find((p) => p.id === selectedPlan).pricePerLabelAnnual : plans.find((p) => p.id === selectedPlan).pricePerLabel).toFixed(2) })}
                            </span>
                          </span>
                        </div>
                        <span className="text-white font-medium">€{getLabelCost().replace(".", ",")}</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                        <div className="flex items-center">
                          <MessageCircle className="h-5 w-5 mr-2 text-[#3DB4D2]" />
                          <span className="text-white/90">
                            {t('whatsappMessages', { count: whatsappMessages.toLocaleString("en-US") })}
                            <span className="text-white/60 text-xs ml-1">
                              {t('perMessage', { price: plans.find((p) => p.id === selectedPlan).whatsappPrice.toFixed(2) })}
                            </span>
                          </span>
                        </div>
                        <span className="text-white font-medium">€{getWhatsappCost().replace(".", ",")}</span>
                      </div>
                      {isAnnual && (
                        <div className="flex items-center justify-between p-3 bg-[#3DB4D2]/10 rounded-lg">
                          <div className="flex items-center">
                            <Sparkles className="h-5 w-5 mr-2 text-[#3DB4D2]" />
                            <span className="text-[#3DB4D2]">{t('annualDiscount')}</span>
                          </div>
                          <span className="text-[#3DB4D2] font-medium">-€{getDiscountAmount().replace(".", ",")}</span>
                        </div>
                      )}
                    </div>

                    <Button className="w-full py-6 text-base font-medium transition-all duration-300 bg-gradient-to-r from-[#3DB4D2] to-[#5D9CEC] hover:opacity-90">
                      {t('requestPersonalizedQuote')}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center bg-white/5 backdrop-blur-sm rounded-xl p-8 mb-10">
            <h2 className="text-2xl font-bold mb-4 text-white">{t('questionsAboutPlans')}</h2>
            <p className="text-white/80 mb-6 max-w-2xl mx-auto">
              {t('questionsText')}
            </p>
            <Button className="bg-white hover:bg-white/90 text-[#0a1e4d] font-medium px-6">
              {t('contactSalesTeam')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
