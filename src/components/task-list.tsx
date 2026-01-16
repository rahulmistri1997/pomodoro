import { useState } from 'react';
import { Plus, X, Check } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { useTasks } from '../hooks/use-tasks';

export function TaskList() {
  const { tasks, addTask, toggleTask, deleteTask } = useTasks();
  const [newTaskText, setNewTaskText] = useState('');

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTaskText.trim()) {
      addTask(newTaskText.trim());
      setNewTaskText('');
    }
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Tasks</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <form onSubmit={handleAddTask} className="flex gap-2">
          <Input
            type="text"
            placeholder="Add a new task..."
            value={newTaskText}
            onChange={(e) => setNewTaskText(e.target.value)}
            className="flex-1"
          />
          <Button type="submit" size="icon" aria-label="Add task">
            <Plus className="h-4 w-4" />
          </Button>
        </form>

        <div className="space-y-2">
          {tasks.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-4">
              No tasks yet. Add one to get started!
            </p>
          ) : (
            tasks.map((task) => (
              <div
                key={task.id}
                className="flex items-center gap-2 group py-2 border-b border-border last:border-0"
              >
                <button
                  type="button"
                  onClick={() => toggleTask(task.id)}
                  className="shrink-0 w-5 h-5 rounded border-2 border-primary flex items-center justify-center hover:bg-primary/10 transition-colors"
                  aria-label={task.completed ? 'Mark as incomplete' : 'Mark as complete'}
                >
                  {task.completed && <Check className="h-3 w-3 text-primary" />}
                </button>
                <span
                  className={`flex-1 text-sm ${
                    task.completed
                      ? 'line-through text-muted-foreground'
                      : 'text-foreground'
                  }`}
                >
                  {task.text}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => deleteTask(task.id)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
                  aria-label="Delete task"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
