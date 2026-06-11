'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Pencil, Trash2, ToggleLeft, ToggleRight } from 'lucide-react'

interface Props {
  id:          string
  isPublished: boolean
}

export default function ArticleActions({ id, isPublished }: Props) {
  const router  = useRouter()
  const [loading, setLoading] = useState(false)

  async function togglePublish() {
    setLoading(true)
    await fetch(`/api/articles/${id}`, {
      method:  'PUT',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({ isPublished: !isPublished }),
    })
    router.refresh()
    setLoading(false)
  }

  async function deleteArticle() {
    if (!confirm('Supprimer cet article ? Cette action est irréversible.')) return
    setLoading(true)
    await fetch(`/api/articles/${id}`, { method: 'DELETE' })
    router.refresh()
    setLoading(false)
  }

  return (
    <>
      <button
        onClick={togglePublish}
        disabled={loading}
        title={isPublished ? 'Dépublier' : 'Publier'}
        style={{ background: 'none', border: 'none', cursor: 'pointer', color: isPublished ? '#22c55e' : 'rgba(28,15,20,0.3)', padding: '2px', lineHeight: 1 }}
      >
        {isPublished ? <ToggleRight size={18} /> : <ToggleLeft size={18} />}
      </button>
      <button
        onClick={deleteArticle}
        disabled={loading}
        title="Supprimer"
        style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#ef4444', padding: '2px', lineHeight: 1 }}
      >
        <Trash2 size={15} />
      </button>
    </>
  )
}
