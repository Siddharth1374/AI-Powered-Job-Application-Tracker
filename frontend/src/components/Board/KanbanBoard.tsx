import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { Application, ApplicationStatus } from "../../types/application";
import KanbanColumn from "./KanbanColumn";

const statuses: ApplicationStatus[] = [
  "Applied",
  "Phone Screen",
  "Interview",
  "Offer",
  "Rejected"
];

interface Props {
  applications: Application[];
  onMoveCard: (id: string, status: ApplicationStatus) => void;
  onCardClick: (app: Application) => void;
}

const KanbanBoard = ({ applications, onMoveCard, onCardClick }: Props) => {
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    const applicationId = String(active.id);
    const newStatus = String(over.id) as ApplicationStatus;

    if (statuses.includes(newStatus)) {
      onMoveCard(applicationId, newStatus);
    }
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="grid gap-4 lg:grid-cols-5">
        {statuses.map((status) => (
          <KanbanColumn
            key={status}
            title={status}
            applications={applications.filter((app) => app.status === status)}
            onCardClick={onCardClick}
          />
        ))}
      </div>
    </DndContext>
  );
};

export default KanbanBoard;