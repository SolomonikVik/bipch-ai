import { Mentor } from '../types/mentor'
import MentorCard from './MentorCard'
import { MessageCircle } from 'lucide-react'

interface MentorGridProps {
  mentors: Mentor[]
  onMentorSelect: (mentor: Mentor) => void
}

export default function MentorGrid({ mentors, onMentorSelect }: MentorGridProps) {
  return (
    <div>
      {/* Hero Section - Компактная версия */}
      <section className="py-8 lg:py-12">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-2 bg-indigo-100 rounded-lg">
              <MessageCircle className="w-6 h-6 text-indigo-600" />
            </div>
            <h1 className="text-3xl lg:text-4xl font-semibold text-slate-900">
              Выберите ментора
            </h1>
          </div>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Получите персональный совет от великих умов
          </p>
        </div>
      </section>

      {/* Mentors Grid */}
      <section className="pb-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 stagger-animation">
            {mentors.map((mentor, index) => (
              <div 
                key={mentor.id}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <MentorCard
                  mentor={mentor}
                  onSelect={onMentorSelect}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
} 