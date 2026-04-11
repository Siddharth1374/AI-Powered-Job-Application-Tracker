import { Router } from "express";
import {
  createApplication,
  deleteApplication,
  getApplicationById,
  getApplications,
  updateApplication,
  updateApplicationStatus
} from "../controllers/applicationController";
import { protect } from "../middleware/authMiddleware";

const router = Router();

router.use(protect);

router.route("/").post(createApplication).get(getApplications);
router.route("/:id").get(getApplicationById).put(updateApplication).delete(deleteApplication);
router.patch("/:id/status", updateApplicationStatus);

export default router;