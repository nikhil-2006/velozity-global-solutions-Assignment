import { create } from "zustand";
import type { Task, Status } from "../types/task";

interface TaskState {
    tasks: Task[];
    draggedTask: Task | null;

    updateTaskStatus: (id: string, status: Status) => void;
    setDraggedTask: (task: Task) => void;
    moveTask: (status: Status) => void;
}

export const useTaskStore = create<TaskState>((set) => ({
    tasks: [
        {
            id: "1",
            title: "Fix login bug",
            priority: "high",
            status: "todo",
            dueDate: "2026-03-25",
            startDate: "2026-03-20",
            assignee: "Nikhil",
        },
        {
            id: "2",
            title: "Build dashboard UI",
            priority: "medium",
            status: "inprogress",
            dueDate: "2026-03-28",
            startDate: "2026-03-22",
            assignee: "Rahul",
        },
        {
            id: "3",
            title: "Write API docs",
            priority: "low",
            status: "review",
            dueDate: "2026-03-27",
            startDate: "2026-03-24",
            assignee: "Ankit",
        },
    ],

    draggedTask: null,

    updateTaskStatus: (id, status) =>
        set((state) => ({
            tasks: state.tasks.map((t) =>
                t.id === id ? { ...t, status } : t
            ),
        })),

    setDraggedTask: (task) => set({ draggedTask: task }),

    moveTask: (status) =>
        set((state) => ({
            tasks: state.tasks.map((t) =>
                t.id === state.draggedTask?.id
                    ? { ...t, status }
                    : t
            ),
            draggedTask: null,
        })),
}));