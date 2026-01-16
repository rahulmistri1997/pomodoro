import { TimerDisplay } from '@/components/timer-display';
import { TimerControls } from '@/components/timer-controls';
import { TimerProgress } from '@/components/timer-progress';
import { AudioPlayer } from '@/components/audio-player';
import { TaskList } from '@/components/task-list';
import { useSettings } from '@/hooks/use-settings';
import { usePomodoroTimer } from '@/hooks/use-pomodoro-timer';

function App() {
  const [settings] = useSettings();
  const { timeLeft, isRunning, currentMode, start, pause, reset, skip } =
    usePomodoroTimer(settings);

  return (
    <div className="min-h-screen bg-zinc-950 text-foreground p-4">
      <div className="max-w-md mx-auto space-y-6 py-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold">Pomodoro Timer</h1>
        </div>

        <TimerDisplay timeLeft={timeLeft} currentMode={currentMode} />

        <TimerControls
          isRunning={isRunning}
          onStart={start}
          onPause={pause}
          onReset={reset}
          onSkip={skip}
        />

        <TimerProgress
          timeLeft={timeLeft}
          currentMode={currentMode}
          settings={settings}
        />

        <AudioPlayer />

        <TaskList />
      </div>
    </div>
  );
}

export default App;