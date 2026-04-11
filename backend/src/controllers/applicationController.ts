import { Response } from "express";
import Application from "../models/Application";
import { ApplicationStatus } from "../types/application";
import { AuthRequest } from "../types/auth";

export const createApplication = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  if (!req.user) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  const {
    company,
    role,
    jdText,
    jdLink,
    notes,
    dateApplied,
    status,
    salaryRange,
    requiredSkills,
    niceToHaveSkills,
    seniority,
    location,
    resumeSuggestions
  } = req.body;

  if (!company || !role) {
    res.status(400).json({ message: "Company and role are required" });
    return;
  }

  const application = await Application.create({
    user: req.user.userId,
    company,
    role,
    jdText: jdText ?? "",
    jdLink: jdLink ?? "",
    notes: notes ?? "",
    dateApplied: dateApplied ? new Date(dateApplied) : new Date(),
    status: (status as ApplicationStatus) ?? "Applied",
    salaryRange: salaryRange ?? "",
    requiredSkills: requiredSkills ?? [],
    niceToHaveSkills: niceToHaveSkills ?? [],
    seniority: seniority ?? "",
    location: location ?? "",
    resumeSuggestions: resumeSuggestions ?? []
  });

  res.status(201).json(application);
};

export const getApplications = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  if (!req.user) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  const applications = await Application.find({ user: req.user.userId }).sort({
    createdAt: -1
  });

  res.status(200).json(applications);
};

export const getApplicationById = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  if (!req.user) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  const application = await Application.findOne({
    _id: req.params.id,
    user: req.user.userId
  });

  if (!application) {
    res.status(404).json({ message: "Application not found" });
    return;
  }

  res.status(200).json(application);
};

export const updateApplication = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  if (!req.user) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  const application = await Application.findOne({
    _id: req.params.id,
    user: req.user.userId
  });

  if (!application) {
    res.status(404).json({ message: "Application not found" });
    return;
  }

  const allowedFields = [
    "company",
    "role",
    "jdText",
    "jdLink",
    "notes",
    "dateApplied",
    "status",
    "salaryRange",
    "requiredSkills",
    "niceToHaveSkills",
    "seniority",
    "location",
    "resumeSuggestions"
  ];

  for (const field of allowedFields) {
    if (req.body[field] !== undefined) {
      if (field === "dateApplied") {
        (application as any)[field] = new Date(req.body[field]);
      } else {
        (application as any)[field] = req.body[field];
      }
    }
  }

  const updatedApplication = await application.save();
  res.status(200).json(updatedApplication);
};

export const deleteApplication = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  if (!req.user) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  const application = await Application.findOne({
    _id: req.params.id,
    user: req.user.userId
  });

  if (!application) {
    res.status(404).json({ message: "Application not found" });
    return;
  }

  await application.deleteOne();

  res.status(200).json({ message: "Application deleted successfully" });
};

export const updateApplicationStatus = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  if (!req.user) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  const { status } = req.body as { status?: ApplicationStatus };

  const validStatuses: ApplicationStatus[] = [
    "Applied",
    "Phone Screen",
    "Interview",
    "Offer",
    "Rejected"
  ];

  if (!status || !validStatuses.includes(status)) {
    res.status(400).json({ message: "Invalid status value" });
    return;
  }

  const application = await Application.findOneAndUpdate(
    {
      _id: req.params.id,
      user: req.user.userId
    },
    { status },
    { new: true }
  );

  if (!application) {
    res.status(404).json({ message: "Application not found" });
    return;
  }

  res.status(200).json(application);
};