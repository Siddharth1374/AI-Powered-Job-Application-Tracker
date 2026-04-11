import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createApplication,
  deleteApplication,
  fetchApplications,
  updateApplication,
  updateApplicationStatus
} from "../services/applicationService";
import { ApplicationStatus, CreateApplicationPayload } from "../types/application";

export const useApplications = () => {
  const queryClient = useQueryClient();

  const applicationsQuery = useQuery({
    queryKey: ["applications"],
    queryFn: fetchApplications
  });

  const createMutation = useMutation({
    mutationFn: (payload: CreateApplicationPayload) => createApplication(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["applications"] });
    }
  });

  const updateMutation = useMutation({
    mutationFn: ({
      id,
      payload
    }: {
      id: string;
      payload: Partial<CreateApplicationPayload>;
    }) => updateApplication(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["applications"] });
    }
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteApplication(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["applications"] });
    }
  });

  const updateStatusMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: ApplicationStatus }) =>
      updateApplicationStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["applications"] });
    }
  });

  return {
    applicationsQuery,
    createMutation,
    updateMutation,
    deleteMutation,
    updateStatusMutation
  };
};