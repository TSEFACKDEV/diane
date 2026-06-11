'use client';

import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

// ASSURE-TOI BIEN QU'IL Y A "export function" ICI :
export function NewsletterForm() {
  const formik = useFormik({
    initialValues: { email: '' },
    validationSchema: Yup.object({
      email: Yup.string().email('Email invalide').required('Requis'),
    }),
    onSubmit: async (values, { resetForm }) => {
      await new Promise((resolve) => setTimeout(resolve, 800));
      toast.success('Merci pour votre inscription à la newsletter !');
      resetForm();
    },
  });

  return (
    <div className="max-w-md w-full">
      <form onSubmit={formik.handleSubmit} className="flex flex-col sm:flex-row gap-2">
        <div className="relative flex-1">
          <input
            type="email"
            placeholder="Votre adresse email"
            {...formik.getFieldProps('email')}
            className="w-full px-4 py-3 rounded-lg bg-white/10 text-white font-body text-sm border border-white/20 focus:border-gold-400 outline-none placeholder-gray-400 transition-all"
          />
        </div>
        <button
          type="submit"
          disabled={formik.isSubmitting}
          className="bg-gradient-gold text-burgundy-950 px-6 py-3 rounded-lg font-body text-sm font-bold shadow-sm hover:brightness-110 transition-all disabled:opacity-50 whitespace-nowrap"
        >
          {formik.isSubmitting ? '...' : 'S\'abonner'}
        </button>
      </form>
      {formik.touched.email && formik.errors.email && (
        <p className="text-red-400 text-xs font-medium mt-1 ml-1">{formik.errors.email}</p>
      )}
    </div>
  );
}