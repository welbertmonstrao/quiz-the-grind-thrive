import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, ArrowRight, CheckCircle2, Loader2 } from 'lucide-react';
import { Button } from '../components/Button';

interface LeadCaptureProps {
  onSubmit: (email: string) => Promise<void>; // Changed to Promise
}

export const LeadCapture: React.FC<LeadCaptureProps> = ({ onSubmit }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }
    
    setIsSubmitting(true);
    try {
      await onSubmit(email);
    } catch (err) {
      setError('Something went wrong. Please try again.');
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen flex items-center justify-center px-6 bg-gradient-to-b from-brand-50 to-white"
    >
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-2xl border border-slate-100">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 size={32} />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Analysis Complete!</h2>
          <p className="text-slate-600">
            We've calculated your Grind Score. Enter your email below to unlock your personalized results and the blueprint to fix it.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError('');
              }}
              disabled={isSubmitting}
              placeholder="ceo@yourbusiness.com"
              className="w-full px-4 py-3 rounded-lg border border-slate-300 bg-white text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all shadow-sm disabled:bg-slate-50 disabled:text-slate-400"
            />
            {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
          </div>

          <Button type="submit" fullWidth onClick={() => {}} className={isSubmitting ? 'opacity-80 cursor-not-allowed' : ''}>
            {isSubmitting ? (
              <>Processing <Loader2 className="animate-spin ml-2" size={18} /></>
            ) : (
              <>SEND MY SCORE & BLUEPRINT <ArrowRight size={18} /></>
            )}
          </Button>
        </form>

        <div className="mt-6 flex items-center justify-center gap-2 text-xs text-slate-400">
          <Lock size={12} />
          <span>We respect your privacy. Unsubscribe at any time.</span>
        </div>
      </div>
    </motion.div>
  );
};