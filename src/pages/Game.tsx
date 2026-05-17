import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useMetaTags } from '@/hooks/useMetaTags';
import { getTranslation } from '@/utils/translations';
import { getRandomQuestions } from '@/data/quizData';
import { saveGameAttempt } from '@/utils/gameTracking';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

import Header from '@/components/Header';
import UserInfoForm from '@/components/UserInfoForm';
import { GameCategorySelector } from '@/components/game/GameCategorySelector';
import { GameCountdown } from '@/components/game/GameCountdown';
import { GameTimer } from '@/components/game/GameTimer';
import { GameQuestionInput } from '@/components/game/GameQuestionInput';
import { GameResults } from '@/components/game/GameResults';

import { GameState, GameQuestion, GameConfig } from '@/types/game';

interface GameProps {
  themeSlug?: string;
  themeId?: string;
  themeName?: string;
  basePath?: string;
  forceAllQuestions?: boolean;
}

const Game: React.FC<GameProps> = ({ themeSlug, themeId, themeName, basePath = '', forceAllQuestions = false }) => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  useMetaTags();
  
  const [gameConfig, setGameConfig] = useState<GameConfig | null>(null);
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [showUserForm, setShowUserForm] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [defaultThemeId, setDefaultThemeId] = useState<string | null>(null);

  // Load CSM theme as default if no themeId is provided
  useEffect(() => {
    if (!themeId) {
      const loadCsmTheme = async () => {
        const { data } = await supabase
          .from('quiz_themes')
          .select('id')
          .eq('slug', 'csm')
          .single();
        if (data) setDefaultThemeId(data.id);
      };
      loadCsmTheme();
    }
  }, [themeId]);

  // Effective themeId to use
  const effectiveThemeId = themeId || defaultThemeId || undefined;

  const resetGame = () => {
    setGameConfig(null);
    setGameState(null);
    setShowUserForm(false);
    setCurrentTime(0);
  };

  const handleBackToSelection = () => {
    setShowUserForm(false);
    setGameConfig(null);
  };

  const handleCategorySelection = async (category: string, questionCount: number) => {
    // Converter 'all' para undefined para buscar todas as categorias
    const categoryFilter = category === 'all' ? undefined : category;
    setGameConfig({ category: category, questionCount, name: '', email: '' });
    setShowUserForm(true);
  };

  const handleUserInfoSubmit = async (userData: { name: string; email: string }) => {
    if (!gameConfig) return;

    try {
      // Evitar múltiplas chamadas
      setShowUserForm(false);
      
      // Converter 'all' para undefined para buscar todas as categorias
      const categoryFilter = gameConfig.category === 'all' ? undefined : gameConfig.category;
      const questions = await getRandomQuestions(gameConfig.questionCount, language, categoryFilter, effectiveThemeId);
      if (questions.length === 0) {
        toast({
          title: "Erro",
          description: "Não foi possível carregar as questões. Tente novamente.",
          variant: "destructive"
        });
        setShowUserForm(true); // Voltar para o formulário em caso de erro
        return;
      }

      setGameConfig({ ...gameConfig, ...userData });
      setGameState({
        phase: 'countdown',
        currentQuestionIndex: 0,
        questions,
        answers: [],
        startTime: 0,
        questionStartTime: 0,
        totalTime: 0,
        penaltyTime: 0,
        correctAnswers: 0
      });
    } catch (error) {
      console.error('Error loading questions:', error);
      toast({
        title: "Erro",
        description: "Erro ao carregar questões. Tente novamente.",
        variant: "destructive"
      });
      setShowUserForm(true); // Voltar para o formulário em caso de erro
    }
  };

  const handleCountdownComplete = () => {
    if (!gameState) return;
    
    const now = Date.now();
    setGameState(prev => prev ? {
      ...prev,
      phase: 'question',
      startTime: prev.startTime === 0 ? now : prev.startTime, // Só define startTime na primeira questão
      questionStartTime: now
    } : null);
  };

  const handleAnswer = useCallback((answer: string) => {
    if (!gameState || !gameConfig || gameState.phase !== 'question') return;

    const currentQuestion = gameState.questions[gameState.currentQuestionIndex];
    
    // Debug logs para investigar questões repetidas
    console.log('🔍 QUESTION TRACKING - Índice atual:', gameState.currentQuestionIndex);
    console.log('🔍 QUESTION TRACKING - ID da questão:', currentQuestion.id);
    console.log('🔍 QUESTION TRACKING - Total de respostas até agora:', gameState.answers.length);
    console.log('🔍 QUESTION TRACKING - IDs das questões já respondidas:', gameState.answers.map(a => a.questionId));
    
    // Verificar se esta questão já foi respondida
    const alreadyAnswered = gameState.answers.find(a => a.questionId === currentQuestion.id);
    if (alreadyAnswered) {
      console.warn('🚨 QUESTÃO REPETIDA DETECTADA! ID:', currentQuestion.id);
    }
    
    // Debug logs para investigar o problema
    console.log('🔍 DEBUG - Resposta do usuário:', answer);
    console.log('🔍 DEBUG - Resposta correta:', currentQuestion.correctAnswer);
    console.log('🔍 DEBUG - Tipo da resposta do usuário:', typeof answer);
    console.log('🔍 DEBUG - Tipo da resposta correta:', typeof currentQuestion.correctAnswer);
    console.log('🔍 DEBUG - Questão completa:', currentQuestion);
    console.log('🔍 DEBUG - Opções da questão:', currentQuestion.options);
    
    const isCorrect = answer === currentQuestion.correctAnswer.toUpperCase();
    console.log('🔍 DEBUG - Comparação (===):', isCorrect);
    console.log('🔍 DEBUG - Resposta correta normalizada:', currentQuestion.correctAnswer.toUpperCase());
    
    const now = Date.now();
    const timeSpent = now - gameState.questionStartTime;
    
    const newAnswer = {
      questionId: currentQuestion.id,
      answer,
      isCorrect,
      timeSpent
    };

    const newAnswers = [...gameState.answers, newAnswer];
    const penaltyToAdd = isCorrect ? 0 : 15000; // 15 seconds penalty
    
    setGameState(prev => prev ? {
      ...prev,
      phase: 'waiting',
      answers: newAnswers,
      penaltyTime: prev.penaltyTime + penaltyToAdd,
      correctAnswers: prev.correctAnswers + (isCorrect ? 1 : 0)
    } : null);

    // Verificar se é a última pergunta e finalizar o jogo imediatamente
    if (gameState.currentQuestionIndex >= gameState.questions.length - 1) {
      // Game finished - calcular o tempo final exato que será mostrado na tela
      setTimeout(() => {
        const finalTimeMs = currentTime; // Tempo atual do timer
        const finalPenaltyMs = gameState.penaltyTime + penaltyToAdd;
        const finalScoreMs = finalTimeMs + finalPenaltyMs; // Pontuação final exata da tela
        
        console.log('🔍 GAME PROGRESSION - Jogo finalizado! Total de respostas:', newAnswers.length);
        console.log('🔍 GAME PROGRESSION - Tempo final do timer:', finalTimeMs);
        console.log('🔍 GAME PROGRESSION - Penalidade final:', finalPenaltyMs);
        console.log('🔍 GAME PROGRESSION - Pontuação final (que aparece na tela):', finalScoreMs);
        
        finishGame(newAnswers, finalPenaltyMs, finalScoreMs);
      }, 100);
    }

    // Show feedback for 2 seconds, then continue to next question
    setTimeout(() => {
      setGameState(prev => {
        if (!prev) return null;
        
        console.log('🔍 GAME PROGRESSION - Índice atual no setTimeout:', prev.currentQuestionIndex);
        console.log('🔍 GAME PROGRESSION - Total de questões:', prev.questions.length);
        console.log('🔍 GAME PROGRESSION - Condição para próxima questão:', prev.currentQuestionIndex < prev.questions.length - 1);
        console.log('🔍 GAME PROGRESSION - Total de respostas até agora:', prev.answers.length);
        
        if (prev.currentQuestionIndex < prev.questions.length - 1) {
          // Next question - go to countdown first
          console.log('🔍 GAME PROGRESSION - Indo para próxima questão, novo índice será:', prev.currentQuestionIndex + 1);
          return {
            ...prev,
            phase: 'countdown',
            currentQuestionIndex: prev.currentQuestionIndex + 1
          };
        } else {
          // Game already finished above, just return current state
          return prev;
        }
      });
    }, 2000);
  }, [gameState?.phase, gameState?.currentQuestionIndex, gameState?.questions, gameState?.questionStartTime, gameState?.penaltyTime, gameConfig]);

  const finishGame = async (finalAnswers: any[], finalPenaltyTime: number, exactFinalScore?: number) => {
    if (!gameState || !gameConfig) return;

    // Se um score exato foi fornecido, usar ele. Senão, usar o currentTime
    const finalScoreToSave = exactFinalScore || (currentTime + finalPenaltyTime);
    const timerValue = exactFinalScore ? (exactFinalScore - finalPenaltyTime) : currentTime;
    const correctAnswers = finalAnswers.filter(a => a.isCorrect).length;

    console.log('🔍 FINISH GAME - Score exato da tela final:', exactFinalScore);
    console.log('🔍 FINISH GAME - Timer value calculado:', timerValue);
    console.log('🔍 FINISH GAME - Penalty:', finalPenaltyTime);
    console.log('🔍 FINISH GAME - Final score para salvar no banco:', finalScoreToSave);

    try {
      await saveGameAttempt(
        gameConfig.name,
        gameConfig.email || null,
        gameConfig.category,
        gameConfig.questionCount,
        correctAnswers,
        timerValue,  // Tempo base calculado
        finalPenaltyTime,
        gameState.questions,
        finalAnswers,
        language,
        finalScoreToSave,  // Score final exato da tela
        effectiveThemeId
      );

      setGameState(prev => prev ? {
        ...prev,
        phase: 'finished',
        totalTime: timerValue,
        penaltyTime: finalPenaltyTime,
        correctAnswers
      } : null);
    } catch (error) {
      console.error('Error saving game attempt:', error);
      toast({
        title: "Erro",
        description: "Erro ao salvar resultado. Tente novamente.",
        variant: "destructive"
      });
    }
  };

  const handleTimerTick = (time: number) => {
    setCurrentTime(time);
  };

  // Timer só deve ser ativo durante as questões, não nos countdowns
  const isTimerActive = gameState?.phase === 'question';

  const rankingPath = basePath ? `${basePath}/game/ranking` : '/game/ranking';
  const gamePath = basePath ? `${basePath}/game` : '/game';
  const homePath = basePath || '/';

  if (!gameConfig) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-muted">
        <Header rankingPath={rankingPath} />
        <main className="container mx-auto px-4 py-8">
          <GameCategorySelector 
            onSelectCategory={handleCategorySelection} 
            themeId={effectiveThemeId}
            basePath={basePath}
            forceAllQuestions={forceAllQuestions}
          />
        </main>
      </div>
    );
  }

  if (showUserForm && gameConfig) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-muted">
        <Header rankingPath={rankingPath} />
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-md mx-auto">
            <UserInfoForm 
              onSubmit={handleUserInfoSubmit} 
              selectedSize={gameConfig.questionCount}
              onBack={handleBackToSelection}
            />
          </div>
        </main>
      </div>
    );
  }

  if (!gameState) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      <Header rankingPath={rankingPath} />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Game Header */}
          <div className="flex justify-between items-center mb-8">
            <div className="space-y-2">
              <h1 className="text-2xl font-bold">
                {themeName || getTranslation(language, 'gameMode')}
              </h1>
              <div className="flex items-center space-x-4 text-lg text-muted-foreground">
                <span>
                  {gameState.currentQuestionIndex + 1}/{gameState.questions.length}
                </span>
                <span>•</span>
                <span>{gameConfig.category}</span>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <button
                onClick={resetGame}
                className="px-4 py-2 text-sm bg-destructive text-destructive-foreground hover:bg-destructive/90 rounded-md transition-colors"
              >
                {language === 'pt' ? 'Cancelar' : 'Cancel'}
              </button>
              <GameTimer 
                isActive={isTimerActive}
                onTick={handleTimerTick}
                className="bg-card p-4 rounded-lg border"
              />
            </div>
          </div>

          {/* Game Content */}
          <div className="bg-card rounded-lg border p-8">
            {gameState.phase === 'countdown' && (
              <GameCountdown onComplete={handleCountdownComplete} />
            )}

            {gameState.phase === 'question' && (
              <GameQuestionInput
                question={gameState.questions[gameState.currentQuestionIndex]}
                onAnswer={handleAnswer}
                isAnswered={false}
              />
            )}

            {gameState.phase === 'waiting' && (
              <GameQuestionInput
                question={gameState.questions[gameState.currentQuestionIndex]}
                onAnswer={handleAnswer}
                isAnswered={true}
                correctAnswer={gameState.questions[gameState.currentQuestionIndex].correctAnswer}
                userAnswer={gameState.answers[gameState.answers.length - 1]?.answer}
              />
            )}

            {gameState.phase === 'finished' && (
              <GameResults
                correctAnswers={gameState.correctAnswers}
                totalQuestions={gameState.questions.length}
                totalTimeMs={gameState.totalTime}
                penaltyTimeMs={gameState.penaltyTime}
                finalScoreMs={gameState.totalTime + gameState.penaltyTime}
                category={gameConfig.category}
                onPlayAgain={resetGame}
                onViewRanking={() => navigate(rankingPath)}
                onBackToHome={() => navigate(homePath)}
              />
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Game;