'use client'
import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import {
  LayoutDashboard, FileText, FolderOpen, MessageSquare,
  Mail, Building2, BarChart3, Settings, ChevronLeft,
  ChevronRight, LogOut,
} from 'lucide-react'
import { adminNav } from '@/config/navigation'

const navIcons: Record<string, React.ElementType> = {
  '/admin/dashboard':    LayoutDashboard,
  '/admin/articles':     FileText,
  '/admin/ressources':   FolderOpen,
  '/admin/messages':     MessageSquare,
  '/admin/newsletter':   Mail,
  '/admin/annuaire':     Building2,
  '/admin/statistiques': BarChart3,
  '/admin/parametres':   Settings,
}

export function AdminSidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const pathname = usePathname()

  return (
    <motion.aside
      animate={{ width: collapsed ? 70 : 240 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      style={{
        backgroundColor: '#1C0F14',
        borderRight:     '1px solid rgba(201,168,76,0.15)',
        display:         'flex',
        flexDirection:   'column',
        position:        'relative',
        flexShrink:      0,
        overflowX:       'hidden',
        minHeight:       '100vh',
      }}
    >
      {/* ── LOGO ─────────────────────────────────────────────── */}
      <div style={{
        padding:      '1.5rem 1.25rem',
        borderBottom: '1px solid rgba(201,168,76,0.1)',
        minHeight:    '80px',
        display:      'flex',
        alignItems:   'center',
      }}>
        {!collapsed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <p style={{
              fontFamily:    'var(--font-playfair)',
              fontSize:      '1rem',
              fontWeight:    700,
              color:         '#C9A84C',
              margin:        0,
              letterSpacing: '0.04em',
              whiteSpace:    'nowrap',
            }}>
              DIANE NDEUNA
            </p>
            <p style={{
              fontFamily:    'var(--font-dm-sans)',
              fontSize:      '0.6rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color:         'rgba(255,255,255,0.25)',
              margin:        '3px 0 0',
              whiteSpace:    'nowrap',
            }}>
              Administration
            </p>
          </motion.div>
        )}
        {collapsed && (
          <div style={{
            width:           '32px',
            height:          '32px',
            borderRadius:    '8px',
            background:      'linear-gradient(135deg, #6B2D3E, #8B3D50)',
            display:         'flex',
            alignItems:      'center',
            justifyContent:  'center',
            fontFamily:      'var(--font-playfair)',
            fontWeight:      700,
            color:           '#C9A84C',
            fontSize:        '0.9rem',
          }}>
            D
          </div>
        )}
      </div>

      {/* ── NAV ITEMS ────────────────────────────────────────── */}
      <nav style={{ flex: 1, padding: '1rem 0.75rem', display: 'flex', flexDirection: 'column', gap: '2px' }}>
        {adminNav.map((item) => {
          const Icon    = navIcons[item.href] || LayoutDashboard
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/')

          return (
            <Link
              key={item.href}
              href={item.href}
              title={collapsed ? item.label : undefined}
              style={{
                display:         'flex',
                alignItems:      'center',
                gap:             '12px',
                padding:         collapsed ? '12px' : '11px 14px',
                justifyContent:  collapsed ? 'center' : 'flex-start',
                borderRadius:    '8px',
                textDecoration:  'none',
                transition:      'all 0.2s',
                backgroundColor: isActive ? 'rgba(107,45,62,0.5)' : 'transparent',
                border:          isActive ? '1px solid rgba(201,168,76,0.25)' : '1px solid transparent',
                position:        'relative',
                overflow:        'hidden',
              }}
              onMouseEnter={e => {
                if (!isActive) (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(107,45,62,0.25)'
              }}
              onMouseLeave={e => {
                if (!isActive) (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent'
              }}
            >
              {isActive && (
                <motion.div
                  layoutId="sidebar-active"
                  style={{
                    position:        'absolute',
                    left:            0,
                    top:             '20%',
                    bottom:          '20%',
                    width:           '3px',
                    backgroundColor: '#C9A84C',
                    borderRadius:    '0 2px 2px 0',
                  }}
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}

              <Icon
                size={18}
                style={{ color: isActive ? '#C9A84C' : 'rgba(255,255,255,0.45)', flexShrink: 0 }}
              />

              {!collapsed && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.05 }}
                  style={{
                    fontFamily:  'var(--font-dm-sans)',
                    fontSize:    '0.855rem',
                    fontWeight:  isActive ? 600 : 400,
                    color:       isActive ? 'rgba(255,255,255,0.92)' : 'rgba(255,255,255,0.45)',
                    whiteSpace:  'nowrap',
                  }}
                >
                  {item.label}
                </motion.span>
              )}
            </Link>
          )
        })}
      </nav>

      {/* ── LOGOUT ───────────────────────────────────────────── */}
      <div style={{
        padding:      '0.75rem',
        borderTop:    '1px solid rgba(201,168,76,0.1)',
      }}>
        <button
          style={{
            display:         'flex',
            alignItems:      'center',
            gap:             '12px',
            padding:         collapsed ? '12px' : '11px 14px',
            justifyContent:  collapsed ? 'center' : 'flex-start',
            width:           '100%',
            borderRadius:    '8px',
            background:      'none',
            border:          '1px solid transparent',
            cursor:          'pointer',
            color:           'rgba(255,255,255,0.35)',
            transition:      'all 0.2s',
          }}
          onMouseEnter={e => {
            const el = e.currentTarget
            el.style.backgroundColor = 'rgba(155, 58, 58, 0.2)'
            el.style.color           = '#f87171'
            el.style.borderColor     = 'rgba(155,58,58,0.3)'
          }}
          onMouseLeave={e => {
            const el = e.currentTarget
            el.style.backgroundColor = 'transparent'
            el.style.color           = 'rgba(255,255,255,0.35)'
            el.style.borderColor     = 'transparent'
          }}
          onClick={async () => {
            await fetch('/api/auth/logout', { method: 'POST' })
            window.location.href = '/auth/login'
          }}
        >
          <LogOut size={18} style={{ flexShrink: 0 }} />
          {!collapsed && (
            <span style={{ fontFamily: 'var(--font-dm-sans)', fontSize: '0.855rem', whiteSpace: 'nowrap' }}>
              Déconnexion
            </span>
          )}
        </button>
      </div>

      {/* ── TOGGLE COLLAPSE ──────────────────────────────────── */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        style={{
          position:        'absolute',
          right:           '-14px',
          top:             '88px',
          width:           '28px',
          height:          '28px',
          borderRadius:    '50%',
          backgroundColor: '#1C0F14',
          border:          '1px solid rgba(201,168,76,0.3)',
          display:         'flex',
          alignItems:      'center',
          justifyContent:  'center',
          cursor:          'pointer',
          color:           '#C9A84C',
          zIndex:          10,
          transition:      'all 0.2s',
        }}
      >
        {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
      </button>
    </motion.aside>
  )
}