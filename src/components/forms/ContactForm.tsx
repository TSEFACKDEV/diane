'use client';

import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

// Définition des types des champs
interface ContactFormValues {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export function ContactForm() {
  // Schéma de validation Yup
  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, 'Le nom doit contenir au moins 3 caractères')
      .required('Le nom est obligatoire'),
    email: Yup.string()
      .email('Adresse email invalide')
      .required('L\'email est obligatoire'),
    subject: Yup.string()
      .required('Veuillez sélectionner un sujet'),
    message: Yup.string()
      .min(10, 'Votre message doit contenir au moins 10 caractères')
      .required('Le message ne peut pas être vide'),
  });

  const formik = useFormik<ContactFormValues>({
    initialValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        // Simulation d'envoi API (Ex: fetch('/api/contact', ...))
        await new Promise((resolve) => setTimeout(resolve, 1000));
        
        toast.success('Votre message a été envoyé avec succès !', {
          position: "top-right",
          className: 'bg-cream text-burgundy-700 font-body font-semibold'
        });
        resetForm();
      } catch (error) {
        toast.error('Une erreur est survenue lors de l\'envoi.');
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-5 max-w-xl mx-auto bg-surface p-8 rounded-2xl border border-rose-100 shadow-sm">
      <div>
        <label htmlFor="name" className="block text-sm font-body font-semibold text-burgundy-700 mb-1">Nom complet</label>
        <input
          id="name"
          type="text"
          {...formik.getFieldProps('name')}
          className={`w-full px-4 py-3 rounded-lg border font-body text-sm outline-none transition-all ${
            formik.touched.name && formik.errors.name ? 'border-red-400 bg-red-50/30' : 'border-rose-200 focus:border-burgundy-400 focus:ring-1 focus:ring-burgundy-400'
          }`}
          placeholder="Ex: Paul Biya"
        />
        {formik.touched.name && formik.errors.name && (
          <p className="text-red-500 text-xs font-medium mt-1">{formik.errors.name}</p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-body font-semibold text-burgundy-700 mb-1">Adresse email pro</label>
        <input
          id="email"
          type="email"
          {...formik.getFieldProps('email')}
          className={`w-full px-4 py-3 rounded-lg border font-body text-sm outline-none transition-all ${
            formik.touched.email && formik.errors.email ? 'border-red-400 bg-red-50/30' : 'border-rose-200 focus:border-burgundy-400 focus:ring-1 focus:ring-burgundy-400'
          }`}
          placeholder="exemple@domaine.com"
        />
        {formik.touched.email && formik.errors.email && (
          <p className="text-red-500 text-xs font-medium mt-1">{formik.errors.email}</p>
        )}
      </div>

      <div>
        <label htmlFor="subject" className="block text-sm font-body font-semibold text-burgundy-700 mb-1">Sujet de votre demande</label>
        <select
          id="subject"
          {...formik.getFieldProps('subject')}
          className={`w-full px-4 py-3 rounded-lg border font-body text-sm bg-white outline-none transition-all appearance-none ${
            formik.touched.subject && formik.errors.subject ? 'border-red-400 bg-red-50/30' : 'border-rose-200 focus:border-burgundy-400'
          }`}
        >
          <option value="" disabled hidden>Sélectionnez une option</option>
          <option value="accompagnement">Accompagnement Stratégique</option>
          <option value="mentorat">Mentorat Exécutif</option>
          <option value="parcours">Parcours Immersif</option>
          <option value="autre">Autre demande</option>
        </select>
        {formik.touched.subject && formik.errors.subject && (
          <p className="text-red-500 text-xs font-medium mt-1">{formik.errors.subject}</p>
        )}
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-body font-semibold text-burgundy-700 mb-1">Votre message</label>
        <textarea
          id="message"
          rows={4}
          {...formik.getFieldProps('message')}
          className={`w-full px-4 py-3 rounded-lg border font-body text-sm outline-none transition-all resize-none ${
            formik.touched.message && formik.errors.message ? 'border-red-400 bg-red-50/30' : 'border-rose-200 focus:border-burgundy-400 focus:ring-1 focus:ring-burgundy-400'
          }`}
          placeholder="Décrivez brièvement vos besoins ou vos défis actuels..."
        />
        {formik.touched.message && formik.errors.message && (
          <p className="text-red-500 text-xs font-medium mt-1">{formik.errors.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={formik.isSubmitting}
        className="w-full btn-primary py-3.5 text-sm font-semibold rounded-lg transition-all shadow-sm hover:shadow-md disabled:opacity-50"
      >
        {formik.isSubmitting ? 'Envoi en cours...' : 'Envoyer le message'}
      </button>
    </form>
  );
}