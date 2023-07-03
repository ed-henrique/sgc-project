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
const { Category } = require("../models/index.js");
const CategoryController = require("../controllers/category.controller.js");
const { Subscription } = require("../models/index.js");
const SubscriptionController = require("../controllers/subscription.controller.js");

const router = Router();
const courseController = new CourseController(Course);
const categoryController = new CategoryController(Category);
const subscriptionController = new SubscriptionController(Subscription);

// View routes

router.get("/", auth("student"), async (req, res) => {
	const id = req.userId;
	const name = req.username;
  	const role = req.userRole;

	const courses = await courseController.readAll();
	const subscriptions = await subscriptionController.readByUserId(id);

	return res.render("courses", {
		title: "Courses",
		id: id,
		username: name,
		role: role,
		active_nav: "courses",
		courses: courses,
		subscriptions: subscriptions,
	});
});

router.get("/course/:id", auth("student"), async (req, res) => {
	const id = req.params.id;
	const name = req.username;
  	const role = req.userRole;
	const edit = req.query.edit;

	const course = await courseController.readById(id);
	const categories = await categoryController.readAll();
	const subscriptions = await subscriptionController.readByCourseId(id);

	if (edit && role !== "student") return res.render("course_edit", { title: "Course", username: name, role: role, active_nav: "courses", course: course, categories: categories });
	
	return res.render("course", { title: "Course", username: name, role: role, active_nav: "courses", course: course, subscriptions: subscriptions });
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

router.put("/course/:id/update_subscription", auth("student"), async (req, res) => {
	try {
		const userId = req.userId;
		const courseId = req.params.id;
		const { status } = req.body;

		await subscriptionController.update(userId, courseId, { status });

		res.redirect(`/courses/course/${courseId}`);
	} catch (error) {
		console.error(error);
		res.redirect(`/courses/course/${courseId}`);
	}
});

router.post("/subscribe/:id", auth("student"), async (req, res) => {
	try {
		const CourseId = req.params.id;
		const UserId = req.userId;
		
		await subscriptionController.create({
			CourseId,
			UserId,
		});

		res.redirect("/courses");
	} catch (error) {
		console.error(error);
		res.redirect("/courses");
	}
});

router.delete("/delete/:id", auth("admin"), async (req, res) => {
	try {
		await courseController.delete(req.params.id);

		res.redirect("/courses");
	} catch (error) {
		console.error(error);
		res.redirect("/courses");
	}
});

router.delete("/remove_subscription/:id", auth("admin"), async (req, res) => {
	try {
		const id = req.params.id;
		const courseId = req.query.courseId;

		await subscriptionController.delete(id);

		res.redirect(`/courses/course/${courseId}`);
	} catch (error) {
		console.error(error);
		res.redirect(`/courses/course/${courseId}`);
	}
});

router.put("/close/:id", auth("admin"), async (req, res) => {
	try {
		await courseController.close(req.params.id);
	
		res.redirect("/courses");
	} catch (error) {
		console.error(error);
		res.redirect("/courses");
	}
});

module.exports = router;
