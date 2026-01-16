import { useLocalStorage } from './use-local-storage';
import type { TimerSettings } from '../types';

const DEFAULT_SETTINGS: TimerSettings = {
  workDuration: 25 * 60, // 25 minutes
  shortBreakDuration: 5 * 60, // 5 minutes
  longBreakDuration: 15 * 60, // 15 minutes
  volume: 0.5,
};

export function useSettings() {
  return useLocalStorage<TimerSettings>('pomodoro-settings', DEFAULT_SETTINGS);
}
