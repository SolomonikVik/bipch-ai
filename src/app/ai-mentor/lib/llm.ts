import OpenAI from 'openai'

// Конфигурация AI модели
export const AI_CONFIG = {
  model: 'gpt-4o',
  maxInputTokens: 3000,
  maxOutputTokens: 2000,
  maxTotalTokens: 5000,
  timeout: 60000,
  temperature: 0.7,
} as const

// Инициализация OpenAI клиента
export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

// Проверка настроек
if (!process.env.OPENAI_API_KEY) {
  throw new Error('OPENAI_API_KEY не найден в переменных окружения')
}

// Типы для API ответов
export interface ChatMessage {
  role: 'system' | 'user' | 'assistant'
  content: string
}

export interface AIModelResponse {
  content: string
  usage?: {
    prompt_tokens: number
    completion_tokens: number
    total_tokens: number
  }
}

// Утилиты для работы с токенами
export function estimateTokens(text: string): number {
  // Примерная оценка: ~4 символа = 1 токен для русского текста
  return Math.ceil(text.length / 4)
}

export function validateTokenLimits(input: string): { isValid: boolean; error?: string } {
  const inputTokens = estimateTokens(input)
  
  if (inputTokens > AI_CONFIG.maxInputTokens) {
    return {
      isValid: false,
      error: `Слишком длинный текст. Максимум ${AI_CONFIG.maxInputTokens} токенов, у вас ${inputTokens}`
    }
  }
  
  return { isValid: true }
} 