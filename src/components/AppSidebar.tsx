import { useState } from "react";
import { 
  LayoutDashboard, 
  Settings, 
  Package, 
  Wrench, 
  Users, 
  FileText, 
  Calendar,
  Building2,
  TrendingUp,
  AlertCircle
} from "lucide-react";
import { NavLink } from "react-router-dom";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const menuItems = [
  { 
    title: "Dashboard", 
    url: "/", 
    icon: LayoutDashboard,
    description: "Visão geral"
  },
  { 
    title: "Ativos", 
    url: "/assets", 
    icon: Package,
    description: "Equipamentos"
  },
  { 
    title: "Manutenções", 
    url: "/maintenance", 
    icon: Wrench,
    description: "Preventiva/Corretiva"
  },
  { 
    title: "Fornecedores", 
    url: "/suppliers", 
    icon: Users,
    description: "Contatos"
  },
  { 
    title: "Relatórios", 
    url: "/reports", 
    icon: FileText,
    description: "Analytics"
  },
  { 
    title: "Áreas Comuns", 
    url: "/common-areas", 
    icon: Calendar,
    description: "Agendamentos"
  },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";

  const getNavClasses = (isActive: boolean) =>
    `group relative overflow-hidden ${
      isActive 
        ? "bg-gradient-primary text-primary-foreground shadow-glow" 
        : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
    } transition-all duration-200`;

  return (
    <Sidebar
      className={`${collapsed ? "w-16" : "w-72"} transition-all duration-300 border-r border-border bg-gradient-dark backdrop-blur-sm`}
      collapsible="icon"
    >
      <SidebarContent className="p-4">
        {/* Logo/Brand */}
        {!collapsed && (
          <div className="mb-8 p-4 bg-gradient-card rounded-xl border border-border shadow-card">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-gradient-primary rounded-lg flex items-center justify-center shadow-glow">
                <Building2 className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-foreground">CondoManager</h2>
                <p className="text-xs text-muted-foreground">Gestão Profissional</p>
              </div>
            </div>
          </div>
        )}

        <SidebarGroup>
          {!collapsed && (
            <SidebarGroupLabel className="text-xs font-semibold text-primary uppercase tracking-wider mb-4">
              Menu Principal
            </SidebarGroupLabel>
          )}

          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      end
                      className={({ isActive }) => getNavClasses(isActive)}
                    >
                      {({ isActive }) => (
                        <>
                          <item.icon className={`${collapsed ? "h-5 w-5" : "h-5 w-5 mr-3"} flex-shrink-0`} />
                          {!collapsed && (
                            <div className="flex-1 min-w-0">
                              <div className="font-medium">{item.title}</div>
                              <div className="text-xs opacity-75">{item.description}</div>
                            </div>
                          )}
                          {isActive && !collapsed && (
                            <div className="absolute right-2 h-2 w-2 bg-primary-foreground rounded-full animate-glow-pulse" />
                          )}
                        </>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Status Section */}
        {!collapsed && (
          <div className="mt-8 p-4 bg-gradient-card rounded-xl border border-border shadow-card">
            <div className="flex items-center gap-3 mb-3">
              <TrendingUp className="h-4 w-4 text-success" />
              <span className="text-sm font-medium text-foreground">Status Geral</span>
            </div>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Ativos ativos</span>
                <span className="text-success font-medium">24</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Pendências</span>
                <span className="text-warning font-medium">3</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Urgentes</span>
                <span className="text-destructive font-medium">1</span>
              </div>
            </div>
          </div>
        )}
      </SidebarContent>
    </Sidebar>
  );
}