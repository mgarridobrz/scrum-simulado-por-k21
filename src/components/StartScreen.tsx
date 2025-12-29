
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import QuizSizeSelector from './QuizSizeSelector';
import UserInfoForm from './UserInfoForm';
import { useLanguage } from '@/contexts/LanguageContext';
import { getTranslation } from '@/utils/translations';

interface StartScreenProps {
  onStart: (size: number, userData?: { name: string; email: string }) => void;
  customSubtitle?: string;
  themeName?: string;
  gamePath?: string;
  themeSlug?: string;
}

const StartScreen = ({ onStart, customSubtitle, themeName, gamePath = '/game', themeSlug }: StartScreenProps) => {
  const { language } = useLanguage();
  const [showSizeSelector, setShowSizeSelector] = useState(false);
  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  
  const handleStartClick = () => {
    setShowSizeSelector(true);
  };

  const handleSizeSelection = (size: number) => {
    console.log("StartScreen - Size selected:", size);
    setSelectedSize(size);
  };
  
  const handleUserInfoSubmit = (userData: { name: string; email: string }) => {
    console.log("StartScreen - User info submitted:", userData);
    if (selectedSize) {
      onStart(selectedSize, userData);
    }
  };

  // Soccer-themed features for oscrias
  const isSoccerTheme = themeSlug === 'oscrias';
  
  const soccerFeatures = [
    {
      number: '1',
      bgColor: 'bg-green-600/10',
      textColor: 'text-green-600',
      title: language === 'pt' ? 'Questões Avançadas' : 'Advanced Questions',
      description: language === 'pt' ? 'Desafios sobre Copas do Mundo, jogadores lendários e estatísticas' : 'Challenges about World Cups, legendary players and statistics'
    },
    {
      number: '2',
      bgColor: 'bg-yellow-500/10',
      textColor: 'text-yellow-500',
      title: language === 'pt' ? 'História do Futebol' : 'Football History',
      description: language === 'pt' ? 'Teste seus conhecimentos sobre os maiores momentos do esporte' : 'Test your knowledge about the greatest moments in the sport'
    },
    {
      number: '3',
      bgColor: 'bg-blue-600/10',
      textColor: 'text-blue-600',
      title: language === 'pt' ? 'Regras e Táticas' : 'Rules and Tactics',
      description: language === 'pt' ? 'Perguntas sobre regras oficiais e estratégias de jogo' : 'Questions about official rules and game strategies'
    },
    {
      number: '4',
      bgColor: 'bg-red-500/10',
      textColor: 'text-red-500',
      title: language === 'pt' ? 'Recordes e Estatísticas' : 'Records and Statistics',
      description: language === 'pt' ? 'Números, recordes e curiosidades do mundo do futebol' : 'Numbers, records and curiosities from the football world'
    }
  ];

  const defaultFeatures = [
    {
      number: '1',
      bgColor: 'bg-k21-teal/10',
      textColor: 'text-k21-teal',
      title: getTranslation(language, 'realisticQuiz'),
      description: getTranslation(language, 'realisticQuizDesc')
    },
    {
      number: '2',
      bgColor: 'bg-k21-gold/10',
      textColor: 'text-k21-gold',
      title: getTranslation(language, 'detailedResults'),
      description: getTranslation(language, 'detailedResultsDesc')
    },
    {
      number: '3',
      bgColor: 'bg-black/10',
      textColor: 'text-black',
      title: getTranslation(language, 'updatedContent'),
      description: getTranslation(language, 'updatedContentDesc')
    },
    {
      number: '4',
      bgColor: 'bg-green-500/10',
      textColor: 'text-green-500',
      title: getTranslation(language, 'detailedExplanations'),
      description: getTranslation(language, 'detailedExplanationsDesc')
    }
  ];

  const features = isSoccerTheme ? soccerFeatures : defaultFeatures;

  return (
    <div className="max-w-2xl mx-auto text-center space-y-6 animate-fade-in">
      <h1 className="text-3xl font-bold text-k21-black">
        {isSoccerTheme 
          ? (language === 'pt' ? 'Quiz de Futebol' : 'Football Quiz')
          : getTranslation(language, 'certificationQuiz')
        }
        <span className={`block ${isSoccerTheme ? 'text-green-600' : 'text-k21-gold'}`}>
          {themeName || getTranslation(language, 'certifiedScrumMaster')}
        </span>
      </h1>
      
      <div className={`h-1 w-32 mx-auto rounded-full ${isSoccerTheme ? 'bg-gradient-to-r from-green-600 to-yellow-500' : 'bg-gradient-to-r from-k21-gold to-k21-teal'}`} />
      
      <p className="text-muted-foreground">
        {customSubtitle || (isSoccerTheme 
          ? (language === 'pt' ? 'Teste seus conhecimentos sobre o esporte mais popular do mundo!' : 'Test your knowledge about the most popular sport in the world!')
          : getTranslation(language, 'quizDescription')
        )}
      </p>
      
      {!showSizeSelector ? (
        <>
          <Card className="p-6 bg-gradient-to-br from-white to-gray-50">
            <div className="space-y-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center justify-center gap-3">
                  <div className={`w-12 h-12 rounded-full ${feature.bgColor} flex items-center justify-center`}>
                    <span className={`${feature.textColor} font-medium`}>{feature.number}</span>
                  </div>
                  <div className="text-left">
                    <h3 className="font-medium text-k21-black">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              onClick={handleStartClick}
              className="bg-k21-teal hover:bg-k21-teal/90 text-white px-8 py-6 text-lg flex-1"
            >
              {getTranslation(language, 'startQuiz')}
            </Button>
            
            <Button
              onClick={() => window.location.href = gamePath}
              variant="outline"
              className="border-k21-teal text-k21-teal hover:bg-k21-teal hover:text-white px-8 py-6 text-lg flex-1"
            >
              🎮 {getTranslation(language, 'gameMode')}
            </Button>
          </div>
        </>
      ) : selectedSize ? (
        <UserInfoForm onSubmit={handleUserInfoSubmit} selectedSize={selectedSize} />
      ) : (
        <QuizSizeSelector onSelectSize={handleSizeSelection} />
      )}
      
      <p className="text-xs text-muted-foreground">
        {getTranslation(language, 'additionalInfo')} <a href="https://k21.com.br" className="text-k21-gold hover:underline">k21.com.br</a>
      </p>
    </div>
  );
};

export default StartScreen;
