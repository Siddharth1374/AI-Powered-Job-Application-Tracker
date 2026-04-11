export type ApplicationStatus =
  | "Applied"
  | "Phone Screen"
  | "Interview"
  | "Offer"
  | "Rejected";

export interface Application {
  _id: string;
  company: string;
  role: string;
  status: ApplicationStatus;
  location?: string;
  seniority?: string;
  jdText?: string;
  jdLink?: string;
  notes?: string;
  salaryRange?: string;
  requiredSkills: string[];
  niceToHaveSkills: string[];
  resumeSuggestions: string[];
  dateApplied: string;
  createdAt: string;
}

export interface CreateApplicationPayload {
  company: string;
  role: string;
  status: ApplicationStatus;
  location?: string;
  seniority?: string;
  jdText?: string;
  jdLink?: string;
  notes?: string;
  salaryRange?: string;
  requiredSkills: string[];
  niceToHaveSkills: string[];
  resumeSuggestions: string[];
  dateApplied: string;
}

export interface ParseJobResponse {
  companyName: string;
  role: string;
  requiredSkills: string[];
  niceToHaveSkills: string[];
  seniority: string;
  location: string;
}

export interface ResumeSuggestionResponse {
  suggestions: string[];
}