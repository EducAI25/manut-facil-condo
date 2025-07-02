
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
  SidebarHeader,
} from "@/components/ui/sidebar";
import {
  Home,
  Package,
  Wrench,
  Users,
  BarChart3,
  MapPin,
  DollarSign,
  User,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const menuItems = [
  {
    title: "Dashboard",
    url: "/",
    icon: Home,
  },
  {
    title: "Ativos",
    url: "/assets",
    icon: Package,
  },
  {
    title: "Manutenções",
    url: "/maintenance",
    icon: Wrench,
  },
  {
    title: "Fornecedores",
    url: "/suppliers",
    icon: Users,
  },
  {
    title: "Financeiro",
    url: "/financial",
    icon: DollarSign,
  },
  {
    title: "Áreas Comuns",
    url: "/common-areas",
    icon: MapPin,
  },
  {
    title: "Relatórios",
    url: "/reports",
    icon: BarChart3,
  },
];

export function AppSidebar() {
  const location = useLocation();

  return (
    <Sidebar>
      <SidebarHeader className="border-b border-sidebar-border p-4">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 bg-gradient-primary rounded-lg flex items-center justify-center shadow-sm">
            <span className="text-lg">🫐</span>
          </div>
          <div>
            <h2 className="font-semibold text-sidebar-foreground">Mirtilo</h2>
            <p className="text-xs text-sidebar-foreground/70">Gestão de Condomínios</p>
          </div>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navegação</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={location.pathname === item.url}
                    className="w-full justify-start"
                  >
                    <Link to={item.url} className="flex items-center gap-3">
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border p-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link to="/profile" className="flex items-center gap-3">
                <User className="h-4 w-4" />
                <span>Perfil</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
