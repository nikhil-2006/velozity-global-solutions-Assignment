import { useTaskStore } from "../../store/taskStore";
import type { Task } from "../../types/task";

function TaskCard({ task }: { task: Task }) {
  const setDraggedTask = useTaskStore((state) => state.setDraggedTask);

  return (
    <div
      draggable
      onDragStart={() => setDraggedTask(task)}
      className="bg-white p-3 rounded-lg shadow cursor-grab active:cursor-grabbing hover:shadow-md transition"
    >
      <h3 className="font-semibold">{task.title}</h3>
      <p className="text-xs text-gray-500 capitalize">
        {task.priority}
      </p>
    </div>
  );
}

export default TaskCard;