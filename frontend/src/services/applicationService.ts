import api from "./api";
import { Application, ApplicationStatus, CreateApplicationPayload } from "../types/application";

export const fetchApplications = async (): Promise<Application[]> => {
  const response = await api.get<Application[]>("/applications");
  return response.data;
};

export const createApplication = async (
  payload: CreateApplicationPayload
): Promise<Application> => {
  const response = await api.post<Application>("/applications", payload);
  return response.data;
};

export const updateApplication = async (
  id: string,
  payload: Partial<CreateApplicationPayload>
): Promise<Application> => {
  const response = await api.put<Application>(`/applications/${id}`, payload);
  return response.data;
};

export const deleteApplication = async (id: string): Promise<{ message: string }> => {
  const response = await api.delete<{ message: string }>(`/applications/${id}`);
  return response.data;
};

export const updateApplicationStatus = async (
  id: string,
  status: ApplicationStatus
): Promise<Application> => {
  const response = await api.patch<Application>(`/applications/${id}/status`, { status });
  return response.data;
};