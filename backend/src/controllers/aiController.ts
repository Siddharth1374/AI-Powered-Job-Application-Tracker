import { Request, Response } from "express";
import {
  generateResumeSuggestions,
  parseJobDescription
} from "../services/openaiService";

export const parseJobDescriptionController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { jobDescription } = req.body as { jobDescription?: string };

  if (!jobDescription || !jobDescription.trim()) {
    res.status(400).json({ message: "Job description is required" });
    return;
  }

  const parsedData = await parseJobDescription(jobDescription);
  res.status(200).json(parsedData);
};

export const generateResumeSuggestionsController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const {
    jobDescription,
    role,
    company
  } = req.body as {
    jobDescription?: string;
    role?: string;
    company?: string;
  };

  if (!jobDescription || !jobDescription.trim()) {
    res.status(400).json({ message: "Job description is required" });
    return;
  }

  const suggestions = await generateResumeSuggestions(
    jobDescription,
    role,
    company
  );

  res.status(200).json({ suggestions });
};