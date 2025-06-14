import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AlertCircle, CheckCircle, Clock, Printer } from 'lucide-react';
import { QuestionWithCategory } from '@/data/types';
import QuizQuestion from './QuizQuestion';
import { trackQuizAttempt } from '@/utils/quizTracking';
import { generatePDF } from '@/utils/pdfGenerator';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';
import { getTranslation } from '@/utils/translations';

interface CategoryStat {
  category: string;
  correctCount: number;
  totalCount: number;
}

interface QuizResultProps {
  score: number;
  totalQuestions: number;
  questions: QuestionWithCategory[];
  userAnswers: Record<number, string>;
  onRestart: () => void;
  completionTime: number;
  userName: string;
}

const QuizResult = ({
  score,
  totalQuestions,
  questions,
  userAnswers,
  onRestart,
  completionTime,
  userName,
}: QuizResultProps) => {
  const { language } = useLanguage();
  const [showQuestions, setShowQuestions] = useState(false);
  const [tracked, setTracked] = useState(false);
  const [isTracking, setIsTracking] = useState(false);
  const { toast } = useToast();
  const trackingAttempted = useRef(false);

  // Calculate percentages
  const passPercentage = 74;
  const scorePercentage = Math.round((score / totalQuestions) * 100);
  const passed = scorePercentage >= passPercentage;

  // Calculate category stats
  const categoryStats: CategoryStat[] = React.useMemo(() => {
    const statsObj: Record<string, { correct: number; total: number }> = {};
    
    questions.forEach(question => {
      if (!statsObj[question.category]) {
        statsObj[question.category] = { correct: 0, total: 0 };
      }
      
      statsObj[question.category].total += 1;
      
      if (userAnswers[question.id] === question.correctAnswer) {
        statsObj[question.category].correct += 1;
      }
    });
    
    return Object.entries(statsObj).map(([category, data]) => ({
      category,
      correctCount: data.correct,
      totalCount: data.total
    }));
  }, [questions, userAnswers]);

  // Format date
  const currentDate = new Date().toLocaleDateString('pt-BR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  
  // Format completion time
  const formatTime = (seconds: number | null | undefined): string => {
    if (!seconds) return 'N/A';
    
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  // Track the quiz attempt - only once with proper safeguards and debouncing
  useEffect(() => {
    // Prevent multiple tracking attempts
    if (trackingAttempted.current || tracked || isTracking || !userName || !completionTime) {
      return;
    }

    trackingAttempted.current = true;
    setIsTracking(true);
    
    console.log(`[QUIZ_RESULT] Attempting to track quiz attempt with completion time: ${completionTime}s, raw score: ${score}/${totalQuestions}`);
    
    // Add a small delay to prevent rapid successive submissions
    const trackingTimeout = setTimeout(() => {
      trackQuizAttempt(
        userName,
        null, // email
        score, // Use raw score (number of correct answers, e.g., 6 out of 10)
        totalQuestions,
        userAnswers,
        questions,
        completionTime,
        language
      ).then((attemptId) => {
        setIsTracking(false);
        if (attemptId) {
          setTracked(true);
          console.log(`[QUIZ_RESULT] Quiz attempt tracked successfully with ID: ${attemptId}`);
          toast({
            title: language === 'en' ? "Result saved" : "Resultado salvo",
            description: language === 'en' ? "Your result was successfully recorded." : "Seu resultado foi registrado com sucesso.",
          });
        } else {
          console.error("[QUIZ_RESULT] Failed to track quiz attempt - no ID returned");
          trackingAttempted.current = false; // Allow retry
          toast({
            title: language === 'en' ? "Save error" : "Erro ao salvar",
            description: language === 'en' ? "There was a problem recording your result." : "Houve um problema ao registrar seu resultado.",
            variant: "destructive"
          });
        }
      }).catch(error => {
        setIsTracking(false);
        console.error("[QUIZ_RESULT] Error tracking quiz attempt:", error);
        trackingAttempted.current = false; // Allow retry
        toast({
          title: language === 'en' ? "Save error" : "Erro ao salvar",
          description: language === 'en' ? "There was a problem recording your result." : "Houve um problema ao registrar seu resultado.",
          variant: "destructive"
        });
      });
    }, 500); // 500ms delay to prevent rapid submissions

    return () => clearTimeout(trackingTimeout);
  }, [userName, totalQuestions, score, tracked, isTracking, toast, userAnswers, questions, completionTime, language]);

  return (
    <div className="max-w-3xl mx-auto w-full animate-fade-in">
      <Card className="shadow-lg border-t-4 border-t-k21-gold">
        <CardHeader className="text-center pb-2">
          <CardTitle className="text-2xl font-bold text-gray-800">
            {getTranslation(language, 'quizResults')}
          </CardTitle>
          <div className="text-gray-600 space-y-1">
            <div className="flex items-center justify-center gap-1">
              <Clock size={14} className="text-gray-400" />
              <span className="text-sm">{currentDate}</span>
            </div>
            {isTracking && (
              <div className="flex items-center justify-center gap-1">
                <div className="animate-spin rounded-full h-3 w-3 border-b border-k21-teal"></div>
                <span className="text-xs text-k21-teal">
                  {language === 'en' ? 'Saving...' : 'Salvando...'}
                </span>
              </div>
            )}
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Score section */}
          <div className="flex flex-col items-center justify-center text-center p-3 bg-gray-50 rounded-lg border border-gray-100">
            <div className="text-5xl font-bold mb-2 text-k21-gold">
              {scorePercentage}%
            </div>
            <div className="text-sm text-gray-500 mb-4">
              {score} {getTranslation(language, 'of')} {totalQuestions} {getTranslation(language, 'questionsCount')} {language === 'en' ? 'correct' : 'corretas'}
            </div>

            {passed ? (
              <Badge variant="default" className="bg-green-600 flex gap-1 py-1 px-3 text-white">
                <CheckCircle size={16} />
                <span>{getTranslation(language, 'approved')}</span>
              </Badge>
            ) : (
              <Badge variant="default" className="bg-amber-600 flex gap-1 py-1 px-3 text-white">
                <AlertCircle size={16} />
                <span>{getTranslation(language, 'notApproved')}</span>
              </Badge>
            )}

            <div className="text-xs text-gray-500 mt-2">
              {getTranslation(language, 'minimumToPass')}: {passPercentage}%
            </div>
            
            {completionTime && (
              <div className="flex items-center gap-1 mt-3 text-sm text-gray-600">
                <Clock size={14} className="text-gray-500" />
                <span>{getTranslation(language, 'completionTime')}: {formatTime(completionTime)}</span>
              </div>
            )}
          </div>

          {/* Category breakdown */}
          <div>
            <h3 className="font-medium text-gray-800 mb-3">{getTranslation(language, 'performanceByCategory')}</h3>
            <div className="space-y-3">
              {Array.isArray(categoryStats) && categoryStats.map((stat, index) => (
                <div key={index} className="flex justify-between items-center">
                  <div className="text-sm font-medium text-gray-600">{stat.category}</div>
                  <div className="flex items-center gap-2">
                    <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          (stat.correctCount / stat.totalCount) * 100 >= passPercentage
                            ? 'bg-green-500'
                            : (stat.correctCount / stat.totalCount) * 100 >= 60
                            ? 'bg-yellow-500'
                            : 'bg-red-500'
                        }`}
                        style={{
                          width: `${(stat.correctCount / stat.totalCount) * 100}%`,
                        }}
                      />
                    </div>
                    <span className="text-sm text-gray-500">
                      {stat.correctCount}/{stat.totalCount}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Toggle questions button */}
          <div className="pt-2">
            <Button
              variant="outline"
              onClick={() => setShowQuestions(!showQuestions)}
              className="w-full"
            >
              {showQuestions ? getTranslation(language, 'hideQuestions') : getTranslation(language, 'showAllQuestions')}
            </Button>
          </div>

          {/* Questions details */}
          {showQuestions && (
            <div className="space-y-8 pt-2">
              <h3 className="font-medium text-gray-800 mb-3">{getTranslation(language, 'questionDetails')}</h3>
              {questions.map((question, index) => (
                <div 
                  key={question.id}
                  className={`p-4 rounded-lg border ${
                    userAnswers[question.id] === question.correctAnswer
                      ? 'bg-green-50 border-green-200'
                      : 'bg-red-50 border-red-200'
                  }`}
                >
                  <div className="mb-2 flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-500">
                      {getTranslation(language, 'question')} {index + 1} • {question.category}
                    </span>
                    <Badge
                      variant="default"
                      className={`${
                        userAnswers[question.id] === question.correctAnswer
                          ? 'bg-green-600'
                          : 'bg-red-600'
                      } text-white`}
                    >
                      {userAnswers[question.id] === question.correctAnswer
                        ? getTranslation(language, 'correct')
                        : getTranslation(language, 'incorrect')}
                    </Badge>
                  </div>
                  <QuizQuestion
                    question={question}
                    selectedOption={userAnswers[question.id]}
                    onSelectOption={() => {}}
                    onNext={() => {}}
                    onPrevious={() => {}}
                    canGoPrevious={false}
                    isLastQuestion={false}
                    showResult={true}
                  />
                </div>
              ))}
            </div>
          )}
        </CardContent>

        <CardFooter className="flex flex-col sm:flex-row gap-3 pt-0">
          <Button 
            onClick={onRestart} 
            variant="default" 
            className="w-full sm:w-auto"
          >
            {getTranslation(language, 'backToStart')}
          </Button>
          
          <Button 
            onClick={() => generatePDF(questions, userAnswers, score, totalQuestions, categoryStats, { name: userName, email: '' })} 
            variant="outline" 
            className="w-full sm:w-auto flex items-center gap-2"
          >
            <Printer size={16} />
            {getTranslation(language, 'downloadResults')}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default QuizResult;
