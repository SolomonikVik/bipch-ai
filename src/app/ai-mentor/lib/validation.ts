import { validateTokenLimits } from './llm'

export interface ValidationResult {
  isValid: boolean
  error?: string
}

export interface ValidationInput {
  mentorId: string
  problem: string
}

// Список доступных менторов
const AVAILABLE_MENTORS = [
  'steve-jobs',
  'dalai-lama', 
  'einstein'
  // 'bill-gates', 'oleg-tinkov', 'sergey-galitsky' - coming soon
] as const

export function validateInput({ mentorId, problem }: ValidationInput): ValidationResult {
  // Проверяем ментора
  if (!mentorId || typeof mentorId !== 'string') {
    return {
      isValid: false,
      error: 'Не выбран ментор'
    }
  }

  if (!AVAILABLE_MENTORS.includes(mentorId as typeof AVAILABLE_MENTORS[number])) {
    return {
      isValid: false,
      error: `Ментор "${mentorId}" недоступен или находится в разработке`
    }
  }

  // Проверяем проблему
  if (!problem || typeof problem !== 'string') {
    return {
      isValid: false,
      error: 'Не описана проблема'
    }
  }

  const trimmedProblem = problem.trim()
  
  if (trimmedProblem.length < 50) {
    return {
      isValid: false,
      error: 'Описание проблемы слишком короткое. Минимум 50 символов'
    }
  }

  if (trimmedProblem.length > 3000) {
    return {
      isValid: false,
      error: 'Описание проблемы слишком длинное. Максимум 3000 символов'
    }
  }

  // Проверяем токены
  const tokenValidation = validateTokenLimits(trimmedProblem)
  if (!tokenValidation.isValid) {
    return tokenValidation
  }

  // Базовая проверка на спам/неподходящий контент
  const suspiciousPatterns = [
    /(.)\1{10,}/i, // Повторяющиеся символы
    /^[^а-яёa-z]*$/i, // Только спецсимволы/цифры
    /(test|тест)\s*\1+/i // Повторяющиеся тестовые фразы
  ]

  for (const pattern of suspiciousPatterns) {
    if (pattern.test(trimmedProblem)) {
      return {
        isValid: false,
        error: 'Пожалуйста, опишите реальную бизнес-проблему'
      }
    }
  }

  return { isValid: true }
}

// Утилита для очистки входных данных
export function sanitizeInput(input: string): string {
  return input
    .trim()
    .replace(/\s+/g, ' ') // Множественные пробелы в одинарные
    .slice(0, 3000) // Обрезаем до максимума
}

// Проверка на содержание бизнес-контекста
export function validateBusinessContext(problem: string): ValidationResult {
  const businessKeywords = [
    'бизнес', 'компания', 'команда', 'продукт', 'клиент', 'продажи', 
    'деньги', 'прибыль', 'убыток', 'рынок', 'конкуренты', 'стратегия',
    'business', 'company', 'product', 'client', 'sales', 'money', 'profit'
  ]

  const problemLower = problem.toLowerCase()
  const hasBusinessContext = businessKeywords.some(keyword => 
    problemLower.includes(keyword)
  )

  if (!hasBusinessContext && problem.length < 200) {
    return {
      isValid: false,
      error: 'Опишите подробнее бизнес-контекст вашей проблемы'
    }
  }

  return { isValid: true }
} 