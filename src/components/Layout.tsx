
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Button } from "@/components/ui/button";
import { User, LogOut } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate("/auth");
  };

  const handleProfile = () => {
    navigate("/profile");
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-hero">
        <AppSidebar />
        
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="h-16 border-b border-border bg-card/80 backdrop-blur-sm flex items-center justify-between px-6 shadow-card">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="text-muted-foreground hover:text-foreground lg:hidden" />
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-gradient-primary rounded-xl flex items-center justify-center shadow-glow animate-float">
                  <span className="text-2xl">🫐</span>
                </div>
                <div>
                  <h1 className="text-xl font-bold text-foreground">Mirtilo</h1>
                  <p className="text-xs text-muted-foreground">Gestão de Condomínios</p>
                </div>
              </div>
            </div>
            
            {user && (
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleProfile}
                  className="hidden sm:flex"
                >
                  <User className="h-4 w-4 mr-2" />
                  Perfil
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleSignOut}
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Sair
                </Button>
              </div>
            )}
          </header>
          
          {/* Main Content */}
          <main className="flex-1 p-4 sm:p-6">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
