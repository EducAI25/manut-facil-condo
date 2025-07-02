import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Layout } from "@/components/Layout";
import Index from "./pages/Index";
import Assets from "./pages/Assets";
import Maintenance from "./pages/Maintenance";
import Suppliers from "./pages/Suppliers";
import Reports from "./pages/Reports";
import CommonAreas from "./pages/CommonAreas";
import Financial from "./pages/Financial";
import Profile from "./pages/Profile";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import Support from "./pages/Support";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/auth" element={<Auth />} />
            <Route
              path="/*"
              element={
                <ProtectedRoute>
                  <Layout>
                    <Routes>
                      <Route path="/" element={<Index />} />
                      <Route path="/assets" element={<Assets />} />
                      <Route path="/maintenance" element={<Maintenance />} />
                      <Route path="/suppliers" element={<Suppliers />} />
                      <Route path="/reports" element={<Reports />} />
                      <Route path="/common-areas" element={<CommonAreas />} />
                      <Route path="/financial" element={<Financial />} />
                      <Route path="/profile" element={<Profile />} />
                      <Route path="/support" element={<Support />} />
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </Layout>
                </ProtectedRoute>
              }
            />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
