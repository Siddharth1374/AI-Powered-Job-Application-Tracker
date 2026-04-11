import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Application } from "../../types/application";

interface Props {
  application: Application;
  onClick: () => void;
}

const ApplicationCard = ({ application, onClick }: Props) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: application._id
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onClick={onClick}
      className="cursor-pointer rounded-lg bg-white p-3 shadow hover:shadow-md"
    >
      <h3 className="font-semibold text-slate-800">{application.company}</h3>
      <p className="text-sm text-slate-500">{application.role}</p>
      {application.location && (
        <p className="mt-1 text-xs text-slate-400">{application.location}</p>
      )}
      {application.requiredSkills?.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1">
          {application.requiredSkills.slice(0, 3).map((skill) => (
            <span key={skill} className="rounded bg-blue-100 px-2 py-0.5 text-xs text-blue-700">
              {skill}
            </span>
          ))}
        </div>
      )}
      <p className="mt-2 text-xs text-slate-400">
        {new Date(application.dateApplied).toLocaleDateString()}
      </p>
    </div>
  );
};

export default ApplicationCard;