'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ChevronDown } from 'lucide-react'
import { mainNav } from '@/config/navigation'

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const pathname = usePathname()

  useEffect(() => {
    setMobileOpen(false)
    setOpenDropdown(null)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  return (
    <>
      <header
        style={{
          position:        'fixed',
          top:             0,
          left:            0,
          right:           0,
          zIndex:          9999,
          backgroundColor: 'rgba(107, 45, 62, 0.97)',
          backdropFilter:  'blur(12px)',
          borderBottom:    '1px solid rgba(201, 168, 76, 0.2)',
          boxShadow:       '0 4px 24px rgba(107, 45, 62, 0.3)',
        }}
      >
        <nav
          style={{
            maxWidth:      '1280px',
            margin:        '0 auto',
            padding:       '0 1.5rem',
            height:        '68px',
            display:       'flex',
            alignItems:    'center',
            justifyContent:'space-between',
          }}
        >
          {/* ── LOGO ─────────────────────────────────────────── */}
          <Link href="/" style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', gap: '1px' }}>
            <span style={{
              fontFamily: 'var(--font-playfair)',
              fontWeight: 700,
              fontSize:   '1.2rem',
              color:      '#C9A84C',
              letterSpacing: '0.04em',
              lineHeight: 1.1,
            }}>
              DIANE NDEUNA
            </span>
            <span style={{
              fontFamily:    'var(--font-dm-sans)',
              fontSize:      '0.65rem',
              color:         'rgba(242, 217, 213, 0.8)',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              fontWeight:    400,
            }}>
              Heritage & Expertise
            </span>
          </Link>

          {/* ── NAV DESKTOP ──────────────────────────────────── */}
          <ul style={{
            display:    'flex',
            alignItems: 'center',
            gap:        '0.25rem',
            listStyle:  'none',
            margin:     0,
            padding:    0,
          }}
            className="desktop-nav"
          >
            {mainNav.map((item) => (
              <li key={item.href} style={{ position: 'relative' }}>
                {item.children ? (
                  <div>
                    <button
                      onClick={() => setOpenDropdown(openDropdown === item.label ? null : item.label)}
                      style={{
                        display:       'flex',
                        alignItems:    'center',
                        gap:           '4px',
                        padding:       '8px 14px',
                        background:    'none',
                        border:        'none',
                        cursor:        'pointer',
                        fontFamily:    'var(--font-dm-sans)',
                        fontSize:      '0.82rem',
                        fontWeight:    500,
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        color:         pathname.startsWith(item.href) ? '#C9A84C' : 'rgba(255,255,255,0.88)',
                        transition:    'color 0.2s',
                        borderRadius:  '4px',
                      }}
                    >
                      {item.label}
                      <ChevronDown
                        size={13}
                        style={{
                          transform:  openDropdown === item.label ? 'rotate(180deg)' : 'rotate(0)',
                          transition: 'transform 0.3s',
                        }}
                      />
                    </button>

                    <AnimatePresence>
                      {openDropdown === item.label && (
                        <motion.div
                          initial={{ opacity: 0, y: 8, scale: 0.96 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{   opacity: 0, y: 8, scale: 0.96 }}
                          transition={{ duration: 0.2 }}
                          style={{
                            position:        'absolute',
                            top:             'calc(100% + 8px)',
                            left:            '50%',
                            transform:       'translateX(-50%)',
                            backgroundColor: 'rgba(107, 45, 62, 0.98)',
                            backdropFilter:  'blur(12px)',
                            border:          '1px solid rgba(201, 168, 76, 0.25)',
                            borderRadius:    '10px',
                            padding:         '8px',
                            minWidth:        '220px',
                            boxShadow:       '0 16px 40px rgba(60,20,30,0.4)',
                          }}
                        >
                          {item.children.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              style={{
                                display:       'block',
                                padding:       '10px 14px',
                                fontFamily:    'var(--font-dm-sans)',
                                fontSize:      '0.82rem',
                                color:         pathname === child.href ? '#C9A84C' : 'rgba(255,255,255,0.85)',
                                textDecoration:'none',
                                borderRadius:  '6px',
                                transition:    'all 0.2s',
                                backgroundColor: pathname === child.href ? 'rgba(201,168,76,0.1)' : 'transparent',
                              }}
                              onMouseEnter={e => {
                                (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(201,168,76,0.1)'
                                ;(e.currentTarget as HTMLElement).style.color = '#C9A84C'
                              }}
                              onMouseLeave={e => {
                                ;(e.currentTarget as HTMLElement).style.backgroundColor = pathname === child.href ? 'rgba(201,168,76,0.1)' : 'transparent'
                                ;(e.currentTarget as HTMLElement).style.color = pathname === child.href ? '#C9A84C' : 'rgba(255,255,255,0.85)'
                              }}
                            >
                              {child.label}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    style={{
                      display:       'block',
                      padding:       '8px 14px',
                      fontFamily:    'var(--font-dm-sans)',
                      fontSize:      '0.82rem',
                      fontWeight:    500,
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      color:         pathname === item.href ? '#C9A84C' : 'rgba(255,255,255,0.88)',
                      textDecoration:'none',
                      borderRadius:  '4px',
                      position:      'relative',
                      transition:    'color 0.2s',
                    }}
                  >
                    {item.label}
                    {pathname === item.href && (
                      <motion.span
                        layoutId="nav-indicator"
                        style={{
                          position:        'absolute',
                          bottom:          '4px',
                          left:            '14px',
                          right:           '14px',
                          height:          '1.5px',
                          backgroundColor: '#C9A84C',
                          borderRadius:    '2px',
                        }}
                      />
                    )}
                  </Link>
                )}
              </li>
            ))}

            <li style={{ marginLeft: '0.75rem' }}>
              <Link href="/contact" className="btn-primary" style={{ fontSize: '0.8rem', padding: '10px 20px' }}>
                Prendre Contact
              </Link>
            </li>
          </ul>

          {/* ── HAMBURGER MOBILE ─────────────────────────────── */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="mobile-menu-btn"
            aria-label={mobileOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            style={{
              background:  'none',
              border:      '1px solid rgba(201,168,76,0.3)',
              borderRadius:'8px',
              padding:     '8px',
              cursor:      'pointer',
              color:       '#C9A84C',
              display:     'none',
            }}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={mobileOpen ? 'close' : 'open'}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{   rotate: 90,  opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {mobileOpen ? <X size={22} /> : <Menu size={22} />}
              </motion.div>
            </AnimatePresence>
          </button>
        </nav>
      </header>

      {/* ── MENU MOBILE FULLSCREEN ────────────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{   opacity: 0, x: '100%' }}
            transition={{ type: 'tween', duration: 0.35, ease: 'easeInOut' }}
            style={{
              position:        'fixed',
              inset:           0,
              zIndex:          49,
              backgroundColor: '#3d1822',
              display:         'flex',
              flexDirection:   'column',
              padding:         '100px 2rem 2rem',
              overflowY:       'auto',
            }}
          >
            {/* Décoration dorée */}
            <div style={{
              position:        'absolute',
              top:             0,
              right:           0,
              width:           '200px',
              height:          '200px',
              background:      'radial-gradient(circle, rgba(201,168,76,0.15) 0%, transparent 70%)',
              pointerEvents:   'none',
            }} />

            <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              {mainNav.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.35 }}
                >
                  <Link
                    href={item.href}
                    style={{
                      display:       'block',
                      padding:       '14px 0',
                      fontFamily:    'var(--font-playfair)',
                      fontSize:      '1.5rem',
                      fontWeight:    600,
                      color:         pathname === item.href ? '#C9A84C' : 'rgba(255,255,255,0.9)',
                      textDecoration:'none',
                      borderBottom:  '1px solid rgba(201,168,76,0.1)',
                      transition:    'color 0.2s',
                    }}
                  >
                    {item.label}
                  </Link>

                  {item.children && (
                    <div style={{ paddingLeft: '1rem', marginBottom: '0.5rem' }}>
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          style={{
                            display:       'block',
                            padding:       '8px 0',
                            fontFamily:    'var(--font-dm-sans)',
                            fontSize:      '0.9rem',
                            color:         'rgba(255,255,255,0.6)',
                            textDecoration:'none',
                          }}
                        >
                          → {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}
            </nav>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              style={{ marginTop: '2rem' }}
            >
              <Link href="/contact" className="btn-gold" style={{ width: '100%', justifyContent: 'center' }}>
                Prendre Contact
              </Link>
              <p style={{
                marginTop:  '2rem',
                fontFamily: 'var(--font-dm-sans)',
                fontSize:   '0.75rem',
                color:      'rgba(255,255,255,0.3)',
                textAlign:  'center',
                letterSpacing: '0.1em',
              }}>
                contact@heritage-expertise.com
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── RESPONSIVE CSS ───────────────────────────────────── */}
      <style>{`
        .desktop-nav  { display: flex !important; }
        .mobile-menu-btn { display: none !important; }

        @media (max-width: 1024px) {
          .desktop-nav     { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>

      {/* Spacer pour compenser la navbar fixed */}
      <div style={{ height: '68px' }} />
    </>
  )
}