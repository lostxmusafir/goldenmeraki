import React, { useState } from 'react';
import { Compass, Sparkles, CheckCircle2, ArrowRight, X, RotateCcw, ShoppingBag } from 'lucide-react';
import { PRODUCTS } from '../data/products';

export const ChakraQuiz = ({ isOpen, onClose, onAddToCart, onSelectProduct }) => {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState({
    goal: '',
    blockage: '',
    zodiac: ''
  });
  const [matchedProduct, setMatchedProduct] = useState(null);

  const goals = [
    { id: 'wealth', label: 'Attract Money & Career Growth', icon: '💰', intention: 'wealth' },
    { id: 'peace', label: 'Relieve Stress & Anxiety', icon: '🧘‍♀️', intention: 'peace' },
    { id: 'love', label: 'Attract Unconditional Love', icon: '💖', intention: 'love' },
    { id: 'health', label: 'Boost Vitality & Energy', icon: '🌿', intention: 'health' }
  ];

  const blockages = [
    { id: 'career', label: 'Financial / Business Stagnation' },
    { id: 'mind', label: 'Mental Overwhelm & Insomnia' },
    { id: 'heart', label: 'Heartbreak & Relationship Friction' },
    { id: 'focus', label: 'Lack of Direction & Low Confidence' }
  ];

  const zodiacs = ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'];

  const handleGoalSelect = (goalId) => {
    setAnswers({ ...answers, goal: goalId });
    setStep(2);
  };

  const handleBlockageSelect = (blockId) => {
    setAnswers({ ...answers, blockage: blockId });
    setStep(3);
  };

  const handleZodiacSelect = (zodiacName) => {
    const updated = { ...answers, zodiac: zodiacName };
    setAnswers(updated);

    // Calculate best crystal match based on goal intention
    const matched = PRODUCTS.find(p => p.intention === updated.goal) || PRODUCTS[0];
    setMatchedProduct(matched);
    setStep(4); // Results screen
  };

  const handleReset = () => {
    setStep(1);
    setAnswers({ goal: '', blockage: '', zodiac: '' });
    setMatchedProduct(null);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-indigo-950/40 backdrop-blur-md animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-xl w-full overflow-hidden shadow-2xl border border-violet-100 flex flex-col">
        
        {/* Quiz Modal Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Compass className="w-5 h-5 text-amber-300 animate-spin-slow" />
            <h3 className="font-luxury font-bold text-lg text-white">
              Aura & Crystal Resonance Finder
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 bg-violet-50/50 space-y-6">
          
          {/* Progress Bar */}
          {step <= 3 && (
            <div>
              <div className="flex items-center justify-between text-xs font-bold text-slate-500 mb-1">
                <span>Step {step} of 3</span>
                <span>{step === 1 ? 'Primary Goal' : step === 2 ? 'Energetic Blockage' : 'Zodiac Sign'}</span>
              </div>
              <div className="w-full h-2 bg-violet-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-emerald-500 transition-all duration-300"
                  style={{ width: `${(step / 3) * 100}%` }}
                ></div>
              </div>
            </div>
          )}

          {/* STEP 1: Goal Selection */}
          {step === 1 && (
            <div className="space-y-4 animate-in slide-in-from-right-4">
              <h4 className="font-bold text-lg text-indigo-950 text-center">
                What is your primary energy goal right now?
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {goals.map((g) => (
                  <button
                    key={g.id}
                    onClick={() => handleGoalSelect(g.id)}
                    className="p-4 rounded-2xl bg-white border border-violet-200 hover:border-emerald-500 hover:shadow-md transition-all text-left group flex items-start space-x-3"
                  >
                    <span className="text-2xl">{g.icon}</span>
                    <div>
                      <div className="font-bold text-sm text-indigo-950 group-hover:text-emerald-700 transition-colors">
                        {g.label}
                      </div>
                      <div className="text-xs text-slate-500">Tap to select intention</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 2: Blockage Selection */}
          {step === 2 && (
            <div className="space-y-4 animate-in slide-in-from-right-4">
              <h4 className="font-bold text-lg text-indigo-950 text-center">
                Which area feels most stagnant or blocked?
              </h4>
              <div className="space-y-2.5">
                {blockages.map((b) => (
                  <button
                    key={b.id}
                    onClick={() => handleBlockageSelect(b.id)}
                    className="w-full p-4 rounded-2xl bg-white border border-violet-200 hover:border-emerald-500 hover:shadow-md transition-all text-left font-bold text-sm text-indigo-950 flex items-center justify-between group"
                  >
                    <span>{b.label}</span>
                    <ArrowRight className="w-4 h-4 text-violet-400 group-hover:text-emerald-600 transition-colors" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 3: Zodiac Selection */}
          {step === 3 && (
            <div className="space-y-4 animate-in slide-in-from-right-4">
              <h4 className="font-bold text-lg text-indigo-950 text-center">
                Select your Zodiac Sign for planetary alignment:
              </h4>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                {zodiacs.map((z) => (
                  <button
                    key={z}
                    onClick={() => handleZodiacSelect(z)}
                    className="p-3 rounded-xl bg-white border border-violet-200 hover:border-amber-500 hover:bg-amber-50/50 font-bold text-xs text-indigo-950 text-center transition-all"
                  >
                    {z}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 4: Results Display */}
          {step === 4 && matchedProduct && (
            <div className="space-y-5 animate-in zoom-in-95 text-center">
              <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Your Ideal Energetic Match Found</span>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-violet-200 shadow-md flex flex-col sm:flex-row items-center gap-4 text-left">
                <img 
                  src={matchedProduct.image} 
                  alt={matchedProduct.name} 
                  className="w-24 h-24 object-cover rounded-xl border border-violet-100 flex-shrink-0"
                />
                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-bold text-violet-600 tracking-wider">
                    {matchedProduct.certificate}
                  </span>
                  <h5 className="font-bold text-indigo-950 text-sm line-clamp-2">
                    {matchedProduct.name}
                  </h5>
                  <div className="text-xs text-emerald-700 font-medium">
                    Aligned with {answers.zodiac} & Solar Plexus
                  </div>
                  <div className="text-base font-extrabold text-indigo-950">
                    ₹{matchedProduct.price.toLocaleString()}
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => {
                    onAddToCart(matchedProduct);
                    onClose();
                  }}
                  className="flex-1 py-3 px-4 rounded-xl gradient-btn-emerald font-bold text-xs flex items-center justify-center space-x-2 shadow-md"
                >
                  <ShoppingBag className="w-4 h-4 text-amber-300" />
                  <span>Add Matched Crystal to Cart</span>
                </button>

                <button
                  onClick={handleReset}
                  className="py-3 px-4 rounded-xl bg-violet-100 text-violet-900 font-bold text-xs flex items-center justify-center space-x-1 hover:bg-violet-200 transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Retake Quiz</span>
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
