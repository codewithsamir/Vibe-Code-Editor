import {SidebarProvider } from '@/components/ui/sidebar'
import { getAllPlaygroundForUser } from '@/modules/dashboard/actions'
import { DashboardSidebar } from '@/modules/dashboard/components/DashboardSidebar'
import { get } from 'http'
import React from 'react'

const DashboardLayout = async ({children}:{children: React.ReactNode}) => {
const playgrounddata = await getAllPlaygroundForUser()

const technologyIconMap: Record<string, string> = {
  // --- Frontend / Fullstack (Node.js-based) ---
  REACT: "Braces",        // React → JSX / code
  NEXTJS: "Lightbulb",    // Next.js → ideas / innovation
  REMIX: "Rocket",        // Remix → fast & modern
  VUE: "Compass",         // Vue → direction / structure
  ANGULAR: "Layers",      // Angular → modular / layered
  SVELTE: "FlameIcon",    // Svelte → burns boilerplate
  NUXT: "FolderPlus",     // Nuxt → pages / routing

  // --- Backend / API (Node.js-based) ---
  EXPRESS: "Server",      // Express → classic server
  NESTJS: "LayoutDashboard", // NestJS → modular / dashboard-like
  FASTIFY: "Zap",         // Fastify → speed / lightning
  HONO: "FlameIcon",      // Hono → lightweight / fast
  }

  const formattedPlaygroundData = playgrounddata.map((item) => ({
   id:item.id,
   name:item.title,
   //todo :star
    starred:item.Starmark?.[0]?.isMarked || false,
   icon : technologyIconMap[item.template] || "Code2",
  })) || [];

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full overflow-x-hidden">
        {/* <Sidebar /> */}
        <DashboardSidebar initialPlaygroundData={formattedPlaygroundData}/>
        <main className="flex-1">{children}</main>
      </div>
    </SidebarProvider>
  )
}



export default DashboardLayout