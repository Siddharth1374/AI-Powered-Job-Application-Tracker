import api from "./api";
import { ParseJobResponse, ResumeSuggestionResponse } from "../types/application";

export const parseJobDescription = async (
  jobDescription: string
): Promise<ParseJobResponse> => {
  const response = await api.post<ParseJobResponse>("/ai/parse-jd", {
    jobDescription
  });

  return response.data;
};

export const generateResumeSuggestions = async (
  jobDescription: string,
  role?: string,
  company?: string
): Promise<ResumeSuggestionResponse> => {
  const response = await api.post<ResumeSuggestionResponse>(
    "/ai/resume-suggestions",
    {
      jobDescription,
      role,
      company
    }
  );

  return response.data;
};