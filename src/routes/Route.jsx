import { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Layouts
import MainLayout from "../layout/MainLayout";
import DashboardLayout from "../layout/DashboardLayout";

// Auth & Guards
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";
import ShopcreateRoute from "./ShopcreateRoute";
import InitialPageLoader from "../components/skeleton/InitialPageLoader";
import PaymentSuccess from "../pages/dashboard/verdor-dashboard/payment/PaymentSuccess";
import Testing from "../pages/Testing";

// Lazy loaded pages
const Home = lazy(() => import("../pages/home/Home"));
const LogIn = lazy(() => import("../pages/auth/LogIn"));
const Register = lazy(() => import("../pages/auth/Register"))
const WishList = lazy(() => import("../pages/wish-list/WishList"));
const AboutUs = lazy(() => import("../pages/footer/about-us/AboutUs"));
const ContactUs = lazy(() => import("../pages/footer/contact-us/ContactUs"));
const HelpSupport = lazy(() => import("../pages/footer/help-support/HelpSupport"));
const TermCondition = lazy(() => import("../pages/footer/term-condition/TermCondition"));
const PrivecyAndPolicy = lazy(() => import("../pages/footer/privecy-police/PrivecyAndPolicy"));

const ForgetPassword = lazy(() => import("../pages/auth/ForgetPassword"));
const VerificationCode = lazy(() => import("../pages/auth/VerificationCode"));
const ForgetPasswordVerify = lazy(() => import("../pages/auth/ForgetPasswordVerify"));
const ResetPassword = lazy(() => import("../pages/auth/ResetPassword"));
const OTPSending = lazy(() => import("../pages/auth/verify/OTPSending"));

// Dashboard (Admin)
const Dashboard = lazy(() => import("../pages/dashboard/admin-dashboard/home/Dashboard"));
const Verndors = lazy(() => import("../pages/dashboard/admin-dashboard/vendors/Verndors"));
const AdminDeals = lazy(() => import("../pages/dashboard/admin-dashboard/deals/AdminDeals"));
const Payments = lazy(() => import("../pages/dashboard/admin-dashboard/payments/Payments"));
const Content = lazy(() => import("../pages/dashboard/admin-dashboard/content/Content"));
const Notification = lazy(() => import("../pages/dashboard/admin-dashboard/notification/Notification"));
const Vouchers = lazy(() => import("../pages/dashboard/admin-dashboard/voucher/Vouchers"));
const Plans = lazy(() => import("../pages/dashboard/admin-dashboard/plans/Plans"));

// Vendor Dashboard
const Deals = lazy(() => import("../pages/dashboard/verdor-dashboard/deals/Deals"));
const VendorCreateDeal = lazy(() => import("../pages/dashboard/verdor-dashboard/created-deal/VendorCreateDeal"));
const CreateDealPlan = lazy(() => import("../pages/dashboard/verdor-dashboard/created-deal/CreateDealPlan"));
// const PaymentSuccess = lazy(() => import("../pages/dashboard/verdor-dashboard/payment/PaymentSuccess"));
const PaymentCancel = lazy(() => import("../pages/dashboard/verdor-dashboard/payment/PaymentCancel"));
const VendorEditDeal = lazy(() => import("../pages/dashboard/verdor-dashboard/edit-deal/VendorEditDeal"));

// Vendor & Other Pages
const VendorDeails = lazy(() => import("../pages/vendor/vendor-deatils/VendorDeails"));
const VendorCreateShop = lazy(() => import("../pages/vendor/create-shop/VendorCreateShop"));
const CreatedShop = lazy(() => import("../pages/vendor/created-shop/CreatedShop"));
const VendorProfile = lazy(() => import("../pages/vendor/profile/VendorProfile"));
const VendorEditShop = lazy(() => import("../pages/vendor/create-shop/edit-shop/VendorEditShop"));
const EditOutlet = lazy(() => import("../pages/vendor/vendor-deatils/outlet-edit/EditOutlet"));
const VendorApprovalPage = lazy(() => import("../pages/dashboard/verdor-dashboard/approval/VendorApprovalPage"));

const CategorieDetails = lazy(() => import("../pages/categories-page/category-details/CategorieDetails"));
const Categories = lazy(() => import("../pages/categories-page/Categories"));
const DealDetails = lazy(() => import("../pages/dealsDetails/DealDetails"));
const ShowOutlets = lazy(() => import("../pages/show-outlets/ShowOutlets"));
const AllTopViewsDeal = lazy(() => import("../pages/vendor/created-shop/components/AllTopViewsDeal"));
const ShowNotification = lazy(() => import("../pages/notification/Shownotification"));

const ErrorPage = lazy(() => import("../pages/ErrorPage"));

function AppRoutes() {
  return (
    <Router>
      <Suspense fallback={<InitialPageLoader />}>
        <Routes>

          {/* Public */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LogIn />} />
            <Route path="/register" element={<Register />} />
            <Route path="/saved_deals" element={<WishList />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/help-support" element={<HelpSupport />} />
            <Route path="/terms-and-conditions" element={<TermCondition />} />
            <Route path="/term-condition" element={<TermCondition />} />
            <Route path="/privacy-policy" element={<PrivecyAndPolicy />} />
            <Route path="/forgetpassword" element={<ForgetPassword />} />
            <Route path="/forget-password" element={<ForgetPassword />} />
            <Route path="/otp-code-sending" element={<OTPSending />} />
            <Route path="/otp-sending" element={<OTPSending />} />
            <Route path="/verificationcode" element={<VerificationCode />} />
            <Route path="/verification-code" element={<VerificationCode />} />
            <Route path="/verify-otp-code" element={<ForgetPasswordVerify />} />
            <Route path="/forget-password-verify" element={<ForgetPasswordVerify />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/approval" element={<VendorApprovalPage />} />
            <Route path="/vendor-details/:id" element={<VendorDeails />} />
            <Route path="/vendor/:id" element={<VendorDeails />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/categori-details/:id" element={<CategorieDetails />} />
            <Route path="/category/:id" element={<CategorieDetails />} />
            <Route path="/deal-details/:id" element={<DealDetails />} />
            <Route path="/deal/:id" element={<DealDetails />} />
            <Route path="/notification" element={<ShowNotification />} />
            <Route path="/notification/:id" element={<ShowNotification />} />
            <Route path="/show-notification" element={<ShowNotification />} />
          </Route>

          {/* Admin Dashboard */}
          <Route element={<AdminRoute />}>
            <Route element={<DashboardLayout />}>
              <Route path="/dashboard/admin-dashboard" element={<Dashboard />} />
              <Route path="/dashboard/admin-vendor" element={<Verndors />} />
              <Route path="/dashboard/admin-deals" element={<AdminDeals />} />
              <Route path="/dashboard/admin-payments" element={<Payments />} />
              <Route path="/dashboard/admin-content" element={<Content />} />
              <Route path="/dashboard/admin-notification" element={<Notification />} />
              <Route path="/dashboard/admin-voucher" element={<Vouchers />} />
              <Route path="/dashboard/admin-plan" element={<Plans />} />

              {/* Backward-compatible admin paths */}
              <Route path="/admin/vendors" element={<Verndors />} />
              <Route path="/admin/deals" element={<AdminDeals />} />
              <Route path="/admin/payments" element={<Payments />} />
              <Route path="/admin/content" element={<Content />} />
              <Route path="/admin/notification" element={<Notification />} />
              <Route path="/admin/vouchers" element={<Vouchers />} />
              <Route path="/admin/plans" element={<Plans />} />
            </Route>
          </Route>

          {/* Vendor Dashboard */}
          <Route element={<PrivateRoute />}>
            <Route element={<MainLayout />}>
              <Route path="/shop-overview" element={<CreatedShop />} />
              <Route path="/vendor/created-shop" element={<CreatedShop />} />
              <Route path="/my-deals" element={<Deals />} />
              <Route path="/my-profile" element={<VendorProfile />} />
              <Route path="/create-deal" element={<VendorCreateDeal />} />
              <Route path="/create-deal-plan" element={<CreateDealPlan />} />
              <Route path="/create-deal-plan/:id" element={<CreateDealPlan />} />
              <Route path="/vendor-edit-deal" element={<VendorEditDeal />} />
              <Route path="/vendor-edit-deal/:id" element={<VendorEditDeal />} />
              <Route path="/verdor-edit-shop" element={<VendorEditShop />} />
              <Route path="/verdor-edit-shop/:id" element={<VendorEditShop />} />
              <Route path="/outlet-edit" element={<EditOutlet />} />
              <Route path="/outlet-edit/:id" element={<EditOutlet />} />
              <Route path="/show-outlet" element={<ShowOutlets />} />
              <Route path="/show-outlet/:id" element={<ShowOutlets />} />
              <Route path="/show-outlets" element={<ShowOutlets />} />
              <Route path="/show-outlets/:id" element={<ShowOutlets />} />
              <Route path="/all-top-views" element={<AllTopViewsDeal />} />
              <Route path="/payment_success" element={<PaymentSuccess />} />
              <Route path="/payment_cancel" element={<PaymentCancel />} />
            </Route>
          </Route>

          {/* Vendor Shop Creation Flow */}
          <Route element={<ShopcreateRoute />}>
            <Route element={<MainLayout />}>
              <Route path="/vendor/create-shop" element={<VendorCreateShop />} />
              <Route path="/verdor-created-shop" element={<VendorCreateShop />} />
            </Route>
          </Route>

          {/* 404 */}
          <Route path="*" element={<ErrorPage />} />
          <Route path="/testing" element={<Testing />} />

        </Routes>
      </Suspense>
    </Router>
  );
}

export default AppRoutes;
