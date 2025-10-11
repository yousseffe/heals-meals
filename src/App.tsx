import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext.tsx";
import { UserProvider } from "./contexts/UserContext.tsx";
import { ConditionProvider } from "./contexts/ConditionContext.tsx";
import { UserConditionProvider } from "./contexts/UserConditionContext.tsx";
import { DonationProvider } from "./contexts/DonationContext.tsx";
import { RecipeProvider } from "./contexts/RecipeContext.tsx";
import { IngredientProvider } from "./contexts/IngredientContext.tsx";
import ScrollToTop from "@/components/ScrollToTop";
import AppRoutes from "@/AppRoutes"

const queryClient = new QueryClient();

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <AuthProvider>
          <DonationProvider>
            <ConditionProvider>
              <UserProvider>
                <IngredientProvider>
                  <RecipeProvider>
                    <UserConditionProvider>
                      <BrowserRouter>
                        <ScrollToTop />
                        <AppRoutes />
                      </BrowserRouter>
                    </UserConditionProvider>
                  </RecipeProvider>
                </IngredientProvider>
              </UserProvider>
            </ConditionProvider>
          </DonationProvider>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  )
}

export default App;
