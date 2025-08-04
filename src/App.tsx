
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Index from "./pages/Index";
import QuestionValidation from "./pages/QuestionValidation";
import Ranking from "./pages/Ranking";
import Game from "./pages/Game";
import GameRanking from "./pages/GameRanking";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <LanguageProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/us" element={<Index />} />
            <Route path="/validate-questions" element={<QuestionValidation />} />
            <Route path="/us/validate-questions" element={<QuestionValidation />} />
            <Route path="/ranking" element={<Ranking />} />
            <Route path="/us/ranking" element={<Ranking />} />
            <Route path="/game" element={<Game />} />
            <Route path="/us/game" element={<Game />} />
            <Route path="/game/ranking" element={<GameRanking />} />
            <Route path="/us/game/ranking" element={<GameRanking />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </TooltipProvider>
      </LanguageProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
