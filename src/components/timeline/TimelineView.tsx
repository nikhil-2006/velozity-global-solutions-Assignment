import { useTaskStore } from "../../store/taskStore";
import type { Task } from "../../types/task";

const CELL_WIDTH = 40;
const DAYS = 30;
const TASK_COL_WIDTH = 160;

function TimelineView() {
  const tasks = useTaskStore((state) => state.tasks);

  const today = new Date();
  const todayDay = today.getDate();
  const todayLeft = (todayDay - 1) * CELL_WIDTH;

  return (
    <div className="p-4 overflow-x-auto">
      <div className="border rounded-xl w-max relative bg-white shadow-sm">

        <div
          className="absolute -top-5 text-xs text-red-500 font-semibold z-20"
          style={{ left: `${todayLeft + TASK_COL_WIDTH}px` }}
        >
          Today
        </div>

        <div
          className="absolute top-10 bottom-0 w-[2px] bg-red-500 opacity-70 z-10"
          style={{ left: `${todayLeft + TASK_COL_WIDTH}px` }}
        />

        <div className="flex border-b bg-gray-100">

          <div className="w-40 border-r flex items-center justify-center font-semibold text-sm">
            Task
          </div>

          <div className="flex">
            {Array.from({ length: DAYS }).map((_, i) => (
              <div
                key={i}
                className="text-xs text-center border-r text-gray-600"
                style={{ width: CELL_WIDTH }}
              >
                {i + 1}
              </div>
            ))}
          </div>
        </div>

        {tasks.map((task) => (
          <TimelineRow key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
}

export default TimelineView;


function TimelineRow({ task }: { task: Task }) {
  const start = task.startDate
    ? new Date(task.startDate + "T00:00:00")
    : new Date(task.dueDate + "T00:00:00");

  const end = new Date(task.dueDate + "T00:00:00");

  const startDay = start.getDate();
  const endDay = end.getDate();

  if (isNaN(startDay) || isNaN(endDay)) return null;

  const duration = Math.max(endDay - startDay + 1, 1);

  const left = (startDay - 1) * CELL_WIDTH;
  const width = duration * CELL_WIDTH;

  const getColor = () => {
    switch (task.priority) {
      case "critical":
        return "bg-red-500";
      case "high":
        return "bg-orange-500";
      case "medium":
        return "bg-yellow-500";
      case "low":
        return "bg-green-500";
      default:
        return "bg-blue-500";
    }
  };

  return (
    <div className="flex border-b h-16 items-center hover:bg-gray-50 transition relative">

      <div className="w-40 px-3 text-sm border-r flex items-center font-medium">
        {task.title}
      </div>

      <div
        className="relative bg-gray-50"
        style={{
          width: `${DAYS * CELL_WIDTH}px`,
          minWidth: `${DAYS * CELL_WIDTH}px`,
        }}
      >

        <div
          className={`absolute top-1/2 -translate-y-1/2 h-8 rounded-lg text-white text-xs flex items-center px-2 shadow-sm ${getColor()}`}
          style={{
            left: `${left}px`,
            width: `${width}px`,
          }}
        >
          {width > 60 && task.title}
        </div>
      </div>
    </div>
  );
}