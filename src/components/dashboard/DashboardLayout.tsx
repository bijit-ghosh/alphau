
import React, { useState } from "react";
import { 
  Sidebar, 
  SidebarContent, 
  SidebarFooter, 
  SidebarGroup, 
  SidebarGroupContent, 
  SidebarGroupLabel, 
  SidebarHeader, 
  SidebarMenu, 
  SidebarMenuButton, 
  SidebarMenuItem, 
  SidebarProvider, 
  SidebarTrigger, 
  useSidebar 
} from "@/components/ui/sidebar";
import { 
  BarChart3, 
  PieChart, 
  LineChart, 
  Activity, 
  AlertTriangle, 
  TrendingUp, 
  TrendingDown, 
  Settings, 
  Home, 
  GanttChart
} from "lucide-react";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [currentSection, setCurrentSection] = useState("home");

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <DashboardSidebar currentSection={currentSection} setCurrentSection={setCurrentSection} />
        <main className="flex-1 ml-[70px] lg:ml-[250px] p-6 bg-alpha-navy min-h-screen transition-all">
          <SidebarTrigger />
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}

interface DashboardSidebarProps {
  currentSection: string;
  setCurrentSection: (section: string) => void;
}

function DashboardSidebar({ currentSection, setCurrentSection }: DashboardSidebarProps) {
  const menuItems = [
    { id: "home", title: "Dashboard", icon: Home },
    { id: "performance", title: "Performance", icon: Activity },
    { id: "trends", title: "Market Trends", icon: TrendingUp },
    { id: "risks", title: "Risk Analysis", icon: AlertTriangle },
    { id: "comparison", title: "Comparison", icon: BarChart3 },
    { id: "efficiency", title: "Efficiency", icon: PieChart },
    { id: "innovation", title: "Innovation", icon: GanttChart },
    { id: "settings", title: "Settings", icon: Settings },
  ];

  return (
    <Sidebar>
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Main</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton 
                    active={currentSection === item.id}
                    onClick={() => {
                      setCurrentSection(item.id);
                      const element = document.getElementById(item.id);
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                  >
                    <item.icon className="mr-2" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
