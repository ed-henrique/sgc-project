const { Router } = require("express");
const auth = require("../middlewares/auth.js");
const multer = require("multer");

const MB = 1024 * 1024;
const upload = multer({
	storage: multer.memoryStorage(),
	limits: {
		fileSize: 50 * MB,
	},
});

const { Course } = require("../models/index.js");
const CourseController = require("../controllers/course.controller.js");

const router = Router();
const courseController = new CourseController(Course);

// View routes

router.get("/", auth("student"), async (req, res) => {
	const courses = await courseController.readAll();
	return res.render("courses", { title: "Courses", username: 'John Doe', active_nav: "courses", courses: courses });
});

router.get("/course/:id", auth("student"), async (req, res) => {
	const course = await courseController.readById(req.params.id);
	return res.render("course", { title: "Course", username: 'John Doe', active_nav: "courses", course: course });
});

// API routes

router.post("/create", [auth("admin"), upload.single("image")], async (req, res) => {
	try {
		const image = req.file;
		const { buffer, mimetype } = image;
		const { name, description, status, workload, start_date, CategoryId } = req.body;
		
		await courseController.create({
			image: buffer,
			imageMimeType: mimetype,
			name,
			description,
			status,
			workload,
			start_date,
			CategoryId,
		});

		return res.status(201).send({
			error: false,
			message: "Curso criado com sucesso!",
		});
	} catch (error) {
		console.error(error);
		return res.status(400).send({
			error: true,
			message: "Não foi possível criar o curso!",
		});
	}
});

router.put("/update/:id", [auth("admin"), upload.single("image")], async (req, res) => {
	try {
		const id = req.params.id;
		const image = req.file;
		const { buffer, mimetype } = image;
		const { name, description, status, workload, start_date, CategoryId } = req.body;
		
		await courseController.update(id, {
			image: buffer,
			imageMimeType: mimetype,
			name,
			description,
			status,
			workload,
			start_date,
			CategoryId,
		});

		return res.status(200).send({
			error: false,
			message: "Curso atualizado com sucesso!",
		});
	} catch (error) {
		console.error(error);
		return res.status(400).send({
			error: true,
			message: "Não foi possível atualizar o curso!",
		});
	}
});

router.delete("/delete/:id", auth("admin"), async (req, res) => {
	try {
		await courseController.delete(req.params.id);

		return res.status(200).send({
			error: false,
			message: "Curso removido com sucesso!",
		});
	} catch (error) {
		console.error(error);
		return res.status(400).send({
			error: true,
			message: "Não foi possível remover o curso!",
		});
	}
});

router.post("/close/:id", auth("admin"), async (req, res) => {
	try {
		await courseController.close(req.params.id);
	
		return res.status(200).send({
			error: false,
			message: "Curso fechado com sucesso!",
		});
	} catch (error) {
		console.error(error);
		return res.status(401).send({
			error: true,
			message: "Não foi possível fechar o curso!",
		});
	}
});

module.exports = router;
