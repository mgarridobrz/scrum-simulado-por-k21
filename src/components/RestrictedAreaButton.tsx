
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Shield } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { getTranslation } from '@/utils/translations';

const RestrictedAreaButton = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();

  const handleRestrictedAreaClick = () => {
    navigate('/validate-questions');
  };

  return (
    <Card className="bg-gradient-to-r from-gray-800 to-gray-900 shadow-md p-6 mt-6">
      <div className="text-center space-y-4">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/10 mb-4">
          <Shield className="h-8 w-8 text-white" />
        </div>
        
        <div className="space-y-2">
          <h3 className="text-xl font-bold text-white">
            {language === 'en' ? 'Restricted Area' : 'Área Restrita'}
          </h3>
          <p className="text-gray-300 text-sm">
            {language === 'en' 
              ? 'Access validation tools and administrative features' 
              : 'Acesse ferramentas de validação e recursos administrativos'}
          </p>
        </div>
        
        <Button
          onClick={handleRestrictedAreaClick}
          className="bg-white text-gray-900 hover:bg-gray-100 font-medium"
        >
          {language === 'en' ? 'Access Restricted Area' : 'Acessar Área Restrita'}
        </Button>
      </div>
    </Card>
  );
};

export default RestrictedAreaButton;
