import express from "express";
import { course } from "../models/index.js";
import { CourseController } from "../controller/course.controller.js";
import { body, validationResult } from "express-validator";
const router = express.Router();

const courseController = new CourseController(course);

router.get("/", async (req, res) => {
  const courses = await courseController.getAll();
  res.json(courses);
});

router.post(
  "/create",
  [
    //validação dos dados
    body("nome").notEmpty().trim().withMessage("O campo nome é obrigatório"),
    body("ch")
      .isNumeric()
      .isLength({ min: 2 })
      .withMessage("O campo ch deve ser numérico apenas"),
  ],
  async (req, res) => {
    // caso encontre erros, ficará nessa variável errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    //se os dados forem válidos, o sistema executará aqui
    const { nome, ch, categoria } = req.body;
    await courseController.adicionar({ nome, ch, categoria });
    res.status(201).send("curso criado com sucesso!");
  }
);

export default router;
