'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface Props {
  id:     string
  status: string
}

export default function MessageActions({ id, status }: Props) {
  const router  = useRouter()
  const [loading, setLoading] = useState(false)

  async function updateStatus(newStatus: string) {
    setLoading(true)
    await fetch(`/api/admin/messages/${id}`, {
      method:  'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({ status: newStatus }),
    })
    router.refresh()
    setLoading(false)
  }

  return (
    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
      {status === 'UNREAD' && (
        <button onClick={() => updateStatus('READ')} disabled={loading} style={{
          backgroundColor: 'rgba(34,197,94,0.1)', color: '#16a34a',
          border: '1px solid rgba(34,197,94,0.2)', borderRadius: '6px',
          padding: '0.375rem 0.75rem', fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer',
        }}>
          Marquer lu
        </button>
      )}
      {status !== 'ARCHIVED' && (
        <button onClick={() => updateStatus('ARCHIVED')} disabled={loading} style={{
          backgroundColor: 'rgba(28,15,20,0.05)', color: 'rgba(28,15,20,0.5)',
          border: '1px solid rgba(28,15,20,0.1)', borderRadius: '6px',
          padding: '0.375rem 0.75rem', fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer',
        }}>
          Archiver
        </button>
      )}
      {status === 'ARCHIVED' && (
        <button onClick={() => updateStatus('READ')} disabled={loading} style={{
          backgroundColor: 'rgba(201,168,76,0.1)', color: '#8B6914',
          border: '1px solid rgba(201,168,76,0.2)', borderRadius: '6px',
          padding: '0.375rem 0.75rem', fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer',
        }}>
          Restaurer
        </button>
      )}
    </div>
  )
}
