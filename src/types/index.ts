export type Priority = 'low' | 'medium' | 'high';
export type TaskStatus = 'todo' | 'in_progress' | 'completed';
export type Category = 'work' | 'personal' | 'learning' | 'health' | 'other';

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: Priority;
  status: TaskStatus;
  category: Category;
  createdAt: Date;
  completedAt?: Date;
  dueDate?: Date;
  tags: string[];
  estimatedTime?: number; // in minutes
  actualTime?: number; // in minutes
}

export interface TaskStats {
  total: number;
  completed: number;
  inProgress: number;
  todo: number;
  completionRate: number;
  avgCompletionTime: number;
  byCategory: Record<Category, number>;
  byPriority: Record<Priority, number>;
  weeklyProgress: WeeklyData[];
}

export interface WeeklyData {
  day: string;
  completed: number;
  created: number;
}

export interface FilterOptions {
  status: TaskStatus | 'all';
  priority: Priority | 'all';
  category: Category | 'all';
  searchQuery: string;
}
