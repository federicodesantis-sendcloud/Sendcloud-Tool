import type React from "react"
import "../globals.css"
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing'
import Navbar from "@/components/navbar"
import { CaseStudiesSidebar } from "@/components/ui/case-studies-sidebar"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import Script from "next/script"

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  
  if (!routing.locales.includes(locale as any)) {
    notFound()
  }

  const messages = await getMessages()

  return (
    <html lang={locale}>
      <body className="font-aeonik">
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-3C4YVXETNW" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-3C4YVXETNW');
          `}
        </Script>
        <NextIntlClientProvider messages={messages}>
          <SidebarProvider defaultOpen={true}>
            <CaseStudiesSidebar />
            <SidebarInset>
              <Navbar />
              {children}
            </SidebarInset>
          </SidebarProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
