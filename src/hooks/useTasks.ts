import { useMemo, useCallback } from 'react';
import { useLocalStorage } from './useLocalStorage';
import type { Task, FilterOptions, TaskStats, TaskStatus } from '@/types';
import { generateId, calculateStats } from '@/utils/helpers';

const STORAGE_KEY = 'ai-task-dashboard-tasks';

// Sample initial tasks for demo
const initialTasks: Task[] = [
  {
    id: generateId(),
    title: 'React Hooksの学習',
    description: 'useEffect, useMemo, useCallbackの最適化パターンを学ぶ',
    priority: 'high',
    status: 'in_progress',
    category: 'learning',
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    tags: ['react', 'frontend'],
    estimatedTime: 120,
  },
  {
    id: generateId(),
    title: 'TypeScript型定義の改善',
    description: 'ジェネリクスと条件型を活用した型安全な実装',
    priority: 'medium',
    status: 'completed',
    category: 'work',
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    completedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    tags: ['typescript'],
    estimatedTime: 90,
    actualTime: 85,
  },
  {
    id: generateId(),
    title: 'ジョギング30分',
    description: '朝のルーティンとして取り入れる',
    priority: 'low',
    status: 'todo',
    category: 'health',
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    tags: ['exercise'],
    estimatedTime: 30,
  },
  {
    id: generateId(),
    title: 'API設計ドキュメント作成',
    description: 'RESTful APIのエンドポイント設計書を作成',
    priority: 'high',
    status: 'todo',
    category: 'work',
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    tags: ['api', 'documentation'],
    estimatedTime: 180,
  },
  {
    id: generateId(),
    title: '機械学習の基礎復習',
    description: 'ニューラルネットワークの基本概念を復習',
    priority: 'medium',
    status: 'completed',
    category: 'learning',
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    completedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    tags: ['ml', 'ai'],
    estimatedTime: 240,
    actualTime: 200,
  },
];

export interface UseTasksReturn {
  tasks: Task[];
  filteredTasks: Task[];
  stats: TaskStats;
  filters: FilterOptions;
  setFilters: (filters: FilterOptions) => void;
  addTask: (task: Omit<Task, 'id' | 'createdAt'>) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  updateStatus: (id: string, status: TaskStatus) => void;
  clearCompleted: () => void;
}

export function useTasks(): UseTasksReturn {
  const [tasks, setTasks] = useLocalStorage<Task[]>(STORAGE_KEY, initialTasks);
  const [filters, setFilters] = useLocalStorage<FilterOptions>(
    'ai-task-dashboard-filters',
    {
      status: 'all',
      priority: 'all',
      category: 'all',
      searchQuery: '',
    }
  );

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      if (filters.status !== 'all' && task.status !== filters.status) {
        return false;
      }
      if (filters.priority !== 'all' && task.priority !== filters.priority) {
        return false;
      }
      if (filters.category !== 'all' && task.category !== filters.category) {
        return false;
      }
      if (filters.searchQuery) {
        const query = filters.searchQuery.toLowerCase();
        return (
          task.title.toLowerCase().includes(query) ||
          task.description.toLowerCase().includes(query) ||
          task.tags.some((tag) => tag.toLowerCase().includes(query))
        );
      }
      return true;
    });
  }, [tasks, filters]);

  const stats = useMemo(() => calculateStats(tasks), [tasks]);

  const addTask = useCallback(
    (taskData: Omit<Task, 'id' | 'createdAt'>) => {
      const newTask: Task = {
        ...taskData,
        id: generateId(),
        createdAt: new Date(),
      };
      setTasks((prev) => [newTask, ...prev]);
    },
    [setTasks]
  );

  const updateTask = useCallback(
    (id: string, updates: Partial<Task>) => {
      setTasks((prev) =>
        prev.map((task) => (task.id === id ? { ...task, ...updates } : task))
      );
    },
    [setTasks]
  );

  const deleteTask = useCallback(
    (id: string) => {
      setTasks((prev) => prev.filter((task) => task.id !== id));
    },
    [setTasks]
  );

  const updateStatus = useCallback(
    (id: string, status: TaskStatus) => {
      setTasks((prev) =>
        prev.map((task) => {
          if (task.id !== id) return task;
          return {
            ...task,
            status,
            completedAt: status === 'completed' ? new Date() : undefined,
          };
        })
      );
    },
    [setTasks]
  );

  const clearCompleted = useCallback(() => {
    setTasks((prev) => prev.filter((task) => task.status !== 'completed'));
  }, [setTasks]);

  return {
    tasks,
    filteredTasks,
    stats,
    filters,
    setFilters,
    addTask,
    updateTask,
    deleteTask,
    updateStatus,
    clearCompleted,
  };
}
