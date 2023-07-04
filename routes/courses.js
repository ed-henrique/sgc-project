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
const { Certificate } = require("../models/index.js");
const CertificateController = require("../controllers/certificate.controller.js");
const { Subscription } = require("../models/index.js");
const SubscriptionController = require("../controllers/subscription.controller.js");

const router = Router();
const courseController = new CourseController(Course);
const categoryController = new CategoryController(Category);
const certificateController = new CertificateController(Certificate);
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

router.get("/create", auth("admin"), async (req, res) => {
	const name = req.username;
  	const role = req.userRole;

	const categories = await categoryController.readAll();

	return res.render("add_course", { title: "Create Course", username: name, role: role, active_nav: "courses", categories: categories });
});

router.get("/course/:id", auth("student"), async (req, res) => {
	const id = req.params.id;
	const userId = req.userId;
	const name = req.username;
  	const role = req.userRole;
	const edit = req.query.edit;

	const course = await courseController.readById(id);
	const categories = await categoryController.readAll();
	const subscriptions = await subscriptionController.readByCourseId(id);

	if (edit && role !== "student") return res.render("course_edit", { title: "Edit Course", username: name, role: role, active_nav: "courses", course: course, categories: categories });
	
	if (role === "student" && course.status === "Closed") return res.redirect("/courses");

	return res.render("course", { title: "Course", id: userId, username: name, role: role, active_nav: "courses", course: course, subscriptions: subscriptions });
});

// API routes

router.post("/create", [auth("admin"), upload.single("image")], async (req, res) => {
	try {
		const image = req.file;
		const { buffer, mimetype } = image;
		const { name, description, workload, start_date, CategoryId } = req.body;
		
		await courseController.create({
			image: buffer,
			imageMimeType: mimetype,
			name,
			description,
			status: "open",
			workload,
			start_date,
			CategoryId,
		});

		return res.redirect("/courses");
	} catch (error) {
		console.error(error);
		return res.redirect("/courses");
	}
});

router.put("/update/:id", [auth("admin"), upload.single("image")], async (req, res) => {
	try {
		const id = req.params.id;
		const image = req.file;
		const { name, description, status, workload, start_date, CategoryId } = req.body;
		
		if (image) {
			const { buffer, mimetype } = image;
			
			await courseController.update(id, {
				image: buffer,
				imageMimeType: mimetype,
				name,
				description,
				status,
				workload,
				start_date,
				CategoryId
			});
		} else {
			await courseController.update(id, {
				name,
				description,
				status,
				workload,
				start_date,
				CategoryId,
			});
		}

		res.redirect("/courses");
	} catch (error) {
		console.error(error);
		res.redirect("/courses");
	}
});

router.put("/update_subscription/:id", auth("student"), async (req, res) => {
	try {
		const userId = req.userId;
		const courseId = req.params.id;
		const { status } = req.body;

		const statusValue = (typeof status === "string") ? 1 : (status) ? status.length : 0;

		await subscriptionController.update(userId, courseId, { status: statusValue });

		return res.redirect(`/courses/course/${courseId}`);
	} catch (error) {
		console.error(error);
		res.redirect("/courses");
	}
});

router.post("/subscribe/:id", auth("student"), async (req, res) => {
	try {
		const CourseId = req.params.id;
		const UserId = req.userId;
		
		await subscriptionController.create({
			CourseId,
			UserId,
			status: 0,
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
		const id = req.params.id;

		const subscriptions = await subscriptionController.readByCourseId(id);

		subscriptions.forEach(async (subscription) => {
			if (subscription.status >= 9) {
				await certificateController.create({
					UserId: subscription.UserId,
					CourseId: subscription.CourseId,
				});
			}
		});

		await courseController.close(id);
	
		res.redirect("/courses");
	} catch (error) {
		console.error(error);
		res.redirect("/courses");
	}
});

module.exports = router;
