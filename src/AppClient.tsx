
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeContext";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Cards from "./pages/Cards";
import BankingServices from "./pages/BankingServices";
import IbanSwiftServices from "./pages/IbanSwiftServices";
import ApplyPersonal from "./pages/ApplyPersonal";
import ApplyBusiness from "./pages/ApplyBusiness";
import ApplicationStatus from "./pages/ApplicationStatus";
import Contact from "./pages/Contact";
import SupportFAQ from "./pages/SupportFAQ";
import SupportTechnical from "./pages/SupportTechnical";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const AppClient = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/cards" element={<Cards />} />
            <Route path="/banking-services" element={<BankingServices />} />
            <Route path="/iban-swift" element={<IbanSwiftServices />} />
            <Route path="/apply/personal" element={<ApplyPersonal />} />
            <Route path="/apply/business" element={<ApplyBusiness />} />
            <Route path="/application-status" element={<ApplicationStatus />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/support/faq" element={<SupportFAQ />} />
            <Route path="/support/technical" element={<SupportTechnical />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default AppClient;
