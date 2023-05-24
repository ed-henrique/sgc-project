import { Router } from "express";
import users from "./users.js";
import courses from "./course.js";

const router = Router();

router.get("/", (_req, res) => {
  res.send("Pagina inicial");
});

router.use("/users", users);
router.use("/courses", courses);

export default router;
