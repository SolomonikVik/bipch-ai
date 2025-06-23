import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Mentor } from '../types/mentor'

interface MentorCardProps {
  mentor: Mentor
  isSelected?: boolean
  onSelect: (mentor: Mentor) => void
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

export default function MentorCard({ mentor, isSelected = false, onSelect }: MentorCardProps) {
  const isComingSoon = mentor.status === 'coming-soon'
  
  return (
    <Card 
      className={`
        group relative cursor-pointer transition-all duration-200 hover:-translate-y-1
        ${isSelected 
          ? 'border-indigo-500 bg-indigo-50 shadow-lg ring-1 ring-indigo-200' 
          : 'border-slate-200 hover:border-indigo-300 hover:shadow-lg hover:bg-slate-50'
        }
        ${isComingSoon ? 'opacity-70 cursor-not-allowed hover:transform-none' : ''}
      `}
      onClick={() => onSelect(mentor)}
    >
      {isComingSoon && (
        <Badge 
          variant="secondary" 
          className="absolute top-3 right-3 z-10"
        >
          Скоро
        </Badge>
      )}
      
      <CardHeader className="pb-4">
        <div className="flex gap-4">
          <Avatar className="w-20 h-20">
            {mentor.avatar && <AvatarImage src={mentor.avatar} alt={mentor.name} />}
            <AvatarFallback className={`${getAvatarColor(mentor.id)} text-white font-semibold text-xl`}>
              {getInitials(mentor.name)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-slate-900 text-lg leading-tight mb-1">
              {mentor.name}
            </h3>
            <p className="text-slate-600 text-sm">
              {mentor.tagline}
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0 pb-6">
        <div className="space-y-4">
          {/* Описание ситуации */}
          <p className="text-slate-700 text-sm leading-relaxed">
            {mentor.focus}
          </p>
          
          {/* Помощь */}
          {mentor.triggers && mentor.triggers.length > 0 && (
            <div>
              <p className="text-slate-600 text-xs font-medium mb-2">Поможет:</p>
              <ul className="space-y-1">
                {mentor.triggers.map((trigger, index) => (
                  <li key={index} className="text-slate-600 text-xs flex items-start">
                    <span className="text-indigo-500 mr-2 mt-0.5">•</span>
                    {trigger}
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {/* Кнопка выбора */}
          <div className="pt-2">
            {isComingSoon ? (
              <span className="text-xs font-medium text-slate-500">
                Скоро доступен
              </span>
            ) : (
              <div className="text-sm font-medium text-indigo-600 group-hover:text-indigo-700">
                {mentor.description}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 