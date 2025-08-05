import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { useLanguage } from '@/contexts/LanguageContext';
import { getTranslation } from '@/utils/translations';
import { getGameRanking, getGameStats } from '@/utils/gameTracking';
import { GameRanking as GameRankingType } from '@/types/game';
import Header from '@/components/Header';

const GameRanking: React.FC = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  
  const [ranking, setRanking] = useState<GameRankingType[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedQuestionCount, setSelectedQuestionCount] = useState<string>('all');
  const [stats, setStats] = useState({
    totalAttempts: 0,
    averageTime: 0,
    averageScore: 0,
    averageCorrectAnswers: 0
  });

  const categories = [
    { id: 'all', name: 'Todas', nameEn: 'All' },
    { id: 'fundamentals-roles', name: 'Fundamentos + Papéis', nameEn: 'Fundamentals + Roles' },
    { id: 'events-artifacts', name: 'Eventos + Artefatos + Disfunções', nameEn: 'Events + Artifacts + Dysfunctions' }
  ];

  const questionCounts = [
    { id: 'all', label: 'Todas', labelEn: 'All' },
    { id: '5', label: '5 questões', labelEn: '5 questions' },
    { id: '10', label: '10 questões', labelEn: '10 questions' }
  ];

  useEffect(() => {
    loadData();
  }, [selectedCategory, selectedQuestionCount, language]);

  const loadData = async () => {
    setLoading(true);
    try {
      const category = selectedCategory === 'all' ? undefined : selectedCategory;
      const questionCount = selectedQuestionCount === 'all' ? undefined : parseInt(selectedQuestionCount);
      
      console.log('🔍 RANKING - Loading data with filters:', { category, questionCount, language });
      
      const [rankingData, statsData] = await Promise.all([
        getGameRanking(category, questionCount, language),
        getGameStats(category, questionCount)
      ]);
      
      console.log('🔍 RANKING - Received data:', { 
        rankingCount: rankingData.length, 
        stats: statsData 
      });
      
      setRanking(rankingData);
      setStats(statsData);
    } catch (error) {
      console.error('Error loading ranking data:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const milliseconds = Math.floor(ms % 1000);
    
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(3, '0')}`;
  };

  const formatScoreAsPercentage = (correct: number, total: number): string => {
    return `${Math.round((correct / total) * 100)}%`;
  };

  const handleBackClick = () => {
    navigate('/game');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex items-center mb-8">
            <Button 
              variant="ghost" 
              onClick={handleBackClick}
              className="mr-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              {getTranslation(language, 'backToHome')}
            </Button>
            <h1 className="text-3xl font-bold">
              {getTranslation(language, 'gameRanking')}
            </h1>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <Card className="p-4 text-center bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
              <div className="text-3xl font-bold text-blue-600">
                {stats.totalAttempts}
              </div>
              <div className="text-sm text-blue-700 font-medium">
                {language === 'pt' ? 'Total de Jogos' : 'Total Games'}
              </div>
            </Card>
            
            <Card className="p-4 text-center bg-gradient-to-br from-green-50 to-green-100 border-green-200">
              <div className="text-3xl font-bold text-green-600">
                {formatTime(stats.averageTime)}
              </div>
              <div className="text-sm text-green-700 font-medium">
                {language === 'pt' ? 'Tempo Médio' : 'Average Time'}
              </div>
            </Card>
            
            <Card className="p-4 text-center bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
              <div className="text-3xl font-bold text-yellow-600">
                {stats.averageCorrectAnswers.toFixed(1)}
              </div>
              <div className="text-sm text-yellow-700 font-medium">
                {language === 'pt' ? 'Média de Acertos' : 'Average Correct'}
              </div>
            </Card>
            
            <Card className="p-4 text-center bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
              <div className="text-3xl font-bold text-purple-600">
                {ranking.length > 0 ? formatTime(ranking[0].final_score_ms) : '-'}
              </div>
              <div className="text-sm text-purple-700 font-medium">
                {language === 'pt' ? 'Melhor Tempo' : 'Best Time'}
              </div>
            </Card>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8 bg-card p-4 rounded-lg border">
            <div className="space-y-2 flex-1">
              <label className="text-sm font-medium">
                {getTranslation(language, 'categoryFilter')}
              </label>
              <ToggleGroup 
                type="single" 
                value={selectedCategory} 
                onValueChange={(value) => value && setSelectedCategory(value)}
                className="justify-start flex-wrap"
              >
                {categories.map((category) => (
                  <ToggleGroupItem key={category.id} value={category.id} className="text-xs">
                    {language === 'pt' ? category.name : category.nameEn}
                  </ToggleGroupItem>
                ))}
              </ToggleGroup>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">
                {getTranslation(language, 'quizSizeFilter')}
              </label>
              <ToggleGroup 
                type="single" 
                value={selectedQuestionCount} 
                onValueChange={(value) => value && setSelectedQuestionCount(value)}
                className="justify-start"
              >
                {questionCounts.map((count) => (
                  <ToggleGroupItem key={count.id} value={count.id} className="text-xs">
                    {language === 'pt' ? count.label : count.labelEn}
                  </ToggleGroupItem>
                ))}
              </ToggleGroup>
            </div>
          </div>

          {/* Ranking Table */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">
              {getTranslation(language, 'ranking')}
            </h2>
            
            {loading ? (
              <div className="text-center py-8">
                <div className="text-muted-foreground">Carregando...</div>
              </div>
            ) : ranking.length === 0 ? (
              <div className="text-center py-8">
                <div className="text-muted-foreground">
                  Nenhum resultado encontrado para os filtros selecionados.
                </div>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-2">#</th>
                      <th className="text-left py-3 px-2">{getTranslation(language, 'player')}</th>
                      <th className="text-left py-3 px-2">{getTranslation(language, 'score')}</th>
                      <th className="text-left py-3 px-2">{getTranslation(language, 'finalScore')}</th>
                      <th className="text-left py-3 px-2">{getTranslation(language, 'totalTime')}</th>
                      <th className="text-left py-3 px-2">{getTranslation(language, 'penaltyTime')}</th>
                      <th className="text-left py-3 px-2">Data</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ranking.map((entry, index) => (
                      <tr key={index} className="border-b hover:bg-muted/50">
                        <td className="py-3 px-2">
                          <Badge variant={index < 3 ? "default" : "secondary"}>
                            {index + 1}
                          </Badge>
                        </td>
                        <td className="py-3 px-2 font-medium">
                          {entry.name}
                        </td>
                        <td className="py-3 px-2">
                          {formatScoreAsPercentage(entry.correct_answers, entry.question_count)}
                        </td>
                        <td className="py-3 px-2 font-mono">
                          {formatTime(entry.final_score_ms)}
                        </td>
                        <td className="py-3 px-2 font-mono text-blue-600">
                          {formatTime(entry.total_time_ms)}
                        </td>
                        <td className="py-3 px-2 font-mono text-red-600">
                          {entry.penalty_time_ms > 0 ? `+${formatTime(entry.penalty_time_ms)}` : '-'}
                        </td>
                        <td className="py-3 px-2 text-sm text-muted-foreground">
                          {new Date(entry.created_at).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </Card>
        </div>
      </main>
    </div>
  );
};

export default GameRanking;