import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

interface Answer {
  questionId: string
  value:      number   // 1-5
  label:      string
}

/**
 * Score calculé sur 100 — moyenne pondérée des réponses (valeurs 1-5)
 * transformée en pourcentage.
 */
function calculateScore(answers: Answer[]): number {
  if (!answers.length) return 0
  const total = answers.reduce((sum, a) => sum + a.value, 0)
  const max   = answers.length * 5
  return Math.round((total / max) * 100)
}

function getLevel(score: number): { level: string; label: string; description: string } {
  if (score >= 80) return {
    level:       'excellent',
    label:       'Organisation mature',
    description: 'Votre organisation dispose d\'une structure solide. Passez au niveau suivant avec un accompagnement stratégique.',
  }
  if (score >= 60) return {
    level:       'good',
    label:       'Bonne progression',
    description: 'Votre organisation avance bien. Quelques ajustements structurels peuvent maximiser votre impact.',
  }
  if (score >= 40) return {
    level:       'developing',
    label:       'En développement',
    description: 'Des bases existent mais la structure nécessite un renforcement. Un accompagnement ciblé est recommandé.',
  }
  return {
    level:       'early',
    label:       'Phase initiale',
    description: 'Votre organisation en est à ses débuts. Un accompagnement global vous aidera à structurer votre développement.',
  }
}

// POST /api/diagnostic
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { answers, email } = body as { answers: Answer[]; email?: string }

    if (!Array.isArray(answers) || answers.length === 0) {
      return NextResponse.json({ success: false, message: 'Réponses manquantes' }, { status: 400 })
    }

    // Valider les valeurs (1-5)
    for (const a of answers) {
      if (typeof a.value !== 'number' || a.value < 1 || a.value > 5) {
        return NextResponse.json({ success: false, message: 'Valeurs de réponse invalides (1-5 attendu)' }, { status: 400 })
      }
    }

    const score  = calculateScore(answers)
    const result = getLevel(score)

    // Sauvegarder en BDD
    await prisma.diagnosticResult.create({
      data: {
        email:   email ?? null,
        answers: answers as object,
        score,
      },
    })

    return NextResponse.json({
      success: true,
      score,
      ...result,
    })
  } catch (error) {
    console.error('[DIAGNOSTIC]', error)
    return NextResponse.json({ success: false, message: 'Erreur serveur' }, { status: 500 })
  }
}
