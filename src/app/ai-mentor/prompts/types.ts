// TypeScript типы для промптов менторов
export interface MentorPrompt {
  system: string
  user_template: string
  response_format: 'json_object' | 'text'
}

export interface PromptsConfig {
  [mentorId: string]: MentorPrompt
}

// Тип для валидации доступных менторов
export type AvailableMentorId = 'steve-jobs' | 'dalai-lama' | 'einstein'

// Интерфейс для JSON ответа от AI
export interface AIResponseFormat {
  insight: string
  checklist: string[]
} 