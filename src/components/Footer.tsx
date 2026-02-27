
import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { getFaqData } from '@/hooks/useMetaTags';
import { ChevronDown, ChevronUp } from 'lucide-react';

const footerTexts = {
  pt: `Simulado Gratuito para CSM – Certified ScrumMaster® (Scrum Alliance)
Simulado online e gratuito para quem deseja se preparar para a certificação CSM (Certified ScrumMaster®) da Scrum Alliance. Desenvolvido pela K21, o teste inclui perguntas no formato da prova oficial, abordando temas como papéis do Scrum, eventos, artefatos e princípios do Ágil. Ideal para quem busca um simulado de Scrum, um teste de certificação Scrum Master ou um quiz de preparação para o exame CSM. Avalie seu conhecimento e aumente suas chances de aprovação na certificação ScrumMaster com este simulado gratuito e completo. O banco de dados possui 80 questões disponíveis, selecionando questões aleatórias com um balanço entre categorias.`,
  en: `Free CSM practice exam – Certified ScrumMaster® (Scrum Alliance)
Take our free online practice test to prepare for the CSM (Certified ScrumMaster®) certification from Scrum Alliance. Developed by K21, this quiz features official exam-style questions covering roles, events, artifacts, and Agile principles. Perfect for those seeking a Scrum quiz, a Scrum Master certification test, or a CSM exam prep. Assess your knowledge and boost your chances of passing with this comprehensive, free ScrumMaster practice exam. The question bank contains 80 questions and selects random questions with a balance across categories.`
};

const Footer = () => {
  const { language } = useLanguage();
  const faqItems = getFaqData(language);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <footer className="bg-gray-50 border-t mt-auto py-8">
      <div className="container mx-auto px-4">
        {/* FAQ Section - matches FAQPage schema */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-foreground mb-4">
            {language === 'pt' ? 'Perguntas Frequentes sobre a Certificação CSM' : 'Frequently Asked Questions about CSM Certification'}
          </h2>
          <div className="space-y-2">
            {faqItems.map((item: { question: string; answer: string }, index: number) => (
              <div key={index} className="border rounded-lg bg-white">
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full flex items-center justify-between px-4 py-3 text-left text-sm font-medium text-foreground hover:bg-gray-50 transition-colors"
                  aria-expanded={openIndex === index}
                >
                  <span>{item.question}</span>
                  {openIndex === index ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
                {openIndex === index && (
                  <div className="px-4 pb-3 text-sm text-muted-foreground">
                    {item.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Main SEO text */}
        <div className="text-muted-foreground text-sm leading-relaxed">
          <p>{footerTexts[language]}</p>
        </div>
        
        <div className="mt-6 flex justify-between items-center text-xs text-gray-500">
          <div>© {new Date().getFullYear()} K21 Brasil. {language === 'pt' ? 'Todos os direitos reservados.' : 'All rights reserved.'}</div>
          <div>
            Certified ScrumMaster® {language === 'pt' ? 'e CSM® são marcas registradas da Scrum Alliance.' : 'and CSM® are registered trademarks of Scrum Alliance.'}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
