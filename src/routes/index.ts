import { Router } from "express";
import userRouter from "../modules/users/routes";

const router: Router = Router();

router.get("/health", (req, res) => {
  res.status(200).send("Service is healthy");
});
router.use("/users", userRouter);

export const MainRouter: Router = router;
