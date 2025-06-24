'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { Card, CardContent } from '@/components/ui/card'
import { ChevronDown, HelpCircle } from 'lucide-react'
import { Mentor } from '../types/mentor'

interface ProblemFormProps {
  mentor: Mentor
  onSubmit: (problemText: string) => Promise<void>
  onChangeMentor: () => void
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

export default function ProblemForm({ mentor, onSubmit, onChangeMentor }: ProblemFormProps) {
  const [problemText, setProblemText] = useState('')
  const [isExpanded, setIsExpanded] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async () => {
    if (!problemText.trim() || problemText.length < 50) return
    
    setIsSubmitting(true)
    try {
      await onSubmit(problemText)
    } catch (error) {
      console.error('Submit error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const characterCount = problemText.length
  const isValid = characterCount >= 50 && characterCount <= 1000

  return (
    <div>
      {/* Selected Mentor Bar */}
      <section className="bg-slate-50 border-b border-slate-200 py-6">
        <div className="max-w-3xl mx-auto px-6">
          <div className="flex items-center gap-4">
            <Avatar className="w-14 h-14">
              {mentor.avatar && <AvatarImage src={mentor.avatar} alt={mentor.name} />}
              <AvatarFallback className={`${getAvatarColor(mentor.id)} text-white font-semibold`}>
                {getInitials(mentor.name)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h2 className="font-semibold text-slate-900">{mentor.name}</h2>
              <p className="text-sm text-slate-600">{mentor.tagline}</p>
            </div>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={onChangeMentor}
              className="text-slate-600 hover:text-slate-900"
            >
              Изменить
            </Button>
          </div>
        </div>
      </section>

      {/* Problem Form */}
      <section className="py-12">
        <div className="max-w-2xl mx-auto px-6">
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-semibold text-slate-900 mb-4">
                Опишите вашу ситуацию
              </h2>
              <p className="text-slate-600">
                Ментор задаст уточняющие вопросы для более точного решения
              </p>
            </div>

            <div className="space-y-4">
              <Textarea
                placeholder="Расскажите подробно о проблеме, с которой столкнулись в бизнесе..."
                value={problemText}
                onChange={(e) => setProblemText(e.target.value)}
                className="min-h-48 resize-none text-base leading-relaxed"
                maxLength={1000}
              />
              
              <div className="flex justify-between items-center text-sm">
                <span className={`
                  ${characterCount < 50 ? 'text-slate-500' : 
                    characterCount > 900 ? 'text-orange-600' : 'text-emerald-600'}
                `}>
                  {characterCount}/1000 символов {characterCount < 50 && '(минимум 50)'}
                </span>
              </div>
            </div>

            {/* Helper Tips */}
            <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
              <CollapsibleTrigger asChild>
                <Button 
                  variant="ghost" 
                  className="w-full justify-between p-4 h-auto text-left"
                >
                  <div className="flex items-center gap-3">
                    <HelpCircle className="w-5 h-5 text-indigo-500" />
                    <span className="font-medium">Что описать для лучшего результата?</span>
                  </div>
                  <ChevronDown className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <Card className="mt-4">
                  <CardContent className="pt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div className="space-y-2">
                        <div className="flex items-start gap-3">
                          <span className="text-lg">📝</span>
                          <div>
                            <div className="font-medium text-slate-900">Контекст бизнеса</div>
                            <div className="text-slate-600">Сфера, размер, команда</div>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <span className="text-lg">🎯</span>
                          <div>
                            <div className="font-medium text-slate-900">Конкретная проблема</div>
                            <div className="text-slate-600">Что именно не работает</div>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-start gap-3">
                          <span className="text-lg">💡</span>
                          <div>
                            <div className="font-medium text-slate-900">Что уже пробовали</div>
                            <div className="text-slate-600">Предыдущие попытки решения</div>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <span className="text-lg">⚡</span>
                          <div>
                            <div className="font-medium text-slate-900">Желаемый результат</div>
                            <div className="text-slate-600">К чему стремитесь</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CollapsibleContent>
            </Collapsible>

            <Button 
              onClick={handleSubmit}
              disabled={!isValid || isSubmitting}
              size="lg"
              className="w-full text-base py-3"
            >
              {isSubmitting ? 'Ментор анализирует...' : 'Получить уточняющие вопросы'}
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
} 