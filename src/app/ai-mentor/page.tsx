'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Home } from 'lucide-react'
import ChatInterface from './components/ChatInterface'
import { Mentor, MockResponse } from './types/mentor'
import { Skeleton } from '@/components/ui/skeleton'

export default function AIMentorPage() {
  const [mentors, setMentors] = useState<Mentor[]>([])
  const [mockResponses, setMockResponses] = useState<MockResponse[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadData = async () => {
      try {
        const [mentorsResponse, responsesResponse] = await Promise.all([
          fetch('/ai-mentor/data/mentors.json'),
          fetch('/ai-mentor/data/mock-responses.json')
        ])

        if (!mentorsResponse.ok || !responsesResponse.ok) {
          throw new Error('Failed to load data')
        }

        const [mentorsData, responsesData] = await Promise.all([
          mentorsResponse.json(),
          responsesResponse.json()
        ])

        setMentors(mentorsData.mentors)
        setMockResponses(responsesData.responses)
      } catch (err) {
        setError('Не удалось загрузить данные')
        console.error('Error loading data:', err)
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [])

  const NavigationHeader = () => (
    <div className="bg-white border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center gap-2 text-lg">
          <Link 
            href="/" 
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors"
          >
            <Home className="w-5 h-5" />
            <span className="font-medium">Главная</span>
          </Link>
          <span className="text-slate-400">/</span>
          <span className="text-slate-700 font-medium">AI Mentor</span>
        </div>
      </div>
    </div>
  )

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50">
        <NavigationHeader />
        <div className="max-w-6xl mx-auto px-6 py-20">
          <div className="text-center mb-16">
            <Skeleton className="h-12 w-96 mx-auto mb-4" />
            <Skeleton className="h-6 w-[600px] mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white p-6 rounded-xl border border-slate-200">
                <div className="flex gap-4 mb-4">
                  <Skeleton className="w-16 h-16 rounded-full" />
                  <div className="flex-1">
                    <Skeleton className="h-6 w-32 mb-2" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                </div>
                <Skeleton className="h-16 w-full mb-4" />
                <Skeleton className="h-10 w-full" />
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-50">
        <NavigationHeader />
        <div className="flex items-center justify-center" style={{ minHeight: 'calc(100vh - 73px)' }}>
          <div className="text-center">
            <h1 className="text-2xl font-semibold text-slate-900 mb-4">
              Ошибка загрузки
            </h1>
            <p className="text-slate-600 mb-6">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="px-6 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors"
            >
              Попробовать снова
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <NavigationHeader />
      <ChatInterface 
        mentors={mentors} 
        mockResponses={mockResponses}
      />
    </div>
  )
} 