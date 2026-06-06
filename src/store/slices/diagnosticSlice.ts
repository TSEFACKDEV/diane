import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface Answer { questionId: number; value: number; label: string }

interface DiagnosticState {
  currentStep: number
  answers:     Answer[]
  score:       number | null
  isComplete:  boolean
}

const initialState: DiagnosticState = {
  currentStep: 0,
  answers:     [],
  score:       null,
  isComplete:  false,
}

const diagnosticSlice = createSlice({
  name: 'diagnostic',
  initialState,
  reducers: {
    setAnswer(state, action: PayloadAction<Answer>) {
      const idx = state.answers.findIndex(a => a.questionId === action.payload.questionId)
      if (idx >= 0) state.answers[idx] = action.payload
      else state.answers.push(action.payload)
    },
    nextStep(state)  { state.currentStep += 1 },
    prevStep(state)  { state.currentStep -= 1 },
    setScore(state, action: PayloadAction<number>) {
      state.score      = action.payload
      state.isComplete = true
    },
    resetDiagnostic() { return initialState },
  },
})

export const { setAnswer, nextStep, prevStep, setScore, resetDiagnostic } = diagnosticSlice.actions
export default diagnosticSlice.reducer