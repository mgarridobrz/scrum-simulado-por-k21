
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import QuizSizeSelector from './QuizSizeSelector';
import UserInfoForm from './UserInfoForm';
import { useLanguage } from '@/contexts/LanguageContext';
import { getTranslation } from '@/utils/translations';

interface StartScreenProps {
  onStart: (size: number, userData?: { name: string; email: string }) => void;
}

const StartScreen = ({ onStart }: StartScreenProps) => {
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

  return (
    <div className="max-w-2xl mx-auto text-center space-y-6 animate-fade-in">
      <h1 className="text-3xl font-bold text-k21-black">
        {getTranslation(language, 'certificationQuiz')}
        <span className="text-k21-gold block">{getTranslation(language, 'certifiedScrumMaster')}</span>
      </h1>
      
      <div className="bg-gradient-to-r from-k21-gold to-k21-teal h-1 w-32 mx-auto rounded-full" />
      
      <p className="text-muted-foreground">
        {getTranslation(language, 'quizDescription')}
      </p>
      
      {!showSizeSelector ? (
        <>
          <Card className="p-6 bg-gradient-to-br from-white to-gray-50">
            <div className="space-y-4">
              <div className="flex items-center justify-center gap-3">
                <div className="w-12 h-12 rounded-full bg-k21-teal/10 flex items-center justify-center">
                  <span className="text-k21-teal font-medium">1</span>
                </div>
                <div className="text-left">
                  <h3 className="font-medium text-k21-black">{getTranslation(language, 'realisticQuiz')}</h3>
                  <p className="text-sm text-muted-foreground">{getTranslation(language, 'realisticQuizDesc')}</p>
                </div>
              </div>
              
              <div className="flex items-center justify-center gap-3">
                <div className="w-12 h-12 rounded-full bg-k21-gold/10 flex items-center justify-center">
                  <span className="text-k21-gold font-medium">2</span>
                </div>
                <div className="text-left">
                  <h3 className="font-medium text-k21-black">{getTranslation(language, 'detailedResults')}</h3>
                  <p className="text-sm text-muted-foreground">{getTranslation(language, 'detailedResultsDesc')}</p>
                </div>
              </div>
              
              <div className="flex items-center justify-center gap-3">
                <div className="w-12 h-12 rounded-full bg-black/10 flex items-center justify-center">
                  <span className="text-black font-medium">3</span>
                </div>
                <div className="text-left">
                  <h3 className="font-medium text-k21-black">{getTranslation(language, 'updatedContent')}</h3>
                  <p className="text-sm text-muted-foreground">{getTranslation(language, 'updatedContentDesc')}</p>
                </div>
              </div>
              
              <div className="flex items-center justify-center gap-3">
                <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center">
                  <span className="text-green-500 font-medium">4</span>
                </div>
                <div className="text-left">
                  <h3 className="font-medium text-k21-black">{getTranslation(language, 'detailedExplanations')}</h3>
                  <p className="text-sm text-muted-foreground">{getTranslation(language, 'detailedExplanationsDesc')}</p>
                </div>
              </div>
            </div>
          </Card>
          
          <Button
            onClick={handleStartClick}
            className="bg-k21-teal hover:bg-k21-teal/90 text-white px-8 py-6 text-lg"
          >
            {getTranslation(language, 'startQuiz')}
          </Button>
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
