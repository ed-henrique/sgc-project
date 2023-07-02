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
	const users = await userController.readAll();
	return res.render("users", { title: "Users", username: 'John Doe', active_nav: "users", users: users });
});

router.get("/login", async (req, res) => {
	return res.render("auth/login", { title: "Login" });
});

router.get("/signup", async (req, res) => {
	return res.render("auth/signup", { title: "Signup" });
});

router.get("/settings", auth("admin"), async (req, res) => {
	const id = req.userId;

	if (id !== userId) {
		return res.status(401).send({
			error: true,
			message: "Você não tem permissão para acessar este recurso!",
		});
	}

	const user = await userController.readById(id);
	return res.render("settings", { title: "Settings", username: user.name, active_nav: "", user: user });
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
		const { buffer, mimetype } = image;
		const { name, changePassword, currentPassword, newPassword, newPasswordConfirmation } = req.body;
		
		const user = await userController.readById(id);

		if (changePassword) {
			if (newPassword !== newPasswordConfirmation) {
			return res.status(400).send({
					error: true,
					message: "As senhas não coincidem!",
				});
			}
	
			if (!(await bcrypt.compare(currentPassword, user.password))) {
				return res.status(400).send({
					error: true,
					message: "A senha atual está incorreta!",
				});
			}

			await userController.update(id, {
				image: buffer,
				imageMimeType: mimetype,
				name,
				password: newPassword,
			});
		} else {
			await userController.update(id, {
				image: buffer,
				imageMimeType: mimetype,
				name,
				password: user.password,
			});
		}

		return res.status(200).send({
			error: false,
			message: "Usuário atualizado com sucesso!",
		});
	} catch (error) {
		console.error(error);
		return res.status(400).send({
			error: true,
			message: "Não foi possível atualizar o usuário!",
		});
	}
});

router.post("/upgrade/:id", auth("root"), async (req, res) => {
	try {
		const id = req.params.id;
	
		const access_token = await userController.upgrade(id);
	
		return res.status(200).send({
			error: false,
			message: "Usuário evoluído com sucesso!",
			access_token,
		});
	} catch (error) {
		console.error(error);
		return res.status(401).send({
			error: true,
			message: "Não foi possível evoluir o usuário!",
		});
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
