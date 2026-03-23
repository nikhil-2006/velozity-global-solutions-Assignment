import { useState, lazy, Suspense } from "react";

const KanbanBoard = lazy(() => import("./components/kanban/KanbanBoard"));
const ListView = lazy(() => import("./components/lists/ListView"));
const TimelineView = lazy(() => import("./components/timeline/TimelineView"));

type View = "kanban" | "list" | "timeline";

function App() {
  const [view, setView] = useState<View>("kanban");

  return (
    <div className="min-h-screen bg-gray-50">

      <div className="flex justify-between items-center p-4 border-b bg-white shadow-sm">
        <h1 className="text-xl font-bold">Project Tracker </h1>

        <div className="space-x-2">
          <button
            onClick={() => setView("kanban")}
            className={`px-3 py-1 rounded ${
              view === "kanban"
                ? "bg-blue-500 text-white"
                : "bg-gray-200"
            }`}
          >
            Kanban
          </button>

          <button
            onClick={() => setView("list")}
            className={`px-3 py-1 rounded ${
              view === "list"
                ? "bg-blue-500 text-white"
                : "bg-gray-200"
            }`}
          >
            List
          </button>

          <button
            onClick={() => setView("timeline")}
            className={`px-3 py-1 rounded ${
              view === "timeline"
                ? "bg-blue-500 text-white"
                : "bg-gray-200"
            }`}
          >
            Timeline
          </button>
        </div>
      </div>

      <div className="p-4">
        <Suspense
          fallback={
            <div className="text-center text-gray-500 py-10">
              Loading...
            </div>
          }
        >
          {view === "kanban" && <KanbanBoard />}
          {view === "list" && <ListView />}
          {view === "timeline" && <TimelineView />}
        </Suspense>
      </div>
    </div>
  );      
}

export default App;