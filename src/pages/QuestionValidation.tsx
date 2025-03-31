
import React, { useState } from 'react';
import NavigationBar from '@/components/question-validation/NavigationBar';
import QuestionEditor from '@/components/question-validation/QuestionEditor';
import AuthScreen from '@/components/question-validation/AuthScreen';
import GlobalStatsCounter from '@/components/question-validation/GlobalStatsCounter';
import AttemptsList from '@/components/question-validation/AttemptsList';
import { useQuestionValidation } from '@/hooks/useQuestionValidation';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Info } from 'lucide-react';

const QuestionValidation = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('fundamentals');
  const [showAttempts, setShowAttempts] = useState(false);
  
  const {
    questions,
    loading,
    addQuestion,
    removeQuestion,
    updateQuestion,
    approveQuestion,
    disapproveQuestion,
    error,
  } = useQuestionValidation(activeTab);

  const handleAuth = (password: string) => {
    if (password === 'k21admin') {
      setAuthenticated(true);
      localStorage.setItem('validationPageAuthenticated', 'true');
    } else {
      alert('Senha incorreta');
    }
  };

  // Check if already authenticated in localStorage
  React.useEffect(() => {
    const isAuth = localStorage.getItem('validationPageAuthenticated') === 'true';
    if (isAuth) {
      setAuthenticated(true);
    }
  }, []);

  if (!authenticated) {
    return <AuthScreen onAuth={handleAuth} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <NavigationBar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onShowAttempts={() => setShowAttempts(!showAttempts)}
        showingAttempts={showAttempts}
      />
      
      <div className="container mx-auto px-4 py-8 flex-1">
        {error && (
          <Alert variant="destructive" className="mb-6">
            <Info className="h-4 w-4" />
            <AlertTitle>Erro</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Add Global Stats Counter */}
        <div className="mb-6">
          <GlobalStatsCounter />
        </div>

        {showAttempts ? (
          <AttemptsList />
        ) : (
          <QuestionEditor
            questions={questions}
            loading={loading}
            onAddQuestion={addQuestion}
            onRemoveQuestion={removeQuestion}
            onUpdateQuestion={updateQuestion}
            onApproveQuestion={approveQuestion}
            onDisapproveQuestion={disapproveQuestion}
            category={activeTab}
          />
        )}
      </div>
    </div>
  );
};

export default QuestionValidation;
