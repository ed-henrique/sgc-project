const { Router } = require('express');
const multer = require("multer");
const jwt = require("jsonwebtoken");
const auth = require("../middlewares/auth.js");

const MB = 1024 * 1024;
const DAY = 24 * 60 * 60 * 1000;
const upload = multer({
	storage: multer.memoryStorage(),
	limits: {
		fileSize: 50 * MB,
	},
});

const { User } = require('../models/index.js');
const UserController = require('../controllers/user.controller.js');

const router = Router();
const userController = new UserController(User);

// View routes

router.get("/", auth("admin"), async (req, res) => {
	const name = req.username;
  	const role = req.userRole;

	let users = await userController.readAll();
	
	users.sort((a, b) => {
		if (a.status < b.status) {
			return -1;
		}
		if (a.status > b.status) {
			return 1;
		}
		
		const roleOrder = { root: 0, admin: 1, student: 2 };
		const aRoleOrder = roleOrder[a.role.toLowerCase()];
		const bRoleOrder = roleOrder[b.role.toLowerCase()];
		
		if (aRoleOrder < bRoleOrder) {
			return -1;
		}
		if (aRoleOrder > bRoleOrder) {
			return 1;
		}
		
		return a.name.localeCompare(b.name, undefined, { sensitivity: 'base' });
	});

	if (req.userRole === "admin") {
		users = users.filter(user => user.role.toLowerCase() !== "root");
	}

	return res.render("users", { title: "Users", username: name, role: role, active_nav: "users", users: users });
});

router.get("/login", async (req, res) => {
	return res.render("auth/login", { title: "Login" });
});

router.get("/signup", async (req, res) => {
	return res.render("auth/signup", { title: "Signup" });
});

router.get("/settings", auth("student"), async (req, res) => {
	const id = req.userId;
	const name = req.username;
	const role = req.userRole;

	const user = await userController.readById(id);
	return res.render("settings", { title: "Settings", username: name, role: role, active_nav: "", user: user });
});

// API routes

router.post("/create", upload.single("image"), async (req, res) => {
	try {
    	const image = req.file;
		const { buffer, mimetype } = image;
		const { name, email, role, password } = req.body;
		
		const access_token = await userController.create({
			image: buffer,
			imageMimeType: mimetype,
			name,
			email,
			role,
			status: "active",
			password,
		});

		return res.status(201).send({
			error: false,
			message: "Usuário criado com sucesso!",
			access_token,
		});
	} catch (error) {
		console.error(error);
		return res.status(400).send({
			error: true,
			message: "Não foi possível criar o usuário!",
		});
	}
});

router.put("/update", [auth("student"), upload.single("image")], async (req, res) => {
	try {
		const id = req.userId;
    	const image = req.file;
		const { name } = req.body;

		const user = await userController.readById(id);

		if (image) {
			const { buffer, mimetype } = image;
			
			await userController.update(id, {
				image: buffer,
				imageMimeType: mimetype,
				name,
			});
		} else {
			await userController.update(id, {
				name,
			});
		}

		res.redirect("/users/settings");
	} catch (error) {
		console.error(error);
		res.redirect("/users/settings");
	}
});

router.put("/upgrade/:id", auth("root"), async (req, res) => {
	try {
		const id = req.params.id;
	
		await userController.upgrade(id);

		res.redirect("/users");
	} catch (error) {
		console.error(error);
		res.redirect("/users");
	}
});

router.put("/suspend/:id", auth("admin"), async (req, res) => {
	try {
		const id = req.params.id;
	
		await userController.suspend(id);

		res.redirect("/users");
	} catch (error) {
		console.error(error);
		res.redirect("/users");
	}
});

router.post("/login", async (req, res) => {
	try {
		const { email, password } = req.body;

		const access_token = await userController.login({ email, password });
	
		res.cookie("jwt", access_token, { httpOnly: true, sameSite: "strict", maxAge: DAY });
		return res.redirect("/");
	} catch (error) {
		console.error(error);
		return res.status(401).send({
			error: true,
			message: "Não foi possível logar o usuário!",
		});
	}
});

router.post("/logout", auth("student"), async (req, res) => {
	try {
		res.cookie("jwt", "", { httpOnly: true, sameSite: "strict", expires: new Date(0) });
		return res.redirect("/users/login");
	} catch (error) {
		console.error(error);
		return res.status(401).send({
			error: true,
			message: "Não foi possível deslogar o usuário!",
		});
	}
});

module.exports = router;
