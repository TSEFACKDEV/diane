import React from 'react'

export default function Page() {
  return (
    <div style={{
      minHeight:       '100vh',
      backgroundColor: '#0f0609',
      display:         'flex',
      position:        'relative',
      overflow:        'hidden',
    }}>
      {/* ── DÉCOR FOND ─────────────────────────────────────── */}
      <div style={{
        position:   'absolute',
        inset:      0,
        background: `
          radial-gradient(ellipse at 20% 50%, rgba(107,45,62,0.35) 0%, transparent 60%),
          radial-gradient(ellipse at 80% 20%, rgba(201,168,76,0.12) 0%, transparent 50%),
          radial-gradient(ellipse at 60% 90%, rgba(107,45,62,0.2) 0%, transparent 50%)
        `,
        pointerEvents: 'none',
      }} />

      {/* Grille subtile */}
      <div style={{
        position:          'absolute',
        inset:             0,
        backgroundImage:   'linear-gradient(rgba(201,168,76,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.04) 1px, transparent 1px)',
        backgroundSize:    '60px 60px',
        pointerEvents:     'none',
      }} />

      {/* ── PANNEAU GAUCHE (desktop) ────────────────────────── */}
      <div className="login-left-panel" style={{
        flex:           '1',
        display:        'flex',
        flexDirection:  'column',
        justifyContent: 'center',
        padding:        '4rem',
        position:       'relative',
      }}>
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <Link href="/" style={{
            display:       'inline-flex',
            alignItems:    'center',
            gap:           '10px',
            textDecoration:'none',
            marginBottom:  '4rem',
          }}>
            <div style={{
              width:          '40px',
              height:         '40px',
              borderRadius:   '10px',
              background:     'linear-gradient(135deg, #6B2D3E, #8B3D50)',
              display:        'flex',
              alignItems:     'center',
              justifyContent: 'center',
              fontFamily:     'var(--font-playfair)',
              fontWeight:     700,
              color:          '#C9A84C',
              fontSize:       '1.1rem',
              border:         '1px solid rgba(201,168,76,0.3)',
            }}>
              D
            </div>
            <div>
              <p style={{ fontFamily: 'var(--font-playfair)', fontWeight: 700, color: '#C9A84C', margin: 0, fontSize: '0.95rem' }}>
                DIANE NDEUNA
              </p>
              <p style={{ fontFamily: 'var(--font-dm-sans)', fontSize: '0.6rem', letterSpacing: '0.15em', color: 'rgba(255,255,255,0.3)', margin: 0, textTransform: 'uppercase' }}>
                Heritage & Expertise
              </p>
            </div>
          </Link>

          <blockquote style={{
            fontFamily:   'var(--font-cormorant)',
            fontSize:     'clamp(2rem, 4vw, 3rem)',
            fontStyle:    'italic',
            fontWeight:   500,
            color:        'white',
            lineHeight:   1.25,
            margin:       0,
            marginBottom: '1.5rem',
          }}>
            "L'Afrique n'a pas besoin
            <br />
            d'héroïnes.
            <br />
            <span style={{
              background:              'linear-gradient(135deg, #C9A84C, #E8D5A0)',
              WebkitBackgroundClip:    'text',
              WebkitTextFillColor:     'transparent',
              backgroundClip:          'text',
            }}>
              Elle a besoin de systèmes."
            </span>
          </blockquote>

          <p style={{
            fontFamily: 'var(--font-dm-sans)',
            fontSize:   '0.9rem',
            color:      'rgba(255,255,255,0.35)',
            margin:     0,
            letterSpacing: '0.05em',
          }}>
            — Diane NDEUNA, Architecte de Systèmes Organisationnels
          </p>

          {/* Stats */}
          <div style={{
            display:   'flex',
            gap:       '2.5rem',
            marginTop: '4rem',
          }}>
            {[
              { val: '200+', label: 'Organisations' },
              { val: '15+',  label: 'Pays africains' },
              { val: '20+',  label: "Ans d'expertise" },
            ].map(s => (
              <div key={s.label}>
                <p style={{
                  fontFamily:  'var(--font-playfair)',
                  fontSize:    '1.8rem',
                  fontWeight:  700,
                  color:       '#C9A84C',
                  margin:      0,
                  lineHeight:  1,
                }}>
                  {s.val}
                </p>
                <p style={{
                  fontFamily: 'var(--font-dm-sans)',
                  fontSize:   '0.72rem',
                  color:      'rgba(255,255,255,0.35)',
                  margin:     '4px 0 0',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                }}>
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* ── FORMULAIRE ──────────────────────────────────────── */}
      <div style={{
        width:          '100%',
        maxWidth:       '460px',
        display:        'flex',
        alignItems:     'center',
        justifyContent: 'center',
        padding:        '2rem',
        position:       'relative',
        zIndex:         1,
      }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
          style={{
            width:           '100%',
            backgroundColor: 'rgba(255,255,255,0.04)',
            backdropFilter:  'blur(20px)',
            border:          '1px solid rgba(201,168,76,0.2)',
            borderRadius:    '20px',
            padding:         '2.5rem',
            boxShadow:       '0 24px 60px rgba(0,0,0,0.5)',
          }}
        >
          {/* Header form */}
          <div style={{ marginBottom: '2rem' }}>
            <div style={{
              width:           '48px',
              height:          '48px',
              borderRadius:    '12px',
              background:      'linear-gradient(135deg, rgba(107,45,62,0.6), rgba(139,61,80,0.4))',
              border:          '1px solid rgba(201,168,76,0.3)',
              display:         'flex',
              alignItems:      'center',
              justifyContent:  'center',
              marginBottom:    '1.25rem',
            }}>
              <Lock size={20} style={{ color: '#C9A84C' }} />
            </div>

            <h1 style={{
              fontFamily:   'var(--font-playfair)',
              fontSize:     '1.6rem',
              fontWeight:   700,
              color:        'white',
              margin:       0,
              marginBottom: '0.4rem',
            }}>
              Espace Admin
            </h1>
            <p style={{
              fontFamily: 'var(--font-dm-sans)',
              fontSize:   '0.85rem',
              color:      'rgba(255,255,255,0.4)',
              margin:     0,
            }}>
              Connectez-vous pour accéder au tableau de bord
            </p>
          </div>

          {/* Divider doré */}
          <div style={{
            height:     '1px',
            background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.4), transparent)',
            marginBottom: '2rem',
          }} />

          {/* Formik */}
          <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={loginSchema}
            onSubmit={async (values, { setSubmitting }) => {
              await login(values.email, values.password)
              setSubmitting(false)
            }}
          >
            {({ isSubmitting, errors, touched }) => (
              <Form style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

                {/* Email */}
                <div>
                  <label style={labelStyle}>Adresse email</label>
                  <div style={{ position: 'relative' }}>
                    <Mail size={16} style={{
                      position:   'absolute',
                      left:       '14px',
                      top:        '50%',
                      transform:  'translateY(-50%)',
                      color:      errors.email && touched.email ? '#f87171' : 'rgba(255,255,255,0.25)',
                    }} />
                    <Field
                      name="email"
                      type="email"
                      placeholder="votre@email.com  "
                      style={{
                        ...darkInputStyle,
                        paddingLeft: '42px',
                        borderColor: errors.email && touched.email ? '#f87171' : 'rgba(201,168,76,0.15)',
                      }}
                    />
                  </div>
                  <ErrorMessage name="email">{msg => <p style={errorStyle}>{msg}</p>}</ErrorMessage>
                </div>

                {/* Password */}
                <div>
                  <label style={labelStyle}>Mot de passe</label>
                  <div style={{ position: 'relative' }}>
                    <Lock size={16} style={{
                      position:  'absolute',
                      left:      '14px',
                      top:       '50%',
                      transform: 'translateY(-50%)',
                      color:     errors.password && touched.password ? '#f87171' : 'rgba(255,255,255,0.25)',
                    }} />
                    <Field
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      style={{
                        ...darkInputStyle,
                        paddingLeft:  '42px',
                        paddingRight: '42px',
                        borderColor:  errors.password && touched.password ? '#f87171' : 'rgba(201,168,76,0.15)',
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      style={{
                        position:   'absolute',
                        right:      '14px',
                        top:        '50%',
                        transform:  'translateY(-50%)',
                        background: 'none',
                        border:     'none',
                        cursor:     'pointer',
                        color:      'rgba(255,255,255,0.3)',
                        padding:    0,
                        display:    'flex',
                      }}
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                  <ErrorMessage name="password">{msg => <p style={errorStyle}>{msg}</p>}</ErrorMessage>
                </div>

                {/* Submit */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting || isLoading}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{  scale: 0.99 }}
                  style={{
                    display:         'flex',
                    alignItems:      'center',
                    justifyContent:  'center',
                    gap:             '10px',
                    width:           '100%',
                    padding:         '14px',
                    marginTop:       '0.5rem',
                    background:      'linear-gradient(135deg, #6B2D3E 0%, #8B3D50 100%)',
                    border:          '1px solid rgba(201,168,76,0.3)',
                    borderRadius:    '10px',
                    color:           'white',
                    fontFamily:      'var(--font-dm-sans)',
                    fontWeight:      600,
                    fontSize:        '0.9rem',
                    cursor:          isSubmitting ? 'not-allowed' : 'pointer',
                    opacity:         isSubmitting ? 0.7 : 1,
                    transition:      'all 0.2s',
                    boxShadow:       '0 4px 20px rgba(107,45,62,0.4)',
                  }}
                >
                  {isSubmitting ? (
                    <div style={{
                      width:        '18px',
                      height:       '18px',
                      border:       '2px solid rgba(255,255,255,0.3)',
                      borderTop:    '2px solid white',
                      borderRadius: '50%',
                      animation:    'spin 0.8s linear infinite',
                    }} />
                  ) : (
                    <>
                      Se connecter
                      <ArrowRight size={16} />
                    </>
                  )}
                </motion.button>

                <p style={{
                  textAlign:  'center',
                  fontFamily: 'var(--font-dm-sans)',
                  fontSize:   '0.78rem',
                  color:      'rgba(255,255,255,0.25)',
                  marginTop:  '0.5rem',
                }}>
                  <Link href="/" style={{ color: 'rgba(201,168,76,0.6)', textDecoration: 'none' }}>
                    ← Retour au site
                  </Link>
                </p>
              </Form>
            )}
          </Formik>
        </motion.div>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        .login-left-panel { display: flex; }
        @media (max-width: 768px) {
          .login-left-panel { display: none; }
          div[style*="max-width: 460px"] { max-width: 100% !important; }
        }
      `}</style>
    </div>
  )
}

/* ── Styles locaux ──────────────────────────────────────── */
const labelStyle: React.CSSProperties = {
  display:      'block',
  fontFamily:   'var(--font-dm-sans)',
  fontSize:     '0.78rem',
  fontWeight:   600,
  color:        'rgba(255,255,255,0.5)',
  marginBottom: '6px',
  letterSpacing:'0.06em',
  textTransform:'uppercase',
}

const darkInputStyle: React.CSSProperties = {
  width:           '100%',
  padding:         '12px 14px',
  backgroundColor: 'rgba(255,255,255,0.05)',
  border:          '1px solid rgba(201,168,76,0.15)',
  borderRadius:    '10px',
  color:           'white',
  fontFamily:      'var(--font-dm-sans)',
  fontSize:        '0.9rem',
  outline:         'none',
  transition:      'border-color 0.2s, box-shadow 0.2s',
  boxSizing:       'border-box',
}

const errorStyle: React.CSSProperties = {
  fontFamily:  'var(--font-dm-sans)',
  fontSize:    '0.75rem',
  color:       '#f87171',
  margin:      '5px 0 0',
}