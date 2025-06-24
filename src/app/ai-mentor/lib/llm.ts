import OpenAI from 'openai'

// Проверяем наличие API ключа
if (!process.env.OPENAI_API_KEY) {
  throw new Error('OPENAI_API_KEY не найден в environment variables')
}

// Создаем экземпляр OpenAI
export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  timeout: 60000, // 60 секунд таймаут для GPT-4o
})

// Конфигурация для AI менторов
export const AI_CONFIG = {
  model: 'gpt-4o' as const,
  maxInputTokens: 3000,
  maxOutputTokens: 2000,
  maxTotalTokens: 5000,
  temperature: 0.7,
  timeout: 60000
}

// Типы для сообщений
export interface ChatMessage {
  role: 'system' | 'user' | 'assistant'
  content: string
}

// Функция для подсчета токенов (приблизительно)
export function estimateTokens(text: string): number {
  // Примерная оценка: 1 токен ≈ 4 символа для английского, 2-3 для русского
  return Math.ceil(text.length / 3)
}

// Функция для проверки лимитов
export function checkTokenLimits(input: string, output: string): boolean {
  const inputTokens = estimateTokens(input)
  const outputTokens = estimateTokens(output)
  const totalTokens = inputTokens + outputTokens

  return (
    inputTokens <= AI_CONFIG.maxInputTokens &&
    outputTokens <= AI_CONFIG.maxOutputTokens &&
    totalTokens <= AI_CONFIG.maxTotalTokens
  )
} 