import { useState } from "react";
import { Application } from "../../types/application";

interface Props {
  application: Application;
  onClose: () => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, data: Partial<Application>) => void;
}

const ApplicationModal = ({ application, onClose, onDelete, onUpdate }: Props) => {
  const [editing, setEditing] = useState(false);
  const [company, setCompany] = useState(application.company);
  const [role, setRole] = useState(application.role);
  const [notes, setNotes] = useState(application.notes || "");
  const [salaryRange, setSalaryRange] = useState(application.salaryRange || "");

  const handleSave = () => {
    onUpdate(application._id, { company, role, notes, salaryRange });
    setEditing(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl">
        <div className="mb-4 flex items-start justify-between">
          {editing ? (
            <input
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="w-full rounded border px-3 py-1 text-xl font-bold"
            />
          ) : (
            <h2 className="text-xl font-bold text-slate-800">{application.company}</h2>
          )}
          <button onClick={onClose} className="ml-4 text-slate-400 hover:text-slate-600 text-2xl leading-none">&times;</button>
        </div>

        {editing ? (
          <input
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="mb-3 w-full rounded border px-3 py-1 text-slate-600"
          />
        ) : (
          <p className="mb-3 text-slate-600">{application.role}</p>
        )}

        <div className="mb-3 flex gap-2 text-sm text-slate-500">
          {application.location && <span>📍 {application.location}</span>}
          {application.seniority && <span>• {application.seniority}</span>}
        </div>

        {application.requiredSkills?.length > 0 && (
          <div className="mb-3">
            <p className="mb-1 text-xs font-semibold uppercase text-slate-400">Required Skills</p>
            <div className="flex flex-wrap gap-1">
              {application.requiredSkills.map((s) => (
                <span key={s} className="rounded bg-blue-100 px-2 py-0.5 text-xs text-blue-700">{s}</span>
              ))}
            </div>
          </div>
        )}

        {application.resumeSuggestions?.length > 0 && (
          <div className="mb-3">
            <p className="mb-1 text-xs font-semibold uppercase text-slate-400">Resume Suggestions</p>
            <ul className="list-disc pl-4 text-sm text-slate-600">
              {application.resumeSuggestions.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="mb-3">
          <p className="mb-1 text-xs font-semibold uppercase text-slate-400">Notes</p>
          {editing ? (
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full rounded border px-3 py-2 text-sm"
              rows={3}
            />
          ) : (
            <p className="text-sm text-slate-600">{notes || "No notes added"}</p>
          )}
        </div>

        <div className="mb-4">
          <p className="mb-1 text-xs font-semibold uppercase text-slate-400">Salary Range</p>
          {editing ? (
            <input
              value={salaryRange}
              onChange={(e) => setSalaryRange(e.target.value)}
              className="w-full rounded border px-3 py-1 text-sm"
            />
          ) : (
            <p className="text-sm text-slate-600">{salaryRange || "Not specified"}</p>
          )}
        </div>

        <div className="flex justify-between">
          <button
            onClick={() => { if (window.confirm("Delete this application?")) onDelete(application._id); }}
            className="rounded-lg bg-red-100 px-4 py-2 text-sm text-red-600 hover:bg-red-200"
          >
            Delete
          </button>
          <div className="flex gap-2">
            {editing ? (
              <>
                <button onClick={() => setEditing(false)} className="rounded-lg border px-4 py-2 text-sm text-slate-600 hover:bg-slate-50">Cancel</button>
                <button onClick={handleSave} className="rounded-lg bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700">Save</button>
              </>
            ) : (
              <button onClick={() => setEditing(true)} className="rounded-lg bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700">Edit</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationModal;