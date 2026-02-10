"use client"

import type React from "react"
import { useState } from "react"
import { Download, Copy, Tag, User, Euro, Calendar, Phone, FileText, ChevronDown, ChevronUp, Edit2, GripVertical, Video } from "lucide-react"
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useTranslations } from 'next-intl'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'

// Standard pricing plans from the pricing page
const standardPlans = {
  lite: {
    name: "Lite",
    monthly: 35,
    annual: 28 * 12,
    perLabel: 0.11, // mensile: 0.11, annuale: 0.10
    perLabelAnnual: 0.10,
    whatsappIncluded: 100, // WhatsApp inclusi al mese
  },
  growth: {
    name: "Growth",
    monthly: 99,
    annual: 79 * 12,
    perLabel: 0.10, // mensile: 0.10, annuale: 0.09
    perLabelAnnual: 0.09,
    whatsappIncluded: 200,
  },
  premium: {
    name: "Premium",
    monthly: 199,
    annual: 159 * 12,
    perLabel: 0.09, // mensile: 0.09, annuale: 0.08
    perLabelAnnual: 0.08,
    whatsappIncluded: 300,
  },
  pro: {
    name: "Pro",
    monthly: 799,
    annual: 639 * 12,
    perLabel: 0.07, // mensile: 0.07, annuale: 0.06
    perLabelAnnual: 0.06,
    whatsappIncluded: 500,
  },
}

export default function CreateOfferPage() {
  const t = useTranslations('createQuote')
  
  // Define the features with their texts and images
  const features = [
    {
      id: "integrazione-negozi",
      title: t('storeIntegration'),
      text: t('storeIntegrationText'),
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-pz0A3Dz1zkY1mikdEGdrfTPAhN0E4R.png",
    },
    {
      id: "integrazione-corrieri",
      title: t('carrierIntegration'),
      text: t('carrierIntegrationText'),
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-TVZbxG3QKSVDN3CeUl2m9roZv5NvJQ.png",
    },
    {
      id: "tariffe-agevolate",
      title: t('discountedShippingRates'),
      text: t('discountedShippingRatesText'),
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-CKaEyYsgr2EwvYsMHtBB3mj5aZC7Yc.png",
    },
    {
      id: "stampa-etichette",
      title: t('labelPrinting'),
      text: t('labelPrintingText'),
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-WG7OkwwmD2oaBY0BGag48MWc4udcot.png",
    },
    {
      id: "pack-and-go",
      title: t('packAndGo'),
      text: t('packAndGoText'),
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-lx2QXbpXeob9ISoJlOC2aMtjrpNZqc.png",
    },
    {
      id: "monitoraggio-spedizioni",
      title: t('shipmentMonitoring'),
      text: t('shipmentMonitoringText'),
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-7GZa2i1nKKL3QD4ClcpmuN1LOlJ9pZ.png",
    },
    {
      id: "email-tracking",
      title: t('brandedEmails'),
      text: t('brandedEmailsText'),
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-0GEQIrHoxwZ4nNMKjTOew2LMFF3hJU.png",
    },
    {
      id: "whatsapp-tracking",
      title: t('whatsappTrackingReview'),
      text: t('whatsappTrackingReviewText'),
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-uZx0bYZfs2L0FPAGbSTWyOTbrJjDdv.png",
    },
    {
      id: "whatsapp-marketing",
      title: t('whatsappMarketing'),
      text: t('whatsappMarketingText'),
      image: "/images/whatsapp-marketing-phone.png",
    },
    {
      id: "pagina-tracking",
      title: t('trackingPage'),
      text: t('trackingPageText'),
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-9NbeJbkp6YF0Smjv3pKLQcuUZWQhGw.png",
    },
    {
      id: "mappa-pudo",
      title: t('pudoMapAtCheckout'),
      text: t('pudoMapAtCheckoutText'),
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-k4yqCI4qQToWfr3903xHMRYSEYLRWH.png",
    },
    {
      id: "portale-resi",
      title: t('returnsPortal'),
      text: t('returnsPortalText'),
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-BRaqejrvHfjqABiThyht5Ulva69849.png",
    },
    {
      id: "assicurazione-xcover",
      title: t('xcoverInsurance'),
      text: t('xcoverInsuranceText'),
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-Q9BFgCnG6Q20iBoQfGmNY3gfqQGZWG.png",
    },
  ]
  const getDefaultFeatureIds = (plan: keyof typeof standardPlans) => {
    const liteDefaults = [
      "integrazione-negozi",
      "integrazione-corrieri",
      "tariffe-agevolate",
      "stampa-etichette",
      "email-tracking",
      "whatsapp-tracking",
      "mappa-pudo",
      "assicurazione-xcover",
    ]

    if (plan === "growth") {
      return [
        ...liteDefaults,
        "pack-and-go",
        "pagina-tracking",
        "whatsapp-marketing",
      ]
    }

    if (plan === "premium") {
      return [
        ...liteDefaults,
        "pack-and-go",
        "pagina-tracking",
        "whatsapp-marketing",
        "monitoraggio-spedizioni",
        "portale-resi",
      ]
    }

    if (plan === "pro") {
      return features.map((feature) => feature.id)
    }

    return liteDefaults
  }

  const [selectedFeatures, setSelectedFeatures] = useState<string[]>(
    getDefaultFeatureIds("lite"),
  )
  const [expandedFeatures, setExpandedFeatures] = useState<Record<string, boolean>>({})
  const [editedFeatureTexts, setEditedFeatureTexts] = useState<Record<string, string>>({})
  const [featuresOrder, setFeaturesOrder] = useState<string[]>(features.map((feature) => feature.id))
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false)

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const [pricingValues, setPricingValues] = useState({
    selectedPlan: "lite",
    showMonthly: true,
    showAnnual: false,
    perLabelFee: standardPlans.lite.perLabel.toFixed(2), // Valore iniziale basato su Lite mensile
    whatsappCost: "0.14",
    customMonthlyFee: "",
    customAnnualFee: "",
    customPerLabelFee: "",
    customWhatsappCost: "",
    clientName: "",
    clientEmail: "",
    whatsappNumber: "",
    meetingLink: "",
    introduction: "",
    isSpecialOffer: false,
    offerExpiryDate: "",
    shippingRates: "",
  })

  // Parse shipping rates from pasted text
  const parseShippingRates = (text: string): Array<Array<string>> => {
    if (!text.trim()) return []
    
    const lines = text.trim().split('\n')
    return lines
      .map(line => {
        // First try splitting by tab (most common)
        if (line.includes('\t')) {
          return line.split('\t').map(col => col.trim()).filter(col => col.length > 0)
        }
        // Otherwise split by multiple spaces (2 or more)
        const columns = line.split(/\s{2,}/).filter(col => col.trim())
        return columns.map(col => col.trim())
      })
      .filter(row => row.length > 0)
  }

  // Generate shipping rates table HTML
  const generateShippingRatesTable = (): string => {
    const rates = parseShippingRates(pricingValues.shippingRates)
    if (rates.length === 0) return ""

    // Determine number of columns from first row
    const numColumns = rates[0]?.length || 0
    if (numColumns === 0) return ""

    // Generate table headers (if first row looks like headers, otherwise use generic)
    const firstRow = rates[0]
    const isFirstRowHeaders = firstRow.some(cell => 
      cell.toLowerCase().includes('servizio') || 
      cell.toLowerCase().includes('peso') ||
      cell.toLowerCase().includes('prezzo') ||
      cell.toLowerCase().includes('service') ||
      cell.toLowerCase().includes('weight') ||
      cell.toLowerCase().includes('price')
    )

    const tableRows = isFirstRowHeaders ? rates.slice(1) : rates
    // Use generic headers if first row doesn't look like headers
    const genericHeaders = [
      t('shippingRatesService') || 'Servizio',
      t('shippingRatesWeight') || 'Peso (kg)',
      t('shippingRatesPriceWithFuel') || 'Prezzo incluso di carburante',
      t('shippingRatesPrice2') || 'Prezzo 2',
      t('shippingRatesPrice3') || 'Prezzo 3',
      t('shippingRatesPrice4') || 'Prezzo 4'
    ]
    const headers = isFirstRowHeaders ? firstRow : genericHeaders.slice(0, numColumns)

    return `
  <div class="shipping-rates-section">
    <h3 style="font-size: 20px; font-weight: 600; color: #0a1e4d; margin: 30px 0 15px 0; padding-bottom: 10px; border-bottom: 2px solid #3db4d2;">${t('shippingRates')}</h3>
    <div class="shipping-rates-table-container">
      <table class="shipping-rates-table">
        <thead>
          <tr>
            ${headers.map(header => `<th>${header}</th>`).join('')}
          </tr>
        </thead>
        <tbody>
          ${tableRows.map(row => `
            <tr>
              ${row.map(cell => `<td>${cell}</td>`).join('')}
              ${row.length < numColumns ? Array(numColumns - row.length).fill('<td></td>').join('') : ''}
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  </div>
    `
  }

  const generateHtmlCode = () => {
    const whatsappNumber = pricingValues.whatsappNumber || "393123456789"
    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Your Sendcloud Offer</title>
<style>
  /* General styles */
  body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    color: #333;
    line-height: 1.6;
    margin: 0;
    padding: 0;
    background-color: #f9f9f9;
  }
  
  .container {
    max-width: 800px;
    margin: 0 auto;
    background-color: #ffffff;
    border-radius: 8px;
    overflow: visible;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  }
  
  /* Header */
  .header {
    background-color: #ffffff;
    padding: 12px 20px;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 20px;
    border-bottom: 1px solid #eee;
  }
  
  .header-left {
    display: flex;
    align-items: center;
    gap: 12px;
    flex: 1;
  }
  
  .sendcloud-logo {
    width: 45px;
    height: 45px;
    display: block;
    flex-shrink: 0;
  }
  
  .header h1 {
    color: #0a1e4d;
    margin: 0;
    font-size: 20px;
    font-weight: 600;
  }
  
  .header-right {
    text-align: right;
    font-size: 12px;
    color: #555;
    line-height: 1.5;
    flex-shrink: 0;
  }
  
  .header-right p {
    margin: 0;
  }
  
  /* Content */
  .content {
    padding: 20px 25px;
  }
  
  /* Section titles */
  h2 {
    color: #0a1e4d;
    font-size: 20px;
    margin-top: 25px;
    margin-bottom: 15px;
    padding-bottom: 8px;
    border-bottom: 2px solid #3db4d2;
  }
  
  /* Features */
  .feature {
    margin-bottom: 10px;
    padding-bottom: 8px;
    border-bottom: 1px solid #eee;
    overflow: visible;
    min-height: auto;
  }
  
  .feature:last-child {
    border-bottom: none;
    margin-bottom: 0;
    padding-bottom: 0;
  }
  
  .feature h3 {
    color: #3db4d2;
    margin-top: 0;
    font-size: 18px;
    margin-bottom: 12px;
    font-weight: 600;
  }
  
  .feature-content {
    display: flex;
    flex-direction: column;
    overflow: visible;
  }
  
  .feature-text {
    margin-bottom: 6px;
    overflow: visible;
  }
  
  .feature-text p {
    margin-top: 0;
    font-size: 14px;
    color: #555;
    line-height: 1.5;
    word-wrap: break-word;
    overflow-wrap: break-word;
  }
  
  .feature-image {
    margin-top: 6px;
    text-align: center;
    position: relative;
    overflow: visible;
  }
  
  .feature-image img, .feature-image video {
    max-width: 40%;
    width: 40%;
    height: auto;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    border: 1px solid #eaeaea;
    cursor: crosshair;
    transition: transform 0.1s ease;
    display: block;
    object-fit: contain;
  }

  /* Magnifying glass styles */
  .magnifier {
    position: fixed;
    border: 3px solid #3db4d2;
    border-radius: 50%;
    cursor: none;
    width: 150px;
    height: 150px;
    opacity: 0;
    transition: opacity 0.2s ease;
    pointer-events: none;
    z-index: 1000;
    box-shadow: 0 0 20px rgba(61, 180, 210, 0.5);
    overflow: hidden;
    background: white;
  }

  .magnifier.active {
    opacity: 1;
  }

  .magnifier img, .magnifier video {
    position: absolute;
    max-width: none;
    max-height: none;
  }
  
  /* Pricing */
  .pricing {
    background: linear-gradient(135deg, #f5f9ff 0%, #ffffff 100%);
    padding: 30px 35px;
    border-radius: 12px;
    margin-top: 20px;
    box-shadow: 0 4px 20px rgba(61, 180, 210, 0.15);
    border: 2px solid #3db4d2;
  }
  
  .pricing h2 {
    color: #0a1e4d;
    margin-top: 0;
    margin-bottom: 20px;
    border-bottom: 2px solid #3db4d2;
    padding-bottom: 10px;
    font-size: 22px;
    font-weight: 700;
  }
  
  .plan-name {
    color: #0a1e4d;
    font-size: 24px;
    font-weight: 700;
    margin-bottom: 15px;
    text-transform: uppercase;
    letter-spacing: 1px;
  }
  
  .pricing-blocks {
    display: flex;
    gap: 20px;
    margin: 20px 0;
  }
  
  .pricing-block {
    flex: 1;
    background: #ffffff;
    border: 2px solid #e0e0e0;
    border-radius: 10px;
    padding: 20px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  }
  
  .pricing-block.annual {
    border-color: #3db4d2;
    background: linear-gradient(135deg, #f0f9fb 0%, #ffffff 100%);
    position: relative;
  }
  
  .pricing-block-title {
    font-size: 16px;
    font-weight: 600;
    color: #0a1e4d;
    margin-bottom: 15px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
  
  .pricing-highlight {
    background: linear-gradient(135deg, #3db4d2 0%, #2a8ca6 100%);
    color: white;
    display: inline-block;
    padding: 12px 24px;
    border-radius: 8px;
    font-weight: bold;
    font-size: 20px;
    margin: 8px 0;
    box-shadow: 0 4px 12px rgba(61, 180, 210, 0.4);
    min-width: 180px;
    text-align: center;
    width: 100%;
    box-sizing: border-box;
  }
  
  .savings-badge {
    background: linear-gradient(135deg, #25D366 0%, #128C7E 100%);
    color: white;
    padding: 8px 16px;
    border-radius: 6px;
    font-weight: bold;
    font-size: 14px;
    margin-top: 10px;
    display: inline-block;
    box-shadow: 0 2px 6px rgba(37, 211, 102, 0.3);
  }
  
  .pricing-details {
    margin-top: 20px;
    padding-top: 20px;
    border-top: 1px solid #e0e0e0;
  }
  
  .pricing-block .pricing-details {
    margin-top: 15px;
    padding-top: 15px;
  }
  
  .pricing ul {
    padding-left: 0;
    margin: 0;
    list-style: none;
  }
  
  .pricing li {
    margin-bottom: 12px;
    position: relative;
    padding-left: 32px;
    font-size: 16px;
    line-height: 1.8;
    color: #333;
  }
  
  .pricing li:before {
    content: "✓";
    position: absolute;
    left: 0;
    color: #3db4d2;
    font-weight: bold;
    font-size: 18px;
    top: 2px;
    background: #e8f5f8;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .pricing li strong {
    color: #0a1e4d;
    font-weight: 600;
  }
  
  .pricing p {
    margin: 10px 0;
    font-size: 14px;
    color: #555;
    line-height: 1.6;
  }
  
  /* CTA Button */
  .cta-button {
    display: block;
    background: linear-gradient(135deg, #25D366 0%, #128C7E 100%);
    color: white;
    text-decoration: none;
    text-align: center;
    padding: 12px 20px;
    border-radius: 5px;
    font-weight: bold;
    font-size: 14px;
    margin: 20px auto 10px;
    width: 200px;
    box-shadow: 0 4px 10px rgba(37, 211, 102, 0.3);
    transition: all 0.3s ease;
  }
  
  .cta-button:hover {
    background: linear-gradient(135deg, #128C7E 0%, #075E54 100%);
    box-shadow: 0 6px 15px rgba(37, 211, 102, 0.4);
  }
  
  /* Special offer */
  .special-offer-badge {
    background-color: #ff5252;
    color: white;
    font-weight: bold;
    padding: 4px 12px;
    border-radius: 30px;
    display: inline-block;
    margin-bottom: 10px;
    font-size: 13px;
  }
  
  .original-price {
    text-decoration: line-through;
    color: #888;
    margin-right: 10px;
  }
  
  .discount-price {
    color: #ff5252;
    font-weight: bold;
  }
  
  .expiry-notice {
    background-color: #fff3cd;
    border: 1px solid #ffeaa7;
    color: #856404;
    padding: 8px 12px;
    border-radius: 5px;
    margin: 12px 0;
    font-weight: bold;
    font-size: 13px;
  }
  
  /* Shipping rates table */
  .shipping-rates-section {
    margin: 30px 0;
    page-break-inside: avoid;
  }
  
  .shipping-rates-table-container {
    overflow-x: auto;
    margin: 15px 0;
  }
  
  .shipping-rates-table {
    width: 100%;
    border-collapse: separate;
    border-spacing: 0;
    background-color: white;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    overflow: hidden;
    border: 3px solid #3db4d2;
  }
  
  .shipping-rates-table thead {
    background: linear-gradient(135deg, #3db4d2 0%, #2a8ca6 100%);
    color: white;
  }
  
  .shipping-rates-table th {
    padding: 12px 15px;
    text-align: left;
    font-weight: 600;
    font-size: 14px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    border-right: 2px solid rgba(255, 255, 255, 0.5);
    border-bottom: 3px solid #2a8ca6;
  }
  
  .shipping-rates-table th:last-child {
    border-right: none;
  }
  
  .shipping-rates-table td {
    padding: 10px 15px;
    border-right: 2px solid #b0b0b0;
    border-bottom: 2px solid #b0b0b0;
    font-size: 14px;
    color: #333;
  }
  
  .shipping-rates-table td:last-child {
    border-right: none;
  }
  
  .shipping-rates-table tbody tr:last-child td {
    border-bottom: none;
  }
  
  .shipping-rates-table tbody tr:hover {
    background-color: #f5f9ff;
  }
  
  .shipping-rates-table tbody tr:nth-child(even) {
    background-color: #fafafa;
  }
  
  .shipping-rates-table tbody tr:nth-child(even):hover {
    background-color: #f5f9ff;
  }
  
  /* Responsive */
  @media only screen and (min-width: 768px) {
    .feature-content {
      align-items: center;
      gap: 15px;
    }
    
    .feature-text {
      flex: 1;
      margin-bottom: 0;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    
    .feature-image {
      flex: 1;
      margin-top: 0;
    }
    
    .feature-image img, .feature-image video {
      max-width: 40%;
      width: 40%;
    }
    
    .feature h3 {
      margin-top: 0;
      margin-bottom: 12px;
    }
    
    /* Always image left, text right */
    .feature-content {
      flex-direction: row;
    }
  }
  
  /* Mobile: always column layout */
  @media only screen and (max-width: 767px) {
    .feature-content {
      flex-direction: column !important;
    }
    
    .feature-text {
      order: 1 !important;
      margin-bottom: 6px;
    }
    
    .feature-image {
      order: 2 !important;
      margin-top: 6px;
    }
  }
  
  @media only screen and (max-width: 767px) {
    .content {
      padding: 30px 20px;
    }
    
    .feature-content {
      flex-direction: column;
    }
    
    .pricing {
      padding: 25px 20px;
    }
    
    .pricing-blocks {
      flex-direction: column;
    }
    
    .pricing-block {
      width: 100%;
    }

    /* Hide magnifier on mobile */
    .magnifier {
      display: none;
    }
  }

  @media only screen and (min-width: 1200px) {
    .container {
      max-width: 850px;
    }
    
    .content {
      padding: 50px 40px;
    }
  }
</style>
<script>
document.addEventListener('DOMContentLoaded', function() {
  // Magnifying glass for images
  const images = document.querySelectorAll('.feature-image img, .feature-image video');
  let magnifier = null;

  images.forEach(img => {
    img.addEventListener('mouseenter', function() {
      if (window.innerWidth > 767) { // Only on desktop
        createMagnifier(this);
      }
    });

    img.addEventListener('mouseleave', function() {
      if (magnifier) {
        magnifier.remove();
        magnifier = null;
      }
    });

    img.addEventListener('mousemove', function(e) {
      if (magnifier && window.innerWidth > 767) {
        updateMagnifier(e, this);
      }
    });
  });

  function createMagnifier(img) {
    magnifier = document.createElement('div');
    magnifier.className = 'magnifier';
    
    const magnifiedImg = img.cloneNode();
    magnifiedImg.style.transform = 'scale(2)';
    magnifier.appendChild(magnifiedImg);
    
    document.body.appendChild(magnifier);
    
    setTimeout(() => {
      magnifier.classList.add('active');
    }, 10);
  }

  function updateMagnifier(e, img) {
    if (!magnifier) return;
    
    const rect = img.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const magnifierSize = 150;
    magnifier.style.left = (e.clientX - magnifierSize/2) + 'px';
    magnifier.style.top = (e.clientY - magnifierSize/2) + 'px';
    
    const magnifiedImg = magnifier.querySelector('img, video');
    const scaleX = magnifiedImg.naturalWidth / img.offsetWidth;
    const scaleY = magnifiedImg.naturalHeight / img.offsetHeight;
    
    magnifiedImg.style.left = -(x * 2 - magnifierSize/2) + 'px';
    magnifiedImg.style.top = -(y * 2 - magnifierSize/2) + 'px';
  }
});
</script>
</head>
<body>
<div class="container">
<div class="header">
  <div class="header-left">
    <img src="https://www.sendcloud.com/wp-content/uploads/2022/07/SC-tile-icon-1.svg" alt="Sendcloud" class="sendcloud-logo" style="border-radius: 8px;">
    <h1>Your Sendcloud Offer</h1>
  </div>
  <div class="header-right">
    <p><strong>${pricingValues.clientName || "Not specified"}</strong></p>
    <p>${pricingValues.clientEmail || "Not specified"}</p>
    <p>${new Date().toLocaleDateString("en-US")}</p>
  </div>
</div>

<div class="content">

  ${pricingValues.introduction ? `
  <div class="introduction" style="background-color: #f5f9ff; border-left: 4px solid #3db4d2; padding: 12px 15px; margin: 20px 0; border-radius: 0 4px 4px 0;">
    <p style="margin: 0; font-size: 14px; color: #333; line-height: 1.5;">${pricingValues.introduction.replace(/\n/g, '<br>')}</p>
  </div>
  ` : ""}

  <h2>${t('featuresIncluded')}</h2>
  
  ${selectedFeatures
    .sort((a, b) => {
      const indexA = featuresOrder.indexOf(a)
      const indexB = featuresOrder.indexOf(b)
      return indexA - indexB
    })
    .map((featureId) => {
      const feature = features.find((f) => f.id === featureId)
      if (!feature) return ""
      const featureText = editedFeatureTexts[featureId] || feature.text

      return `
  <div class="feature">
    <h3>${feature.title}</h3>
    <div class="feature-content">
      <div class="feature-text">
        <p>${featureText.replace(/\n/g, '<br>')}</p>
      </div>
      <div class="feature-image">
        <img src="${feature.image}" alt="${feature.title}" loading="lazy" />
      </div>
    </div>
  </div>
  `
    })
    .join("")}

  <h2>Offer Details</h2>
  
  <div class="pricing">
    ${pricingValues.isSpecialOffer ? '<div class="special-offer-badge">🎉 SPECIAL OFFER</div>' : ""}
    
    <h2>${t('pricing')}</h2>
    
    ${
      pricingValues.selectedPlan === "custom-monthly" || pricingValues.selectedPlan === "custom-yearly"
        ? (() => {
            const isMonthly = pricingValues.selectedPlan === "custom-monthly"
            const fee = isMonthly ? pricingValues.customMonthlyFee : pricingValues.customAnnualFee
            const perLabel = pricingValues.customPerLabelFee
            const whatsappCost = pricingValues.customWhatsappCost
            
            if (!fee || !perLabel || !whatsappCost) return ""
            
            const displayPrice = isMonthly 
              ? fee 
              : (parseFloat(fee || "0") / 12).toFixed(2)
            const displayLabel = isMonthly ? t('perMonth') : t('perMonth')
            
            return `
    <div class="plan-name">${isMonthly ? t('customMonthly') : t('customYearly')}</div>
    <div style="margin: 15px 0;">
      <div class="pricing-highlight">€${displayPrice}${displayLabel}</div>
    </div>
    <div class="pricing-details">
      <ul>
        <li>${t('costPerLabelShort')}: <strong>€${parseFloat(perLabel).toFixed(2)}</strong></li>
        <li>${t('whatsappCostPerMessage')}: <strong>€${parseFloat(whatsappCost).toFixed(2)}</strong></li>
      </ul>
    </div>
    `
          })()
        : pricingValues.showMonthly || pricingValues.showAnnual
        ? `
    <div class="plan-name">${standardPlans[pricingValues.selectedPlan as keyof typeof standardPlans].name}</div>
    
    ${
      pricingValues.showMonthly && pricingValues.showAnnual
        ? (() => {
            const plan = standardPlans[pricingValues.selectedPlan as keyof typeof standardPlans]
            const monthlyPrice = plan.monthly
            const annualMonthlyPrice = plan.annual / 12
            const savings = Math.round(((monthlyPrice - annualMonthlyPrice) / monthlyPrice) * 100)
            return `
    <div class="pricing-blocks">
      <div class="pricing-block">
      <div class="pricing-block-title">${t('monthlyLabel')}</div>
      <div class="pricing-highlight">€${monthlyPrice}${t('perMonth')}</div>
        <div class="pricing-details">
          <ul>
          <li>${t('costPerLabelShort')}: <strong>€${plan.perLabel.toFixed(2)}</strong></li>
          <li><strong>${t('whatsappIncludedMonthly', { count: plan.whatsappIncluded })}</strong></li>
          </ul>
        </div>
      </div>
      <div class="pricing-block annual">
      <div class="pricing-block-title">${t('annualLabel')}</div>
      <div class="pricing-highlight">€${annualMonthlyPrice}${t('perMonth')}</div>
      <div class="savings-badge">💰 ${t('savings', { rate: savings })}</div>
        <div class="pricing-details">
          <ul>
          <li>${t('costPerLabelShort')}: <strong>€${plan.perLabelAnnual.toFixed(2)}</strong></li>
          <li><strong>${t('whatsappIncludedAnnual', { count: plan.whatsappIncluded * 12 })}</strong></li>
          </ul>
        </div>
      </div>
    </div>
    `
          })()
        : pricingValues.showMonthly
        ? (() => {
            const plan = standardPlans[pricingValues.selectedPlan as keyof typeof standardPlans]
            return `
    <div style="margin: 15px 0;">
      <div class="pricing-highlight">€${plan.monthly}${t('perMonth')}</div>
    </div>
    <div class="pricing-details">
      <ul>
        <li>${t('costPerLabelShort')}: <strong>€${plan.perLabel.toFixed(2)}</strong></li>
        <li><strong>${t('whatsappIncludedMonthly', { count: plan.whatsappIncluded })}</strong> ${t('includedInSubscription')}</li>
      </ul>
    </div>
    `
          })()
        : pricingValues.showAnnual
        ? (() => {
            const plan = standardPlans[pricingValues.selectedPlan as keyof typeof standardPlans]
            const annualMonthlyPrice = plan.annual / 12
            return `
    <div style="margin: 15px 0;">
      <div class="pricing-highlight">€${annualMonthlyPrice}${t('perMonth')}</div>
    </div>
    <div class="pricing-details">
      <ul>
        <li>${t('costPerLabelShort')}: <strong>€${plan.perLabelAnnual.toFixed(2)}</strong></li>
        <li><strong>${t('whatsappIncludedAnnual', { count: plan.whatsappIncluded * 12 })}</strong> ${t('includedInAnnualSubscription')}</li>
      </ul>
    </div>
    `
          })()
        : ""
    }
    `
        : ""
    }
    
    ${
      pricingValues.offerExpiryDate
        ? `<div class="expiry-notice">⏰ Offer valid until ${new Date(pricingValues.offerExpiryDate).toLocaleDateString("en-US")}</div>`
        : ""
    }
  </div>

  ${generateShippingRatesTable()}

  ${
    pricingValues.whatsappNumber
      ? `<a href="https://wa.me/${whatsappNumber}?text=Hi%2C%20I%27m%20interested%20in%20the%20Sendcloud%20offer%20for%20${encodeURIComponent(pricingValues.clientName || "my company")}" class="cta-button">
    📱 Contact us on WhatsApp
  </a>`
      : ""
  }
  
  ${
    pricingValues.meetingLink
      ? `<a href="${pricingValues.meetingLink}" class="cta-button" style="background: linear-gradient(135deg, #3db4d2 0%, #2a8ca6 100%); margin-top: ${pricingValues.whatsappNumber ? '10px' : '0'};">
    📅 Book a meeting
  </a>`
      : ""
  }

</div>
</div>
</body>
</html>
`

    return htmlContent
  }

  const handleDownloadHtml = () => {
    const htmlContent = generateHtmlCode()
    const blob = new Blob([htmlContent], { type: "text/html" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "sendcloud_offer.html"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleCopyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generateHtmlCode())
      alert("Content copied to clipboard!")
    } catch (err) {
      console.error("Error during copy: ", err)
      alert("An error occurred during copying.")
    }
  }

  const handleDownloadPdf = async () => {
    setIsGeneratingPdf(true)
    try {
      // Create a temporary container for the HTML content
      const tempDiv = document.createElement('div')
      tempDiv.innerHTML = generateHtmlCode()
      // Position it completely off-screen but visible to html2canvas
      tempDiv.style.position = 'fixed'
      tempDiv.style.top = '0'
      tempDiv.style.left = '-10000px' // Far off-screen but still "visible"
      tempDiv.style.width = '800px'
      tempDiv.style.height = 'auto'
      tempDiv.style.overflow = 'visible'
      tempDiv.style.backgroundColor = '#ffffff'
      tempDiv.style.visibility = 'visible'
      tempDiv.style.pointerEvents = 'none'
      tempDiv.style.zIndex = '-1'
      tempDiv.style.opacity = '1'
      // Prevent any layout shifts
      tempDiv.style.margin = '0'
      tempDiv.style.padding = '0'
      tempDiv.style.transform = 'translateX(-100%)' // Additional off-screen positioning
      document.body.appendChild(tempDiv)

      // Wait for images to load
      const images = tempDiv.querySelectorAll('img')
      const imagePromises = Array.from(images).map((img) => {
        if (img.complete) return Promise.resolve()
        return new Promise((resolve, reject) => {
          img.onload = resolve
          img.onerror = resolve // Continue even if image fails to load
          setTimeout(resolve, 5000) // Timeout after 5 seconds
        })
      })
      await Promise.all(imagePromises)

      // Get the main content container
      const container = tempDiv.querySelector('.container') as HTMLElement
      if (!container) {
        document.body.removeChild(tempDiv)
        alert("Error: Could not find content to convert to PDF")
        return
      }

      // PDF dimensions
      const pdfWidth = 210 // A4 width in mm
      const pdfHeight = 297 // A4 height in mm
      const margin = 10 // margin in mm
      const contentWidth = pdfWidth - (margin * 2)
      const contentHeight = pdfHeight - (margin * 2)

      // Create PDF
      const pdf = new jsPDF('p', 'mm', 'a4')
      let currentY = margin

      // Helper function to add a new page if needed
      const checkPageBreak = (neededHeight: number) => {
        if (currentY + neededHeight > pdfHeight - margin) {
          pdf.addPage()
          currentY = margin
          return true
        }
        return false
      }

      // Convert and add header
      const header = container.querySelector('.header') as HTMLElement
      if (header) {
        const headerCanvas = await html2canvas(header, {
          scale: 2,
          useCORS: true,
          logging: false,
          backgroundColor: '#ffffff',
          allowTaint: false,
        })
        const headerHeight = (headerCanvas.height * contentWidth) / headerCanvas.width
        checkPageBreak(headerHeight)
        pdf.addImage(headerCanvas.toDataURL('image/png'), 'PNG', margin, currentY, contentWidth, headerHeight)
        currentY += headerHeight + 10
      }

      // Client info is now in header, no need to add separately

      // Convert and add introduction if present
      const introduction = container.querySelector('.introduction') as HTMLElement
      if (introduction) {
        const introCanvas = await html2canvas(introduction, {
          scale: 2,
          useCORS: true,
          logging: false,
          backgroundColor: '#f5f9ff',
          allowTaint: false,
        })
        const introHeight = (introCanvas.height * contentWidth) / introCanvas.width
        checkPageBreak(introHeight)
        pdf.addImage(introCanvas.toDataURL('image/png'), 'PNG', margin, currentY, contentWidth, introHeight)
        currentY += introHeight + 15
      }

      // Convert and add features section title (first h2)
      // If no introduction, add title immediately after header
      const featuresTitle = container.querySelector('h2') as HTMLElement
      if (featuresTitle) {
        const titleCanvas = await html2canvas(featuresTitle, {
          scale: 2,
          useCORS: true,
          logging: false,
          backgroundColor: '#ffffff',
          allowTaint: false,
        })
        const titleHeight = (titleCanvas.height * contentWidth) / titleCanvas.width
        checkPageBreak(titleHeight)
        pdf.addImage(titleCanvas.toDataURL('image/png'), 'PNG', margin, currentY, contentWidth, titleHeight)
        currentY += titleHeight + 8
      }

      // Convert and add features sequentially
      const features = container.querySelectorAll('.feature')
      const featuresArray = Array.from(features)
      
      // Standard spacing between features
      const featureSpacing = 18
      const minBottomMargin = 20
      
      // Simply add features one after another, but ensure each feature fits completely
      for (const feature of featuresArray) {
        const featureElement = feature as HTMLElement
        const featureCanvas = await html2canvas(featureElement, {
          scale: 2,
          useCORS: true,
          logging: false,
          backgroundColor: '#ffffff',
          allowTaint: false,
        })
        const featureHeight = (featureCanvas.height * contentWidth) / featureCanvas.width
        
        // Calculate space needed including spacing
        const spaceNeeded = featureHeight + (currentY > margin ? featureSpacing : 0)
        
        // Check if feature fits on current page
        const availableHeight = pdfHeight - margin - minBottomMargin
        const wouldFit = currentY + spaceNeeded <= availableHeight
        
        // If feature doesn't fit, go to next page
        if (!wouldFit && currentY > margin) {
          pdf.addPage()
          currentY = margin
        }
        
        // Add spacing before feature if not first
        if (currentY > margin) {
          currentY += featureSpacing
        }
        
        // Add feature - ensure it's complete
        pdf.addImage(featureCanvas.toDataURL('image/png'), 'PNG', margin, currentY, contentWidth, featureHeight)
        currentY += featureHeight
      }

      // Always start a new page for "Offer Details"
      pdf.addPage()
      currentY = margin

      // Convert and add "Offer Details" title (second h2)
      const allH2s = container.querySelectorAll('h2')
      const offerDetailsTitle = allH2s.length > 1 ? allH2s[1] as HTMLElement : null
      if (offerDetailsTitle) {
        const titleCanvas = await html2canvas(offerDetailsTitle, {
          scale: 2,
          useCORS: true,
          logging: false,
          backgroundColor: '#ffffff',
          allowTaint: false,
        })
        const titleHeight = (titleCanvas.height * contentWidth) / titleCanvas.width
        pdf.addImage(titleCanvas.toDataURL('image/png'), 'PNG', margin, currentY, contentWidth, titleHeight)
        currentY += titleHeight + 12
      }

      // Convert and add pricing section
      const pricingSection = container.querySelector('.pricing') as HTMLElement
      if (pricingSection) {
        const pricingCanvas = await html2canvas(pricingSection, {
          scale: 2,
          useCORS: true,
          logging: false,
          backgroundColor: '#f5f9ff',
          allowTaint: false,
        })
        const pricingHeight = (pricingCanvas.height * contentWidth) / pricingCanvas.width
        
        pdf.addImage(pricingCanvas.toDataURL('image/png'), 'PNG', margin, currentY, contentWidth, pricingHeight)
        currentY += pricingHeight + 12
      }

      // Convert and add shipping rates table if present
      const shippingRatesSection = container.querySelector('.shipping-rates-section') as HTMLElement
      if (shippingRatesSection) {
        const shippingCanvas = await html2canvas(shippingRatesSection, {
          scale: 2,
          useCORS: true,
          logging: false,
          backgroundColor: '#ffffff',
          allowTaint: false,
        })
        const shippingHeight = (shippingCanvas.height * contentWidth) / shippingCanvas.width
        checkPageBreak(shippingHeight)
        pdf.addImage(shippingCanvas.toDataURL('image/png'), 'PNG', margin, currentY, contentWidth, shippingHeight)
        currentY += shippingHeight + 12
      }

      // Convert and add CTA buttons if visible
      const ctaButtons = container.querySelectorAll('.cta-button') as NodeListOf<HTMLElement>
      if (ctaButtons.length > 0) {
        for (const ctaButton of Array.from(ctaButtons)) {
          const ctaCanvas = await html2canvas(ctaButton, {
            scale: 2,
            useCORS: true,
            logging: false,
            backgroundColor: '#ffffff',
            allowTaint: false,
          })
          const ctaHeight = (ctaCanvas.height * contentWidth) / ctaCanvas.width
          checkPageBreak(ctaHeight)
          pdf.addImage(ctaCanvas.toDataURL('image/png'), 'PNG', margin, currentY, contentWidth, ctaHeight)
          currentY += ctaHeight + 10
        }
      }

      // Remove temporary element
      document.body.removeChild(tempDiv)

      // Download PDF
      const fileName = `sendcloud_offer_${pricingValues.clientName || 'offer'}_${new Date().toISOString().split('T')[0]}.pdf`
      pdf.save(fileName)
    } catch (error) {
      console.error("Error generating PDF:", error)
      alert("An error occurred while generating the PDF. Please try again.")
    } finally {
      setIsGeneratingPdf(false)
    }
  }

  const handleFeatureToggle = (featureId: string) => {
    setSelectedFeatures((prev) =>
      prev.includes(featureId) ? prev.filter((id) => id !== featureId) : [...prev, featureId],
    )
  }

  const toggleFeatureExpand = (featureId: string) => {
    setExpandedFeatures((prev) => ({
      ...prev,
      [featureId]: !prev[featureId],
    }))
  }

  const handleFeatureTextChange = (featureId: string, newText: string) => {
    setEditedFeatureTexts((prev) => ({
      ...prev,
      [featureId]: newText,
    }))
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (over && active.id !== over.id) {
      setFeaturesOrder((items) => {
        const oldIndex = items.indexOf(active.id as string)
        const newIndex = items.indexOf(over.id as string)
        return arrayMove(items, oldIndex, newIndex)
      })
    }
  }

  // Componente per feature sortable
  const SortableFeature = ({ feature }: { feature: typeof features[0] }) => {
    const {
      attributes,
      listeners,
      setNodeRef,
      transform,
      transition,
      isDragging,
    } = useSortable({ id: feature.id })

    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
      opacity: isDragging ? 0.5 : 1,
    }

    const isExpanded = expandedFeatures[feature.id]
    const currentText = editedFeatureTexts[feature.id] || feature.text
    const isSelected = selectedFeatures.includes(feature.id)

    return (
      <div
        ref={setNodeRef}
        style={style}
        className={`border border-white/10 rounded-lg p-3 bg-white/5 ${isDragging ? 'z-50' : ''}`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 flex-1">
            <button
              {...attributes}
              {...listeners}
              className="text-white/40 hover:text-white/80 cursor-grab active:cursor-grabbing p-1"
              title="Drag to reorder"
            >
              <GripVertical className="h-5 w-5" />
            </button>
            <label className="flex items-center space-x-3 text-white cursor-pointer flex-1">
              <input
                type="checkbox"
                className="accent-[#3db4d2] h-5 w-5"
                checked={isSelected}
                onChange={() => handleFeatureToggle(feature.id)}
              />
              <span className="font-medium">{feature.title}</span>
            </label>
          </div>
          <button
            type="button"
            onClick={() => toggleFeatureExpand(feature.id)}
            className="text-[#3db4d2] hover:text-white transition-colors p-1"
            title={isExpanded ? t('collapseFeature') : t('expandFeature')}
          >
            {isExpanded ? (
              <ChevronUp className="h-5 w-5" />
            ) : (
              <ChevronDown className="h-5 w-5" />
            )}
          </button>
        </div>
        {isExpanded && (
          <div className="mt-4 pt-4 border-t border-white/10">
            <div className="flex items-center gap-2 mb-2">
              <Edit2 className="h-4 w-4 text-[#3db4d2]" />
              <Label className="text-white/80 text-sm">{t('editFeatureText')}</Label>
            </div>
            <textarea
              value={currentText}
              onChange={(e) => handleFeatureTextChange(feature.id, e.target.value)}
              className="w-full min-h-[120px] p-3 border border-gray-300 rounded-md resize-vertical bg-white text-gray-900"
              rows={5}
              placeholder={feature.text}
            />
            <p className="text-xs text-white/60 mt-2">
              {currentText === feature.text ? "Using default text" : "Text modified"}
            </p>
          </div>
        )}
      </div>
    )
  }

  const handlePricingChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, key: string) => {
    setPricingValues((prev) => ({ ...prev, [key]: e.target.value }))
  }

  const handlePlanChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const plan = e.target.value
    if (plan === "custom-monthly" || plan === "custom-yearly") {
      // Per i piani custom, nascondi showMonthly e showAnnual
      setPricingValues((prev) => ({
        ...prev,
        selectedPlan: plan,
        showMonthly: false,
        showAnnual: false,
      }))
    } else {
      // Per i piani standard, mantieni la logica esistente
      const planKey = plan as keyof typeof standardPlans
      const planData = standardPlans[planKey]
      setPricingValues((prev) => {
        // Se solo annuale è selezionato, usa perLabelAnnual
        // Altrimenti usa perLabel mensile
        const newPerLabelFee = (!prev.showMonthly && prev.showAnnual)
          ? planData.perLabelAnnual.toFixed(2)
          : planData.perLabel.toFixed(2)
        return {
          ...prev,
          selectedPlan: plan,
          perLabelFee: newPerLabelFee,
        }
      })
      setSelectedFeatures(getDefaultFeatureIds(planKey))
    }
  }

  const handleShowMonthlyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const showMonthly = e.target.checked
    setPricingValues((prev) => {
      const planData = standardPlans[prev.selectedPlan as keyof typeof standardPlans]
      // Se solo mensile è selezionato, usa perLabel mensile
      // Se entrambi sono selezionati, mantieni perLabel mensile (per il blocco mensile)
      const newPerLabelFee = (!showMonthly && prev.showAnnual)
        ? planData.perLabelAnnual.toFixed(2)  // Solo annuale selezionato
        : planData.perLabel.toFixed(2)        // Mensile selezionato (o entrambi)
      return {
        ...prev,
        showMonthly,
        perLabelFee: newPerLabelFee,
      }
    })
  }

  const handleShowAnnualChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const showAnnual = e.target.checked
    setPricingValues((prev) => {
      const planData = standardPlans[prev.selectedPlan as keyof typeof standardPlans]
      // Se solo annuale è selezionato, usa perLabelAnnual
      // Se entrambi sono selezionati, usa perLabel mensile (per il blocco mensile)
      const newPerLabelFee = (!prev.showMonthly && showAnnual)
        ? planData.perLabelAnnual.toFixed(2)  // Solo annuale selezionato
        : planData.perLabel.toFixed(2)        // Mensile selezionato (o entrambi)
      return {
        ...prev,
        showAnnual,
        perLabelFee: newPerLabelFee,
      }
    })
  }

  const handleSpecialOfferToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked
    setPricingValues((prev) => ({
      ...prev,
      isSpecialOffer: isChecked,
    }))
  }

  return (
    <div className="container mx-auto p-4 md:p-8 lg:p-12 bg-[#0a1e4d] min-h-screen relative">
      {/* Loading overlay when generating PDF */}
      {isGeneratingPdf && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-[#152b63] rounded-lg p-8 shadow-xl border border-[#3db4d2]/30">
            <div className="flex flex-col items-center gap-4">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#3db4d2]"></div>
              <p className="text-white text-lg font-semibold">Generating PDF...</p>
              <p className="text-white/70 text-sm">Please wait</p>
            </div>
          </div>
        </div>
      )}
      <h1 className="text-3xl md:text-4xl font-bold mb-4 text-white">{t('title')}</h1>
      <p className="text-lg text-white/80">
        {t('subtitle')}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        <Card className="bg-[#152b63]">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-[#3db4d2]">{t('customizeOfferDetails')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4">
              <h3 className="text-lg font-semibold mb-4 text-white">{t('clientData')}</h3>
              <div className="flex flex-col gap-2">
                <Label htmlFor="clientName" className="text-white">
                  {t('clientName')}
                </Label>
                <Input
                  id="clientName"
                  placeholder="Company name"
                  value={pricingValues.clientName}
                  onChange={(e) => handlePricingChange(e, "clientName")}
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="clientEmail" className="text-white">
                  {t('clientEmail')}
                </Label>
                <Input
                  id="clientEmail"
                  placeholder="email@company.com"
                  value={pricingValues.clientEmail}
                  onChange={(e) => handlePricingChange(e, "clientEmail")}
                />
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="whatsappNumber" className="text-white">
                  {t('yourWhatsappNumber')} {t('optional')}
                </Label>
                <Input
                  id="whatsappNumber"
                  placeholder="393123456789"
                  value={pricingValues.whatsappNumber}
                  onChange={(e) => handlePricingChange(e, "whatsappNumber")}
                />
                <p className="text-xs text-white/60">{t('enterWithPrefix')}</p>
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="meetingLink" className="text-white">
                  {t('yourMeetingLink')} {t('optional')}
                </Label>
                <Input
                  id="meetingLink"
                  type="url"
                  placeholder="https://calendly.com/your-link"
                  value={pricingValues.meetingLink}
                  onChange={(e) => handlePricingChange(e, "meetingLink")}
                />
                <p className="text-xs text-white/60">{t('enterMeetingLink')}</p>
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="offerExpiryDate" className="text-white">
                  {t('offerExpiryDate')}
                </Label>
                <Input
                  id="offerExpiryDate"
                  type="date"
                  value={pricingValues.offerExpiryDate}
                  onChange={(e) => handlePricingChange(e, "offerExpiryDate")}
                />
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="introduction" className="text-white">
                  {t('introduction')}
                </Label>
                <textarea
                  id="introduction"
                  placeholder={t('addIntroduction')}
                  value={pricingValues.introduction}
                  onChange={(e) => handlePricingChange(e, "introduction")}
                  className="min-h-[100px] p-3 border border-gray-300 rounded-md resize-vertical"
                  rows={4}
                />
              </div>

              <div className="flex flex-col gap-4">
                <Label className="text-white text-lg font-semibold">{t('pricingStructure')}</Label>

                <div className="flex flex-col gap-2">
                  <Label htmlFor="selectedPlan" className="text-white">
                    {t('selectPlan')}
                  </Label>
                  <select
                    id="selectedPlan"
                    value={pricingValues.selectedPlan}
                    onChange={handlePlanChange}
                    className="p-2 border border-gray-300 rounded-md bg-white text-gray-900"
                  >
                    <option value="lite">Lite</option>
                    <option value="growth">Growth</option>
                    <option value="premium">Premium</option>
                    <option value="pro">Pro</option>
                    <option value="custom-monthly">{t('customMonthly')}</option>
                    <option value="custom-yearly">{t('customYearly')}</option>
                  </select>
                </div>

                {(pricingValues.selectedPlan !== "custom-monthly" && pricingValues.selectedPlan !== "custom-yearly") && (
                  <div className="flex flex-col gap-3">
                    <Label className="text-white">{t('showPricing')}</Label>
                    
                    <label className="flex items-center space-x-3 text-white cursor-pointer">
                      <input
                        type="checkbox"
                        checked={pricingValues.showMonthly}
                        onChange={handleShowMonthlyChange}
                        className="accent-[#3db4d2] h-4 w-4"
                      />
                      <span>{t('showMonthly')} (€{standardPlans[pricingValues.selectedPlan as keyof typeof standardPlans].monthly}/month)</span>
                    </label>

                    <label className="flex items-center space-x-3 text-white cursor-pointer">
                      <input
                        type="checkbox"
                        checked={pricingValues.showAnnual}
                        onChange={handleShowAnnualChange}
                        className="accent-[#3db4d2] h-4 w-4"
                      />
                      <span>{t('showAnnual')} (€{standardPlans[pricingValues.selectedPlan as keyof typeof standardPlans].annual}/year)</span>
                    </label>
                  </div>
                )}

                {(pricingValues.selectedPlan === "custom-monthly" || pricingValues.selectedPlan === "custom-yearly") && (
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                      <Label htmlFor={pricingValues.selectedPlan === "custom-monthly" ? "customMonthlyFee" : "customAnnualFee"} className="text-white">
                        {pricingValues.selectedPlan === "custom-monthly" ? t('monthlyFee') : t('annualFee')}
                      </Label>
                      <Input
                        id={pricingValues.selectedPlan === "custom-monthly" ? "customMonthlyFee" : "customAnnualFee"}
                        type="number"
                        step="0.01"
                        placeholder={pricingValues.selectedPlan === "custom-monthly" ? "35.00" : "336.00"}
                        value={pricingValues.selectedPlan === "custom-monthly" ? pricingValues.customMonthlyFee : pricingValues.customAnnualFee}
                        onChange={(e) => handlePricingChange(e, pricingValues.selectedPlan === "custom-monthly" ? "customMonthlyFee" : "customAnnualFee")}
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <Label htmlFor="customPerLabelFee" className="text-white">
                        {t('costPerLabel')}
                      </Label>
                      <Input
                        id="customPerLabelFee"
                        type="number"
                        step="0.01"
                        placeholder="0.10"
                        value={pricingValues.customPerLabelFee}
                        onChange={(e) => handlePricingChange(e, "customPerLabelFee")}
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <Label htmlFor="customWhatsappCost" className="text-white">
                        {t('whatsappCostPerMessage')}
                      </Label>
                      <Input
                        id="customWhatsappCost"
                        type="number"
                        step="0.01"
                        placeholder="0.10"
                        value={pricingValues.customWhatsappCost}
                        onChange={(e) => handlePricingChange(e, "customWhatsappCost")}
                      />
                    </div>
                  </div>
                )}

                {(pricingValues.showMonthly || pricingValues.showAnnual) ? (
                  <div className="flex flex-col gap-2">
                    <Label className="text-white">
                      {t('costPerLabel')}
                    </Label>
                    <div className="bg-[#0c2a6a] border border-[#3db4d2]/30 rounded-lg p-3">
                      {pricingValues.showMonthly && pricingValues.showAnnual ? (
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-white/80 text-sm">Mensile:</span>
                            <span className="text-white font-semibold">€{standardPlans[pricingValues.selectedPlan as keyof typeof standardPlans].perLabel.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-white/80 text-sm">Annuale:</span>
                            <span className="text-white font-semibold">€{standardPlans[pricingValues.selectedPlan as keyof typeof standardPlans].perLabelAnnual.toFixed(2)}</span>
                          </div>
                        </div>
                      ) : pricingValues.showMonthly ? (
                        <div className="flex justify-between items-center">
                          <span className="text-white/80 text-sm">Mensile:</span>
                          <span className="text-white font-semibold">€{standardPlans[pricingValues.selectedPlan as keyof typeof standardPlans].perLabel.toFixed(2)}</span>
                        </div>
                      ) : (
                        <div className="flex justify-between items-center">
                          <span className="text-white/80 text-sm">Annuale:</span>
                          <span className="text-white font-semibold">€{standardPlans[pricingValues.selectedPlan as keyof typeof standardPlans].perLabelAnnual.toFixed(2)}</span>
                        </div>
                      )}
                    </div>
                    <p className="text-xs text-white/60">Valore automatico basato sul piano selezionato</p>
                  </div>
                ) : (
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="perLabelFee" className="text-white">
                      {t('costPerLabel')}
                    </Label>
                    <Input
                      id="perLabelFee"
                      type="number"
                      step="0.01"
                      placeholder="0.10"
                      value={pricingValues.perLabelFee}
                      onChange={(e) => handlePricingChange(e, "perLabelFee")}
                    />
                  </div>
                )}

                <div className="flex flex-col gap-2">
                  <Label htmlFor="whatsappCost" className="text-white">
                    {t('whatsappCostPerMessage')}
                  </Label>
                  <Input
                    id="whatsappCost"
                    type="number"
                    step="0.01"
                    placeholder="0.14"
                    value={pricingValues.whatsappCost}
                    onChange={(e) => handlePricingChange(e, "whatsappCost")}
                  />
                </div>

                <div className="flex flex-col gap-2 mt-4">
                  <Label htmlFor="shippingRates" className="text-white">
                    {t('shippingRates')} {t('optional')}
                  </Label>
                  <Textarea
                    id="shippingRates"
                    placeholder="PDB Standard	0-2	5,37	5,66	4,42	1,06&#10;PDB Standard	2-5	6,18	6,48	5,18	1,18&#10;PDB Standard	5-10	8,02	8,24	6,72	1,34"
                    value={pricingValues.shippingRates}
                    onChange={(e) => handlePricingChange(e, "shippingRates")}
                    className="min-h-[120px] p-3 border border-gray-300 rounded-md resize-vertical bg-white text-gray-900 font-mono text-sm"
                    rows={6}
                  />
                  <p className="text-xs text-white/60">{t('shippingRatesHint')}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#152b63]">
          <CardHeader>
            <h2 className="text-xl font-bold mb-4 text-[#3db4d2]">{t('selectFeatures')}</h2>
          </CardHeader>
          <CardContent>
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={featuresOrder}
                strategy={verticalListSortingStrategy}
              >
                <div className="flex flex-col gap-4">
                  {featuresOrder.map((featureId) => {
                    const feature = features.find((f) => f.id === featureId)
                    if (!feature) return null
                    return <SortableFeature key={feature.id} feature={feature} />
                  })}
                </div>
              </SortableContext>
            </DndContext>
          </CardContent>
        </Card>

        <Card className="bg-[#152b63]">
          <CardHeader>
            <h2 className="text-xl font-bold mb-6 text-[#3db4d2]">{t('offerSummary')}</h2>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-3">
                <User className="h-5 w-5 text-[#3db4d2]" />
                <div>
                  <p className="text-white/60 text-sm">{t('client')}</p>
                  <p className="text-white font-semibold">{pricingValues.clientName || "Not specified"}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Euro className="h-5 w-5 text-[#3db4d2] mt-1" />
                <div>
                  <p className="text-white/60 text-sm">{t('pricing')}</p>
                  <div className="text-white">
                    {pricingValues.selectedPlan === "custom-monthly" ? (
                      <>
                        <span className="font-semibold block">€{pricingValues.customMonthlyFee || "0"}/month</span>
                        {pricingValues.customMonthlyFee && pricingValues.customPerLabelFee && pricingValues.customWhatsappCost && (
                          <>
                            <span className="block text-sm">+ €{pricingValues.customPerLabelFee}/label</span>
                            <span className="block text-sm">+ €{pricingValues.customWhatsappCost}/WhatsApp message</span>
                          </>
                        )}
                      </>
                    ) : pricingValues.selectedPlan === "custom-yearly" ? (
                      <>
                        <span className="font-semibold block">€{pricingValues.customAnnualFee || "0"}/year</span>
                        {pricingValues.customAnnualFee && pricingValues.customPerLabelFee && pricingValues.customWhatsappCost && (
                          <>
                            <span className="block text-sm">+ €{pricingValues.customPerLabelFee}/label</span>
                            <span className="block text-sm">+ €{pricingValues.customWhatsappCost}/WhatsApp message</span>
                          </>
                        )}
                      </>
                    ) : pricingValues.showMonthly && pricingValues.showAnnual ? (
                      <>
                        <span className="font-semibold block">€{standardPlans[pricingValues.selectedPlan as keyof typeof standardPlans].monthly}/month</span>
                        <span className="font-semibold block">€{standardPlans[pricingValues.selectedPlan as keyof typeof standardPlans].annual}/year</span>
                      </>
                    ) : pricingValues.showMonthly ? (
                      <span className="font-semibold">€{standardPlans[pricingValues.selectedPlan as keyof typeof standardPlans].monthly}/month</span>
                    ) : pricingValues.showAnnual ? (
                      <span className="font-semibold">€{standardPlans[pricingValues.selectedPlan as keyof typeof standardPlans].annual}/year</span>
                    ) : (
                      <span className="text-white/60">{t('noPricingSelected')}</span>
                    )}
                    {(pricingValues.showMonthly || pricingValues.showAnnual) && (
                      <>
                        <span className="block text-sm">+ €{pricingValues.perLabelFee}/label</span>
                        <span className="block text-sm">+ €{pricingValues.whatsappCost}/WhatsApp message</span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {pricingValues.whatsappNumber && (
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-[#3db4d2]" />
                  <div>
                    <p className="text-white/60 text-sm">{t('whatsapp')}</p>
                    <p className="text-white font-semibold">+{pricingValues.whatsappNumber}</p>
                  </div>
                </div>
              )}

              {pricingValues.meetingLink && (
                <div className="flex items-center gap-3">
                  <Video className="h-5 w-5 text-[#3db4d2]" />
                  <div>
                    <p className="text-white/60 text-sm">{t('meetingLink')}</p>
                    <a href={pricingValues.meetingLink} target="_blank" rel="noopener noreferrer" className="text-white font-semibold hover:text-[#3db4d2] underline">
                      {t('bookMeeting')}
                    </a>
                  </div>
                </div>
              )}

              {pricingValues.offerExpiryDate && (
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-[#3db4d2]" />
                  <div>
                    <p className="text-white/60 text-sm">{t('offerExpires')}</p>
                    <p className="text-white font-semibold">
                      {new Date(pricingValues.offerExpiryDate).toLocaleDateString("en-US")}
                    </p>
                  </div>
                </div>
              )}

              <div className="flex items-center gap-3">
                <Tag className="h-5 w-5 text-[#3db4d2]" />
                <div>
                  <p className="text-white/60 text-sm">{t('featuresIncluded')}</p>
                  <p className="text-white font-semibold">
                    {t('ofFeatures', { selected: selectedFeatures.length, total: features.length })}
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-3 mt-6">
                <Button
                  onClick={handleDownloadPdf}
                  disabled={isGeneratingPdf}
                  className="bg-[#3db4d2] hover:bg-[#2a8ca6] text-white flex items-center gap-2 disabled:opacity-50"
                >
                  {isGeneratingPdf ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      Generating PDF...
                    </>
                  ) : (
                    <>
                      <FileText className="h-4 w-4" />
                      {t('downloadPdf')}
                    </>
                  )}
                </Button>
                <Button
                  onClick={handleDownloadHtml}
                  variant="outline"
                  className="border-[#3db4d2] text-[#3db4d2] hover:bg-[#3db4d2] hover:text-white flex items-center gap-2 bg-transparent"
                >
                  <Download className="h-4 w-4" />
                  {t('downloadHtmlForEmail')}
                </Button>
                <Button
                  onClick={handleCopyToClipboard}
                  variant="outline"
                  className="border-[#3db4d2] text-[#3db4d2] hover:bg-[#3db4d2] hover:text-white flex items-center gap-2 bg-transparent"
                >
                  <Copy className="h-4 w-4" />
                  {t('copyToClipboard')}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
