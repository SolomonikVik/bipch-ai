'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Checkbox } from '@/components/ui/checkbox'
import { Skeleton } from '@/components/ui/skeleton'
import { Badge } from '@/components/ui/badge'
import { Quote, AlertTriangle, Loader2, RefreshCw, Share, BookmarkPlus } from 'lucide-react'
import { Mentor, ResultState } from '../types/mentor'

interface ResultBlockProps {
  mentor: Mentor
  state: ResultState
  insight?: string
  checklist?: string[]
  error?: string | null
  onRetry: () => void
  onNewQuestion: () => void
}

const getAvatarColor = (mentorId: string) => {
  switch (mentorId) {
    case 'steve-jobs':
      return 'bg-purple-500'
    case 'dalai-lama':
      return 'bg-orange-500'
    case 'einstein':
      return 'bg-blue-500'
    case 'bill-gates':
      return 'bg-green-500'
    case 'oleg-tinkov':
      return 'bg-red-500'
    case 'sergey-galitsky':
      return 'bg-yellow-500'
    default:
      return 'bg-slate-500'
  }
}

const getInitials = (name: string) => {
  const words = name.split(' ')
  if (words.length >= 2) {
    return `${words[0][0]}${words[1][0]}`
  }
  return name.slice(0, 2).toUpperCase()
}

const loadingHints = [
  'Изучаю контекст проблемы...',
  'Применяю подход ментора...',
  'Формирую персональные рекомендации...',
  'Финализирую план действий...'
]

export default function ResultBlock({ 
  mentor, 
  state, 
  insight, 
  checklist = [], 
  error, 
  onRetry, 
  onNewQuestion 
}: ResultBlockProps) {
  const [completedTasks, setCompletedTasks] = useState<Set<number>>(new Set())
  const [currentHint, setCurrentHint] = useState(0)

  // Циклическая смена подсказок при loading
  useEffect(() => {
    if (state !== 'loading') return

    const interval = setInterval(() => {
      setCurrentHint((prev) => (prev + 1) % loadingHints.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [state])

  const toggleTask = (index: number) => {
    const newCompleted = new Set(completedTasks)
    if (newCompleted.has(index)) {
      newCompleted.delete(index)
    } else {
      newCompleted.add(index)
    }
    setCompletedTasks(newCompleted)
  }

  if (state === 'idle') {
    return null
  }

  if (state === 'loading') {
    return (
      <div className="py-12">
        <div className="max-w-3xl mx-auto px-6">
          {/* Mentor Context Bar */}
          <div className="bg-slate-50 p-6 border-l-4 border-indigo-500 rounded-r-lg mb-8">
            <div className="flex items-center gap-4">
              <Avatar className="w-14 h-14">
                {mentor.avatar && <AvatarImage src={mentor.avatar} alt={mentor.name} />}
                <AvatarFallback className={`${getAvatarColor(mentor.id)} text-white font-semibold`}>
                  {getInitials(mentor.name)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h3 className="font-semibold text-slate-900">{mentor.name}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <div className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse shadow-lg shadow-indigo-500/50" />
                  <span className="text-sm text-slate-600">думает...</span>
                </div>
              </div>
            </div>
          </div>

          {/* Thinking Process */}
          <div className="text-center py-16">
            <Loader2 className="w-10 h-10 animate-spin text-indigo-500 mx-auto mb-6" />
            <h3 className="text-xl font-semibold text-slate-900 mb-3">
              Ментор анализирует вашу ситуацию
            </h3>
            <p className="text-slate-600 mb-6">
              Это может занять 15-30 секунд
            </p>
            
            {/* Dynamic hints */}
            <div className="h-6">
              <p className="text-sm text-slate-500 animate-pulse">
                {loadingHints[currentHint]}
              </p>
            </div>
          </div>

          {/* Skeleton Placeholder */}
          <div className="space-y-6">
            <div className="space-y-3">
              <Skeleton className="h-6 w-3/5" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-4/5" />
            </div>
            
            <div className="border border-slate-200 rounded-lg p-6">
              <Skeleton className="h-32 w-full" />
            </div>

            <div className="space-y-3">
              <Skeleton className="h-6 w-2/5" />
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-center gap-3">
                  <Skeleton className="h-4 w-4 rounded" />
                  <Skeleton className="h-4 flex-1" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (state === 'error') {
    return (
      <div className="py-12">
        <div className="max-w-2xl mx-auto px-6">
          <Alert variant="destructive" className="mb-8">
            <AlertTriangle className="h-5 w-5" />
            <AlertTitle className="text-lg font-semibold">Не удалось получить ответ</AlertTitle>
            <AlertDescription className="mt-2">
              {error || 'Произошла ошибка при генерации ответа. Попробуйте еще раз или переформулируйте ваш вопрос.'}
            </AlertDescription>
          </Alert>

          <div className="space-y-4">
            <div className="bg-slate-50 p-6 rounded-lg">
              <h3 className="font-semibold text-slate-900 mb-3">Что можно попробовать:</h3>
              <ul className="space-y-2 text-sm text-slate-600">
                <li>• Проверьте интернет-соединение</li>
                <li>• Попробуйте переформулировать вопрос</li>
                <li>• Добавьте больше контекста о вашей ситуации</li>
                <li>• Обновите страницу</li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button 
                onClick={onRetry}
                className="flex-1"
                size="lg"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Попробовать снова
              </Button>
              <Button 
                variant="outline"
                onClick={onNewQuestion}
                className="flex-1"
                size="lg"
              >
                Изменить вопрос
              </Button>
            </div>

            <div className="text-center">
              <Button variant="ghost" size="sm" className="text-slate-500">
                Связаться с поддержкой
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (state === 'success' && insight) {
    return (
      <div className="py-12">
        <div className="max-w-3xl mx-auto px-6">
          {/* Mentor Response */}
          <div className="mb-12">
            {/* Mentor Header */}
            <div className="flex items-center gap-4 mb-6">
              <Avatar className="w-14 h-14">
                {mentor.avatar && <AvatarImage src={mentor.avatar} alt={mentor.name} />}
                <AvatarFallback className={`${getAvatarColor(mentor.id)} text-white font-semibold`}>
                  {getInitials(mentor.name)}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold text-slate-900">{mentor.name}</h3>
                <p className="text-sm text-emerald-600">отвечает</p>
              </div>
            </div>

            {/* Insight Quote */}
            <blockquote className="relative bg-gradient-to-br from-indigo-50 to-slate-50 p-8 rounded-xl border-l-4 border-indigo-500">
              <Quote className="w-8 h-8 text-indigo-500 mb-4" />
              <p className="text-lg leading-relaxed text-slate-800 mb-6">
                {insight}
              </p>
              <cite className="text-slate-600 font-medium">
                — {mentor.name}
              </cite>
            </blockquote>
          </div>

          {/* Action Plan */}
          {checklist && checklist.length > 0 && (
            <div className="mb-12">
              <h3 className="text-2xl font-semibold text-slate-900 mb-6">
                Ваш план действий
              </h3>
              
              <div className="space-y-4 mb-6">
                {checklist.map((item, index) => (
                  <label 
                    key={index}
                    className="flex items-start gap-4 p-4 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer transition-colors"
                  >
                    <Checkbox 
                      checked={completedTasks.has(index)}
                      onCheckedChange={() => toggleTask(index)}
                      className="mt-1"
                    />
                    <span className={`text-slate-700 leading-relaxed ${
                      completedTasks.has(index) ? 'line-through text-slate-500' : ''
                    }`}>
                      {item}
                    </span>
                  </label>
                ))}
              </div>

              <div className="text-sm text-slate-600 mb-8">
                <span className="font-medium">
                  {completedTasks.size} из {checklist.length} выполнено
                </span>
                {completedTasks.size === checklist.length && (
                  <span className="ml-2 text-emerald-600">🎉 Отличная работа!</span>
                )}
              </div>
            </div>
          )}

          {/* Bottom Actions */}
          <div className="border-t border-slate-200 pt-8">
            <div className="flex flex-col sm:flex-row gap-3">
              <Button 
                variant="outline"
                onClick={onNewQuestion}
                className="flex-1"
                size="lg"
              >
                Новый вопрос
              </Button>
              
              <Button 
                variant="outline"
                disabled
                className="flex-1 relative"
                size="lg"
              >
                <BookmarkPlus className="w-4 h-4 mr-2" />
                Запомнить план
                <Badge variant="secondary" className="absolute -top-2 -right-2 text-xs">
                  Скоро
                </Badge>
              </Button>
              
              <Button variant="ghost" size="lg">
                <Share className="w-4 h-4 mr-2" />
                Поделиться
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return null
} 