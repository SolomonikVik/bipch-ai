'use server'

import { openai } from '@/app/ai-mentor/lib/llm'
import { getSystemPrompt, getUserPrompt } from '@/app/ai-mentor/prompts/mentors'
import { validateInput } from '@/app/ai-mentor/lib/validation'
import { 
  EinsteinClarificationResponse, 
  EinsteinSolutionResponse,
  ClarificationResponse, 
  SolutionResponse,
  AIResponse
} from '../types/mentor'

export interface GenerateResponseParams {
  mentorId: string
  problem: string
  userAnswers?: Record<string, string> // Ответы на уточняющие вопросы для этапа 2
}

// Функция для генерации уточняющих вопросов (Этап 1)
export async function generateClarification({ mentorId, problem }: GenerateResponseParams): Promise<EinsteinClarificationResponse | ClarificationResponse> {
  try {
    // Валидация входных данных
    const validation = validateInput({ mentorId, problem })
    if (!validation.isValid) {
      throw new Error(validation.error)
    }

    // Получаем промпты из новой архитектуры
    const systemPrompt = getSystemPrompt(mentorId, 'clarification')
    const userPrompt = getUserPrompt(mentorId, problem)

    if (!systemPrompt || !userPrompt) {
      throw new Error(`Ментор ${mentorId} не найден или недоступен`)
    }

    // Формируем сообщения для OpenAI (Этап 1 - уточнение)
    const messages = [
      {
        role: 'system' as const,
        content: systemPrompt
      },
      {
        role: 'user' as const,
        content: userPrompt
      }
    ]

    // Вызываем OpenAI API
    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages,
      max_tokens: 1500,
      temperature: 0.7,
      response_format: { type: 'json_object' }
    })

    const content = response.choices[0]?.message?.content
    if (!content) {
      throw new Error('Пустой ответ от AI')
    }

    // Парсим JSON ответ
    const clarificationResponse = JSON.parse(content) as AIResponse
    
    // Валидируем структуру ответа
    if (clarificationResponse.stage !== 'clarification' || !clarificationResponse.questions) {
      throw new Error('Неверный формат ответа от AI для этапа уточнения')
    }

    // Возвращаем правильный тип в зависимости от ментора
    return clarificationResponse as EinsteinClarificationResponse | ClarificationResponse

  } catch (error) {
    console.error('Ошибка генерации уточняющих вопросов:', error)
    
    // Fallback на мок-данные в зависимости от ментора
    if (mentorId === 'einstein') {
      return {
        stage: 'clarification',
        initial_observation: 'Ваша проблема напоминает застой в термодинамической системе - энергия есть, но она не превращается в полезную работу.',
        hidden_assumption: 'Вы предполагаете, что проблема в недостатке ресурсов, а не в способе их использования.',
        questions: [
          {
            id: 'einstein_q1',
            question: 'Для кого из участников ситуации ваша проблема — это решение?',
            required: true,
            purpose: 'smena_tochki_zreniya'
          },
          {
            id: 'einstein_q2',
            question: 'Какой "закон" вашего рынка вы принимаете как данность?',
            required: true,
            purpose: 'vyyavlenie_dopusheniy'
          },
          {
            id: 'einstein_q3',
            question: 'Если бы проблема была физическим объектом — какой бы был его вес?',
            required: false,
            purpose: 'myslennyi_eksperiment'
          }
        ],
        physics_parallel: 'Как планета, которая имеет массу для гравитации, но орбита неправильная - нужно изменить траекторию, а не добавлять массу.'
      } as EinsteinClarificationResponse
    } else {
      // Для других менторов - упрощенная структура
      return {
        stage: 'clarification',
        questions: [
          {
            id: 'standard_q1',
            question: 'Расскажите подробнее о контексте проблемы',
            required: true,
            purpose: 'smena_tochki_zreniya'
          },
          {
            id: 'standard_q2',
            question: 'Что уже пробовали для решения?',
            required: true,
            purpose: 'vyyavlenie_dopusheniy'
          }
        ]
      } as ClarificationResponse
    }
  }
}

// Функция для генерации решения (Этап 2)
export async function generateSolution({ mentorId, problem, userAnswers }: GenerateResponseParams): Promise<EinsteinSolutionResponse | SolutionResponse> {
  try {
    // Валидация входных данных
    const validation = validateInput({ mentorId, problem })
    if (!validation.isValid) {
      throw new Error(validation.error)
    }

    if (!userAnswers || Object.keys(userAnswers).length === 0) {
      throw new Error('Необходимы ответы на уточняющие вопросы')
    }

    // Получаем промпты из новой архитектуры
    const systemPrompt = getSystemPrompt(mentorId, 'solution')
    const userPrompt = getUserPrompt(mentorId, problem, userAnswers)

    if (!systemPrompt || !userPrompt) {
      throw new Error(`Ментор ${mentorId} не найден или недоступен`)
    }

    // Формируем сообщения для OpenAI (Этап 2 - решение)
    const messages = [
      {
        role: 'system' as const,
        content: systemPrompt
      },
      {
        role: 'user' as const,
        content: userPrompt
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
    const solutionResponse = JSON.parse(content) as AIResponse
    
    // Валидируем структуру ответа
    if (solutionResponse.stage !== 'solution') {
      throw new Error('Неверный формат ответа от AI для этапа решения')
    }

    // Возвращаем правильный тип в зависимости от ментора
    return solutionResponse as EinsteinSolutionResponse | SolutionResponse

  } catch (error) {
    console.error('Ошибка генерации решения:', error)
    
    // Fallback на мок-данные в зависимости от ментора
    if (mentorId === 'einstein') {
      return {
        stage: 'solution',
        problem_formula: {
          equation: 'Успех = (Инновация × Исполнение) / Сопротивление²',
          variables: {
            'innovation': {
              name: 'Инновация',
              current: 0.3,
              target: 1.0
            },
            'execution': {
              name: 'Исполнение',
              current: 0.8,
              target: 0.9
            },
            'resistance': {
              name: 'Сопротивление',
              current: 3.0,
              target: 1.0
            }
          }
        },
        einstein_insight: {
          paradox: 'Чем быстрее вы бежите к цели, тем дальше она кажется',
          reframe: 'Измените систему координат - не вы двигаетесь к цели, а цель притягивается к вам',
          aha_moment: 'Проблема не в скорости движения, а в неправильной системе отсчета'
        },
        thought_experiment: {
          setup: 'Представьте, что ваша проблема - это физическая система с трением',
          twist: 'Но что если вместо увеличения силы уменьшить трение?',
          learning: 'Это показывает, что эффективность важнее интенсивности'
        },
        action_checklist: [
          {
            day: 1,
            action: 'Переформулируйте проблему в терминах физики',
            metric: 'Количество новых точек зрения',
            expected_result: 'Минимум 3 альтернативных подхода'
          },
          {
            day: 3,
            action: 'Найдите скрытое допущение и опровергните его',
            metric: 'Список ложных убеждений',
            expected_result: 'Обнаружен главный тормозящий фактор'
          },
          {
            day: 7,
            action: 'Проведите мысленный эксперимент',
            metric: 'Результат симуляции',
            expected_result: 'Ясное понимание нового подхода'
          }
        ],
        contrarian_bonus: 'Перестаньте решать эту проблему на месяц и займитесь противоположным',
        next_checkin: 'Вернитесь через 2 недели с отчетом о мысленных экспериментах'
      } as EinsteinSolutionResponse
    } else {
      // Для других менторов - упрощенная структура
      return {
        stage: 'solution',
        summary: 'Через системный подход вы найдете решение.',
        sections: [
          {
            title: 'Анализ проблемы',
            content: 'Основные факторы и их влияние',
            type: 'thought-experiment'
          },
          {
            title: 'План действий',
            content: '1. Первый шаг\n2. Второй шаг\n3. Третий шаг',
            type: 'action-plan'
          }
        ]
      } as SolutionResponse
    }
  }
} 