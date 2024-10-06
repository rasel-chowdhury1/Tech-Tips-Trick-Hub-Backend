import express from "express";
import { UserRouters } from "../modules/user/user.router";
import { AuthRouters } from "../modules/auth/auth.route";
import { PostRouters } from "../modules/post/post.route";

const router = express.Router();


router.use("/user", UserRouters);
router.use("/auth", AuthRouters)
router.use("/post", PostRouters)

export default router;