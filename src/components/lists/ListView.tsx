import { useTaskStore } from "../../store/taskStore";
import { useState } from "react";

type SortField = "title" | "priority" | "dueDate";
type SortOrder = "asc" | "desc";

function ListView() {
  const tasks = useTaskStore((state) => state.tasks);
  const updateTaskStatus = useTaskStore((state) => state.updateTaskStatus);

  const [sortField, setSortField] = useState<SortField>("title");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");

  const handleSort = (field: SortField) => {
    if (field === sortField) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const sortedTasks = [...tasks].sort((a, b) => {
    let valueA: any = a[sortField];
    let valueB: any = b[sortField];

    if (sortField === "priority") {
      const order = ["critical", "high", "medium", "low"];
      valueA = order.indexOf(a.priority);
      valueB = order.indexOf(b.priority);
    }

    if (sortField === "dueDate") {
      valueA = new Date(a.dueDate).getTime();
      valueB = new Date(b.dueDate).getTime();
    }

    if (valueA < valueB) return sortOrder === "asc" ? -1 : 1;
    if (valueA > valueB) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "critical":
        return "bg-red-100 text-red-600";
      case "high":
        return "bg-orange-100 text-orange-600";
      case "medium":
        return "bg-yellow-100 text-yellow-700";
      case "low":
        return "bg-green-100 text-green-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <div className="p-4">
      <div className="border rounded-xl overflow-hidden shadow-sm">

        <table className="w-full table-fixed">
          
          <thead className="bg-gray-100 text-sm">
            <tr>
              <th
                onClick={() => handleSort("title")}
                className="p-3 text-left cursor-pointer w-[40%]"
              >
                Title
              </th>

              <th
                onClick={() => handleSort("priority")}
                className="p-3 text-left cursor-pointer w-[20%]"
              >
                Priority
              </th>

              <th
                onClick={() => handleSort("dueDate")}
                className="p-3 text-left cursor-pointer w-[20%]"
              >
                Due Date
              </th>

              <th className="p-3 text-left w-[20%]">
                Status
              </th>
            </tr>
          </thead>

          <tbody className="text-sm">
            {sortedTasks.map((task) => (
              <tr
                key={task.id}
                className="border-t hover:bg-gray-50 transition"
              >

                <td className="p-3 font-medium">
                  {task.title}
                </td>

                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(
                      task.priority
                    )}`}
                  >
                    {task.priority}
                  </span>
                </td>

                <td className="p-3 text-gray-600">
                  {task.dueDate}
                </td>

                <td className="p-3">
                  <select
                    value={task.status}
                    onChange={(e) =>
                      updateTaskStatus(task.id, e.target.value as any)
                    }
                    className="border rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                  >
                    <option value="todo">To Do</option>
                    <option value="inprogress">In Progress</option>
                    <option value="review">In Review</option>
                    <option value="done">Done</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
}

export default ListView;