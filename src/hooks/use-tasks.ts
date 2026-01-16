import { useCallback } from 'react';
import { useLocalStorage } from './use-local-storage';
import type { Task } from '../types';

export function useTasks() {
  const [tasks, setTasks] = useLocalStorage<Task[]>('pomodoro-tasks', []);

  const addTask = useCallback((text: string) => {
    const newTask: Task = {
      id: Date.now().toString(),
      text,
      completed: false,
    };
    setTasks((prev) => [...prev, newTask]);
  }, [setTasks]);

  const toggleTask = useCallback((id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }, [setTasks]);

  const deleteTask = useCallback((id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  }, [setTasks]);

  return { tasks, addTask, toggleTask, deleteTask };
}
