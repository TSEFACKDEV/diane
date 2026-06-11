'use client';

import React, { useState } from 'react';
// Importations théoriques à ajuster selon ta structure Redux exacte :
// import { useDispatch, useSelector } from 'react-redux';
// import { updateDiagnosticData } from '@/store/diagnosticSlice';

export function DiagnosticForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;

  // Gestion des états locaux simples avant envoi au store global
  const [answers, setAnswers] = useState({
    governanceLevel: '',
    mainChallenge: '',
    priorityTimeframe: ''
  });

  const handleSelect = (field: string, value: string) => {
    setAnswers(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (currentStep < totalSteps) setCurrentStep(prev => prev + 1);
  };

  const handlePrev = () => {
    if (currentStep > 1) setCurrentStep(prev => prev - 1);
  };

  const handleSubmit = () => {
    console.log("Diagnostic Final soumis au Store global :", answers);
    alert("Merci ! Votre pré-diagnostic a été enregistré.");
  };

  return (
    <div className="max-w-2xl mx-auto bg-surface p-8 rounded-2xl border border-rose-100 shadow-xl">
      
      {/* Barre de Progression */}
      <div className="mb-8">
        <div className="flex justify-between text-xs font-body font-bold text-burgundy-700 uppercase mb-2">
          <span>Étape {currentStep} sur {totalSteps}</span>
          <span>{Math.round((currentStep / totalSteps) * 100)}% Complété</span>
        </div>
        <div className="w-full h-2 bg-rose-50 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-gold transition-all duration-300"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          />
        </div>
      </div>

      {/* Étape 1 : Auto-évaluation de la gouvernance */}
      {currentStep === 1 && (
        <div className="space-y-4">
          <h4 className="font-display font-bold text-xl text-burgundy-700">Comment évaluez-vous votre gouvernance actuelle ?</h4>
          <p className="text-sm text-gray-500 font-body">Sélectionnez la situation qui décrit le mieux votre conseil.</p>
          
          <div className="grid grid-cols-1 gap-3 pt-2">
            {[
              { id: 'low', label: 'Informelle (Processus non documentés, décisions réactives)' },
              { id: 'medium', label: 'En transition (Processus existants mais manque d\'alignement stratégique)' },
              { id: 'high', label: 'Excellente (Gouvernance structurée, impact clair et sécurisé)' }
            ].map(item => (
              <button
                key={item.id}
                type="button"
                onClick={() => handleSelect('governanceLevel', item.id)}
                className={`w-full p-4 text-left font-body text-sm rounded-xl border transition-all ${
                  answers.governanceLevel === item.id 
                    ? 'border-burgundy-700 bg-burgundy-50/20 font-semibold text-burgundy-900' 
                    : 'border-rose-100 hover:border-rose-300 bg-white'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Étape 2 : Le défi principal */}
      {currentStep === 2 && (
        <div className="space-y-4">
          <h4 className="font-display font-bold text-xl text-burgundy-700">Quel est votre plus grand défi exécutif ?</h4>
          
          <div className="grid grid-cols-1 gap-3 pt-2">
            {[
              { id: 'posture', label: 'La transformation de la posture des dirigeants' },
              { id: 'risk', label: 'La sécurisation de l\'impact des décisions critiques' },
              { id: 'succession', label: 'La gestion de la conformité et de la succession' }
            ].map(item => (
              <button
                key={item.id}
                type="button"
                onClick={() => handleSelect('mainChallenge', item.id)}
                className={`w-full p-4 text-left font-body text-sm rounded-xl border transition-all ${
                  answers.mainChallenge === item.id 
                    ? 'border-burgundy-700 bg-burgundy-50/20 font-semibold text-burgundy-900' 
                    : 'border-rose-100 hover:border-rose-300 bg-white'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Étape 3 : Horizon temporel */}
      {currentStep === 3 && (
        <div className="space-y-4">
          <h4 className="font-display font-bold text-xl text-burgundy-700">Sous quel horizon souhaitez-vous agir ?</h4>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            {[
              { id: 'immediat', label: 'Immédiat (< 3 mois)' },
              { id: 'court', label: 'Court terme (3-6 mois)' },
              { id: 'veille', label: 'Veille stratégique' }
            ].map(item => (
              <button
                key={item.id}
                type="button"
                onClick={() => handleSelect('priorityTimeframe', item.id)}
                className={`w-full p-5 text-center font-body text-sm rounded-xl border transition-all ${
                  answers.priorityTimeframe === item.id 
                    ? 'border-burgundy-700 bg-burgundy-50/20 font-semibold text-burgundy-900' 
                    : 'border-rose-100 hover:border-rose-300 bg-white'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Boutons de Navigation entre les étapes */}
      <div className="flex justify-between items-center mt-8 pt-4 border-t border-rose-100">
        <button
          type="button"
          onClick={handlePrev}
          disabled={currentStep === 1}
          className="px-5 py-2.5 rounded-lg border border-rose-200 text-burgundy-700 font-body font-semibold text-sm hover:bg-rose-50/50 disabled:opacity-30 transition-all"
        >
          Précédent
        </button>

        {currentStep < totalSteps ? (
          <button
            type="button"
            onClick={handleNext}
            className="px-6 py-2.5 rounded-lg btn-primary text-sm font-semibold transition-all"
          >
            Suivant
          </button>
        ) : (
          <button
            type="button"
            onClick={handleSubmit}
            className="px-6 py-2.5 rounded-lg bg-gradient-gold text-burgundy-950 font-body font-bold text-sm shadow-sm hover:brightness-105 transition-all"
          >
            Soumettre l'évaluation
          </button>
        )}
      </div>

    </div>
  );
}