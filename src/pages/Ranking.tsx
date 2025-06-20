import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useLanguage } from '@/contexts/LanguageContext';
import { getTranslation } from '@/utils/translations';
import { useMetadata } from '@/hooks/useMetadata';
import { getPageMetadata } from '@/utils/metadata';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Trophy, Medal, Award, ArrowLeft, Users, Clock, Target } from 'lucide-react';
import { Link } from 'react-router-dom';
import GlobalStatsCounter from '@/components/GlobalStatsCounter';

interface RankingEntry {
  name: string;
  score: number;
  quiz_size: number;
  completion_time_seconds: number;
  created_at: string;
  language: string;
}

const Ranking = () => {
  const { language } = useLanguage();
  
  // Use metadata hook
  const metadata = getPageMetadata('ranking', language);
  useMetadata({
    title: metadata.title,
    description: metadata.description,
    url: window.location.href,
    type: 'website'
  });

  const [quizSizeFilter, setQuizSizeFilter] = useState<string>('all');
  const [languageFilter, setLanguageFilter] = useState<string>('all');

  const { data: rankings, isLoading } = useQuery({
    queryKey: ['rankings', quizSizeFilter, languageFilter],
    queryFn: async () => {
      let query = supabase
        .from('quiz_attempts')
        .select('name, score, quiz_size, completion_time_seconds, created_at, language')
        .not('score', 'is', null)
        .order('score', { ascending: false })
        .order('completion_time_seconds', { ascending: true })
        .limit(100);

      if (quizSizeFilter !== 'all') {
        query = query.eq('quiz_size', parseInt(quizSizeFilter));
      }

      if (languageFilter !== 'all') {
        query = query.eq('language', languageFilter);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data as RankingEntry[];
    },
  });

  const formatTime = (seconds: number) => {
    if (!seconds) return '-';
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    if (mins === 0) {
      return `${secs}${getTranslation(language, 'second')}${secs !== 1 ? 's' : ''}`;
    }
    return `${mins}${getTranslation(language, 'minute')}${mins !== 1 ? 's' : ''} ${secs}${getTranslation(language, 'second')}${secs !== 1 ? 's' : ''}`;
  };

  const getRankIcon = (position: number) => {
    switch (position) {
      case 1:
        return <Trophy className="h-6 w-6 text-yellow-500" />;
      case 2:
        return <Medal className="h-6 w-6 text-gray-400" />;
      case 3:
        return <Award className="h-6 w-6 text-amber-600" />;
      default:
        return <span className="h-6 w-6 flex items-center justify-center text-sm font-bold text-gray-600">#{position}</span>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <Link 
              to={language === 'en' ? '/us' : '/'}
              className="flex items-center gap-2 text-k21-teal hover:text-k21-teal/80 transition-colors"
            >
              <ArrowLeft size={20} />
              <span>{getTranslation(language, 'backToHome')}</span>
            </Link>
          </div>

          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-k21-black mb-2">
              {getTranslation(language, 'ranking')}
            </h1>
            <p className="text-muted-foreground">
              {language === 'en' 
                ? 'Top performers in the CSM certification quiz'
                : 'Melhores desempenhos no simulado de certificação CSM'
              }
            </p>
          </div>

          <GlobalStatsCounter />

          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <Select value={quizSizeFilter} onValueChange={setQuizSizeFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder={getTranslation(language, 'quizSizeFilter')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{getTranslation(language, 'all')}</SelectItem>
                <SelectItem value="10">10 {getTranslation(language, 'questions')}</SelectItem>
                <SelectItem value="20">20 {getTranslation(language, 'questions')}</SelectItem>
                <SelectItem value="50">50 {getTranslation(language, 'questions')}</SelectItem>
              </SelectContent>
            </Select>

            <Select value={languageFilter} onValueChange={setLanguageFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder={getTranslation(language, 'languageFilter')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{getTranslation(language, 'all')}</SelectItem>
                <SelectItem value="pt">{getTranslation(language, 'portuguese')}</SelectItem>
                <SelectItem value="en">{getTranslation(language, 'english')}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-k21-gold" />
                {getTranslation(language, 'ranking')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-k21-teal mx-auto"></div>
                </div>
              ) : rankings && rankings.length > 0 ? (
                <div className="space-y-2">
                  {rankings.map((entry, index) => (
                    <div 
                      key={`${entry.name}-${entry.created_at}-${index}`}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        {getRankIcon(index + 1)}
                        <div>
                          <div className="font-medium text-k21-black">{entry.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {entry.score} {getTranslation(language, 'of')} {entry.quiz_size} • {formatTime(entry.completion_time_seconds)}
                            {entry.language && (
                              <span className="ml-2 px-2 py-1 bg-k21-teal/10 text-k21-teal rounded text-xs">
                                {entry.language === 'en' ? 'EN' : 'PT'}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-k21-teal">
                          {Math.round((entry.score / entry.quiz_size) * 100)}%
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  {language === 'en' 
                    ? 'No rankings available for the selected filters.'
                    : 'Nenhum ranking disponível para os filtros selecionados.'
                  }
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
