import { useState } from 'react';
import {
  Clock,
  CheckCircle2,
  Circle,
  PlayCircle,
  Trash2,
  ChevronDown,
  ChevronUp,
  Calendar,
  Tag,
} from 'lucide-react';
import type { Task, TaskStatus } from '@/types';
import {
  getPriorityColor,
  getCategoryColor,
  getCategoryLabel,
  getPriorityLabel,
  formatRelativeTime,
} from '@/utils/helpers';

interface TaskItemProps {
  task: Task;
  onUpdateStatus: (id: string, status: TaskStatus) => void;
  onDelete: (id: string) => void;
}

export function TaskItem({ task, onUpdateStatus, onDelete }: TaskItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const statusIcon = {
    todo: <Circle className="w-5 h-5 text-gray-400" />,
    in_progress: <PlayCircle className="w-5 h-5 text-yellow-500" />,
    completed: <CheckCircle2 className="w-5 h-5 text-green-500" />,
  };

  const nextStatus: Record<TaskStatus, TaskStatus> = {
    todo: 'in_progress',
    in_progress: 'completed',
    completed: 'todo',
  };

  return (
    <div
      className={`group bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 overflow-hidden transition-all hover:shadow-md ${
        task.status === 'completed' ? 'opacity-60' : ''
      }`}
    >
      <div className="p-4">
        <div className="flex items-start gap-3">
          {/* Status Toggle */}
          <button
            onClick={() => onUpdateStatus(task.id, nextStatus[task.status])}
            className="mt-0.5 hover:scale-110 transition-transform"
            aria-label="Toggle status"
          >
            {statusIcon[task.status]}
          </button>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <h3
                className={`font-medium text-gray-900 dark:text-white ${
                  task.status === 'completed' ? 'line-through' : ''
                }`}
              >
                {task.title}
              </h3>
              <div className="flex items-center gap-2 flex-shrink-0">
                <span
                  className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(
                    task.priority
                  )}`}
                >
                  {getPriorityLabel(task.priority)}
                </span>
                <span
                  className={`text-xs px-2 py-1 rounded-full ${getCategoryColor(
                    task.category
                  )}`}
                >
                  {getCategoryLabel(task.category)}
                </span>
              </div>
            </div>

            {/* Tags */}
            {task.tags.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-2">
                {task.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 text-xs px-2 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full"
                  >
                    <Tag className="w-3 h-3" />
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Meta Info */}
            <div className="flex items-center gap-4 mt-2 text-xs text-gray-500 dark:text-gray-400">
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {formatRelativeTime(task.createdAt)}
              </span>
              {task.estimatedTime && (
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {task.estimatedTime}分
                </span>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              aria-label="Toggle details"
            >
              {isExpanded ? (
                <ChevronUp className="w-4 h-4 text-gray-400" />
              ) : (
                <ChevronDown className="w-4 h-4 text-gray-400" />
              )}
            </button>
            <button
              onClick={() => onDelete(task.id)}
              className="p-1.5 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg transition-colors"
              aria-label="Delete task"
            >
              <Trash2 className="w-4 h-4 text-red-500" />
            </button>
          </div>
        </div>
      </div>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="px-4 pb-4 pt-2 border-t border-gray-100 dark:border-gray-700 animate-slide-up">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {task.description || '説明がありません'}
          </p>
          {task.completedAt && (
            <p className="text-xs text-green-600 dark:text-green-400 mt-2">
              完了: {formatRelativeTime(task.completedAt)}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
