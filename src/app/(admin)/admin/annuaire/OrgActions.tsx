'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { CheckCircle, XCircle, Trash2 } from 'lucide-react'

interface Props {
  id:     string
  status: string
}

export default function OrgActions({ id, status }: Props) {
  const router  = useRouter()
  const [loading, setLoading] = useState(false)

  async function updateStatus(newStatus: string) {
    setLoading(true)
    await fetch(`/api/organizations/${id}`, {
      method:  'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({ status: newStatus }),
    })
    router.refresh()
    setLoading(false)
  }

  async function deleteOrg() {
    if (!confirm('Supprimer cette organisation ? Cette action est irréversible.')) return
    setLoading(true)
    await fetch(`/api/organizations/${id}`, { method: 'DELETE' })
    router.refresh()
    setLoading(false)
  }

  return (
    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
      {status !== 'APPROVED' && (
        <button onClick={() => updateStatus('APPROVED')} disabled={loading} title="Approuver" style={{
          display: 'flex', alignItems: 'center', gap: '0.375rem',
          backgroundColor: 'rgba(34,197,94,0.1)', color: '#16a34a',
          border: '1px solid rgba(34,197,94,0.2)', borderRadius: '6px',
          padding: '0.375rem 0.75rem', fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer',
        }}>
          <CheckCircle size={13} /> Approuver
        </button>
      )}
      {status !== 'REJECTED' && (
        <button onClick={() => updateStatus('REJECTED')} disabled={loading} title="Rejeter" style={{
          display: 'flex', alignItems: 'center', gap: '0.375rem',
          backgroundColor: 'rgba(239,68,68,0.1)', color: '#dc2626',
          border: '1px solid rgba(239,68,68,0.2)', borderRadius: '6px',
          padding: '0.375rem 0.75rem', fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer',
        }}>
          <XCircle size={13} /> Rejeter
        </button>
      )}
      <button onClick={deleteOrg} disabled={loading} title="Supprimer" style={{
        background: 'none', border: 'none', cursor: 'pointer',
        color: 'rgba(28,15,20,0.35)', padding: '2px', lineHeight: 1,
      }}>
        <Trash2 size={15} />
      </button>
    </div>
  )
}
