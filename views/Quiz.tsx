import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { QUESTIONS } from '../data';
import { Option } from '../types';

interface QuizProps {
  onAnswer: (questionId: number, score: number, optionText: string) => void;
  onComplete: () => void;
}

export const Quiz: React.FC<QuizProps> = ({ onAnswer, onComplete }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const question = QUESTIONS[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / QUESTIONS.length) * 100;

  const handleOptionClick = (option: Option) => {
    onAnswer(question.id, option.score, option.text);
    
    if (currentQuestionIndex < QUESTIONS.length - 1) {
      setDirection(1);
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      onComplete();
    }
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 50 : -50,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -50 : 50,
      opacity: 0
    })
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center max-w-2xl mx-auto px-6 py-12">
      <div className="w-full mb-12">
        <div className="flex justify-between text-sm font-medium text-slate-500 mb-2">
          <span>Question {currentQuestionIndex + 1} of {QUESTIONS.length}</span>
          <span>{Math.round(progress)}% Completed</span>
        </div>
        <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            className="h-full bg-brand-600 rounded-full"
          />
        </div>
      </div>

      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={currentQuestionIndex}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="w-full"
        >
          <span className="text-brand-600 font-bold tracking-wider text-sm uppercase mb-4 block">
            {question.category}
          </span>
          <h2 className="text-3xl font-bold text-slate-900 mb-8 leading-snug">
            {question.text}
          </h2>

          <div className="space-y-4">
            {question.options.map((option) => (
              <motion.button
                key={option.id}
                whileHover={{ scale: 1.01, x: 4 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => handleOptionClick(option)}
                className="w-full text-left p-6 rounded-xl border-2 border-slate-100 bg-white hover:border-brand-500 hover:shadow-lg hover:shadow-brand-500/10 transition-all duration-200 group"
              >
                <div className="flex items-center gap-4">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center font-bold group-hover:bg-brand-100 group-hover:text-brand-700 transition-colors">
                    {option.id}
                  </span>
                  <span className="text-lg text-slate-700 font-medium group-hover:text-slate-900">
                    {option.text}
                  </span>
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};