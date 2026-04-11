import { Router } from "express";
import {
  generateResumeSuggestionsController,
  parseJobDescriptionController
} from "../controllers/aiController";
import { protect } from "../middleware/authMiddleware";

const router = Router();

router.use(protect);

router.post("/parse-jd", parseJobDescriptionController);
router.post("/resume-suggestions", generateResumeSuggestionsController);

export default router;