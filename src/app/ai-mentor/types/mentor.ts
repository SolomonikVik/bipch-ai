export interface Mentor {
  id: string;
  name: string;
  status: 'active' | 'coming-soon';
  avatar: string;
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

export type Screen = 'mentor-selection' | 'problem-form' | 'result';

export interface MockResponse {
  mentorId: string;
  insight: string;
  checklist: string[];
} 