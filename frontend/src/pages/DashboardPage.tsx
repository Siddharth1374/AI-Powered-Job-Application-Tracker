import { useState, useEffect } from "react";
import { Application, ApplicationStatus } from "../types/application";
import { fetchApplications, updateApplicationStatus, deleteApplication, updateApplication } from "../services/applicationService";
import { parseJobDescription, generateResumeSuggestions } from "../services/aiService";
import { createApplication } from "../services/applicationService";
import KanbanBoard from "../components/Board/KanbanBoard";
import ApplicationModal from "../components/Card/ApplicationModal";

const DashboardPage = () => {
  const user = localStorage.getItem("user");
  const [applications, setApplications] = useState<Application[]>([]);
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [jd, setJd] = useState("");
  const [parsing, setParsing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [location, setLocation] = useState("");
  const [seniority, setSeniority] = useState("");
  const [requiredSkills, setRequiredSkills] = useState("");
  const [niceToHaveSkills, setNiceToHaveSkills] = useState("");
  const [notes, setNotes] = useState("");
  const [jdLink, setJdLink] = useState("");
  const [salaryRange, setSalaryRange] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [parsed, setParsed] = useState(false);

  useEffect(() => {
    fetchApplications().then(setApplications).catch(console.error);
  }, []);

  const handleParse = async () => {
    if (!jd.trim()) return;
    setParsing(true);
    try {
      const data = await parseJobDescription(jd);
      setCompany(data.companyName || "");
      setRole(data.role || "");
      setLocation(data.location || "");
      setSeniority(data.seniority || "");
      setRequiredSkills((data.requiredSkills || []).join(", "));
      setNiceToHaveSkills((data.niceToHaveSkills || []).join(", "));
      setParsed(true);

      const suggRes = await generateResumeSuggestions(jd, data.role, data.companyName);
      setSuggestions(suggRes.suggestions || []);
    } catch (err: any) {
      alert(err?.response?.data?.message || "Error parsing JD");
    } finally {
      setParsing(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const newApp = await createApplication({
        company,
        role,
        jdText: jd,
        jdLink,
        notes,
        dateApplied: new Date().toISOString(),
        status: "Applied",
        salaryRange,
        requiredSkills: requiredSkills.split(",").map((s) => s.trim()).filter(Boolean),
        niceToHaveSkills: niceToHaveSkills.split(",").map((s) => s.trim()).filter(Boolean),
        resumeSuggestions: suggestions,
        seniority,
        location
      });
      setApplications((prev) => [...prev, newApp]);
      resetForm();
    } catch (err: any) {
      alert(err?.response?.data?.message || "Error saving");
    } finally {
      setSaving(false);
    }
  };

  const resetForm = () => {
    setJd(""); setParsed(false); setCompany(""); setRole("");
    setLocation(""); setSeniority(""); setRequiredSkills("");
    setNiceToHaveSkills(""); setNotes(""); setJdLink("");
    setSalaryRange(""); setSuggestions([]); setShowAddForm(false);
  };

  const handleMoveCard = async (id: string, status: ApplicationStatus) => {
    try {
      const updated = await updateApplicationStatus(id, status);
      setApplications((prev) => prev.map((a) => (a._id === id ? updated : a)));
    } catch (err) { console.error(err); }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteApplication(id);
      setApplications((prev) => prev.filter((a) => a._id !== id));
      setSelectedApp(null);
    } catch (err) { console.error(err); }
  };

  const handleUpdate = async (id: string, data: Partial<Application>) => {
    try {
      const updated = await updateApplication(id, data);
      setApplications((prev) => prev.map((a) => (a._id === id ? updated : a)));
      setSelectedApp(updated);
    } catch (err) { console.error(err); }
  };

  return (
    <div className="min-h-screen bg-slate-100">
      <header className="bg-white shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <h1 className="text-xl font-bold text-slate-800">Job Tracker</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-slate-500">
              {user ? JSON.parse(user).email : ""}
            </span>
            <button
              onClick={() => setShowAddForm(true)}
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              + Add Application
            </button>
            <button
              onClick={() => { localStorage.removeItem("token"); localStorage.removeItem("user"); window.location.href = "/auth"; }}
              className="rounded-lg border px-4 py-2 text-sm text-slate-600 hover:bg-slate-50"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-6">
        <KanbanBoard
          applications={applications}
          onMoveCard={handleMoveCard}
          onCardClick={setSelectedApp}
        />
      </main>

      {showAddForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-2xl rounded-2xl bg-white p-6 shadow-2xl overflow-y-auto max-h-[90vh]">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-800">Add Application</h2>
              <button onClick={resetForm} className="text-2xl text-slate-400 hover:text-slate-600">&times;</button>
            </div>

            <textarea
              placeholder="Paste job description here..."
              value={jd}
              onChange={(e) => setJd(e.target.value)}
              className="w-full rounded-lg border p-3 text-sm"
              rows={5}
            />
            <button
              onClick={handleParse}
              disabled={parsing || !jd.trim()}
              className="mt-2 rounded-lg bg-purple-600 px-4 py-2 text-sm text-white hover:bg-purple-700 disabled:opacity-50"
            >
              {parsing ? "Parsing with AI..." : "Parse with AI"}
            </button>

            {parsed && (
              <>
                <div className="mt-4 grid grid-cols-2 gap-3">
                  {[["Company", company, setCompany], ["Role", role, setRole], ["Location", location, setLocation], ["Seniority", seniority, setSeniority], ["JD Link", jdLink, setJdLink], ["Salary Range", salaryRange, setSalaryRange]].map(([label, value, setter]) => (
                    <div key={label as string}>
                      <label className="text-xs font-medium text-slate-500">{label as string}</label>
                      <input
                        value={value as string}
                        onChange={(e) => (setter as any)(e.target.value)}
                        className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
                      />
                    </div>
                  ))}
                </div>

                <div className="mt-3">
                  <label className="text-xs font-medium text-slate-500">Required Skills</label>
                  <input value={requiredSkills} onChange={(e) => setRequiredSkills(e.target.value)} className="mt-1 w-full rounded-lg border px-3 py-2 text-sm" />
                </div>
                <div className="mt-3">
                  <label className="text-xs font-medium text-slate-500">Nice to Have Skills</label>
                  <input value={niceToHaveSkills} onChange={(e) => setNiceToHaveSkills(e.target.value)} className="mt-1 w-full rounded-lg border px-3 py-2 text-sm" />
                </div>
                <div className="mt-3">
                  <label className="text-xs font-medium text-slate-500">Notes</label>
                  <textarea value={notes} onChange={(e) => setNotes(e.target.value)} className="mt-1 w-full rounded-lg border px-3 py-2 text-sm" rows={3} />
                </div>

                {suggestions.length > 0 && (
                  <div className="mt-4 rounded-lg bg-green-50 p-3">
                    <p className="mb-2 text-xs font-semibold uppercase text-green-700">AI Resume Suggestions</p>
                    <ul className="list-disc pl-4 text-sm text-slate-700">
                      {suggestions.map((s, i) => <li key={i}>{s}</li>)}
                    </ul>
                  </div>
                )}

                <button
                  onClick={handleSave}
                  disabled={saving || !company.trim() || !role.trim()}
                  className="mt-4 w-full rounded-lg bg-blue-600 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
                >
                  {saving ? "Saving..." : "Save Application"}
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {selectedApp && (
        <ApplicationModal
          application={selectedApp}
          onClose={() => setSelectedApp(null)}
          onDelete={handleDelete}
          onUpdate={handleUpdate}
        />
      )}
    </div>
  );
};

export default DashboardPage;