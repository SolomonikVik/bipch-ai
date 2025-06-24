export interface Mentor {
  id: string;
  name: string;
  status: 'active' | 'coming-soon';
  avatar?: string;
  tagline: string;
  focus?: string;
  triggers?: string[];
  style?: string;
  description?: string;
}

export type ResultState = 'idle' | 'loading' | 'success' | 'error';

export interface MentorResult {
  state: ResultState;
  insight?: string;
  checklist?: string[];
  error?: string;
}

export type Screen = 'mentor-selection' | 'problem-form' | 'clarification' | 'solution';

// ===== ЭЙНШТЕЙН - БОГАТЫЕ ТИПЫ ДЛЯ ПОЛНОГО ПРОМПТА =====

// Уточняющие вопросы с полной структурой Эйнштейна
export interface ClarificationQuestion {
  id: string;
  question: string;
  required: boolean;
  purpose: 'smena_tochki_zreniya' | 'vyyavlenie_dopusheniy' | 'myslennyi_eksperiment';
}

// ЭТАП 1: Полная структура уточнения от Эйнштейна
export interface EinsteinClarificationResponse {
  stage: 'clarification';
  initial_observation: string;      // Что вижу через призму физики
  hidden_assumption: string;        // Скрытое допущение уже заметил
  questions: ClarificationQuestion[];
  physics_parallel: string;         // Аналогия с физическим явлением
}

// ЭТАП 2: Полная структура решения от Эйнштейна
export interface ProblemVariable {
  name: string;
  current: number;
  target: number;
  optimal?: number;
}

export interface ProblemFormula {
  equation: string;
  variables: Record<string, ProblemVariable>;
}

export interface EinsteinInsight {
  paradox: string;                  // Парадоксальное наблюдение
  reframe: string;                  // Новая точка зрения
  aha_moment: string;               // Главное озарение одним предложением
}

export interface ThoughtExperiment {
  setup: string;                    // Представьте...
  twist: string;                    // Но что если...
  learning: string;                 // Это показывает, что...
}

export interface ActionItem {
  day: number;
  action: string;
  metric: string;
  expected_result: string;
}

export interface EinsteinSolutionResponse {
  stage: 'solution';
  problem_formula: ProblemFormula;
  einstein_insight: EinsteinInsight;
  thought_experiment: ThoughtExperiment;
  action_checklist: ActionItem[];
  contrarian_bonus: string;         // Антисовет или провокационная идея
  next_checkin: string;            // Когда вернуться для проверки
}

// ===== LEGACY ТИПЫ ДЛЯ ОБРАТНОЙ СОВМЕСТИМОСТИ =====

// Упрощенные типы для других менторов (Джобс, Далай-лама)
export interface ClarificationResponse {
  stage: 'clarification';
  questions: ClarificationQuestion[];
}

export interface SolutionSection {
  title: string;
  content: string;
  type: 'formula' | 'thought-experiment' | 'action-plan';
}

export interface SolutionResponse {
  stage: 'solution';
  summary: string;
  sections: SolutionSection[];
}

// ===== ОБЪЕДИНЕННЫЕ ТИПЫ =====

// Для Эйнштейна - богатые типы
export type EinsteinAIResponse = EinsteinClarificationResponse | EinsteinSolutionResponse;

// Для других менторов - упрощенные типы
export type StandardAIResponse = ClarificationResponse | SolutionResponse;

// Общий тип для всех ответов AI
export type AIResponse = EinsteinAIResponse | StandardAIResponse;

// ===== TYPE GUARDS ДЛЯ РАЗЛИЧЕНИЯ ТИПОВ =====

export function isEinsteinClarification(response: AIResponse): response is EinsteinClarificationResponse {
  return response.stage === 'clarification' && 'initial_observation' in response;
}

export function isEinsteinSolution(response: AIResponse): response is EinsteinSolutionResponse {
  return response.stage === 'solution' && 'problem_formula' in response;
}

export function isStandardClarification(response: AIResponse): response is ClarificationResponse {
  return response.stage === 'clarification' && !('initial_observation' in response);
}

export function isStandardSolution(response: AIResponse): response is SolutionResponse {
  return response.stage === 'solution' && !('problem_formula' in response);
}

// ===== MOCK ДАННЫЕ =====

export interface MockResponse {
  mentorId: string;
  insight: string;
  checklist: string[];
} 