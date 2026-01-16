import { useState, useEffect, useCallback, useRef } from 'react';
import { useLocalStorage } from './use-local-storage';
import type { TimerMode, TimerState, TimerSettings } from '../types';

export function usePomodoroTimer(settings: TimerSettings) {
  const [timerState, setTimerState] = useLocalStorage<TimerState>('pomodoro-timer', {
    mode: 'work',
    endTime: null,
    isRunning: false,
    sessionsCompleted: 0,
  });

  const [timeLeft, setTimeLeft] = useState(0);
  const intervalRef = useRef<number>(null);

  // Calculate time left based on system time
  useEffect(() => {
    if (!timerState.isRunning || !timerState.endTime) {
      const duration = getDuration(timerState.mode, settings);
      setTimeLeft(duration);
      return;
    }

    const updateTimeLeft = () => {
      const now = Date.now();
      const remaining = Math.max(0, Math.floor((timerState.endTime! - now) / 1000));
      setTimeLeft(remaining);

      if (remaining === 0) {
        handleTimerComplete();
      }
    };

    updateTimeLeft();
    intervalRef.current = window.setInterval(updateTimeLeft, 100);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [timerState.isRunning, timerState.endTime, timerState.mode, settings]);

  const handleTimerComplete = useCallback(() => {
    const newSessionsCompleted = timerState.mode === 'work'
      ? timerState.sessionsCompleted + 1
      : timerState.sessionsCompleted;

    const nextMode = getNextMode(timerState.mode, newSessionsCompleted);

    setTimerState({
      mode: nextMode,
      endTime: null,
      isRunning: false,
      sessionsCompleted: newSessionsCompleted,
    });
  }, [timerState.mode, timerState.sessionsCompleted, setTimerState]);

  const start = useCallback(() => {
    const duration = getDuration(timerState.mode, settings);
    const endTime = Date.now() + duration * 1000;

    setTimerState({
      ...timerState,
      endTime,
      isRunning: true,
    });
  }, [timerState, settings, setTimerState]);

  const pause = useCallback(() => {
    setTimerState({
      ...timerState,
      endTime: null,
      isRunning: false,
    });
  }, [timerState, setTimerState]);

  const reset = useCallback(() => {
    setTimerState({
      mode: 'work',
      endTime: null,
      isRunning: false,
      sessionsCompleted: 0,
    });
  }, [setTimerState]);

  const skip = useCallback(() => {
    const newSessionsCompleted = timerState.mode === 'work'
      ? timerState.sessionsCompleted + 1
      : timerState.sessionsCompleted;

    const nextMode = getNextMode(timerState.mode, newSessionsCompleted);

    setTimerState({
      mode: nextMode,
      endTime: null,
      isRunning: false,
      sessionsCompleted: newSessionsCompleted,
    });
  }, [timerState.mode, timerState.sessionsCompleted, setTimerState]);

  return {
    timeLeft,
    isRunning: timerState.isRunning,
    currentMode: timerState.mode,
    sessionsCompleted: timerState.sessionsCompleted,
    start,
    pause,
    reset,
    skip,
  };
}

function getDuration(mode: TimerMode, settings: TimerSettings): number {
  switch (mode) {
    case 'work':
      return settings.workDuration;
    case 'shortBreak':
      return settings.shortBreakDuration;
    case 'longBreak':
      return settings.longBreakDuration;
  }
}

function getNextMode(currentMode: TimerMode, sessionsCompleted: number): TimerMode {
  if (currentMode === 'work') {
    return sessionsCompleted % 4 === 3 ? 'longBreak' : 'shortBreak';
  }
  return 'work';
}
