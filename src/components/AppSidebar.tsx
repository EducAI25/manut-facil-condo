import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
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
import BlueberryLogo from '@/assets/blueberry-logo.svg';

const menuItems = [
  {
    title: "Dashboard",
    url: "/",
    icon: Home,
    description: "Visão geral do sistema"
  },
  {
    title: "Ativos",
    url: "/assets",
    icon: Package,
    description: "Gerenciar bens do condomínio"
  },
  {
    title: "Manutenções",
    url: "/maintenance",
    icon: Wrench,
    description: "Chamados e manutenções"
  },
  {
    title: "Fornecedores",
    url: "/suppliers",
    icon: Users,
    description: "Cadastro de fornecedores"
  },
  {
    title: "Áreas Comuns",
    url: "/common-areas",
    icon: MapPin,
    description: "Reservas e áreas comuns"
  },
  {
    title: "Financeiro",
    url: "/financial",
    icon: DollarSign,
    description: "Controle financeiro"
  },
  {
    title: "Relatórios",
    url: "/reports",
    icon: BarChart3,
    description: "Relatórios e análises"
  },
];

export function AppSidebar() {
  const location = useLocation();

  return (
    <Sidebar>
      <SidebarHeader className="border-b border-sidebar-border p-4">
        <div className="flex items-center gap-4">
          <span className="flex items-center justify-center">
            <img src={BlueberryLogo} alt="Logo Mirtilo" className="w-14 h-14" />
          </span>
          <div>
            <h2 className="font-poppins font-black text-blue-900 text-xl">Mirtilo</h2>
            <p className="text-xs text-sidebar-foreground/70">Gestão de Condomínios</p>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent className="px-2">
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                asChild
                isActive={location.pathname === item.url}
                className="w-full justify-start group"
              >
                <Link to={item.url} className="flex items-center gap-3 p-2 rounded-md transition-colors">
                  <item.icon className="h-4 w-4 text-blue-600 group-hover:text-blue-800" />
                  <span className="text-sm font-medium">{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="border-t border-sidebar-border p-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link to="/profile" className="flex items-center gap-3 p-2 rounded-md transition-colors">
                <User className="h-4 w-4 text-blue-600" />
                <span className="text-sm">Perfil</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
