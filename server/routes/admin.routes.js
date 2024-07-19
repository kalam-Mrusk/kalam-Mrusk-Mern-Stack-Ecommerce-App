import { Router } from "express";
import {
  adminLoggedOut,
  adminLogin,
  adminRegistration,
} from "../controllers/authAdmin.controller.js";
import { verifyAdmin } from "../middlewares/auth.middleware.js";

const adminRouter = Router();

adminRouter.post("/auth/register", adminRegistration);
adminRouter.post("/auth/login", adminLogin);
adminRouter.get("/auth/logout", verifyAdmin, adminLoggedOut);
export default adminRouter;
