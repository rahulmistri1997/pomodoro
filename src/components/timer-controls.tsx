import { Play, Pause, RotateCcw, SkipForward } from 'lucide-react';
import { Button } from './ui/button';

interface TimerControlsProps {
  isRunning: boolean;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
  onSkip: () => void;
}

export function TimerControls({
  isRunning,
  onStart,
  onPause,
  onReset,
  onSkip,
}: TimerControlsProps) {
  return (
    <div className="flex items-center justify-center gap-3">
      <Button
        size="lg"
        variant="outline"
        onClick={onReset}
        aria-label="Reset timer"
      >
        <RotateCcw />
      </Button>
      <Button
        size="lg"
        onClick={isRunning ? onPause : onStart}
        aria-label={isRunning ? 'Pause timer' : 'Start timer'}
        className="w-24"
      >
        {isRunning ? <Pause /> : <Play />}
        {isRunning ? 'Pause' : 'Start'}
      </Button>
      <Button
        size="lg"
        variant="outline"
        onClick={onSkip}
        aria-label="Skip to next session"
      >
        <SkipForward />
      </Button>
    </div>
  );
}
