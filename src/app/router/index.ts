import express from "express";
import { UserRouters } from "../modules/user/user.router";

const router = express.Router();


router.use("/user", UserRouters)

export default router;