import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, CheckCircle, ShieldCheck, Timer, Wallet, TrendingUp } from 'lucide-react';
import { Button } from '../components/Button';

interface ResultsProps {
  score: number;
  revenueRange: string;
}

export const Results: React.FC<ResultsProps> = ({ score, revenueRange }) => {
  // Calculations (Mock logic based on inputs)
  const maxScore = 35;
  const percentage = Math.round((score / maxScore) * 100);
  
  let state = 'LOW'; // default
  if (score >= 25) state = 'CRISIS';
  else if (score >= 15) state = 'STUCK';

  // Dynamic Content
  const content = {
    CRISIS: {
      color: 'text-danger-600',
      bgColor: 'bg-danger-50',
      borderColor: 'border-danger-200',
      headline: "Your business is currently operating in CRISIS MODE.",
      subhead: "The Grind is winning.",
      icon: AlertTriangle
    },
    STUCK: {
      color: 'text-orange-500',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200',
      headline: "Your business is STUCK IN THE MIDDLE.",
      subhead: "You are one crisis away from total burnout.",
      icon: Timer
    },
    LOW: {
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      headline: "Congratulations, you have a solid foundation!",
      subhead: "But you are still leaving money on the table.",
      icon: CheckCircle
    }
  }[state];

  // Estimated Losses Logic
  const estimatedHours = score * 2.5; // Random multiplier for effect
  
  let baseRevenue = 5000;
  if (revenueRange.includes('50k')) baseRevenue = 75000;
  else if (revenueRange.includes('10k')) baseRevenue = 30000;
  
  // Chaos tax: higher score = higher percentage of revenue wasted
  const lossPercentage = score / 100; 
  const estimatedMoney = Math.round(baseRevenue * lossPercentage);

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-6">
      <div className="max-w-4xl mx-auto space-y-12">
        
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-6"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900">Your Business Grind Score</h1>
          
          {/* Score Circle with Fixed ViewBox */}
          <div className="relative w-64 h-64 mx-auto flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 200 200">
              <circle cx="100" cy="100" r="80" stroke="#e2e8f0" strokeWidth="12" fill="transparent" />
              <motion.circle 
                cx="100" cy="100" r="80" 
                stroke="currentColor" 
                strokeWidth="12" 
                fill="transparent" 
                className={content.color}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: percentage / 100 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                strokeLinecap="round"
                strokeDasharray="1"
                strokeDashoffset="0"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className={`text-6xl font-extrabold ${content.color}`}>{score}</span>
              <span className="text-slate-400 font-medium text-sm tracking-widest mt-2">OUT OF 35</span>
            </div>
          </div>

          <div className={`p-6 rounded-xl border-2 ${content.bgColor} ${content.borderColor} max-w-2xl mx-auto`}>
            <div className="flex items-center justify-center gap-3 mb-2">
              <content.icon className={`w-6 h-6 ${content.color}`} />
              <h2 className={`text-xl font-bold ${content.color}`}>{content.headline}</h2>
            </div>
            <p className="text-slate-700 font-medium">{content.subhead}</p>
            {state !== 'LOW' && (
              <p className="mt-4 text-slate-600">
                You are losing an estimated <span className="font-bold text-slate-900">{Math.round(estimatedHours)} hours</span> and <span className="font-bold text-slate-900">${estimatedMoney.toLocaleString()}</span> per month to chaos.
              </p>
            )}
          </div>
        </motion.div>

        {/* Solution Section */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100"
        >
          <div className="bg-slate-900 p-8 text-white text-center">
            <h3 className="text-2xl font-bold mb-2">You are not the problem. Your system is.</h3>
            <p className="text-slate-300">The good news is that you don't need to work harder. You need to install the <span className="text-brand-400 font-bold">Client Flywheel</span>.</p>
          </div>
          
          <div className="p-8 md:p-12 grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              {/* Thrive Logo - Centered inside solution block */}
              <div className="flex items-center justify-center gap-2 mb-4">
                <svg width="32" height="32" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="20" cy="20" r="18" stroke="#2563eb" strokeWidth="3" />
                  <path d="M12 14H28M20 14V28" stroke="#2563eb" strokeWidth="3" strokeLinecap="round" />
                  <path d="M20 28C24 28 26 24 28 16" stroke="#2563eb" strokeWidth="3" strokeLinecap="round" />
                  <path d="M25 16L28 16L28 19" stroke="#2563eb" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className="text-2xl font-extrabold tracking-tight text-brand-600">Thrive</span>
              </div>

              <h4 className="text-xl font-bold text-slate-900 text-center md:text-left">We built Thrive to be the only system that fixes your exact score.</h4>
              <ul className="space-y-4">
                {[
                  "Reclaim your first 20 hours (Guaranteed).",
                  "Automate your customer communication (No more 10 PM DMs).",
                  "Turn happy customers into a referral engine (More money, less effort)."
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="mt-1 min-w-[20px] h-5 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                      <CheckCircle size={14} />
                    </div>
                    <span className="text-slate-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-slate-50 p-8 rounded-xl border border-slate-200 text-center space-y-6">
              <div className="space-y-2">
                <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Recommended Step</p>
                <h3 className="text-2xl font-bold text-slate-900">Start Your 14-Day Free Trial</h3>
                <p className="text-slate-600 text-sm">Stop bleeding time and money. See your Grind Score drop to zero.</p>
              </div>
              
              <Button fullWidth onClick={() => alert("Redirecting to Thrive Trial...")}>
                START MY FREE TRIAL
              </Button>

              <div className="flex items-start gap-3 text-left bg-white p-4 rounded-lg shadow-sm border border-slate-100">
                <ShieldCheck className="text-brand-600 w-8 h-8 shrink-0" />
                <p className="text-xs text-slate-500 leading-relaxed">
                  <strong className="text-slate-700 block mb-1">Ironclad Guarantee</strong>
                  If Thrive doesn't save you at least 10 hours in 30 days, we refund your money + pay you $100. You literally cannot lose.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
};