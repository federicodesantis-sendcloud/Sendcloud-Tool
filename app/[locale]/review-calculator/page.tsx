"use client"

import { useState } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  MessageCircle,
  TrendingUp,
  Sparkles,
  BarChart3,
  Zap,
  Target,
  ArrowRight,
  ArrowLeft,
  Star,
  Gift,
  Euro,
  ShoppingCart,
  Shield,
  ExternalLink,
  Package,
} from "lucide-react"
import { useTranslations } from 'next-intl'

export default function ReviewCalculatorPage() {
  const t = useTranslations('reviewCalculator')
  const [verticalMarket, setVerticalMarket] = useState("Fashion")
  const [monthlyOrders, setMonthlyOrders] = useState(1000)
  const [showResults, setShowResults] = useState(false)
  const [isCalculating, setIsCalculating] = useState(false)

  const [customAOV, setCustomAOV] = useState<number | null>(null)

  // Business objectives state
  const [objectives, setObjectives] = useState({
    deliveryIncidents: true,
    secondPurchases: true,
    reviewCollection: true,
  })

  // Replace the conversionRates object with:
  const verticalData = {
    Fashion: { reviewMin: 15, reviewMax: 25, coupon: 5.5, aov: 85 },
    Electronics: { reviewMin: 12, reviewMax: 20, coupon: 3.5, aov: 150 },
    "Food & Beverage": { reviewMin: 18, reviewMax: 28, coupon: 7.5, aov: 40 },
    Beauty: { reviewMin: 20, reviewMax: 30, coupon: 7.5, aov: 45 },
    "Pet Products": { reviewMin: 16, reviewMax: 24, coupon: 6.5, aov: 35 },
    Furniture: { reviewMin: 10, reviewMax: 18, coupon: 2.5, aov: 200 },
    "Sports/Outdoor": { reviewMin: 14, reviewMax: 22, coupon: 4.5, aov: 70 },
    Other: { reviewMin: 15, reviewMax: 20, coupon: 4.5, aov: 60 },
  }

  const verticalNotes = {
    Fashion:
      "According to industry data, in the fashion market, sending WhatsApp post-delivery messages significantly increases engagement and review collection, promoting an average 20% increase in reviews and sales growth through targeted coupons.",
    Electronics:
      "In the electronics sector, direct messaging strategies like WhatsApp contribute to improving customer loyalty, with coupon conversion rates estimated around 8%, supporting significant additional sales in a market with high AOV.",
    "Food & Beverage":
      "According to market studies, the Food & Beverage sector benefits from high WhatsApp response rates, with coupons stimulating frequent repurchases and increasing sales by approximately 12%.",
    Beauty:
      "According to Statista and industry sources, in beauty and cosmetics, the use of WhatsApp and digital technologies like augmented reality is transforming the shopping experience, with positive impact on reviews (+25%) and sales (+12%), thanks also to personalized coupon campaigns.",
    "Pet Products":
      "The pet products sector shows high customer interaction via WhatsApp, with an active community that responds well to post-purchase messages and coupons, promoting increased reviews and repurchases.",
    Furniture:
      "In the furniture sector, characterized by a longer purchase cycle, WhatsApp helps maintain customer contact, with a more moderate but significant impact on both reviews and additional sales.",
    "Sports/Outdoor":
      "For sports and outdoor, using WhatsApp post-purchase messages with coupons stimulates the purchase of accessories and related products, with coupon conversion rates around 9%.",
    Other:
      "For other sectors, adopting WhatsApp as a post-sales channel aligns with market averages, offering a good balance between review collection and sales stimulation.",
  }

  // Physical store verticals
  const physicalStoreVerticals = ["Fashion", "Beauty", "Pet Products", "Furniture", "Sports/Outdoor", "Food & Beverage"]

  // Replace the whatsappRate calculation with:
  const currentVertical = verticalData[verticalMarket as keyof typeof verticalData]
  const whatsappReviewsMin = Math.round((monthlyOrders * currentVertical.reviewMin) / 100)
  const whatsappReviewsMax = Math.round((monthlyOrders * currentVertical.reviewMax) / 100)
  const whatsappReviewsAvg = Math.round((whatsappReviewsMin + whatsappReviewsMax) / 2)

  // Add new calculations for sales
  const effectiveAOV = customAOV || currentVertical.aov
  const couponSalesMonthly = Math.round(((monthlyOrders * currentVertical.coupon) / 100) * effectiveAOV)
  const couponSalesAnnual = couponSalesMonthly * 12

  // Calculate messages based on selected objectives - Smart combinations
  const getRecommendedMessages = () => {
    const messages = []

    // Always include tracking if delivery incidents is selected
    if (objectives.deliveryIncidents) {
      messages.push({ type: "tracking", name: t('orderTracking'), required: true })
      messages.push({ type: "outForDelivery", name: t('outForDelivery'), required: true })
    }

    // Add review request if review collection is selected
    if (objectives.reviewCollection) {
      messages.push({ type: "review", name: t('reviewRequest'), required: false })
    }

    // Add retention message if second purchases is selected
    if (objectives.secondPurchases) {
      messages.push({ type: "retention", name: t('customerRetention'), required: false })
    }

    // If no delivery incidents selected but other objectives are, still include basic tracking
    if (
      !objectives.deliveryIncidents &&
      (objectives.reviewCollection || objectives.secondPurchases)
    ) {
      messages.unshift({ type: "tracking", name: t('orderTracking'), required: true })
    }

    return messages
  }

  const recommendedMessages = getRecommendedMessages()
  const totalMessagesPerOrder = recommendedMessages.length
  const totalMessagesMonthly = monthlyOrders * totalMessagesPerOrder
  const totalMessagesAnnual = totalMessagesMonthly * 12

  const whatsappCostPerMessage = 0.1 // 0.10 euros per message
  const whatsappCostMonthly = totalMessagesMonthly * whatsappCostPerMessage
  const whatsappCostAnnual = whatsappCostMonthly * 12

  // Support reduction calculation (tracking messages reduce support requests)
  const supportReductionPercentage = 35 // 35% reduction in support requests
  const supportRequestsReduced = Math.round((monthlyOrders * supportReductionPercentage) / 100)

  // Delivery incidents reduction calculation (out for delivery messages reduce failed deliveries)
  const deliveryIncidentsReductionPercentage = 25 // 25% reduction in failed deliveries/returns
  const failedDeliveriesReduced = Math.round((monthlyOrders * deliveryIncidentsReductionPercentage) / 100)

  // Sales conversions from coupons
  const couponConversionsMonthly = Math.round((monthlyOrders * currentVertical.coupon) / 100)
  const couponConversionsAnnual = couponConversionsMonthly * 12


  // Business Impact Calculations
  const getBusinessImpact = (reviews: number) => {
    let clickIncrease, conversionLift, monthlySearchesGrowth, localVisibilityRanking

    // Click increase logic
    if (reviews < 50) {
      clickIncrease = 10
    } else if (reviews <= 150) {
      clickIncrease = 20
    } else {
      clickIncrease = 30
    }

    // Conversion lift logic
    if (reviews < 50) {
      conversionLift = 5
    } else if (reviews <= 150) {
      conversionLift = 12
    } else {
      conversionLift = 18
    }

    // Monthly searches growth logic
    if (reviews < 50) {
      monthlySearchesGrowth = 50
    } else if (reviews <= 150) {
      monthlySearchesGrowth = 150
    } else {
      monthlySearchesGrowth = 300
    }

    // Local visibility ranking logic
    if (!physicalStoreVerticals.includes(verticalMarket)) {
      localVisibilityRanking = "N/A"
    } else if (reviews > 150) {
      localVisibilityRanking = "+2.4 positions"
    } else if (reviews > 50) {
      localVisibilityRanking = "+1.2 positions"
    } else {
      localVisibilityRanking = "N/A"
    }

    return {
      clickIncrease,
      conversionLift,
      monthlySearchesGrowth,
      localVisibilityRanking,
    }
  }

  const businessImpact = getBusinessImpact(whatsappReviewsAvg)

  const handleObjectiveChange = (objective: keyof typeof objectives) => {
    setObjectives((prev) => ({
      ...prev,
      [objective]: !prev[objective],
    }))
  }

  const handleCalculate = async () => {
    setIsCalculating(true)
    // Simulate calculation time for better UX
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setShowResults(true)
    setIsCalculating(false)
  }

  const resetCalculator = () => {
    setShowResults(false)
    setCurrentMessageIndex(0)
  }

  const getObjectiveDescription = () => {
    const selectedObjectives = []
    if (objectives.deliveryIncidents) selectedObjectives.push(t('deliveryIncidents'))
    if (objectives.secondPurchases) selectedObjectives.push(t('secondPurchases'))
    if (objectives.reviewCollection) selectedObjectives.push(t('reviewCollection'))

    return selectedObjectives.length > 0
      ? t('automatedMessages', { count: totalMessagesPerOrder }) + ": " + selectedObjectives.join(" + ")
      : t('selectAtLeastOne')
  }

  const [currentMessageIndex, setCurrentMessageIndex] = useState(0)

  // Get active business results based on selected objectives
  const getActiveBusinessResults = () => {
    const results = []

    if (objectives.deliveryIncidents) {
      results.push({
        type: "deliveryIncidents",
        title: t('deliveryIncidentsTitle'),
        value: `-${failedDeliveriesReduced.toLocaleString()}`,
        subtitle: t('failedDeliveriesPerMonth'),
        color: "orange",
        icon: Shield,
        details: {
          rate: t('reduction', { rate: deliveryIncidentsReductionPercentage }),
          description: t('proactiveNotifications'),
        },
      })
    }

    if (objectives.secondPurchases) {
      results.push({
        type: "revenue",
        title: t('secondPurchasesTitle'),
        value: `€${couponSalesMonthly.toLocaleString()}`,
        subtitle: t('revenuePerMonth'),
        color: "green",
        icon: Euro,
        details: {
          rate: t('couponConversions', { count: couponConversionsMonthly.toLocaleString() }),
          description: t('conversionRate', { rate: currentVertical.coupon, aov: effectiveAOV }),
        },
      })
    }

    if (objectives.reviewCollection) {
      results.push({
        type: "reviews",
        title: t('reviewCollectionTitle'),
        value: `+${whatsappReviewsAvg.toLocaleString()}`,
        subtitle: t('reviewsPerMonth'),
        color: "purple",
        icon: Star,
        details: {
          rate: `${currentVertical.reviewMin}%-${currentVertical.reviewMax}%`,
          description: t('basedOnRequests', { count: monthlyOrders.toLocaleString() }),
        },
      })
    }

    return results
  }

  const activeBusinessResults = getActiveBusinessResults()

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a1e4d] via-[#081638] to-[#0a1e4d] text-white relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-72 h-72 bg-[#3DB4D2]/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-[#3DB4D2]/5 to-purple-500/5 rounded-full blur-3xl animate-spin"
          style={{ animationDuration: "20s" }}
        ></div>
      </div>

      <div className="p-6 md:p-10 overflow-auto relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-16 text-center">
            <div className="inline-flex items-center justify-center p-3 mb-8 rounded-2xl bg-gradient-to-r from-[#3DB4D2]/20 to-purple-500/20 backdrop-blur-sm border border-white/10">
              <MessageCircle className="w-6 h-6 mr-3 text-[#3DB4D2]" />
              <span className="text-white font-semibold text-lg">{t('title')}</span>
              <Sparkles className="w-5 h-5 ml-2 text-yellow-400 animate-pulse" />
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-[#3DB4D2] to-purple-400">
              {t('title')}
            </h1>
            <p className="text-lg text-white/80 max-w-4xl mx-auto leading-relaxed">
              {t('subtitle')}
            </p>
          </div>

          {!showResults ? (
            /* Input Section */
            <div className="max-w-4xl mx-auto">
              <div className="bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-xl rounded-3xl overflow-hidden shadow-[0_20px_80px_rgba(0,0,0,0.3)] border border-white/10">
                <div className="bg-gradient-to-r from-[#3DB4D2]/30 to-purple-500/30 p-6 border-b border-white/10">
                  <h2 className="text-2xl font-bold text-white flex items-center justify-center">
                    <Target className="w-6 h-6 mr-4 text-white" />
                    {t('businessConfiguration')}
                  </h2>
                </div>

                <div className="p-8 space-y-10">
                  {/* Vertical Market Selection */}
                  <div className="space-y-6">
                    <Label className="text-lg font-semibold text-white/90 flex items-center">
                      <BarChart3 className="w-6 h-6 mr-3 text-[#3DB4D2]" />
                      {t('industryVertical')}
                    </Label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {Object.keys(verticalData).map((market) => (
                        <button
                          key={market}
                          onClick={() => setVerticalMarket(market)}
                          className={`p-6 rounded-2xl border-2 transition-all duration-300 transform hover:scale-105 ${
                            verticalMarket === market
                              ? "border-[#3DB4D2] bg-[#3DB4D2]/20 shadow-lg shadow-[#3DB4D2]/25"
                              : "border-white/20 bg-white/5 hover:border-white/40"
                          }`}
                        >
                          <div className="text-center">
                            <div className="text-lg mb-2">
                              {market === "Fashion" && "👗"}
                              {market === "Electronics" && "📱"}
                              {market === "Food & Beverage" && "🍕"}
                              {market === "Beauty" && "💄"}
                              {market === "Pet Products" && "🐕"}
                              {market === "Furniture" && "🪑"}
                              {market === "Sports/Outdoor" && "⚽"}
                              {market === "Other" && "🏢"}
                            </div>
                            <span className="text-white font-medium text-sm">{market}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Monthly Orders Input */}
                  <div className="space-y-6">
                    <Label className="text-lg font-semibold text-white/90 flex items-center">
                      <TrendingUp className="w-6 h-6 mr-3 text-[#3DB4D2]" />
                      {t('monthlyOrderVolume')}
                    </Label>
                    <div className="relative">
                      <Input
                        type="number"
                        value={monthlyOrders}
                        onChange={(e) => setMonthlyOrders(Number(e.target.value))}
                        className="h-12 text-lg font-bold text-center text-white bg-white/10 border-2 border-white/20 focus:border-[#3DB4D2] rounded-2xl"
                        min="0"
                        step="100"
                        placeholder="Enter your monthly order volume"
                      />
                      <div className="absolute inset-y-0 right-4 flex items-center">
                        <span className="text-white/60 text-lg">{t('ordersPerMonth')}</span>
                      </div>
                    </div>
                  </div>

                  {/* Custom AOV Input */}
                  <div className="space-y-6">
                    <Label className="text-lg font-semibold text-white/90 flex items-center">
                      <TrendingUp className="w-6 h-6 mr-3 text-[#3DB4D2]" />
                      {t('averageOrderValue')}
                    </Label>
                    <div className="relative">
                      <Input
                        type="number"
                        value={customAOV || ""}
                        onChange={(e) => setCustomAOV(e.target.value ? Number(e.target.value) : null)}
                        className="h-12 text-lg font-bold text-center text-white bg-white/10 border-2 border-white/20 focus:border-[#3DB4D2] rounded-2xl"
                        min="0"
                        step="1"
                        placeholder={t('industryAverage', { aov: currentVertical.aov })}
                      />
                      <div className="absolute inset-y-0 right-4 flex items-center">
                        <span className="text-white/60 text-lg">€</span>
                      </div>
                    </div>
                    <p className="text-white/60 text-sm text-center">
                      {t('leaveEmpty', { aov: currentVertical.aov })}
                    </p>
                  </div>

                  {/* Business Objectives */}
                  <div className="space-y-6">
                    <Label className="text-lg font-semibold text-white/90 flex items-center">
                      <Target className="w-6 h-6 mr-3 text-[#3DB4D2]" />
                      {t('businessObjectives')}
                    </Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="flex items-center space-x-4 p-4 rounded-xl bg-white/5 border border-white/10">
                        <Checkbox
                          id="deliveryIncidents"
                          checked={objectives.deliveryIncidents}
                          onCheckedChange={() => handleObjectiveChange("deliveryIncidents")}
                          className="w-6 h-6 border-2 border-white/30 data-[state=checked]:bg-[#3DB4D2] data-[state=checked]:border-[#3DB4D2]"
                        />
                        <div className="flex items-center">
                          <Shield className="w-5 h-5 mr-2 text-orange-400" />
                          <label htmlFor="deliveryIncidents" className="text-white font-medium cursor-pointer">
                            {t('deliveryIncidents')}
                          </label>
                        </div>
                      </div>

                      <div className="flex items-center space-x-4 p-4 rounded-xl bg-white/5 border border-white/10">
                        <Checkbox
                          id="secondPurchases"
                          checked={objectives.secondPurchases}
                          onCheckedChange={() => handleObjectiveChange("secondPurchases")}
                          className="w-6 h-6 border-2 border-white/30 data-[state=checked]:bg-[#3DB4D2] data-[state=checked]:border-[#3DB4D2]"
                        />
                        <div className="flex items-center">
                          <ShoppingCart className="w-5 h-5 mr-2 text-green-400" />
                          <label htmlFor="secondPurchases" className="text-white font-medium cursor-pointer">
                            {t('secondPurchases')}
                          </label>
                        </div>
                      </div>

                      <div className="flex items-center space-x-4 p-4 rounded-xl bg-white/5 border border-white/10">
                        <Checkbox
                          id="reviewCollection"
                          checked={objectives.reviewCollection}
                          onCheckedChange={() => handleObjectiveChange("reviewCollection")}
                          className="w-6 h-6 border-2 border-white/30 data-[state=checked]:bg-[#3DB4D2] data-[state=checked]:border-[#3DB4D2]"
                        />
                        <div className="flex items-center">
                          <Star className="w-5 h-5 mr-2 text-yellow-400" />
                          <label htmlFor="reviewCollection" className="text-white font-medium cursor-pointer">
                            {t('reviewCollection')}
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Calculate Button */}
                  <div className="text-center pt-8">
                    <Button
                      onClick={handleCalculate}
                      disabled={isCalculating || totalMessagesPerOrder === 0}
                      className="h-12 px-12 text-lg font-bold bg-gradient-to-r from-[#3DB4D2] to-purple-500 hover:from-[#3DB4D2]/80 hover:to-purple-500/80 rounded-2xl shadow-lg shadow-[#3DB4D2]/25 transform transition-all duration-300 hover:scale-105 disabled:opacity-50"
                    >
                      {isCalculating ? (
                        <div className="flex items-center">
                          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                          {t('calculatingImpact')}
                        </div>
                      ) : (
                        <div className="flex items-center">
                          <Zap className="w-6 h-6 mr-3" />
                          {t('calculateBusinessImpact')}
                          <ArrowRight className="w-6 h-6 ml-3" />
                        </div>
                      )}
                    </Button>
                    {totalMessagesPerOrder === 0 && (
                      <p className="text-yellow-400 text-sm mt-4">
                        {t('selectAtLeastOne')}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Results Section */
            <div className="space-y-12 animate-in fade-in duration-1000">
              {/* WhatsApp Messages Implementation */}
              <div className="max-w-7xl mx-auto">
                {/* Update the header to include the message count: */}
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold text-white mb-4">{t('recommendedMessageBundle')}</h2>
                  <p className="text-lg text-white/70">
                    {t('automatedMessages', { count: totalMessagesPerOrder })}
                  </p>
                </div>

                {/* Message Bundle and Investment - Side by Side Layout */}
                <div
                  className={`grid grid-cols-1 ${
                    objectives.secondPurchases ? "lg:grid-cols-2" : ""
                  } gap-12 items-start`}
                >
                  {/* Message Carousel - Left Side */}
                  <div className="relative">
                    {/* Current Message Display */}
                    <div className="bg-gradient-to-br from-blue-500/20 to-blue-500/5 backdrop-blur-xl rounded-3xl overflow-hidden shadow-[0_20px_60px_rgba(59,130,246,0.3)] border border-blue-500/30">
                      {/* Tracking Message */}
                      {currentMessageIndex === 0 && recommendedMessages[0]?.type === "tracking" && (
                        <>
                          <div className="bg-gradient-to-r from-blue-500/30 to-blue-500/20 p-6 border-b border-blue-500/20">
                            <div className="flex items-center justify-center">
                              <Package className="w-6 h-6 mr-3 text-blue-400" />
                              <h3 className="text-2xl font-bold text-white">{t('orderTracking')}</h3>
                            </div>
                          </div>
                          <div
                            className="p-8"
                            style={{
                              backgroundImage: "url(/images/whatsapp-background.png)",
                              backgroundSize: "cover",
                              backgroundPosition: "center",
                            }}
                          >
                            <div className="bg-[#128C7E] rounded-2xl p-4 mb-6 relative">
                              <div className="absolute -top-2 left-4 w-4 h-4 bg-[#128C7E] transform rotate-45"></div>
                              <div className="text-white text-sm leading-relaxed">
                                <div className="font-semibold mb-3">{t('trackingMessageSubject')}</div>
                                <div className="mb-3">{t('trackingMessageHi')}</div>
                                <div className="mb-3">
                                  {t('trackingMessageBody1')}
                                </div>
                                <div className="mb-3">
                                  {t('trackingMessageBody2')}
                                </div>
                                <div className="flex justify-center">
                                  <button className="bg-white text-[#128C7E] px-6 py-2 rounded-lg text-sm font-medium flex items-center hover:bg-gray-100 transition-colors">
                                    <ExternalLink className="w-4 h-4 mr-2" />
                                    {t('trackShipmentButton')}
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </>
                      )}

                      {/* Out for Delivery Message */}
                      {((currentMessageIndex === 1 && recommendedMessages[1]?.type === "outForDelivery") ||
                        (currentMessageIndex === 0 && recommendedMessages[0]?.type === "outForDelivery")) && (
                        <>
                          <div className="bg-gradient-to-r from-orange-500/30 to-orange-500/20 p-6 border-b border-orange-500/20">
                            <div className="flex items-center justify-center">
                              <Package className="w-6 h-6 mr-3 text-orange-400" />
                              <h3 className="text-2xl font-bold text-white">{t('outForDelivery')}</h3>
                            </div>
                          </div>
                          <div
                            className="p-8"
                            style={{
                              backgroundImage: "url(/images/whatsapp-background.png)",
                              backgroundSize: "cover",
                              backgroundPosition: "center",
                            }}
                          >
                            <div className="bg-[#128C7E] rounded-2xl p-4 mb-6 relative">
                              <div className="absolute -top-2 left-4 w-4 h-4 bg-[#128C7E] transform rotate-45"></div>
                              <div className="text-white text-sm leading-relaxed">
                                <div className="font-semibold mb-3">
                                  {t('outForDeliveryMessageSubject')}
                                </div>
                                <div className="mb-3">{t('trackingMessageHi')}</div>
                                <div className="mb-3">
                                  {t('outForDeliveryMessageBody1')}
                                </div>
                                <div className="mb-3">
                                  {t('outForDeliveryMessageBody2')}
                                </div>
                                <div className="flex justify-center">
                                  <button className="bg-white text-[#128C7E] px-6 py-2 rounded-lg text-sm font-medium flex items-center hover:bg-gray-100 transition-colors">
                                    <ExternalLink className="w-4 h-4 mr-2" />
                                    {t('trackShipmentButton')}
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </>
                      )}

                      {/* Review Request Message */}
                      {recommendedMessages[currentMessageIndex]?.type === "review" && (
                        <>
                          <div className="bg-gradient-to-r from-purple-500/30 to-purple-500/20 p-6 border-b border-purple-500/20">
                            <div className="flex items-center justify-center">
                              <Star className="w-6 h-6 mr-3 text-purple-400" />
                              <h3 className="text-2xl font-bold text-white">{t('reviewRequest')}</h3>
                            </div>
                          </div>
                          <div
                            className="p-8"
                            style={{
                              backgroundImage: "url(/images/whatsapp-background.png)",
                              backgroundSize: "cover",
                              backgroundPosition: "center",
                            }}
                          >
                            <div className="bg-[#128C7E] rounded-2xl p-4 mb-6 relative">
                              <div className="absolute -top-2 left-4 w-4 h-4 bg-[#128C7E] transform rotate-45"></div>
                              <div className="text-white text-sm leading-relaxed">
                                <div className="font-semibold mb-3">
                                  {t('reviewRequestMessageSubject')}
                                </div>
                                <div className="mb-3">{t('trackingMessageHi')}</div>
                                <div className="mb-3">{t('reviewRequestMessageBody1')}</div>
                                <div className="mb-3">{t('reviewRequestMessageBody2')}</div>
                                <div className="flex justify-center">
                                  <button className="bg-white text-[#128C7E] px-6 py-2 rounded-lg text-sm font-medium flex items-center hover:bg-gray-100 transition-colors">
                                    <ExternalLink className="w-4 h-4 mr-2" />
                                    {t('leaveReviewButton')}
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </>
                      )}

                      {/* Customer Retention Message */}
                      {recommendedMessages[currentMessageIndex]?.type === "retention" && (
                        <>
                          <div className="bg-gradient-to-r from-green-500/30 to-green-500/20 p-6 border-b border-green-500/20">
                            <div className="flex items-center justify-center">
                              <Gift className="w-6 h-6 mr-3 text-green-400" />
                              <h3 className="text-2xl font-bold text-white">{t('customerRetention')}</h3>
                            </div>
                          </div>
                          <div
                            className="p-8"
                            style={{
                              backgroundImage: "url(/images/whatsapp-background.png)",
                              backgroundSize: "cover",
                              backgroundPosition: "center",
                            }}
                          >
                            <div className="bg-[#128C7E] rounded-2xl p-4 mb-6 relative">
                              <div className="absolute -top-2 left-4 w-4 h-4 bg-[#128C7E] transform rotate-45"></div>
                              <div className="text-white text-sm leading-relaxed mb-4">
                                {t('retentionMessageGreeting')}
                                <br />
                                <br />
                                {t('retentionMessageBody1')}
                                <br />
                                <br />
                                {t('retentionMessageCode')}
                                <br />
                                {t('retentionMessageValidUntil')}
                                <br />
                                <br />
                                {t('retentionMessageVisit')}
                              </div>
                              <div className="flex justify-center">
                                <button className="bg-white text-[#128C7E] px-6 py-2 rounded-lg text-sm font-medium flex items-center hover:bg-gray-100 transition-colors">
                                  <Gift className="w-4 h-4 mr-2" />
                                  {t('useCouponButton')}
                                </button>
                              </div>
                            </div>
                          </div>
                        </>
                      )}
                    </div>

                    {/* Navigation Arrows - Only show if more than 1 message */}
                    {recommendedMessages.length > 1 && (
                      <div className="flex justify-between items-center mt-8">
                        <button
                          onClick={() => setCurrentMessageIndex(Math.max(0, currentMessageIndex - 1))}
                          disabled={currentMessageIndex === 0}
                          className="flex items-center px-6 py-3 bg-white/10 border border-white/20 rounded-xl text-white hover:bg-white/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <ArrowLeft className="w-5 h-5 mr-2" />
                          {t('previous')}
                        </button>

                        {/* Message Indicators */}
                        <div className="flex space-x-3">
                          {recommendedMessages.map((_, index) => (
                            <button
                              key={index}
                              onClick={() => setCurrentMessageIndex(index)}
                              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                                index === currentMessageIndex ? "bg-[#3DB4D2]" : "bg-white/30"
                              }`}
                            />
                          ))}
                        </div>

                        <button
                          onClick={() =>
                            setCurrentMessageIndex(Math.min(recommendedMessages.length - 1, currentMessageIndex + 1))
                          }
                          disabled={currentMessageIndex === recommendedMessages.length - 1}
                          className="flex items-center px-6 py-3 bg-white/10 border border-white/20 rounded-xl text-white hover:bg-white/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {t('next')}
                          <ArrowRight className="w-5 h-5 ml-2" />
                        </button>
                      </div>
                    )}

                    {/* Message Info */}
                    <div className="text-center mt-6">
                      <p className="text-white/70 text-lg">
                        {t('messageOf', { current: currentMessageIndex + 1, total: recommendedMessages.length })}
                      </p>
                      <p className="text-white/50 text-sm mt-2">{recommendedMessages[currentMessageIndex]?.name}</p>
                    </div>
                  </div>

                  {/* Monthly Investment Summary - Right Side */}
                  {objectives.secondPurchases && (
                    <div className="lg:sticky lg:top-8 mt-8">
                      <div className="bg-gradient-to-br from-green-500/20 to-green-500/5 backdrop-blur-xl rounded-3xl overflow-hidden shadow-[0_20px_60px_rgba(34,197,94,0.3)] border border-green-500/30">
                        <div className="bg-gradient-to-r from-green-500/30 to-green-500/20 p-8 border-b border-green-500/20">
                          <div className="flex items-center justify-center">
                            <Euro className="w-8 h-8 mr-3 text-green-400" />
                            <h3 className="text-3xl font-bold text-white">{t('monthlyInvestment')}</h3>
                          </div>
                        </div>
                        <div className="p-10">
                          <div className="text-center">
                            <div className="text-6xl font-bold text-green-400 mb-4">
                              €{whatsappCostMonthly.toLocaleString()}
                            </div>
                            <div className="text-xl text-green-300 mb-6">
                              {t('forMessages', { count: totalMessagesMonthly.toLocaleString() })}
                            </div>
                            <div className="text-xl text-white/80">
                              {t('perMessage', { count: totalMessagesPerOrder })}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Business Results - Dynamic based on selected objectives */}
              {activeBusinessResults.length > 0 && (
                <div className="max-w-7xl mx-auto">
                  <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-white mb-4">{t('expectedBusinessResults')}</h2>
                    <p className="text-lg text-white/70">{t('projectedOutcomes')}</p>
                  </div>

                  <div
                    className={`grid grid-cols-1 ${activeBusinessResults.length === 2 ? "md:grid-cols-2" : activeBusinessResults.length >= 3 ? "md:grid-cols-2 lg:grid-cols-3" : ""} gap-12`}
                  >
                    {activeBusinessResults.map((result, index) => {
                      const colorClasses = {
                        orange: {
                          bg: "from-orange-500/20 to-orange-500/5",
                          shadow: "shadow-[0_30px_100px_rgba(249,115,22,0.4)]",
                          border: "border-orange-500/30",
                          header: "from-orange-500/30 to-orange-500/20",
                          headerBorder: "border-orange-500/20",
                          icon: "text-orange-400",
                          value: "text-orange-400",
                          subtitle: "text-orange-300",
                          cardBg: "bg-orange-500/20",
                          cardBorder: "border-orange-400/30",
                          details: "text-orange-300",
                        },
                        purple: {
                          bg: "from-purple-500/20 to-purple-500/5",
                          shadow: "shadow-[0_30px_100px_rgba(147,51,234,0.4)]",
                          border: "border-purple-500/30",
                          header: "from-purple-500/30 to-purple-500/20",
                          headerBorder: "border-purple-500/20",
                          icon: "text-purple-400",
                          value: "text-purple-400",
                          subtitle: "text-purple-300",
                          cardBg: "bg-purple-500/20",
                          cardBorder: "border-purple-400/30",
                          details: "text-purple-300",
                        },
                        green: {
                          bg: "from-green-500/20 to-green-500/5",
                          shadow: "shadow-[0_30px_100px_rgba(34,197,94,0.4)]",
                          border: "border-green-500/30",
                          header: "from-green-500/30 to-green-500/20",
                          headerBorder: "border-green-500/20",
                          icon: "text-green-400",
                          value: "text-green-400",
                          subtitle: "text-green-300",
                          cardBg: "bg-green-500/20",
                          cardBorder: "border-green-400/30",
                          details: "text-green-300",
                        },
                      }[result.color]

                      return (
                        <div
                          key={index}
                          className={`bg-gradient-to-br ${colorClasses.bg} backdrop-blur-xl rounded-3xl overflow-hidden ${colorClasses.shadow} border-2 ${colorClasses.border}`}
                        >
                          <div
                            className={`bg-gradient-to-r ${colorClasses.header} p-6 border-b ${colorClasses.headerBorder}`}
                          >
                            <div className="flex items-center justify-center">
                              <result.icon className={`w-6 h-6 mr-4 ${colorClasses.icon}`} />
                              <h3 className="text-2xl font-bold text-white">{result.title}</h3>
                            </div>
                          </div>

                          <div className="p-8 text-center">
                            <div className={`text-6xl font-bold ${colorClasses.value} mb-4`}>{result.value}</div>
                            <div className={`text-2xl ${colorClasses.subtitle} mb-6`}>{result.subtitle}</div>

                            <div className={`${colorClasses.cardBg} rounded-2xl p-6 border ${colorClasses.cardBorder}`}>
                              <div className="text-lg text-white/90 mb-2">
                                <strong>{result.details.rate}</strong>
                              </div>
                              <div className={`text-sm ${colorClasses.details}`}>{result.details.description}</div>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}

              {/* ROI Analysis - Only show if revenue objectives are selected */}
              {objectives.secondPurchases && (
                <div className="max-w-5xl mx-auto mt-16">
                    <div className="bg-gradient-to-r from-blue-600/20 to-indigo-600/20 rounded-3xl p-8 border-2 border-blue-400/30">
                    <h2 className="text-3xl font-bold text-white text-center mb-12">{t('roiAnalysis')}</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                      {/* Monthly Investment */}
                      <div className="bg-red-500/20 rounded-2xl p-8 border border-red-400/30 text-center">
                        <h3 className="text-2xl font-semibold text-red-300 mb-4">{t('monthlyInvestmentLabel')}</h3>
                        <div className="text-4xl font-bold text-red-400 mb-2">
                          €{whatsappCostMonthly.toLocaleString()}
                        </div>
                        <div className="text-lg text-red-300">{t('whatsappBusinessMessaging')}</div>
                      </div>

                      {/* Monthly Return */}
                      <div className="bg-green-500/20 rounded-2xl p-8 border border-green-400/30 text-center">
                        <h3 className="text-2xl font-semibold text-green-300 mb-4">{t('monthlyReturn')}</h3>
                        <div className="text-4xl font-bold text-green-400 mb-2">
                          €{couponSalesMonthly.toLocaleString()}
                        </div>
                        <div className="text-lg text-green-300">{t('additionalRevenueGenerated')}</div>
                      </div>
                    </div>

                    <div className="bg-white/10 rounded-2xl p-8 border border-white/20">
                      <div className="flex items-center justify-center mb-8">
                        <div className="text-7xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                          {(((couponSalesMonthly - whatsappCostMonthly) / whatsappCostMonthly) * 100).toFixed(0)}%
                        </div>
                        <div className="ml-6 text-left">
                          <div className="text-3xl font-bold text-white">{t('returnOnInvestment')}</div>
                          <div className="text-lg text-white/70">{t('returnOnInvestment')}</div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-lg">
                        <div className="bg-white/5 rounded-xl p-6 text-center">
                          <div className="text-white/90">
                            <strong>{t('investmentMultiplier')}</strong>
                          </div>
                          <div className="text-2xl font-bold text-blue-400 mt-2">
                            {t('return', { multiplier: (couponSalesMonthly / whatsappCostMonthly).toFixed(1) })}
                          </div>
                        </div>
                        <div className="bg-white/5 rounded-xl p-6 text-center">
                          <div className="text-white/90">
                            <strong>{t('annualProfitProjection')}</strong>
                          </div>
                          <div className="text-2xl font-bold text-blue-400 mt-2">
                            €{(couponSalesAnnual - whatsappCostAnnual).toLocaleString()}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Industry Context */}
              <div className="max-w-4xl mx-auto mt-12">
                <div className="bg-gradient-to-br from-gray-500/20 to-gray-600/10 backdrop-blur-xl rounded-3xl overflow-hidden shadow-[0_20px_80px_rgba(107,114,128,0.3)] border border-gray-500/30">
                  <div className="bg-gradient-to-r from-gray-500/30 to-gray-600/20 p-6 border-b border-gray-500/20">
                    <h3 className="text-2xl font-bold text-white text-center flex items-center justify-center">
                      {t('industryBenchmark', { vertical: verticalMarket })}
                    </h3>
                  </div>
                  <div className="p-8">
                    <p className="text-white/90 text-lg leading-relaxed text-center">
                      {verticalNotes[verticalMarket as keyof typeof verticalNotes]}
                    </p>
                  </div>
                </div>
              </div>

              {/* Reset Button */}
              <div className="text-center pt-8">
                <Button
                  onClick={resetCalculator}
                  className="h-12 px-8 text-lg font-semibold bg-white/10 border-2 border-[#3DB4D2] text-[#3DB4D2] hover:bg-[#3DB4D2]/20 hover:text-white rounded-xl transition-all duration-300"
                >
                  {t('newCalculation')}
                </Button>
              </div>
            </div>
          )}

          {/* Educational Section - Always Visible */}
          <div className="mt-20 bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-xl rounded-3xl overflow-hidden shadow-[0_20px_80px_rgba(0,0,0,0.3)] border border-white/10">
            <div className="bg-gradient-to-r from-[#3DB4D2]/30 to-purple-500/30 p-6 border-b border-white/10">
              <h2 className="text-3xl font-bold text-white text-center">{t('whatsappBusinessAdvantages')}</h2>
            </div>
            <div className="p-8">
              <div className="grid md:grid-cols-3 gap-10">
                <div className="text-center space-y-6 group">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#3DB4D2]/30 to-[#3DB4D2]/10 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                    <MessageCircle className="w-8 h-8 text-[#3DB4D2]" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">{t('openRate')}</h3>
                  <p className="text-white/70 text-lg leading-relaxed">
                    {t('openRateText')}
                  </p>
                </div>
                <div className="text-center space-y-6 group">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500/30 to-purple-500/10 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                    <Zap className="w-8 h-8 text-purple-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">{t('instantDelivery')}</h3>
                  <p className="text-white/70 text-lg leading-relaxed">
                    {t('instantDeliveryText')}
                  </p>
                </div>
                <div className="text-center space-y-6 group">
                  <div className="w-16 h-16 bg-gradient-to-br from-yellow-500/30 to-yellow-500/10 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                    <Sparkles className="w-8 h-8 text-yellow-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">{t('directCommunication')}</h3>
                  <p className="text-white/70 text-lg leading-relaxed">
                    {t('directCommunicationText')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
