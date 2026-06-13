'use client';

import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { Button } from '@/components/ui/Button';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { FadeInUp } from '@/components/ui/FadeInUp';

const newsletterSchema = Yup.object({
  email: Yup.string().email('Adresse email invalide').required('L\'email est requis'),
});

export function NewsletterSection() {
  const handleSubmit = async (
    values: { email: string },
    { resetForm, setSubmitting }: any
  ) => {
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      const data = await res.json();

      if (data.success) {
        toast.success('Inscription réussie ! Vérifiez votre boîte mail.');
        resetForm();
      } else {
        toast.error(data.message || 'Une erreur est survenue');
      }
    } catch {
      toast.error('Erreur de connexion');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="section bg-gradient-burgundy">
      <div className="max-w-3xl mx-auto text-center">
        <FadeInUp>
          <span className="text-xs font-body font-bold tracking-widest text-gold-300 uppercase">
            Newsletter
          </span>
          <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-tight mt-3">
            Restez informée de nos actualités
          </h2>
          <p className="font-body text-rose-100 text-sm md:text-base mt-3 mb-8 max-w-xl mx-auto">
            Conseils, ressources, opportunités et histoires inspirantes de femmes leaders en Afrique — directement dans votre boîte mail.
          </p>

          <Formik
            initialValues={{ email: '' }}
            validationSchema={newsletterSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <div className="flex-1">
                  <Field
                    name="email"
                    type="email"
                    placeholder="Votre adresse email"
                    className="input-field"
                  />
                  <ErrorMessage
                    name="email"
                    component="p"
                    className="text-rose-200 text-xs mt-1 text-left"
                  />
                </div>
                <Button type="submit" variant="gold" isLoading={isSubmitting} className="shrink-0">
                  S'inscrire
                </Button>
              </Form>
            )}
          </Formik>
        </FadeInUp>
      </div>
    </section>
  );
}