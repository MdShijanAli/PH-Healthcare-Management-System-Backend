import { Router } from "express";
import { SpecialityRoute } from "../module/speciality/speciality.route";
import { AuthRoutes } from "../module/auth/auth.route";
import { UserRoutes } from "../module/user/user.route";

const router = Router();

router.use("/auth", AuthRoutes);
router.use("/speciality", SpecialityRoute);
router.use("/doctors", UserRoutes);

export const indexRoute = router;
