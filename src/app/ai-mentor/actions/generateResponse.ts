'use server'

import { openai } from '@/app/ai-mentor/lib/llm'
import { getMentorPrompt } from '@/app/ai-mentor/prompts/mentors'
import { validateInput } from '@/app/ai-mentor/lib/validation'

export interface GenerateResponseParams {
  mentorId: string
  problem: string
}

export interface AIResponse {
  insight: string
  checklist: string[]
}

export async function generateResponse({ mentorId, problem }: GenerateResponseParams): Promise<AIResponse> {
  try {
    // Валидация входных данных
    const validation = validateInput({ mentorId, problem })
    if (!validation.isValid) {
      throw new Error(validation.error)
    }

    // Получаем промпт ментора
    const prompt = getMentorPrompt(mentorId)
    if (!prompt) {
      throw new Error(`Ментор ${mentorId} не найден`)
    }

    // Формируем сообщения для OpenAI
    const messages = [
      {
        role: 'system' as const,
        content: prompt.system
      },
      {
        role: 'user' as const,
        content: prompt.user_template.replace('{problem}', problem)
      }
    ]

    // Вызываем OpenAI API
    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages,
      max_tokens: 2000,
      temperature: 0.7,
      response_format: { type: 'json_object' }
    })

    const content = response.choices[0]?.message?.content
    if (!content) {
      throw new Error('Пустой ответ от AI')
    }

    // Парсим JSON ответ
    const aiResponse = JSON.parse(content) as AIResponse
    
    // Валидируем структуру ответа
    if (!aiResponse.insight || !Array.isArray(aiResponse.checklist)) {
      throw new Error('Неверный формат ответа от AI')
    }

    return aiResponse

  } catch (error) {
    console.error('Error generating AI response:', error)
    
    // Возвращаем дружелюбную ошибку
    if (error instanceof Error) {
      throw new Error(`Не удалось получить ответ: ${error.message}`)
    }
    
    throw new Error('Произошла неизвестная ошибка при генерации ответа')
  }
} 