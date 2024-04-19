import express from "express";
import { signUp,signIn,checkToken, searchUser } from "../controllers/restController.js";

const router = express.Router();

router.post("/signup", signUp);
router.post("/signin", signIn);
router.post("/checkToken",checkToken);
router.get("/search",searchUser)

export { router as restRoutes };