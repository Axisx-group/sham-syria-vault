
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeContext";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";
import SecureAdminPortal from "./pages/SecureAdminPortal";
import Cards from "./pages/Cards";
import BankingServices from "./pages/BankingServices";
import IbanSwiftServices from "./pages/IbanSwiftServices";
import NubariumService from "./pages/NubariumService";
import ApplyPersonal from "./pages/ApplyPersonal";
import ApplyBusiness from "./pages/ApplyBusiness";
import ApplicationStatus from "./pages/ApplicationStatus";
import Contact from "./pages/Contact";
import SupportFAQ from "./pages/SupportFAQ";
import SupportTechnical from "./pages/SupportTechnical";
import NotFound from "./pages/NotFound";
import Demo from "./pages/Demo";
import ServicesPersonal from "./pages/ServicesPersonal";
import ServicesBusiness from "./pages/ServicesBusiness";
import ServicesInvestment from "./pages/ServicesInvestment";
import ServicesGlobal from "./pages/ServicesGlobal";
import ServicesSecurity from "./pages/ServicesSecurity";
import ServicesDigitalWallet from "./pages/ServicesDigitalWallet";
import ServicesAIBanking from "./pages/ServicesAIBanking";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/secure-admin-portal-nubarium-2024" element={<SecureAdminPortal />} />
            <Route path="/cards" element={<Cards />} />
            <Route path="/banking-services" element={<BankingServices />} />
            <Route path="/iban-swift" element={<IbanSwiftServices />} />
            <Route path="/nubarium" element={<NubariumService />} />
            <Route path="/apply/personal" element={<ApplyPersonal />} />
            <Route path="/apply/business" element={<ApplyBusiness />} />
            <Route path="/application-status" element={<ApplicationStatus />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/support/faq" element={<SupportFAQ />} />
            <Route path="/support/technical" element={<SupportTechnical />} />
            <Route path="/demo" element={<Demo />} />
            <Route path="/services/personal" element={<ServicesPersonal />} />
            <Route path="/services/business" element={<ServicesBusiness />} />
            <Route path="/services/investment" element={<ServicesInvestment />} />
            <Route path="/services/global" element={<ServicesGlobal />} />
            <Route path="/services/security" element={<ServicesSecurity />} />
            <Route path="/services/digital-wallet" element={<ServicesDigitalWallet />} />
            <Route path="/services/ai-banking" element={<ServicesAIBanking />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
