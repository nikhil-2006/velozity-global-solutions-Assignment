import { useTaskStore } from "../../store/taskStore";
import TaskCard from "./TaskCard";
import type { Task, Status } from "../../types/task";

interface Props {
  title: string;
  status: Status;
  tasks: Task[];
}

function KanbanColumn({ title, status, tasks }: Props) {
  const moveTask = useTaskStore((state) => state.moveTask);

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        e.currentTarget.classList.add("bg-blue-100");
      }}
      onDragLeave={(e) => {
        e.currentTarget.classList.remove("bg-blue-100");
      }}
      onDrop={(e) => {
        e.currentTarget.classList.remove("bg-blue-100");
        moveTask(status);
      }}
      className="bg-gray-100 p-4 rounded-lg w-72 min-h-[350px] transition"
    >
      <h2 className="font-bold mb-3">{title}</h2>

      <div className="space-y-2">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
}

export default KanbanColumn;