import {
  Header,
  StatsCards,
  Charts,
  TaskFilters,
  TaskList,
  AddTaskForm,
} from '@/components';
import { useTasks, useDarkMode } from '@/hooks';

function App() {
  const [isDarkMode, toggleDarkMode] = useDarkMode();
  const {
    filteredTasks,
    stats,
    filters,
    setFilters,
    addTask,
    updateStatus,
    deleteTask,
  } = useTasks();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Stats Overview */}
          <section>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              概要
            </h2>
            <StatsCards stats={stats} />
          </section>

          {/* Charts */}
          <section>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              分析
            </h2>
            <Charts stats={stats} />
          </section>

          {/* Tasks Section */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                タスク一覧
                <span className="ml-2 text-sm font-normal text-gray-500 dark:text-gray-400">
                  ({filteredTasks.length}件)
                </span>
              </h2>
            </div>

            <div className="space-y-4">
              <TaskFilters filters={filters} setFilters={setFilters} />
              <AddTaskForm onAdd={addTask} />
              <TaskList
                tasks={filteredTasks}
                onUpdateStatus={updateStatus}
                onDelete={deleteTask}
              />
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-gray-800 py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-500 dark:text-gray-400">
            AI Task Analytics Dashboard - Built with React, TypeScript & Tailwind CSS
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
