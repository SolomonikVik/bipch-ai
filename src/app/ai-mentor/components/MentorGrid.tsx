import { Mentor } from '../types/mentor'
import MentorCard from './MentorCard'

interface MentorGridProps {
  mentors: Mentor[]
  onMentorSelect: (mentor: Mentor) => void
}

export default function MentorGrid({ mentors, onMentorSelect }: MentorGridProps) {
  return (
    <div>
      {/* Hero Section */}
      <section className="py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-4xl lg:text-5xl font-semibold text-slate-900 mb-6 leading-tight">
            Застряли? Спросите ментора.
          </h1>
          <p className="text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
            AI-менторы помогут найти выход из тупика и план действий
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