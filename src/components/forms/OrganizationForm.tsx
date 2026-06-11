'use client';

import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

interface OrgFormValues {
  companyName: string;
  industry: string;
  size: string;
  website: string;
}

export function OrganizationForm() {
  const formik = useFormik<OrgFormValues>({
    initialValues: {
      companyName: '',
      industry: '',
      size: '',
      website: '',
    },
    validationSchema: Yup.object({
      companyName: Yup.string().required('Le nom de l\'organisation est requis'),
      industry: Yup.string().required('Le secteur d\'activité est requis'),
      size: Yup.string().required('La taille de la structure est requise'),
      website: Yup.string().url('Doit être une URL valide (ex: https://...)'),
    }),
    onSubmit: async (values) => {
      console.log('Organisation enregistrée :', values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-5 max-w-xl mx-auto bg-surface p-8 rounded-2xl border border-rose-100 shadow-sm">
      <h3 className="font-display font-bold text-xl text-burgundy-700 mb-6 border-b border-rose-100 pb-2">Profil de l'Organisation</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="companyName" className="block text-sm font-body font-semibold text-burgundy-700 mb-1">Nom de l'entité</label>
          <input
            id="companyName"
            type="text"
            {...formik.getFieldProps('companyName')}
            className={`w-full px-4 py-2.5 rounded-lg border font-body text-sm outline-none ${
              formik.touched.companyName && formik.errors.companyName ? 'border-red-400' : 'border-rose-200 focus:border-burgundy-400'
            }`}
          />
          {formik.touched.companyName && formik.errors.companyName && <p className="text-red-500 text-xs mt-1">{formik.errors.companyName}</p>}
        </div>

        <div>
          <label htmlFor="industry" className="block text-sm font-body font-semibold text-burgundy-700 mb-1">Secteur d'activité</label>
          <input
            id="industry"
            type="text"
            placeholder="Ex: Banque, Télécoms, État"
            {...formik.getFieldProps('industry')}
            className={`w-full px-4 py-2.5 rounded-lg border font-body text-sm outline-none ${
              formik.touched.industry && formik.errors.industry ? 'border-red-400' : 'border-rose-200 focus:border-burgundy-400'
            }`}
          />
          {formik.touched.industry && formik.errors.industry && <p className="text-red-500 text-xs mt-1">{formik.errors.industry}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="size" className="block text-sm font-body font-semibold text-burgundy-700 mb-1">Taille (Effectif)</label>
          <select
            id="size"
            {...formik.getFieldProps('size')}
            className="w-full px-4 py-2.5 rounded-lg border border-rose-200 font-body text-sm outline-none bg-white focus:border-burgundy-400"
          >
            <option value="">Sélectionnez...</option>
            <option value="1-50">1 - 50 employés</option>
            <option value="51-250">51 - 250 employés</option>
            <option value="250+">Plus de 250 employés</option>
          </select>
          {formik.touched.size && formik.errors.size && <p className="text-red-500 text-xs mt-1">{formik.errors.size}</p>}
        </div>

        <div>
          <label htmlFor="website" className="block text-sm font-body font-semibold text-burgundy-700 mb-1">Site internet (Optionnel)</label>
          <input
            id="website"
            type="text"
            placeholder="https://..."
            {...formik.getFieldProps('website')}
            className="w-full px-4 py-2.5 rounded-lg border border-rose-200 font-body text-sm outline-none focus:border-burgundy-400"
          />
          {formik.touched.website && formik.errors.website && <p className="text-red-500 text-xs mt-1">{formik.errors.website}</p>}
        </div>
      </div>

      <button type="submit" className="w-full btn-primary py-3 text-sm font-semibold rounded-lg mt-4">
        Enregistrer la structure
      </button>
    </form>
  );
}