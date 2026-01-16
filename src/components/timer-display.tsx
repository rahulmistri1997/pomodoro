import { Card, CardContent } from './ui/card';
import type { TimerMode } from '../types';

interface TimerDisplayProps {
  timeLeft: number;
  currentMode: TimerMode;
}

export function TimerDisplay({ timeLeft, currentMode }: TimerDisplayProps) {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const modeLabels: Record<TimerMode, string> = {
    work: 'Focus Time',
    shortBreak: 'Short Break',
    longBreak: 'Long Break',
  };

  return (
    <Card className="w-full">
      <CardContent className="flex flex-col items-center justify-center py-12">
        <p className="text-sm text-muted-foreground mb-2">{modeLabels[currentMode]}</p>
        <div className="text-7xl md:text-8xl font-bold tabular-nums">
          {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
        </div>
      </CardContent>
    </Card>
  );
}
