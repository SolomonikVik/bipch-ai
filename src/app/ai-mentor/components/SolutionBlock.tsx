'use client';

import React from 'react'
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Atom, 
  Lightbulb, 
  Target,
  Calendar,
  Zap,
  RefreshCw,
  AlertCircle
} from 'lucide-react';
import { 
  EinsteinSolutionResponse, 
  SolutionResponse,
  isEinsteinSolution 
} from '../types/mentor'

interface SolutionBlockProps {
  solutionResponse: EinsteinSolutionResponse | SolutionResponse;
  onStartNew: () => void;
}

export default function SolutionBlock({ solutionResponse, onStartNew }: SolutionBlockProps) {
  const isEinstein = isEinsteinSolution(solutionResponse)

  // Если это Эйнштейн - показываем богатую структуру
  if (isEinstein) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Заголовок */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-slate-900">
            Решение через призму физики
          </h1>
          <p className="text-slate-600">
            Анализ проблемы как физической системы с применением научного метода
          </p>
        </div>

        {/* 1. Формула проблемы */}
        <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl text-blue-800">
              <Atom className="h-6 w-6" />
              Формула вашей проблемы
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-white p-4 rounded-lg border border-blue-200">
              <div className="text-center">
                <p className="text-2xl font-mono font-bold text-blue-900 mb-4">
                  {solutionResponse.problem_formula.equation}
                </p>
              </div>
              
              <div className="grid gap-3">
                {Object.entries(solutionResponse.problem_formula.variables).map(([key, variable]) => (
                  <div key={key} className="flex items-center gap-4 p-3 bg-blue-50 rounded-lg">
                    <div className="flex-1">
                      <span className="font-semibold text-blue-900">{variable.name}:</span>
                    </div>
                    <div className="flex items-center gap-4 text-sm">
                      <div className="text-slate-600">
                        Текущее: <span className="font-semibold text-red-600">{variable.current}</span>
                      </div>
                      <div className="text-slate-600">
                        Цель: <span className="font-semibold text-green-600">{variable.target}</span>
                      </div>
                      {variable.optimal && (
                        <div className="text-slate-600">
                          Оптимум: <span className="font-semibold text-blue-600">{variable.optimal}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 2. Инсайт Эйнштейна */}
        <Card className="border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl text-amber-800">
              <Lightbulb className="h-6 w-6" />
              Инсайт Эйнштейна
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Парадокс */}
            <div className="p-4 bg-white rounded-lg border border-amber-200">
              <h4 className="font-semibold text-amber-800 mb-2">🤔 Парадокс:</h4>
              <p className="text-amber-700 italic leading-relaxed">
                {solutionResponse.einstein_insight.paradox}
              </p>
            </div>

            {/* Новый взгляд */}
            <div className="p-4 bg-white rounded-lg border border-amber-200">
              <h4 className="font-semibold text-amber-800 mb-2">🔄 Новый взгляд:</h4>
              <p className="text-amber-700 leading-relaxed">
                {solutionResponse.einstein_insight.reframe}
              </p>
            </div>

            {/* Озарение */}
            <div className="p-4 bg-gradient-to-r from-yellow-100 to-amber-100 rounded-lg border-2 border-amber-300">
              <h4 className="font-semibold text-amber-800 mb-2 flex items-center gap-2">
                <Zap className="h-4 w-4" />
                💡 Главное озарение:
              </h4>
              <p className="text-amber-800 font-medium text-lg leading-relaxed">
                {solutionResponse.einstein_insight.aha_moment}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* 3. Мысленный эксперимент */}
        <Card className="border-purple-200 bg-gradient-to-br from-purple-50 to-violet-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl text-purple-800">
              <Target className="h-6 w-6" />
              Мысленный эксперимент
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="p-4 bg-white rounded-lg border border-purple-200">
                <h4 className="font-semibold text-purple-800 mb-2">🧪 Условия эксперимента:</h4>
                <p className="text-purple-700 leading-relaxed">
                  {solutionResponse.thought_experiment.setup}
                </p>
              </div>

              <div className="p-4 bg-white rounded-lg border border-purple-200">
                <h4 className="font-semibold text-purple-800 mb-2">🌀 Неожиданный поворот:</h4>
                <p className="text-purple-700 leading-relaxed">
                  {solutionResponse.thought_experiment.twist}
                </p>
              </div>

              <div className="p-4 bg-gradient-to-r from-purple-100 to-violet-100 rounded-lg border-2 border-purple-300">
                <h4 className="font-semibold text-purple-800 mb-2">📚 Что это показывает:</h4>
                <p className="text-purple-800 font-medium leading-relaxed">
                  {solutionResponse.thought_experiment.learning}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 4. План действий */}
        <Card className="border-green-200 bg-gradient-to-br from-green-50 to-emerald-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl text-green-800">
              <Calendar className="h-6 w-6" />
              Пошаговый план действий
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {solutionResponse.action_checklist.map((action, index) => (
                <div key={index} className="p-4 bg-white rounded-lg border border-green-200">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-700 font-semibold">
                      {action.day}
                    </div>
                    <div className="flex-1 space-y-2">
                      <h4 className="font-semibold text-green-800">
                        День {action.day}: {action.action}
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-slate-600">Метрика: </span>
                          <span className="font-medium text-green-700">{action.metric}</span>
                        </div>
                        <div>
                          <span className="text-slate-600">Ожидаемый результат: </span>
                          <span className="font-medium text-green-700">{action.expected_result}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 5. Провокационная идея */}
        <Card className="border-red-200 bg-gradient-to-br from-red-50 to-pink-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl text-red-800">
              <AlertCircle className="h-6 w-6" />
              Провокационная идея
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="p-4 bg-white rounded-lg border border-red-200">
              <p className="text-red-700 font-medium leading-relaxed italic">
                {solutionResponse.contrarian_bonus}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* 6. Следующая проверка */}
        <Card className="border-slate-200 bg-slate-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl text-slate-800">
              <RefreshCw className="h-6 w-6" />
              Проверка прогресса
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="p-4 bg-white rounded-lg border border-slate-200">
              <p className="text-slate-700 leading-relaxed">
                <strong>Когда вернуться:</strong> {solutionResponse.next_checkin}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Кнопка перезапуска */}
        <div className="text-center pt-6">
          <Button
            onClick={onStartNew}
            size="lg"
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3"
          >
            Решить новую проблему
          </Button>
        </div>
      </div>
    )
  }

  // Для других менторов - упрощенная структура
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-slate-900">Решение</h1>
        <p className="text-slate-600">{solutionResponse.summary}</p>
      </div>

      <div className="space-y-4">
        {solutionResponse.sections.map((section, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {section.type === 'formula' && <Atom className="h-5 w-5" />}
                {section.type === 'thought-experiment' && <Lightbulb className="h-5 w-5" />}
                {section.type === 'action-plan' && <Target className="h-5 w-5" />}
                {section.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose prose-slate max-w-none">
                {section.content.split('\n').map((paragraph, i) => (
                  <p key={i} className="mb-2 last:mb-0">
                    {paragraph}
                  </p>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center pt-6">
        <Button
          onClick={onStartNew}
          size="lg"
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3"
        >
          Решить новую проблему
        </Button>
      </div>
    </div>
  )
} 