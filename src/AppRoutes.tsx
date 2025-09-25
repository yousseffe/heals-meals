// AppRoutes.tsx
import { Routes, Route, useLocation } from "react-router-dom";
import HealthProfilePage from "./pages/HealthProfilePage.tsx";
import NotFound from "./pages/NotFound";
import RecipeDetail from "./components/RecipeDetail";
import RecipeFavorites from "./components/RecipeFavorites";
import RecipeSearch from "./components/RecipeSearch";
import DonationForm from "./components/DonationForm";
import RecipeDetailPage from "./components/RecipeDetail";
import DonationPage from "./components/DonationForm";
import RegularLayout from "./layouts/RegularLayout.tsx";
import HeroLayout from "./layouts/HeroLayout.tsx";
import UserLayout from "./layouts/UserLayout.tsx";
import HomePage from "./pages/HomePage.tsx";
import UserProfile from "@/pages/UserProfile.tsx";
import EditProfile from "@/pages/EditProfile.tsx";
import EditProfileModal from "@/pages/EditProfileModal.tsx";
import SingUp from "./pages/SignUp.tsx";
import SingIn from "./pages/SignIn.tsx";


export default function AppRoutes() {
    const location = useLocation();
    const state = location.state as { backgroundLocation?: Location };

    return (
        <>

            <Routes location={state?.backgroundLocation || location}>
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
                    <Route path="/profile/edit" element={<EditProfile />} />
                    <Route path="*" element={<NotFound />} />
                </Route>

                {/* Sign-in-up-style pages */}
                <Route element={<UserLayout />}>
                    <Route path="/sign-in" element={<SingIn />} />
                    <Route path="/sign-up" element={<SingUp />} />
                </Route>

            </Routes>

            <Routes location={location}>
                {state?.backgroundLocation && (
                    <Route path="/profile/edit" element={<EditProfileModal />} />
                )}
            </Routes>

        </>
    );
}
