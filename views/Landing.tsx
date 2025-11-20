import React from 'react';
import { motion } from 'framer-motion';
import { Clock, DollarSign, BarChart3, ArrowRight } from 'lucide-react';
import { Button } from '../components/Button';

interface LandingProps {
  onStart: () => void;
}

export const Landing: React.FC<LandingProps> = ({ onStart }) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-5xl mx-auto px-6 py-12 min-h-screen flex flex-col lg:flex-row items-center justify-center gap-12"
    >
      <div className="flex-1 space-y-8 text-center lg:text-left">
        <div className="space-y-4">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-block px-4 py-1 bg-brand-100 text-brand-900 rounded-full text-sm font-semibold tracking-wide mx-auto lg:mx-0"
          >
            BUSINESS HEALTH CHECK
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-5xl md:text-6xl font-extrabold text-slate-900 leading-tight"
          >
            The 90-Second Test: How Much Is <span className="text-transparent bg-clip-text bg-gradient-to-r from-danger-600 to-accent-500">"The Grind"</span> REALLY Costing Your Business?
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl text-slate-600 leading-relaxed"
          >
            Stop guessing. Take this quick, 7-question assessment to get your personalized <strong>"Grind Score"</strong> and discover the exact number of hours and dollars you're losing every month to chaos and manual tasks.
          </motion.p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col items-center lg:items-start"
        >
          <Button onClick={onStart} variant="danger" fullWidth={false} className="md:w-auto w-full">
            START MY FREE GRIND SCORE <ArrowRight size={20} />
          </Button>
          <p className="mt-4 text-sm text-slate-500 flex items-center justify-center lg:justify-start gap-2">
            <Clock size={16} /> Takes less than 90 seconds. No credit card required.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-8 border-t border-slate-200"
        >
          {[
            { icon: Clock, text: "Quantify time-wasters" },
            { icon: DollarSign, text: "Hidden cost analysis" },
            { icon: BarChart3, text: "Reclaim 20+ hours" },
          ].map((item, idx) => (
            <div key={idx} className="flex items-center justify-center lg:justify-start gap-3 text-slate-700 font-medium">
              <div className="p-2 bg-brand-50 rounded-lg text-brand-600">
                <item.icon size={20} />
              </div>
              {item.text}
            </div>
          ))}
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="flex-1 relative"
      >
        <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
          {/* Using a specific, high-quality image of a stressed/thinking businessman */}
          <img 
            src="https://images.unsplash.com/photo-1529421308418-eab98863cee4?q=80&w=2076&auto=format&fit=crop" 
            alt="Frustrated business owner" 
            className="w-full h-[600px] object-cover grayscale hover:grayscale-0 transition-all duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent flex items-end p-8">
            <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/20 text-white w-full">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium opacity-80">Current Status</span>
                <span className="text-red-400 font-bold">CRITICAL</span>
              </div>
              <div className="w-full bg-white/20 h-2 rounded-full overflow-hidden">
                <div className="w-[85%] h-full bg-red-500"></div>
              </div>
              <p className="mt-2 text-xs opacity-70">Efficiency operating at 15% capacity</p>
            </div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute -top-10 -right-10 w-64 h-64 bg-brand-200 rounded-full blur-3xl opacity-30 -z-10"></div>
        <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-danger-200 rounded-full blur-3xl opacity-30 -z-10"></div>
      </motion.div>
    </motion.div>
  );
};