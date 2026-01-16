import { Progress } from './ui/progress';
import type { TimerMode, TimerSettings } from '../types';

interface TimerProgressProps {
  timeLeft: number;
  currentMode: TimerMode;
  settings: TimerSettings;
}

export function TimerProgress({
  timeLeft,
  currentMode,
  settings,
}: TimerProgressProps) {
  const getDuration = (mode: TimerMode): number => {
    switch (mode) {
      case 'work':
        return settings.workDuration;
      case 'shortBreak':
        return settings.shortBreakDuration;
      case 'longBreak':
        return settings.longBreakDuration;
    }
  };

  const totalDuration = getDuration(currentMode);
  const progress = totalDuration > 0 ? ((totalDuration - timeLeft) / totalDuration) * 100 : 0;

  return <Progress value={progress} className="w-full h-2" />;
}
