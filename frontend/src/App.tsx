import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Index from "./pages/Index";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import MachineRegistration from "./pages/MachineRegistration";
import PartInventory from "./pages/PartInventory";
import MaintenanceRegistration from "./pages/MaintenanceRegistration";
import LaborManagement from "./pages/LaborManagement";
import IndirectCosts from "./pages/IndirectCosts";
import Reports from "./pages/Reports";
import NotFound from "./pages/NotFound";
import { authService } from "./services/api";

const queryClient = new QueryClient();

// Componente para rotas protegidas
const PrivateRoute = ({ element }: { element: JSX.Element }) => {
  return authService.isAuthenticated() ? element : <Navigate to="/login" />;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} />
            <Route path="/machines/new" element={<PrivateRoute element={<MachineRegistration />} />} />
            <Route path="/machines" element={<PrivateRoute element={<MachineRegistration />} />} />
            <Route path="/parts" element={<PrivateRoute element={<PartInventory />} />} />
            <Route path="/maintenance" element={<PrivateRoute element={<MaintenanceRegistration />} />} />
            <Route path="/maintenance/:id" element={<PrivateRoute element={<MaintenanceRegistration />} />} />
            <Route path="/labor" element={<PrivateRoute element={<LaborManagement />} />} />
            <Route path="/costs" element={<PrivateRoute element={<IndirectCosts />} />} />
            <Route path="/reports" element={<PrivateRoute element={<Reports />} />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AnimatePresence>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
