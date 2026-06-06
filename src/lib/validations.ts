import * as Yup from 'yup'

export const contactSchema = Yup.object({
  name:    Yup.string().min(2, 'Nom trop court').max(100).required('Nom requis'),
  email:   Yup.string().email('Email invalide').required('Email requis'),
  subject: Yup.string().min(5, 'Sujet trop court').max(200).required('Sujet requis'),
  message: Yup.string().min(20, 'Message trop court (20 chars min)').max(2000).required('Message requis'),
})

export const newsletterSchema = Yup.object({
  email: Yup.string().email('Email invalide').required('Email requis'),
})

export const loginSchema = Yup.object({
  email:    Yup.string().email('Email invalide').required('Email requis'),
  password: Yup.string().min(8, 'Mot de passe trop court').required('Mot de passe requis'),
})

export const registerSchema = Yup.object({
  name:            Yup.string().min(2).max(100).required('Nom requis'),
  email:           Yup.string().email('Email invalide').required('Email requis'),
  password:        Yup.string().min(8, 'Min 8 caractères').required('Mot de passe requis'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Les mots de passe ne correspondent pas')
    .required('Confirmation requise'),
})

export const articleSchema = Yup.object({
  title:    Yup.string().min(5).max(255).required('Titre requis'),
  content:  Yup.string().min(100, 'Contenu trop court').required('Contenu requis'),
  category: Yup.string().required('Catégorie requise'),
  excerpt:  Yup.string().max(500),
})

export const organizationSchema = Yup.object({
  name:        Yup.string().min(2).max(255).required('Nom requis'),
  description: Yup.string().max(1000),
  country:     Yup.string().required('Pays requis'),
  sector:      Yup.string().required('Secteur requis'),
  website:     Yup.string().url('URL invalide').optional(),
})