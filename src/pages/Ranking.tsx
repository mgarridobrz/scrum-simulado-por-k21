import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trophy, Clock, Users, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { getRankingData, getGlobalQuizStats } from '@/utils/quizTracking';
import { useLanguage } from '@/contexts/LanguageContext';
import { useMetaTags } from '@/hooks/useMetaTags';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface RankingEntry {
  name: string;
  score: number;
  completionTimeSeconds: number;
  language: string;
  created_at: string;
}

interface GlobalStats {
  totalAttempts: number;
  averageScore: number;
  totalQuestions: number;
  languageBreakdown: { pt: number; en: number };
}

const Ranking = () => {
  const { language, isEnglish } = useLanguage();
  const navigate = useNavigate();
  useMetaTags(); // Add meta tags management
  
  // Default quiz size is now 10
  const [selectedQuizSize, setSelectedQuizSize] = useState<number>(10);
  // Time period filter
  const [selectedTimePeriod, setSelectedTimePeriod] = useState<'30days' | '90days' | 'alltime'>('30days');
  // Language filter state and filter are removed
  const [rankingData, setRankingData] = useState<RankingEntry[]>([]);
  const [globalStats, setGlobalStats] = useState<GlobalStats>({
    totalAttempts: 0,
    averageScore: 0,
    totalQuestions: 0,
    languageBreakdown: { pt: 0, en: 0 }
  });
  const [loading, setLoading] = useState(true);

  // Quiz sizes are now 10, 25, and 50
  const quizSizes = [10, 25, 50];

  useEffect(() => {
    loadData();
  }, [selectedQuizSize, selectedTimePeriod]);

  useEffect(() => {
    loadGlobalStats();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      // Fetch by quiz size and time period
      const data = await getRankingData(selectedQuizSize, undefined, selectedTimePeriod);
      setRankingData(data);
    } catch (error) {
      console.error('Error loading ranking data:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadGlobalStats = async () => {
    try {
      // Force cache busting by clearing the state first
      setGlobalStats({
        totalAttempts: 0,
        averageScore: 0,
        totalQuestions: 0,
        languageBreakdown: { pt: 0, en: 0 }
      });
      
      const stats = await getGlobalQuizStats();
      setGlobalStats(stats);
    } catch (error) {
      console.error('Error loading global stats:', error);
    }
  };

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const getLanguageFlag = (lang: string) => {
    return lang === 'en' ? '🇺🇸' : '🇧🇷';
  };

  const getLanguageLabel = (lang: string) => {
    if (isEnglish) {
      return lang === 'en' ? 'English' : 'Portuguese';
    }
    return lang === 'en' ? 'Inglês' : 'Português';
  };

  const formatScoreAsPercentage = (score: number, totalQuestions: number): string => {
    // Score is already stored as a percentage in the database
    // Just format it properly
    return `${Math.round(score)}%`;
  };

  const handleBackClick = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Back Button and Header */}
          <div className="mb-6">
            <Button
              onClick={handleBackClick}
              variant="outline"
              className="mb-4 flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              {isEnglish ? 'Back to Home' : 'Voltar ao Início'}
            </Button>
            
            <div className="text-center">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {isEnglish ? 'Global Ranking' : 'Ranking Global'}
              </h1>
              <p className="text-gray-600">
                {isEnglish 
                  ? 'See how you rank among other CSM quiz participants worldwide' 
                  : 'Veja como você se posiciona entre outros participantes do simulado CSM no mundo'}
              </p>
            </div>
            
            <Button 
              onClick={loadGlobalStats}
              variant="outline" 
              size="sm"
              className="mb-4"
            >
              🔄 Atualizar Estatísticas
            </Button>
          </div>

          {/* Global Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {isEnglish ? 'Total Attempts' : 'Total de Tentativas'}
                </CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">{globalStats.totalAttempts.toLocaleString()}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {isEnglish ? 'Average Score' : 'Pontuação Média'}
                </CardTitle>
                <Trophy className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">{globalStats.averageScore.toFixed(1)}%</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {isEnglish ? 'Portuguese Tests' : 'Testes em Português'}
                </CardTitle>
                <div className="text-lg">🇧🇷</div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-purple-600">{globalStats.languageBreakdown.pt.toLocaleString()}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {isEnglish ? 'English Tests' : 'Testes em Inglês'}
                </CardTitle>
                <div className="text-lg">🇺🇸</div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-orange-600">{globalStats.languageBreakdown.en.toLocaleString()}</div>
              </CardContent>
            </Card>
          </div>

          {/* Quiz Size and Time Period Selection */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <Card>
              <CardHeader>
                <CardTitle>{isEnglish ? 'Quiz Size' : 'Tamanho do Quiz'}</CardTitle>
              </CardHeader>
              <CardContent>
                <ToggleGroup 
                  type="single" 
                  value={selectedQuizSize.toString()} 
                  onValueChange={(value) => value && setSelectedQuizSize(parseInt(value))}
                  className="justify-start"
                >
                  {quizSizes.map(size => (
                    <ToggleGroupItem 
                      key={size} 
                      value={size.toString()}
                      className="px-6 py-2"
                    >
                      {size} {isEnglish ? 'questions' : 'questões'}
                    </ToggleGroupItem>
                  ))}
                </ToggleGroup>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{isEnglish ? 'Time Period' : 'Período'}</CardTitle>
              </CardHeader>
              <CardContent>
                <ToggleGroup 
                  type="single" 
                  value={selectedTimePeriod} 
                  onValueChange={(value) => value && setSelectedTimePeriod(value as '30days' | '90days' | 'alltime')}
                  className="justify-start"
                >
                  <ToggleGroupItem value="30days" className="px-4 py-2">
                    {isEnglish ? '30 Days' : '30 Dias'}
                  </ToggleGroupItem>
                  <ToggleGroupItem value="90days" className="px-4 py-2">
                    {isEnglish ? '90 Days' : '90 Dias'}
                  </ToggleGroupItem>
                  <ToggleGroupItem value="alltime" className="px-4 py-2">
                    {isEnglish ? 'All Time' : 'Todos os Tempos'}
                  </ToggleGroupItem>
                </ToggleGroup>
              </CardContent>
            </Card>
          </div>

          {/* Ranking Table */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-k21-gold" />
                {isEnglish ? 'Top Performers' : 'Melhores Performances'}
              </CardTitle>
              <CardDescription>
                {isEnglish 
                  ? `Top performers for ${selectedQuizSize} question quizzes in the ${
                      selectedTimePeriod === '30days' ? 'last 30 days' :
                      selectedTimePeriod === '90days' ? 'last 90 days' : 'all time'
                    }` 
                  : `Melhores performances para quizzes de ${selectedQuizSize} questões ${
                      selectedTimePeriod === '30days' ? 'nos últimos 30 dias' :
                      selectedTimePeriod === '90days' ? 'nos últimos 90 dias' : 'de todos os tempos'
                    }`}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-k21-teal mx-auto mb-2"></div>
                  <p className="text-gray-600">
                    {isEnglish ? 'Loading ranking...' : 'Carregando ranking...'}
                  </p>
                </div>
              ) : rankingData.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-600">
                    {isEnglish 
                      ? 'No quiz attempts found for the selected filters.' 
                      : 'Nenhuma tentativa de quiz encontrada para os filtros selecionados.'}
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-2">
                          {isEnglish ? 'Position' : 'Posição'}
                        </th>
                        <th className="text-left py-3 px-2">
                          {isEnglish ? 'Name' : 'Nome'}
                        </th>
                        <th className="text-left py-3 px-2">
                          {isEnglish ? 'Score' : 'Pontuação'}
                        </th>
                        <th className="text-left py-3 px-2">
                          {isEnglish ? 'Time' : 'Tempo'}
                        </th>
                        <th className="text-left py-3 px-2">
                          {isEnglish ? 'Language' : 'Idioma'}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {rankingData.map((entry, index) => (
                        <tr key={index} className="border-b hover:bg-gray-50">
                          <td className="py-3 px-2">
                            <div className="flex items-center gap-2">
                              {index === 0 && <Trophy className="h-4 w-4 text-yellow-500" />}
                              {index === 1 && <Trophy className="h-4 w-4 text-gray-400" />}
                              {index === 2 && <Trophy className="h-4 w-4 text-amber-600" />}
                              <span className="font-medium">#{index + 1}</span>
                            </div>
                          </td>
                          <td className="py-3 px-2 font-medium">{entry.name}</td>
                          <td className="py-3 px-2">
                            <Badge variant="secondary">
                              {formatScoreAsPercentage(entry.score, selectedQuizSize)}
                            </Badge>
                          </td>
                          <td className="py-3 px-2">
                            <div className="flex items-center gap-1">
                              <Clock className="h-3 w-3 text-gray-400" />
                              {formatTime(entry.completionTimeSeconds)}
                            </div>
                          </td>
                          <td className="py-3 px-2">
                            <div className="flex items-center gap-1">
                              {getLanguageFlag(entry.language)}
                              <span className="text-sm text-gray-600">
                                {getLanguageLabel(entry.language)}
                              </span>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Ranking;
