import { Router } from "express";
import { SpecialityRoute } from "../module/speciality.route";

const router = Router();

router.use("/speciality", SpecialityRoute);

export const indexRoute = router;
