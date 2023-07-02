const { Router } = require("express");
const auth = require("../middlewares/auth.js");

const { Subscription } = require("../models/index.js");
const SubscriptionController = require("../controllers/subscription.controller.js");

const router = Router();
const subscriptionController = new SubscriptionController(Subscription);

router.get("/list", auth, async (req, res) => {
	try {
		const subscriptions = await subscriptionController.readAll();
		
		return res.status(200).send({
			error: false,
			message: "Inscrições listadas com sucesso!",
			subscriptions,
		});
	} catch (error) {
		console.error(error);
		return res.status(400).send({
			error: true,
			message: "Inscrições não encontradas!",
		});
	}
});

router.get("/list/:id", auth, async (req, res) => {
	try {
		const subscription = await subscriptionController.readById(req.params.id);

		return res.status(200).send({
			error: false,
			message: "Inscrição listada com sucesso!",
			subscription,
		});
	} catch (error) {
		console.error(error);
		return res.status(400).send({
			error: true,
			message: "Inscrição não encontrada!",
		});
	}
});

router.post("/create", auth, async (req, res) => {
	try {
		const { UserId, CourseId, status } = req.body;
		
		await subscriptionController.create({ UserId, CourseId, status });

		return res.status(201).send({
			error: false,
			message: "Inscrição criada com sucesso!",
		});
	} catch (error) {
		console.error(error);
		return res.status(400).send({
			error: true,
			message: "Não foi possível criar a inscrição!",
		});
	}
});

router.put("/update/:id", auth, async (req, res) => {
	try {
		const id = req.params.id;
		const { status } = req.body;
		
		await subscriptionController.update(id, { status });

		return res.status(200).send({
			error: false,
			message: "Inscrição atualizada com sucesso!",
		});
	} catch (error) {
		console.error(error);
		return res.status(400).send({
			error: true,
			message: "Não foi possível atualizar a inscrição!",
		});
	}
});

router.delete("/delete/:id", auth, async (req, res) => {
	try {
		await subscriptionController.delete(req.params.id);

		return res.status(200).send({
			error: false,
			message: "Inscrição removida com sucesso!",
		});
	} catch (error) {
		console.error(error);
		return res.status(400).send({
			error: true,
			message: "Não foi possível remover a inscrição!",
		});
	}
});

module.exports = router;
