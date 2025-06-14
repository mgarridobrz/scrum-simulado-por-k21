
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
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
    <Button
      onClick={handleRestrictedAreaClick}
      className="fixed bottom-6 right-6 w-12 h-12 rounded-full bg-gray-800 hover:bg-gray-700 text-white shadow-lg z-50 p-0"
      title={getTranslation(language, 'accessRestrictedArea')}
    >
      <Shield className="h-5 w-5" />
    </Button>
  );
};

export default RestrictedAreaButton;
