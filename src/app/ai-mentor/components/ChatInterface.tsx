'use client'

import { useState } from 'react'
import { Mentor, Screen, ResultState, MockResponse } from '../types/mentor'
import MentorGrid from './MentorGrid'
import ProblemForm from './ProblemForm'
import ResultBlock from './ResultBlock'

interface ChatInterfaceProps {
  mentors: Mentor[]
  mockResponses: MockResponse[]
}

export default function ChatInterface({ mentors, mockResponses }: ChatInterfaceProps) {
  const [currentScreen, setCurrentScreen] = useState<Screen>('mentor-selection')
  const [selectedMentor, setSelectedMentor] = useState<Mentor | null>(null)
  const [problemText, setProblemText] = useState('')
  const [resultState, setResultState] = useState<ResultState>('idle')
  const [currentResponse, setCurrentResponse] = useState<MockResponse | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleMentorSelect = (mentor: Mentor) => {
    if (mentor.status === 'coming-soon') return
    
    setSelectedMentor(mentor)
    setCurrentScreen('problem-form')
  }

  const handleProblemSubmit = async (problemText: string) => {
    if (!selectedMentor) return

    setProblemText(problemText)
    setCurrentScreen('result')
    setResultState('loading')
    setError(null)

    try {
      // Симуляция загрузки 2 секунды
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Поиск мок ответа для выбранного ментора
      const response = mockResponses.find(r => r.mentorId === selectedMentor.id)
      
      if (response) {
        setCurrentResponse(response)
        setResultState('success')
      } else {
        throw new Error('Ответ ментора не найден')
      }
    } catch {
      setError('Произошла ошибка при генерации ответа. Попробуйте еще раз.')
      setResultState('error')
    }
  }

  const handleRetry = () => {
    if (selectedMentor) {
      handleProblemSubmit(problemText)
    }
  }

  const handleNewQuestion = () => {
    setCurrentScreen('mentor-selection')
    setSelectedMentor(null)
    setProblemText('')
    setResultState('idle')
    setCurrentResponse(null)
    setError(null)
  }

  const handleChangeMentor = () => {
    setCurrentScreen('mentor-selection')
    setSelectedMentor(null)
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 h-20">
        <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-semibold text-slate-900">AI Mentor</h1>
          </div>
          <div className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center">
            <span className="text-sm font-medium text-slate-600">?</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pb-20">
        {currentScreen === 'mentor-selection' && (
          <MentorGrid 
            mentors={mentors}
            onMentorSelect={handleMentorSelect}
          />
        )}

        {currentScreen === 'problem-form' && selectedMentor && (
          <ProblemForm
            mentor={selectedMentor}
            onSubmit={handleProblemSubmit}
            onChangeMentor={handleChangeMentor}
          />
        )}

        {currentScreen === 'result' && selectedMentor && (
          <ResultBlock
            mentor={selectedMentor}
            state={resultState}
            insight={currentResponse?.insight}
            checklist={currentResponse?.checklist}
            error={error}
            onRetry={handleRetry}
            onNewQuestion={handleNewQuestion}
          />
        )}
      </main>
    </div>
  )
} 