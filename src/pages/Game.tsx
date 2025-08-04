import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { getTranslation } from '@/utils/translations';
import { getRandomQuestions } from '@/data/quizData';
import { saveGameAttempt } from '@/utils/gameTracking';
import { toast } from '@/hooks/use-toast';

import Header from '@/components/Header';
import UserInfoForm from '@/components/UserInfoForm';
import { GameCategorySelector } from '@/components/game/GameCategorySelector';
import { GameCountdown } from '@/components/game/GameCountdown';
import { GameTimer } from '@/components/game/GameTimer';
import { GameQuestionInput } from '@/components/game/GameQuestionInput';
import { GameResults } from '@/components/game/GameResults';

import { GameState, GameQuestion, GameConfig } from '@/types/game';

const Game: React.FC = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  
  const [gameConfig, setGameConfig] = useState<GameConfig | null>(null);
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [showUserForm, setShowUserForm] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);

  const resetGame = () => {
    setGameConfig(null);
    setGameState(null);
    setShowUserForm(false);
    setCurrentTime(0);
  };

  const handleCategorySelection = async (category: string, questionCount: 5 | 10) => {
    setGameConfig({ category, questionCount, name: '', email: '' });
    setShowUserForm(true);
  };

  const handleUserInfoSubmit = async (userData: { name: string; email: string }) => {
    if (!gameConfig) return;

    try {
      // Evitar múltiplas chamadas
      setShowUserForm(false);
      
      const questions = await getRandomQuestions(gameConfig.questionCount, language);
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
    const isCorrect = answer === currentQuestion.correctAnswer;
    const now = Date.now();
    const timeSpent = now - gameState.questionStartTime;
    
    const newAnswer = {
      questionId: currentQuestion.id,
      answer,
      isCorrect,
      timeSpent
    };

    const newAnswers = [...gameState.answers, newAnswer];
    const penaltyToAdd = isCorrect ? 0 : 10000; // 10 seconds penalty
    
    setGameState(prev => prev ? {
      ...prev,
      phase: 'waiting',
      answers: newAnswers,
      penaltyTime: prev.penaltyTime + penaltyToAdd,
      correctAnswers: prev.correctAnswers + (isCorrect ? 1 : 0)
    } : null);

    // Show feedback for 2 seconds, then continue
    setTimeout(() => {
      if (gameState.currentQuestionIndex < gameState.questions.length - 1) {
        // Next question - go to countdown first
        setGameState(prev => prev ? {
          ...prev,
          phase: 'countdown',
          currentQuestionIndex: prev.currentQuestionIndex + 1
        } : null);
      } else {
        // Game finished
        finishGame(newAnswers, gameState.penaltyTime + penaltyToAdd);
      }
    }, 2000);
  }, [gameState?.phase, gameState?.currentQuestionIndex, gameState?.questions, gameState?.questionStartTime, gameState?.penaltyTime, gameConfig]);

  const finishGame = async (finalAnswers: any[], finalPenaltyTime: number) => {
    if (!gameState || !gameConfig) return;

    const totalTime = Date.now() - gameState.startTime;
    const correctAnswers = finalAnswers.filter(a => a.isCorrect).length;

    try {
      await saveGameAttempt(
        gameConfig.name,
        gameConfig.email || null,
        gameConfig.category,
        gameConfig.questionCount,
        correctAnswers,
        totalTime,
        finalPenaltyTime,
        gameState.questions,
        finalAnswers,
        language
      );

      setGameState(prev => prev ? {
        ...prev,
        phase: 'finished',
        totalTime,
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

  const isTimerActive = gameState?.phase === 'question';

  if (!gameConfig) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-muted">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <GameCategorySelector onSelectCategory={handleCategorySelection} />
        </main>
      </div>
    );
  }

  if (showUserForm && gameConfig) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-muted">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-md mx-auto">
            <UserInfoForm 
              onSubmit={handleUserInfoSubmit} 
              selectedSize={gameConfig.questionCount}
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
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Game Header */}
          <div className="flex justify-between items-center mb-8">
            <div className="space-y-2">
              <h1 className="text-2xl font-bold">
                {getTranslation(language, 'gameMode')}
              </h1>
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <span>
                  {gameState.currentQuestionIndex + 1}/{gameState.questions.length}
                </span>
                <span>•</span>
                <span>{gameConfig.category}</span>
              </div>
            </div>
            
            <GameTimer 
              isActive={isTimerActive}
              onTick={handleTimerTick}
              className="bg-card p-4 rounded-lg border"
            />
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
                onViewRanking={() => navigate('/game/ranking')}
                onBackToHome={() => navigate('/')}
              />
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Game;