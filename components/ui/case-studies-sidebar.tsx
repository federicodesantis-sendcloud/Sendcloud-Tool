"use client"
import { useTranslations, useLocale } from 'next-intl'
import { Link } from '@/i18n/routing'
import {
  ChevronDown,
  FileText,
  Dog,
  Factory,
  Gem,
  Home,
  Menu,
  Palette,
  Pill,
  Shirt,
  User2,
  Truck,
  RefreshCcw,
  CreditCard,
  Calculator,
  Headphones,
  Percent,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from "@/components/ui/sidebar"

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

export function CaseStudiesSidebar() {
  const { toggleSidebar } = useSidebar()
  const t = useTranslations('sidebar')
  const locale = useLocale()

  // Support Automation links by locale
  const supportAutomationLinks: Record<string, string> = {
    it: 'https://sendcloud.navattic.com/hmi02zr?lang=it',
    nl: 'https://sendcloud.navattic.com/hmi02zr?lang=nl',
    fr: 'https://sendcloud.navattic.com/hmi02zr?lang=fr',
    de: 'https://sendcloud.navattic.com/hmi02zr?lang=de',
    es: 'https://sendcloud.navattic.com/hmi02zr?lang=es',
    en: 'https://sendcloud.navattic.com/hmi02zr?lang=en',
  }

  const supportAutomationUrl = supportAutomationLinks[locale] || supportAutomationLinks['en']

  const categories = [
    {
      titleKey: "animals",
      icon: Dog,
      items: [
        {
          title: "Coral Bay",
          url: "/coral-bay",
        },
      ],
    },
    {
      titleKey: "pharmacy",
      icon: Pill,
      items: [
        {
          title: "Cura Farma",
          url: "/cura-farma",
        },
      ],
    },
    {
      titleKey: "fashion",
      icon: Shirt,
      items: [
        {
          title: "Augusto Abbigliamento",
          url: "/augusto-abbigliamento",
        },
        {
          title: "La Scarpologa",
          url: "/la-scarpologa",
        },
      ],
    },
    {
      titleKey: "jewelry",
      icon: Gem,
      items: [
        {
          title: "Ivan Basile",
          url: "/ivan-basile",
        },
      ],
    },
    {
      titleKey: "hobby",
      icon: Palette,
      items: [
        {
          title: "Coltelleria Store",
          url: "/coltelleria-store",
        },
      ],
    },
    {
      titleKey: "industry",
      icon: Factory,
      items: [
        {
          title: "Rossi Ricambi",
          url: "/rossi-ricambi",
        },
      ],
    },
  ]

  return (
    <Sidebar variant="sidebar" collapsible="icon" className="bg-[#0a1e4d] border-r-2 border-[#3db4d2]/30 text-white">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={toggleSidebar}
                  tooltip="Expand/Collapse"
                  className="text-white hover:bg-[#0c2a6a] hover:text-white"
                >
                  <Menu className="text-white" />
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip={t('home')} className="text-white hover:bg-[#0c2a6a] hover:text-white">
                  <Link href="/">
                    <Home className="text-white" />
                    <span>{t('home')}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-[#3db4d2]">{t('categories')}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {categories.map((category) => {
                const categoryTitle = t(category.titleKey)
                return (
                  <SidebarMenuItem key={category.titleKey}>
                    {category.items.length > 0 ? (
                      <Collapsible className="w-full">
                        <CollapsibleTrigger className="w-full">
                          <SidebarMenuButton
                            tooltip={categoryTitle}
                            className="w-full text-white hover:bg-[#0c2a6a] hover:text-white"
                          >
                            <category.icon className="text-white" />
                            <span>{categoryTitle}</span>
                            <ChevronDown className="ml-auto h-4 w-4 shrink-0 transition-transform duration-200 group-data-[state=open]:rotate-180 text-white" />
                          </SidebarMenuButton>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <SidebarMenuSub>
                            {category.items.map((item) => (
                              <SidebarMenuSubItem key={item.title}>
                                <SidebarMenuSubButton asChild className="text-white hover:bg-[#0c2a6a] hover:text-white">
                                  <Link href={item.url}>{item.title}</Link>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            ))}
                          </SidebarMenuSub>
                        </CollapsibleContent>
                      </Collapsible>
                    ) : (
                      <SidebarMenuButton
                        tooltip={categoryTitle}
                        className="text-white hover:bg-[#0c2a6a] hover:text-white"
                      >
                        <category.icon className="text-white" />
                        <span>{categoryTitle}</span>
                      </SidebarMenuButton>
                    )}
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              tooltip={t('whatsappCalculator')}
              className="text-white hover:bg-[#0c2a6a] hover:text-white"
            >
              <Link href="/review-calculator">
                <Calculator className="text-white" />
                <span>{t('whatsappCalculator')}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip={t('pricing')} className="text-white hover:bg-[#0c2a6a] hover:text-white">
              <Link href="/pricing">
                <CreditCard className="text-white" />
                <span>{t('pricing')}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              tooltip={t('returnsPortal')}
              className="text-white hover:bg-[#0c2a6a] hover:text-white"
            >
              <Link href="https://plant.shipping-portal.com/rp/items" target="_blank" rel="noopener noreferrer">
                <RefreshCcw className="text-white" />
                <span>{t('returnsPortal')}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              tooltip={t('trackingPage')}
              className="text-white hover:bg-[#0c2a6a] hover:text-white"
            >
              <Link href="/tracking-page">
                <Truck className="text-white" />
                <span>{t('trackingPage')}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              tooltip={t('createQuote')}
              className="text-white hover:bg-[#0c2a6a] hover:text-white"
            >
              <Link href="/preventivi/crea-offerta">
                <FileText className="text-white" />
                <span>{t('createQuote')}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              tooltip={t('supportAutomation')}
              className="text-white hover:bg-[#0c2a6a] hover:text-white"
            >
              <a href={supportAutomationUrl} target="_blank" rel="noopener noreferrer">
                <Headphones className="text-white" />
                <span>{t('supportAutomation')}</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              tooltip={t('discountCalculator')}
              className="text-white hover:bg-[#0c2a6a] hover:text-white"
            >
              <a href="https://prod.dnbgs18fjl3ig.amplifyapp.com/" target="_blank" rel="noopener noreferrer">
                <Percent className="text-white" />
                <span>{t('discountCalculator')}</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip={t('sendcloudAdmin')} className="text-white hover:bg-[#0c2a6a] hover:text-white">
              <Link
                href="https://eu-central-1-0.app.sendcloud.com/admin-ng/users/user/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <User2 className="text-white" />
                <span>{t('sendcloudAdmin')}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
