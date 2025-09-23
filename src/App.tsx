import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HealthProfilePage from "./pages/HealthProfilePage.tsx";
import NotFound from "./pages/NotFound";
import RecipeDetail from "./components/RecipeDetail";
import RecipeFavorites from "./components/RecipeFavorites";
import RecipeSearch from "./components/RecipeSearch";
import DonationForm from "./components/DonationForm";
import RecipeDetailPage from "./components/RecipeDetail";
import DonationPage from "./components/DonationForm";
import RegularLayout from "./RegularLayout.tsx";
import HeroLayout from "./HeroLayout.tsx";
import UserLayout from "./UserLayout.tsx";
import HomePage from "./pages/HomePage.tsx";
import UserProfile from "./pages/UserProfile.tsx";
import SingUp from "./pages/SignUp.tsx";
import SingIn from "./pages/SignIn.tsx";
import { AuthProvider } from "./contexts/AuthContext.tsx";
import { UserProvider } from "./contexts/UserContext.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <UserProvider>
          <BrowserRouter>
            <Routes>
              {/* Hero-style pages */}
              <Route element={<HeroLayout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/recipes/:id" element={<RecipeDetailPage />} />
              </Route>

              {/* Regular pages */}
              <Route element={<RegularLayout />}>
                <Route path="/profile/health" element={<HealthProfilePage />} />
                <Route path="/favorites" element={<RecipeFavorites />} />
                <Route path="/search" element={<RecipeSearch />} />
                <Route path="/donate" element={<DonationPage />} />
                <Route path="/profile" element={<UserProfile />} />
                <Route path="*" element={<NotFound />} />
              </Route>

              {/* Sign-in-up-style pages */}
              <Route element={<UserLayout />}>
                <Route path="/sign-in" element={<SingIn />} />
                <Route path="/sign-up" element={<SingUp />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </UserProvider>
      </AuthProvider>

    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
