'use client'
import { useState } from 'react'
import Link         from 'next/link'
import { useRouter } from 'next/navigation'
import { motion }   from 'framer-motion'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { Eye, EyeOff, User, Mail, Lock, ArrowRight } from 'lucide-react'
import { toast }    from 'react-toastify'
import { registerSchema } from '@/lib/validations'

export default function RegisterPage() {
  const router = useRouter()
  const [showPassword, setShowPassword]        = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  async function handleSubmit(values: { name: string; email: string; password: string; confirmPassword: string }, { setSubmitting }: { setSubmitting: (v: boolean) => void }) {
    try {
      const res  = await fetch('/api/auth/register', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ name: values.name, email: values.email, password: values.password }),
      })
      const data = await res.json()

      if (data.success) {
        toast.success('Compte créé avec succès !')
        router.push('/auth/login')
      } else {
        toast.error(data.message ?? 'Erreur lors de la création du compte')
      }
    } catch {
      toast.error('Erreur de connexion')
    } finally {
      setSubmitting(false)
    }
  }

  const inputStyle = {
    width:           '100%',
    backgroundColor: 'rgba(255,255,255,0.05)',
    border:          '1px solid rgba(255,255,255,0.1)',
    borderRadius:    '10px',
    padding:         '0.875rem 1rem 0.875rem 2.75rem',
    color:           'white',
    fontSize:        '0.9375rem',
    outline:         'none',
    boxSizing:       'border-box' as const,
    fontFamily:      'var(--font-dm-sans)',
    transition:      'border-color 0.2s',
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0f0609', display: 'flex', position: 'relative', overflow: 'hidden' }}>

      {/* Décor fond */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: `
          radial-gradient(ellipse at 20% 50%, rgba(107,45,62,0.35) 0%, transparent 60%),
          radial-gradient(ellipse at 80% 20%, rgba(201,168,76,0.12) 0%, transparent 50%)
        `,
      }} />
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage:   'linear-gradient(rgba(201,168,76,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.04) 1px, transparent 1px)',
        backgroundSize:    '60px 60px',
      }} />

      {/* Panneau gauche (desktop) */}
      <div className="login-left-panel" style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '4rem', position: 'relative' }}>
        <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, ease: 'easeOut' }}>

          <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', textDecoration: 'none', marginBottom: '4rem' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'linear-gradient(135deg, #6B2D3E, #8B3D50)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-playfair)', fontWeight: 700, color: '#C9A84C', fontSize: '1.1rem', border: '1px solid rgba(201,168,76,0.3)' }}>D</div>
            <div>
              <p style={{ fontFamily: 'var(--font-playfair)', fontWeight: 700, color: '#C9A84C', margin: 0, fontSize: '0.95rem' }}>DIANE NDEUNA</p>
              <p style={{ fontFamily: 'var(--font-dm-sans)', fontSize: '0.6rem', letterSpacing: '0.15em', color: 'rgba(255,255,255,0.3)', margin: 0, textTransform: 'uppercase' }}>Heritage &amp; Expertise</p>
            </div>
          </Link>

          <blockquote style={{ fontFamily: 'var(--font-cormorant)', fontSize: 'clamp(2rem, 4vw, 3rem)', fontStyle: 'italic', fontWeight: 500, color: 'white', lineHeight: 1.25, margin: 0, marginBottom: '1.5rem' }}>
            &ldquo;Construire des systèmes,<br />
            <span style={{ background: 'linear-gradient(135deg, #C9A84C, #E8D5A0)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              c'est libérer des générations.
            </span>&rdquo;
          </blockquote>

          <p style={{ color: 'rgba(255,255,255,0.4)', fontFamily: 'var(--font-dm-sans)', fontSize: '0.875rem', marginBottom: '3rem' }}>
            — Diane NDEUNA
          </p>

          <div style={{ display: 'flex', gap: '2rem' }}>
            {[
              { value: '200+', label: 'Organisations\nformées' },
              { value: '15+',  label: 'Pays\nreprésentés' },
              { value: '20+',  label: 'Années\nd\'expertise' },
            ].map(({ value, label }) => (
              <div key={value}>
                <p style={{ fontSize: '1.5rem', fontWeight: 700, color: '#C9A84C', margin: 0 }}>{value}</p>
                <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.35)', margin: 0, whiteSpace: 'pre-line', lineHeight: 1.4 }}>{label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Panneau formulaire */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
        style={{
          width:          '100%',
          maxWidth:       '480px',
          display:        'flex',
          flexDirection:  'column',
          justifyContent: 'center',
          padding:        'clamp(2rem, 5vw, 4rem)',
          position:       'relative',
        }}
      >
        <div style={{ marginBottom: '2rem' }}>
          <h1 style={{ fontFamily: 'var(--font-playfair)', fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 700, color: 'white', marginBottom: '0.5rem' }}>
            Créer un compte
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.9375rem', fontFamily: 'var(--font-dm-sans)' }}>
            Rejoignez Heritage &amp; Expertise
          </p>
        </div>

        <Formik
          initialValues={{ name: '', email: '', password: '', confirmPassword: '' }}
          validationSchema={registerSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, errors, touched }) => (
            <Form style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>

              {/* Nom */}
              <div>
                <div style={{ position: 'relative' }}>
                  <User size={16} style={{ position: 'absolute', left: '0.875rem', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.3)', pointerEvents: 'none' }} />
                  <Field name="name" type="text" placeholder="Votre nom complet" style={{ ...inputStyle, borderColor: touched.name && errors.name ? 'rgba(239,68,68,0.6)' : 'rgba(255,255,255,0.1)' }} />
                </div>
                <ErrorMessage name="name">{msg => <p style={{ color: '#f87171', fontSize: '0.8125rem', marginTop: '0.375rem', fontFamily: 'var(--font-dm-sans)' }}>{msg}</p>}</ErrorMessage>
              </div>

              {/* Email */}
              <div>
                <div style={{ position: 'relative' }}>
                  <Mail size={16} style={{ position: 'absolute', left: '0.875rem', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.3)', pointerEvents: 'none' }} />
                  <Field name="email" type="email" placeholder="votre@email.com" style={{ ...inputStyle, borderColor: touched.email && errors.email ? 'rgba(239,68,68,0.6)' : 'rgba(255,255,255,0.1)' }} />
                </div>
                <ErrorMessage name="email">{msg => <p style={{ color: '#f87171', fontSize: '0.8125rem', marginTop: '0.375rem', fontFamily: 'var(--font-dm-sans)' }}>{msg}</p>}</ErrorMessage>
              </div>

              {/* Mot de passe */}
              <div>
                <div style={{ position: 'relative' }}>
                  <Lock size={16} style={{ position: 'absolute', left: '0.875rem', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.3)', pointerEvents: 'none' }} />
                  <Field
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Mot de passe (8+ caractères)"
                    style={{ ...inputStyle, paddingRight: '3rem', borderColor: touched.password && errors.password ? 'rgba(239,68,68,0.6)' : 'rgba(255,255,255,0.1)' }}
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ position: 'absolute', right: '0.875rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.3)', padding: 0, lineHeight: 1 }}>
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                <ErrorMessage name="password">{msg => <p style={{ color: '#f87171', fontSize: '0.8125rem', marginTop: '0.375rem', fontFamily: 'var(--font-dm-sans)' }}>{msg}</p>}</ErrorMessage>
              </div>

              {/* Confirmation */}
              <div>
                <div style={{ position: 'relative' }}>
                  <Lock size={16} style={{ position: 'absolute', left: '0.875rem', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.3)', pointerEvents: 'none' }} />
                  <Field
                    name="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="Confirmer le mot de passe"
                    style={{ ...inputStyle, paddingRight: '3rem', borderColor: touched.confirmPassword && errors.confirmPassword ? 'rgba(239,68,68,0.6)' : 'rgba(255,255,255,0.1)' }}
                  />
                  <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} style={{ position: 'absolute', right: '0.875rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.3)', padding: 0, lineHeight: 1 }}>
                    {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                <ErrorMessage name="confirmPassword">{msg => <p style={{ color: '#f87171', fontSize: '0.8125rem', marginTop: '0.375rem', fontFamily: 'var(--font-dm-sans)' }}>{msg}</p>}</ErrorMessage>
              </div>

              {/* Bouton */}
              <button
                type="submit"
                disabled={isSubmitting}
                style={{
                  display:         'flex',
                  alignItems:      'center',
                  justifyContent:  'center',
                  gap:             '0.5rem',
                  backgroundColor: '#C9A84C',
                  color:           '#1C0F14',
                  border:          'none',
                  borderRadius:    '10px',
                  padding:         '0.9375rem',
                  fontWeight:      700,
                  fontSize:        '0.9375rem',
                  fontFamily:      'var(--font-dm-sans)',
                  cursor:          isSubmitting ? 'not-allowed' : 'pointer',
                  opacity:         isSubmitting ? 0.7 : 1,
                  marginTop:       '0.5rem',
                  width:           '100%',
                  letterSpacing:   '0.02em',
                }}
              >
                {isSubmitting ? 'Création...' : (<>Créer mon compte <ArrowRight size={16} /></>)}
              </button>

              <p style={{ textAlign: 'center', fontSize: '0.875rem', color: 'rgba(255,255,255,0.4)', fontFamily: 'var(--font-dm-sans)', marginTop: '0.5rem' }}>
                Déjà un compte ?{' '}
                <Link href="/auth/login" style={{ color: '#C9A84C', textDecoration: 'none', fontWeight: 600 }}>
                  Se connecter
                </Link>
              </p>
            </Form>
          )}
        </Formik>
      </motion.div>

      <style>{`
        @media (max-width: 768px) {
          .login-left-panel { display: none !important; }
        }
      `}</style>
    </div>
  )
}