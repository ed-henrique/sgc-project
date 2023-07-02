const { Router } = require('express');
const auth = require("../middlewares/auth.js");

const { Category } = require('../models/index.js');
const CategoryController = require('../controllers/category.controller.js');

const router = Router();
const categoryController = new CategoryController(Category);

// View routes

router.get("/", auth("admin"), async (req, res) => {
	const name = req.username;

	const categories = await categoryController.readAll();
	return res.render("categories", { title: "Categories", username: name, active_nav: "categories", categories: categories });
});

// API routes

router.post("/create", auth("admin"), async (req, res) => {
	try {
		const { name } = req.body;
		
		await categoryController.create({ name });

		return res.redirect("/categories");
	} catch (error) {
		console.error(error);
		return res.redirect("/categories");
	}
});

router.put("/update/:id", auth("admin"), async (req, res) => {
	try {
		const id = req.params.id;
		const { name } = req.body;
		
		await categoryController.update(id, { name });

		return res.redirect("/categories");
	} catch (error) {
		console.error(error);
		return res.redirect("/categories");
	}
});

router.delete("/delete/:id", auth("admin"), async (req, res) => {
	try {
		const id = req.params.id;

		await categoryController.delete(id);

		return res.redirect("/categories");
	} catch (error) {
		console.error(error);
		return res.redirect("/categories");
	}
});

module.exports = router;
