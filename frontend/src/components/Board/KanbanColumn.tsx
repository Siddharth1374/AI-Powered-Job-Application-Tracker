import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { Application, ApplicationStatus } from "../../types/application";
import ApplicationCard from "../Card/ApplicationCard";

const statusColors: Record<ApplicationStatus, string> = {
  Applied: "bg-blue-50 border-blue-200",
  "Phone Screen": "bg-yellow-50 border-yellow-200",
  Interview: "bg-purple-50 border-purple-200",
  Offer: "bg-green-50 border-green-200",
  Rejected: "bg-red-50 border-red-200"
};

interface Props {
  title: ApplicationStatus;
  applications: Application[];
  onCardClick: (app: Application) => void;
}

const KanbanColumn = ({ title, applications, onCardClick }: Props) => {
  const { setNodeRef } = useDroppable({ id: title });

  return (
    <div className={`rounded-xl border-2 p-3 ${statusColors[title]}`}>
      <div className="mb-3 flex items-center justify-between">
        <h2 className="font-semibold text-slate-700">{title}</h2>
        <span className="rounded-full bg-white px-2 py-0.5 text-xs font-medium text-slate-500 shadow-sm">
          {applications.length}
        </span>
      </div>
      <SortableContext
        items={applications.map((a) => a._id)}
        strategy={verticalListSortingStrategy}
      >
        <div ref={setNodeRef} className="flex min-h-[200px] flex-col gap-2">
          {applications.map((app) => (
            <ApplicationCard
              key={app._id}
              application={app}
              onClick={() => onCardClick(app)}
            />
          ))}
        </div>
      </SortableContext>
    </div>
  );
};

export default KanbanColumn;