"use client"

import React from "react"
import { ChevronUp, CircleFadingPlus, Menu, MessageCircle, Phone, Settings, User2 } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  useSidebar,
} from "@/components/ui/sidebar"

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

function SidebarComponent() {
  const [open, setOpen] = React.useState(false)
  const items = [
    {
      title: "Messages",
      url: "#",
      icon: MessageCircle,
    },
    {
      title: "Phone",
      url: "#",
      icon: Phone,
    },
    {
      title: "Status",
      url: "#",
      icon: CircleFadingPlus,
    },
  ]
  const { toggleSidebar } = useSidebar()
  return (
    <Sidebar open={open} onOpenChange={setOpen} variant="floating" collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigate</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={toggleSidebar} asChild>
                  <span>
                    <Menu />
                  </span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <Settings /> Settings
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <User2 /> Manoj Rayi
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent side="top" className="w-[--radix-popper-anchor-width]">
                <DropdownMenuItem>
                  <a href="https://github.com/rayimanoj8/">Account</a>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Back Up</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}

export function AppSidebar() {
  return (
    <SidebarProvider>
      <SidebarComponent />
      <SidebarInset>
        <div className="p-4">
          <h1 className="text-2xl font-bold">Main Content</h1>
          <p className="mt-2">This is where your main content would go.</p>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
