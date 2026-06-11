'use client'
import { Bell, Search } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { adminNav } from '@/config/navigation'

export function AdminHeader() {
  const pathname = usePathname()
  const current  = adminNav.find(n => pathname.startsWith(n.href))

  return (
    <header style={{
      backgroundColor: 'white',
      borderBottom:    '1px solid rgba(200,190,184,0.4)',
      padding:         '0 2rem',
      height:          '68px',
      display:         'flex',
      alignItems:      'center',
      justifyContent:  'space-between',
      gap:             '1rem',
      boxShadow:       '0 1px 8px rgba(107,45,62,0.06)',
    }}>
      {/* Titre de la page courante */}
      <div>
        <h1 style={{
          fontFamily:  'var(--font-playfair)',
          fontSize:    '1.1rem',
          fontWeight:  700,
          color:       '#6B2D3E',
          margin:      0,
        }}>
          {current?.label ?? 'Administration'}
        </h1>
        <p style={{
          fontFamily: 'var(--font-dm-sans)',
          fontSize:   '0.72rem',
          color:      '#888',
          margin:     0,
          marginTop:  '1px',
        }}>
          Heritage & Expertise — Panel Admin
        </p>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        {/* Search */}
        <div style={{
          display:         'flex',
          alignItems:      'center',
          gap:             '8px',
          backgroundColor: '#FAF7F2',
          border:          '1px solid #C8BEB8',
          borderRadius:    '8px',
          padding:         '8px 14px',
        }}>
          <Search size={15} style={{ color: '#888' }} />
          <input
            placeholder="Rechercher..."
            style={{
              border:        'none',
              outline:       'none',
              background:    'transparent',
              fontFamily:    'var(--font-dm-sans)',
              fontSize:      '0.82rem',
              color:         '#3A3A3A',
              width:         '160px',
            }}
          />
        </div>

        {/* Notif */}
        <button style={{
          position:        'relative',
          width:           '38px',
          height:          '38px',
          borderRadius:    '8px',
          border:          '1px solid #C8BEB8',
          backgroundColor: 'white',
          display:         'flex',
          alignItems:      'center',
          justifyContent:  'center',
          cursor:          'pointer',
          color:           '#6B2D3E',
        }}>
          <Bell size={17} />
          <span style={{
            position:        'absolute',
            top:             '6px',
            right:           '6px',
            width:           '7px',
            height:          '7px',
            borderRadius:    '50%',
            backgroundColor: '#C9A84C',
            border:          '1.5px solid white',
          }} />
        </button>

        {/* Avatar */}
        <div style={{
          width:           '38px',
          height:          '38px',
          borderRadius:    '50%',
          background:      'linear-gradient(135deg, #6B2D3E, #C9A84C)',
          display:         'flex',
          alignItems:      'center',
          justifyContent:  'center',
          fontFamily:      'var(--font-playfair)',
          fontWeight:      700,
          color:           'white',
          fontSize:        '0.9rem',
          cursor:          'pointer',
          border:          '2px solid rgba(201,168,76,0.4)',
        }}>
          D
        </div>
      </div>
    </header>
  )
}