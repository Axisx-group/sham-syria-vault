
import { Toaster } from "@/components/ui/toaster";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Contact from "./pages/Contact";
import Demo from "./pages/Demo";
import NotFound from "./pages/NotFound";
import ApplyPersonal from "./pages/ApplyPersonal";
import ApplyBusiness from "./pages/ApplyBusiness";
import SupportFAQ from "./pages/SupportFAQ";
import SupportTechnical from "./pages/SupportTechnical";
import ServicesPersonal from "./pages/ServicesPersonal";
import ServicesBusiness from "./pages/ServicesBusiness";
import ServicesDigitalWallet from "./pages/ServicesDigitalWallet";
import ServicesInvestment from "./pages/ServicesInvestment";
import BankingServices from "./pages/BankingServices";
import AdminDashboard from "./pages/AdminDashboard";
import Cards from "./pages/Cards";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/cards" element={<Cards />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/demo" element={<Demo />} />
          <Route path="/apply/personal" element={<ApplyPersonal />} />
          <Route path="/apply/business" element={<ApplyBusiness />} />
          <Route path="/support/faq" element={<SupportFAQ />} />
          <Route path="/support/technical" element={<SupportTechnical />} />
          <Route path="/services/personal" element={<ServicesPersonal />} />
          <Route path="/services/business" element={<ServicesBusiness />} />
          <Route path="/services/digital-wallet" element={<ServicesDigitalWallet />} />
          <Route path="/services/investment" element={<ServicesInvestment />} />
          <Route path="/banking-services" element={<BankingServices />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster />
      </div>
    </Router>
  );
}

export default App;
