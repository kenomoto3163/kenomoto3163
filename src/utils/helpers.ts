import type { Task, TaskStats, Category, Priority, WeeklyData } from '@/types';

export const generateId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('ja-JP', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(new Date(date));
};

export const formatRelativeTime = (date: Date): string => {
  const now = new Date();
  const diff = now.getTime() - new Date(date).getTime();
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) return `${days}日前`;
  if (hours > 0) return `${hours}時間前`;
  if (minutes > 0) return `${minutes}分前`;
  return 'たった今';
};

export const calculateStats = (tasks: Task[]): TaskStats => {
  const total = tasks.length;
  const completed = tasks.filter((t) => t.status === 'completed').length;
  const inProgress = tasks.filter((t) => t.status === 'in_progress').length;
  const todo = tasks.filter((t) => t.status === 'todo').length;

  const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

  const completedTasks = tasks.filter(
    (t) => t.status === 'completed' && t.completedAt && t.createdAt
  );
  const avgCompletionTime =
    completedTasks.length > 0
      ? completedTasks.reduce((acc, t) => {
          const time =
            new Date(t.completedAt!).getTime() - new Date(t.createdAt).getTime();
          return acc + time / (1000 * 60 * 60); // hours
        }, 0) / completedTasks.length
      : 0;

  const byCategory: Record<Category, number> = {
    work: 0,
    personal: 0,
    learning: 0,
    health: 0,
    other: 0,
  };
  tasks.forEach((t) => byCategory[t.category]++);

  const byPriority: Record<Priority, number> = {
    low: 0,
    medium: 0,
    high: 0,
  };
  tasks.forEach((t) => byPriority[t.priority]++);

  const weeklyProgress = getWeeklyProgress(tasks);

  return {
    total,
    completed,
    inProgress,
    todo,
    completionRate,
    avgCompletionTime: Math.round(avgCompletionTime * 10) / 10,
    byCategory,
    byPriority,
    weeklyProgress,
  };
};

const getWeeklyProgress = (tasks: Task[]): WeeklyData[] => {
  const days = ['日', '月', '火', '水', '木', '金', '土'];
  const today = new Date();
  const result: WeeklyData[] = [];

  for (let i = 6; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const dayStart = new Date(date.setHours(0, 0, 0, 0));
    const dayEnd = new Date(date.setHours(23, 59, 59, 999));

    const completed = tasks.filter((t) => {
      if (!t.completedAt) return false;
      const completedDate = new Date(t.completedAt);
      return completedDate >= dayStart && completedDate <= dayEnd;
    }).length;

    const created = tasks.filter((t) => {
      const createdDate = new Date(t.createdAt);
      return createdDate >= dayStart && createdDate <= dayEnd;
    }).length;

    result.push({
      day: days[new Date(dayStart).getDay()],
      completed,
      created,
    });
  }

  return result;
};

export const getPriorityColor = (priority: Priority): string => {
  const colors = {
    low: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
    high: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
  };
  return colors[priority];
};

export const getCategoryColor = (category: Category): string => {
  const colors = {
    work: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
    personal: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
    learning: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300',
    health: 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300',
    other: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300',
  };
  return colors[category];
};

export const getCategoryLabel = (category: Category): string => {
  const labels = {
    work: '仕事',
    personal: 'プライベート',
    learning: '学習',
    health: '健康',
    other: 'その他',
  };
  return labels[category];
};

export const getPriorityLabel = (priority: Priority): string => {
  const labels = {
    low: '低',
    medium: '中',
    high: '高',
  };
  return labels[priority];
};

export const getStatusLabel = (status: string): string => {
  const labels: Record<string, string> = {
    todo: '未着手',
    in_progress: '進行中',
    completed: '完了',
  };
  return labels[status] || status;
};
