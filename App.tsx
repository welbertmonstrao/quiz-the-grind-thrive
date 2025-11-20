import React, { useState } from 'react';
import { AppState, UserData } from './types';
import { Landing } from './views/Landing';
import { Quiz } from './views/Quiz';
import { LeadCapture } from './views/LeadCapture';
import { Results } from './views/Results';
import { AnimatePresence, motion } from 'framer-motion';
import { supabase } from './supabaseClient';

const App: React.FC = () => {
  const [view, setView] = useState<AppState>('LANDING');
  const [userData, setUserData] = useState<UserData>({
    answers: {},
    email: '',
    revenueRange: ''
  });

  const handleQuizStart = () => {
    setView('QUIZ');
    window.scrollTo(0, 0);
  };

  const handleAnswer = (questionId: number, score: number, optionText: string) => {
    setUserData(prev => {
      // If it's the revenue question (ID 7), save the text range for calculation
      const updates: Partial<UserData> = {
        answers: { ...prev.answers, [questionId]: score }
      };
      
      if (questionId === 7) {
        updates.revenueRange = optionText;
      }
      
      return { ...prev, ...updates };
    });
  };

  const handleQuizComplete = () => {
    setView('CAPTURE');
    window.scrollTo(0, 0);
  };

  const handleLeadSubmit = async (email: string) => {
    // 1. Calculate final score locally
    const totalScore = Object.values(userData.answers).reduce((a: number, b: number) => a + b, 0);
    
    // 2. Update local state (optional, for UI consistency)
    setUserData(prev => ({ ...prev, email }));

    // 3. Send to Supabase
    try {
      const { error } = await supabase
        .from('leads')
        .insert([
          { 
            email: email, 
            score: totalScore, 
            revenue_range: userData.revenueRange,
            answers: userData.answers 
          },
        ]);

      if (error) {
        console.error('Error saving lead:', error);
        // Depending on your strategy, you might still show results 
        // even if saving fails, or show an error alert.
        // For now, we log it and proceed so the user isn't stuck.
      }

    } catch (err) {
      console.error('Unexpected error:', err);
    }

    // 4. Move to Results
    setView('RESULTS');
    window.scrollTo(0, 0);
  };

  // Calculate total score for display
  const totalScore = Object.values(userData.answers).reduce((a: number, b: number) => a + b, 0);

  return (
    <div className="font-sans antialiased text-slate-900 bg-white selection:bg-brand-200 selection:text-brand-900">
      <AnimatePresence mode="wait">
        {view === 'LANDING' && (
          <motion.div key="landing" exit={{ opacity: 0 }} className="min-h-screen">
            <Landing onStart={handleQuizStart} />
          </motion.div>
        )}
        
        {view === 'QUIZ' && (
          <motion.div key="quiz" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Quiz onAnswer={handleAnswer} onComplete={handleQuizComplete} />
          </motion.div>
        )}

        {view === 'CAPTURE' && (
          <motion.div key="capture" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <LeadCapture onSubmit={handleLeadSubmit} />
          </motion.div>
        )}

        {view === 'RESULTS' && (
          <motion.div key="results" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Results score={totalScore} revenueRange={userData.revenueRange} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;