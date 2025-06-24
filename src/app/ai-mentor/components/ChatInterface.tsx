'use client'

import { useState } from 'react'
import { 
  Mentor, 
  Screen, 
  ResultState, 
  MockResponse, 
  EinsteinClarificationResponse,
  ClarificationResponse,
  EinsteinSolutionResponse, 
  SolutionResponse
} from '../types/mentor'
import { generateClarification, generateSolution } from '../actions/generateResponse'
import MentorGrid from './MentorGrid'
import ProblemForm from './ProblemForm'
import ClarificationBlock from './ClarificationBlock'
import SolutionBlock from './SolutionBlock'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Loader2 } from 'lucide-react'

interface ChatInterfaceProps {
  mentors: Mentor[]
  mockResponses: MockResponse[]
}

export default function ChatInterface({ mentors, mockResponses }: ChatInterfaceProps) {
  const [currentScreen, setCurrentScreen] = useState<Screen>('mentor-selection')
  const [selectedMentor, setSelectedMentor] = useState<Mentor | null>(null)
  const [problemText, setProblemText] = useState('')
  const [resultState, setResultState] = useState<ResultState>('idle')
  const [clarificationData, setClarificationData] = useState<EinsteinClarificationResponse | ClarificationResponse | null>(null)
  const [solutionData, setSolutionData] = useState<EinsteinSolutionResponse | SolutionResponse | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleMentorSelect = (mentor: Mentor) => {
    if (mentor.status === 'coming-soon') return
    
    setSelectedMentor(mentor)
    setCurrentScreen('problem-form')
  }

  const handleProblemSubmit = async (problemText: string) => {
    if (!selectedMentor) return

    setProblemText(problemText)
    setCurrentScreen('clarification')
    setResultState('loading')
    setError(null)

    try {
      // Таймаут для AI-запроса (30 сек)
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Время ожидания AI-ответа истекло (30 сек). Попробуйте еще раз.')), 30000)
      )
      
      // Генерируем уточняющие вопросы (Этап 1)
      const clarification = await Promise.race([
        generateClarification({
          mentorId: selectedMentor.id,
          problem: problemText
        }),
        timeoutPromise
      ]) as EinsteinClarificationResponse | ClarificationResponse
      
      setClarificationData(clarification)
      setResultState('idle')
    } catch (error) {
      console.error('AI clarification error:', error)
      setResultState('error')
      
      // Fallback на мок ответы при ошибке AI
      const mockResponse = mockResponses.find(r => r.mentorId === selectedMentor.id)
      if (mockResponse) {
        if (selectedMentor.id === 'einstein') {
          // Богатая структура для Эйнштейна
          setClarificationData({
            stage: 'clarification',
            initial_observation: 'Вижу энергетический дисбаланс в вашей системе',
            hidden_assumption: 'Вы предполагаете линейную связь между усилиями и результатом',
            questions: [
              {
                id: 'einstein_fallback_q1',
                question: 'Для кого из участников ваша проблема — это решение?',
                required: true,
                purpose: 'smena_tochki_zreniya'
              },
              {
                id: 'einstein_fallback_q2',
                question: 'Какой "закон" рынка вы принимаете как данность?',
                required: true,
                purpose: 'vyyavlenie_dopusheniy'
              }
            ],
            physics_parallel: 'Как батарейка с хорошим зарядом, но плохими контактами'
          } as EinsteinClarificationResponse)
        } else {
          // Упрощенная структура для других менторов
          setClarificationData({
            stage: 'clarification',
            questions: [
              {
                id: 'standard_fallback_q1',
                question: 'Расскажите подробнее о вашей ситуации',
                required: true,
                purpose: 'smena_tochki_zreniya'
              },
              {
                id: 'standard_fallback_q2',
                question: 'Какие препятствия вы видите?',
                required: true,
                purpose: 'vyyavlenie_dopusheniy'
              }
            ]
          } as ClarificationResponse)
        }
        setResultState('idle')
        setError('AI не ответил, показаны стандартные вопросы.')
        console.warn('Fallback к мок уточняющим вопросам из-за ошибки AI')
      } else {
        const errorMessage = error instanceof Error ? error.message : 'Неизвестная ошибка'
        setError(`Ошибка при генерации уточняющих вопросов: ${errorMessage}`)
        setResultState('error')
      }
    }
  }

  const handleClarificationSubmit = async (answers: Record<string, string>) => {
    if (!selectedMentor) return

    setCurrentScreen('solution')
    setResultState('loading')
    setError(null)

    try {
      // Генерируем решение (Этап 2)
      const solution = await generateSolution({
        mentorId: selectedMentor.id,
        problem: problemText,
        userAnswers: answers
      }) as EinsteinSolutionResponse | SolutionResponse
      
      setSolutionData(solution)
      setResultState('success')
      
    } catch (error) {
      console.error('AI solution error:', error)
      
      // Fallback на мок ответы при ошибке AI
      const mockResponse = mockResponses.find(r => r.mentorId === selectedMentor.id)
      
      if (mockResponse) {
        if (selectedMentor.id === 'einstein') {
          // Богатая структура для Эйнштейна
          setSolutionData({
            stage: 'solution',
            problem_formula: {
              equation: 'Успех = (Инновация × Исполнение) / Сопротивление²',
              variables: {
                'innovation': {
                  name: 'Инновация',
                  current: 0.3,
                  target: 1.0
                },
                'execution': {
                  name: 'Исполнение',
                  current: 0.8,
                  target: 0.9
                },
                'resistance': {
                  name: 'Сопротивление',
                  current: 3.0,
                  target: 1.0
                }
              }
            },
            einstein_insight: {
              paradox: 'Чем быстрее вы двигаетесь, тем медленнее достигаете цели',
              reframe: 'Не увеличивайте скорость, измените направление',
              aha_moment: 'Проблема в системе координат, а не в ваших способностях'
            },
            thought_experiment: {
              setup: 'Представьте свою проблему как физическую систему',
              twist: 'Что если изменить не силу, а трение?',
              learning: 'Эффективность превосходит интенсивность'
            },
            action_checklist: [
              {
                day: 1,
                action: 'Переформулируйте проблему в терминах физики',
                metric: 'Новые точки зрения',
                expected_result: '3+ альтернативных подхода'
              },
              {
                day: 7,
                action: 'Найдите скрытое трение в системе',
                metric: 'Устраненные препятствия',
                expected_result: 'Выявлен главный тормоз'
              }
            ],
            contrarian_bonus: 'Попробуйте противоположный подход на неделю',
            next_checkin: 'Через 2 недели с результатами экспериментов'
          } as EinsteinSolutionResponse)
        } else {
          // Упрощенная структура для других менторов
          setSolutionData({
            stage: 'solution',
            summary: mockResponse.insight,
            sections: [
              {
                title: 'Основные выводы',
                content: mockResponse.insight,
                type: 'thought-experiment'
              },
              {
                title: 'План действий',
                content: mockResponse.checklist.join('\n'),
                type: 'action-plan'
              }
            ]
          } as SolutionResponse)
        }
        setResultState('success')
        console.warn('Fallback к мок решению из-за ошибки AI')
      } else {
        const errorMessage = error instanceof Error ? error.message : 'Неизвестная ошибка'
        setError(`Ошибка при генерации решения: ${errorMessage}`)
        setResultState('error')
      }
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
    setClarificationData(null)
    setSolutionData(null)
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

        {currentScreen === 'clarification' && selectedMentor && (
          <div className="max-w-4xl mx-auto px-6 py-8">
            {resultState === 'loading' ? (
              <div className="text-center space-y-6">
                <div className="flex items-center justify-center space-x-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={selectedMentor.avatar} alt={selectedMentor.name} />
                    <AvatarFallback>{selectedMentor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div className="text-left">
                    <h2 className="text-xl font-semibold text-slate-900">{selectedMentor.name}</h2>
                    <p className="text-sm text-slate-600">{selectedMentor.tagline || selectedMentor.description || ''}</p>
                  </div>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <Loader2 className="h-6 w-6 animate-spin text-indigo-600" />
                  <span className="text-slate-600">Ментор анализирует вашу проблему...</span>
                </div>
              </div>
            ) : clarificationData ? (
              <ClarificationBlock
                clarificationResponse={clarificationData}
                isLoading={false}
                onSubmit={handleClarificationSubmit}
              />
            ) : null}
          </div>
        )}

        {currentScreen === 'solution' && selectedMentor && (
          <div className="max-w-4xl mx-auto px-6 py-8">
            {resultState === 'loading' ? (
              <div className="text-center space-y-6">
                <div className="flex items-center justify-center space-x-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={selectedMentor.avatar} alt={selectedMentor.name} />
                    <AvatarFallback>{selectedMentor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div className="text-left">
                    <h2 className="text-xl font-semibold text-slate-900">{selectedMentor.name}</h2>
                    <p className="text-sm text-slate-600">{selectedMentor.tagline || selectedMentor.description || ''}</p>
                  </div>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <Loader2 className="h-6 w-6 animate-spin text-indigo-600" />
                  <span className="text-slate-600">Ментор готовит решение...</span>
                </div>
              </div>
            ) : solutionData ? (
              <SolutionBlock
                solutionResponse={solutionData}
                onStartNew={handleNewQuestion}
              />
            ) : null}
          </div>
        )}

        {/* Error state */}
        {error && (
          <div className="max-w-4xl mx-auto px-6 py-8">
            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-red-800 mb-2">Произошла ошибка</h3>
              <p className="text-red-700 mb-4">{error}</p>
              <button
                onClick={handleRetry}
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
              >
                Попробовать снова
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  )
} 