const { Router } = require("express");
const auth = require("../middlewares/auth.js");

const { Category } = require("../models/index.js");
const CategoryController = require("../controllers/category.controller.js");

const router = Router();
const categoryController = new CategoryController(Category);

router.get("/list", auth, async (req, res) => {
	try {
		const categories = await categoryController.readAll();
		
		return res.status(200).send({
			error: false,
			message: "Categorias listadas com sucesso!",
			categories,
		});
	} catch (error) {
		console.error(error);
		return res.status(400).send({
			error: true,
			message: "Categorias não encontradas!",
		});
	}
});

router.get("/list/:id", auth, async (req, res) => {
	try {
		const category = await categoryController.readById(req.params.id);

		return res.status(200).send({
			error: false,
			message: "Categoria listada com sucesso!",
			category,
		});
	} catch (error) {
		console.error(error);
		return res.status(400).send({
			error: true,
			message: "Categoria não encontrada!",
		});
	}
});

router.post("/create", auth, async (req, res) => {
	try {
		const { name } = req.body;
		
		await categoryController.create({ name });

		return res.status(201).send({
			error: false,
			message: "Categoria criada com sucesso!",
		});
	} catch (error) {
		console.error(error);
		return res.status(400).send({
			error: true,
			message: "Não foi possível criar a categoria!",
		});
	}
});

router.put("/update/:id", auth, async (req, res) => {
	try {
		const id = req.params.id;
		const { name } = req.body;
		
		await categoryController.update(id, { name });

		return res.status(200).send({
			error: false,
			message: "Categoria atualizada com sucesso!",
		});
	} catch (error) {
		console.error(error);
		return res.status(400).send({
			error: true,
			message: "Não foi possível atualizar a categoria!",
		});
	}
});

router.delete("/delete/:id", auth, async (req, res) => {
	try {
		await categoryController.delete(req.params.id);

		return res.status(200).send({
			error: false,
			message: "Categoria removida com sucesso!",
		});
	} catch (error) {
		console.error(error);
		return res.status(400).send({
			error: true,
			message: "Não foi possível remover a categoria!",
		});
	}
});

module.exports = router;
