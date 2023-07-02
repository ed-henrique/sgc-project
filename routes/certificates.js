const { Router } = require("express");
const jwt = require("jsonwebtoken");
const auth = require("../middlewares/auth.js");

const { Certificate } = require("../models/index.js");
const CertificateController = require("../controllers/certificate.controller.js");

const router = Router();
const certificateController = new CertificateController(Certificate);

router.get("/list", auth, async (req, res) => {
	try {
		const certificates = await certificateController.readAll();

		return res.status(200).send({
			error: false,
			message: "Certificados listados com sucesso!",
			certificates,
		});
	} catch (error) {
		console.error(error);
		return res.status(400).send({
			error: true,
			message: "Certificados não encontrados!",
		});
	}
});

router.get("/list/:id", auth, async (req, res) => {
	try {
		const certificate = await certificateController.readById(req.params.id);

		return res.status(200).send({
			error: false,
			message: "Certificado listado com sucesso!",
			certificate,
		});
	} catch (error) {
		console.error(error);
		return res.status(400).send({
			error: true,
			message: "Certificado não encontrado!",
		});
	}
});

router.post("/create", async (req, res) => {
	try {
		const { UserId, CourseId, code } = req.body;
		
		await certificateController.create({
			UserId,
			CourseId,
			code,
		});

		return res.status(201).send({
			error: false,
			message: "Certificado criado com sucesso!",
		});
	} catch (error) {
		console.error(error);
		return res.status(400).send({
			error: true,
			message: "Não foi possível criar o certificado!",
		});
	}
});

router.delete("/delete/:id", auth, async (req, res) => {
	try {
		await certificateController.delete(req.params.id);

		return res.status(200).send({
			error: false,
			message: "Certificado removido com sucesso!",
		});
	} catch (error) {
		console.error(error);
		return res.status(400).send({
			error: true,
			message: "Não foi possível remover o certificado!",
		});
	}
});

module.exports = router;
