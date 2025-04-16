
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "@/frontend/layout/Layout";
import Index from "./pages/Index";
import Screener from "./pages/Screener";
import { FundDetails } from "./pages/FundDetails";
import { CompareFunds } from "./pages/CompareFunds";
import NotFound from "./pages/NotFound";
import { ThemeProvider } from "@/frontend/theme/theme-provider";
import { Toaster } from "@/components/ui/toaster";

const queryClient = new QueryClient();

const App = () => (
  <ThemeProvider defaultTheme="light">
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/screener" element={<Screener />} />
            <Route path="/fund/:fundId" element={<FundDetails />} />
            <Route path="/compare" element={<CompareFunds />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
      <Toaster />
    </QueryClientProvider>
  </ThemeProvider>
);

export default App;
