'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Trash2 } from 'lucide-react'

export default function NewsletterActions({ id }: { id: string }) {
  const router  = useRouter()
  const [loading, setLoading] = useState(false)

  async function deleteSubscriber() {
    if (!confirm('Supprimer cet abonné ?')) return
    setLoading(true)
    await fetch(`/api/admin/newsletter/${id}`, { method: 'DELETE' })
    router.refresh()
    setLoading(false)
  }

  return (
    <button onClick={deleteSubscriber} disabled={loading} title="Supprimer" style={{
      background: 'none', border: 'none', cursor: 'pointer',
      color: '#ef4444', padding: '2px', lineHeight: 1,
    }}>
      <Trash2 size={15} />
    </button>
  )
}
