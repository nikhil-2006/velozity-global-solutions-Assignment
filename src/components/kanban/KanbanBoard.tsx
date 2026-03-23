import { useTaskStore } from "../../store/taskStore";
import KanbanColumn from "./KanbanColumn";
import type { Status } from "../../types/task";

function KanbanBoard() {
  const tasks = useTaskStore((state) => state.tasks);

  const columns: { title: string; status: Status }[] = [
    { title: "To Do", status: "todo" },
    { title: "In Progress", status: "inprogress" },
    { title: "In Review", status: "review" },
    { title: "Done", status: "done" },
  ];

  return (
    <div className="flex gap-4 p-4 overflow-x-auto">
      {columns.map((col) => (
        <KanbanColumn
          key={col.status}
          title={col.title}
          status={col.status}
          tasks={tasks.filter((t) => t.status === col.status)}
        />
      ))}
    </div>
  );
}

export default KanbanBoard;