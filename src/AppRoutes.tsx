// AppRoutes.tsx
import { Routes, Route, useLocation, useNavigate, useNavigationType } from "react-router-dom";
import HealthProfilePage from "./pages/HealthProfilePage.tsx";
import NotFound from "./pages/NotFound";
import RecipeFavorites from "./components/RecipeFavorites";
import RecipeSearch from "./components/RecipeSearch";
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
import AdminSignUp from "./pages/AdminSignUp.tsx";
import ChangePassword from "./pages/ChangePassword.tsx";
import AdminLayout from "./layouts/AdminLayout.tsx";
import AdminUsers from "./pages/admin/AdminUsers.tsx";
import AdminConditions from "./pages/admin/AdminConditions.tsx";
import AdminUserConditions from "./pages/admin/AdminUserConditions.tsx";
import AdminIngredients from "./pages/admin/AdminIngredients.tsx";
import AdminRecipes from "./pages/admin/AdminRecipes.tsx";
import AdminDonations from "./pages/admin/AdminDonations.tsx";
// import { useEffect } from "react";


export default function AppRoutes() {
    const location = useLocation();
    const navigate = useNavigate();
    const navigationType = useNavigationType();
    const state = location.state as { background: Location };

    const isModal = navigationType === "PUSH" && state?.background;

    console.log("AppRoutes render:", {
        pathname: location.pathname,
        stateBackground: state?.background,
    });

    // useEffect(() => {
    //     if (state?.background) {
    //         navigate(location.pathname, { replace: true });
    //     }
    // }, []);

    return (
        <>

            <Routes location={isModal ? state.background : location}>
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
                    <Route path="/admin/sign-up" element={<AdminSignUp />} />
                    <Route path="/forgot-password" element={<ChangePassword />} />
                </Route>

                <Route path="/admin" element={<AdminLayout />}>
                    <Route path="users" element={<AdminUsers />} />
                    <Route path="conditions" element={<AdminConditions />} />
                    <Route path="user-conditions" element={<AdminUserConditions />} />
                    <Route path="ingredients" element={<AdminIngredients />} />
                    <Route path="recipes" element={<AdminRecipes />} />
                    <Route path="donations" element={<AdminDonations />} />
                </Route>

            </Routes>

            {isModal  && (
                <Routes>
                    <Route path="/profile/edit" element={<EditProfileModal />} />
                </Routes>
            )}
        </>
    );
}
