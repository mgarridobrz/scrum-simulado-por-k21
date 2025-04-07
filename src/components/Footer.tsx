
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t mt-auto py-8">
      <div className="container mx-auto px-4">
        {/* Main SEO text - Using data attributes to help prevent content scraping */}
        <div 
          className="text-muted-foreground text-sm leading-relaxed"
          data-nosnippet="true" 
          data-nocopy="true"
        >
          <p>Simulado Gratuito para CSM – Certified ScrumMaster® (Scrum Alliance)
          Simulado online e gratuito para quem deseja se preparar para a certificação CSM (Certified ScrumMaster®) da Scrum Alliance. Desenvolvido pela K21, o teste inclui perguntas no formato da prova oficial, abordando temas como papéis do Scrum, eventos, artefatos e princípios do Ágil. Ideal para quem busca um simulado de Scrum, um teste de certificação Scrum Master ou um quiz de preparação para o exame CSM. Avalie seu conhecimento e aumente suas chances de aprovação na certificação ScrumMaster com este simulado gratuito e completo.</p>
          <p className="mt-2 text-gray-600 font-medium">O banco de dados possui 80 questões disponíveis, selecionando questões aleatórias com um balanço entre categorias.</p>
        </div>
        
        <div className="mt-6 flex justify-between items-center text-xs text-gray-500">
          <div>© {new Date().getFullYear()} K21 Brasil. Todos os direitos reservados.</div>
          <div>Certified ScrumMaster® e CSM® são marcas registradas da Scrum Alliance.</div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
