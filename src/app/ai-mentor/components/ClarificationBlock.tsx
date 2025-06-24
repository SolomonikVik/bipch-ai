'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Atom, Lightbulb, Eye, HelpCircle } from 'lucide-react';
import { 
  EinsteinClarificationResponse, 
  ClarificationResponse,
  isEinsteinClarification 
} from '../types/mentor';

interface ClarificationBlockProps {
  clarificationResponse: EinsteinClarificationResponse | ClarificationResponse;
  isLoading: boolean;
  onSubmit: (answers: Record<string, string>) => void;
}

export default function ClarificationBlock({ 
  clarificationResponse, 
  isLoading, 
  onSubmit 
}: ClarificationBlockProps) {
  const [answers, setAnswers] = useState<Record<string, string>>({});

  // Отладочная информация
  useEffect(() => {
    console.log('📋 ClarificationBlock: получены вопросы:', clarificationResponse.questions);
    console.log('📋 IDs вопросов:', clarificationResponse.questions.map(q => q.id));
    
    // Проверяем на дубликаты ID
    const ids = clarificationResponse.questions.map(q => q.id);
    const uniqueIds = [...new Set(ids)];
    if (ids.length !== uniqueIds.length) {
      console.error('⚠️ Найдены дублирующиеся ID вопросов!', ids);
    }
  }, [clarificationResponse]);

  useEffect(() => {
    console.log('📝 Текущие ответы:', answers);
  }, [answers]);

  const handleAnswerChange = (questionId: string, value: string) => {
    console.log(`📝 Изменение ответа для ${questionId}:`, value);
    setAnswers(prev => {
      const newAnswers = {
        ...prev,
        [questionId]: value
      };
      console.log('📝 Новое состояние answers:', newAnswers);
      return newAnswers;
    });
  };

  const handleSubmit = () => {
    // Проверяем обязательные вопросы
    const requiredQuestions = clarificationResponse.questions.filter(q => q.required);
    const missingAnswers = requiredQuestions.filter(q => !answers[q.id]?.trim());
    
    if (missingAnswers.length > 0) {
      alert('Пожалуйста, ответьте на все обязательные вопросы');
      return;
    }

    console.log('✅ Отправляем ответы:', answers);
    onSubmit(answers);
  };

  const isEinstein = isEinsteinClarification(clarificationResponse);

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* ЭЙНШТЕЙН: Богатый header с физическими инсайтами */}
      {isEinstein && (
        <div className="grid gap-4 mb-8">
          {/* Первое наблюдение */}
          <Card className="border-blue-200 bg-blue-50">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg text-blue-800">
                <Eye className="h-5 w-5" />
                Первое наблюдение
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-blue-700 italic leading-relaxed">
                {clarificationResponse.initial_observation}
              </p>
            </CardContent>
          </Card>

          {/* Скрытое допущение */}
          <Card className="border-amber-200 bg-amber-50">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg text-amber-800">
                <Lightbulb className="h-5 w-5" />
                Скрытое допущение
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-amber-700 font-medium leading-relaxed">
                {clarificationResponse.hidden_assumption}
              </p>
            </CardContent>
          </Card>

          {/* Физическая аналогия */}
          <Card className="border-purple-200 bg-purple-50">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg text-purple-800">
                <Atom className="h-5 w-5" />
                Физическая аналогия
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-purple-700 leading-relaxed">
                {clarificationResponse.physics_parallel}
              </p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Заголовок для всех менторов */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HelpCircle className="h-6 w-6 text-indigo-600" />
            {isEinstein 
              ? 'Мысленные эксперименты для понимания'
              : 'Уточняющие вопросы'
            }
          </CardTitle>
          <p className="text-slate-600">
            {isEinstein 
              ? 'Ответьте на эти вопросы, чтобы я мог провести более точный анализ через призму физики и найти скрытые закономерности в вашей ситуации.'
              : 'Ответьте на несколько вопросов для лучшего понимания ситуации.'
            }
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {clarificationResponse.questions.map((question, index) => {
            const purposeConfig = {
              'smena_tochki_zreniya': {
                label: 'Смена перспективы',
                color: 'bg-green-100 text-green-700 border-green-200'
              },
              'vyyavlenie_dopusheniy': {
                label: 'Выявление допущений',
                color: 'bg-orange-100 text-orange-700 border-orange-200'
              },
              'myslennyi_eksperiment': {
                label: 'Мысленный эксперимент',
                color: 'bg-purple-100 text-purple-700 border-purple-200'
              }
            }

            const config = purposeConfig[question.purpose]
            
            // Уникальный ключ для поля ввода
            const inputKey = `input-${question.id}-${index}`
            
            console.log(`🔍 Рендер вопроса ${question.id}, значение:`, answers[question.id])

            return (
              <div key={`question-${question.id}-${index}`} className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-semibold mt-1">
                    {index + 1}
                  </div>
                  <div className="flex-1 space-y-3">
                    <div className="flex items-start gap-3">
                      <h3 className="font-medium text-slate-900 leading-relaxed flex-1">
                        {question.question}
                      </h3>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <Badge 
                          variant="secondary" 
                          className={`text-xs px-2 py-1 ${config.color}`}
                        >
                          {config.label}
                        </Badge>
                        {question.required && (
                          <Badge variant="destructive" className="text-xs px-2 py-1">
                            Обязательно
                          </Badge>
                        )}
                      </div>
                    </div>
                    
                    {question.purpose === 'myslennyi_eksperiment' ? (
                      <Textarea
                        key={inputKey}
                        placeholder={isEinstein 
                          ? "Проведите мысленный эксперимент и опишите ваши наблюдения..."
                          : "Ваш ответ..."
                        }
                        value={answers[question.id] || ''}
                        onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                        className="min-h-[100px] resize-none"
                        rows={3}
                      />
                    ) : (
                      <Input
                        key={inputKey}
                        placeholder={isEinstein 
                          ? "Ваше наблюдение..."
                          : "Ваш ответ..."
                        }
                        value={answers[question.id] || ''}
                        onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                        className="w-full"
                      />
                    )}
                  </div>
                </div>
              </div>
            )
          })}

          <div className="pt-4 border-t">
            <Button
              onClick={handleSubmit}
              disabled={isLoading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3"
              size="lg"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  {isEinstein ? 'Анализирую через призму физики...' : 'Анализирую ответы...'}
                </div>
              ) : (
                isEinstein 
                  ? 'Получить решение от Эйнштейна' 
                  : 'Получить решение'
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 