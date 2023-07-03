const { Router } = require("express");
const auth = require("../middlewares/auth.js");

const { Certificate } = require("../models/index.js");
const CertificateController = require("../controllers/certificate.controller.js");

const router = Router();
const certificateController = new CertificateController(Certificate);

router.get("/", auth("student"), async (req, res) => {
	const id = req.userId;
	const name = req.username;
	const role = req.userRole;

	const certificates = await certificateController.readByUserId(id);

	return res.render("certificates", { title: "Certificates", username: name, role: role, active_nav: "certificates", certificates: certificates });
});


router.get("/emit/:id", auth("student"), async (req, res) => {
	try {
		const id = req.params.id;
		await certificateController.emit(id);

		res.redirect("/certificates");
	} catch (error) {
		console.error(error);
		res.redirect("/certificates");
	}
});

module.exports = router;
