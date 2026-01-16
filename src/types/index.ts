export type TimerMode = 'work' | 'shortBreak' | 'longBreak';

export interface TimerSettings {
  workDuration: number; // in seconds
  shortBreakDuration: number;
  longBreakDuration: number;
  volume: number; // 0-1
}

export interface Task {
  id: string;
  text: string;
  completed: boolean;
}

export interface TimerState {
  mode: TimerMode;
  endTime: number | null;
  isRunning: boolean;
  sessionsCompleted: number;
}
