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

router.get("/check", async (req, res) => {
	const code = req.query.code;

	if (code) {
		const certificate = await certificateController.readByCode(code);

		if (certificate) {
			return res.render("check_certificate", { title: "Check Certificate", certificate: certificate });
		}

		return res.render("check_certificate", { title: "Check Certificate", code: "false" });
	}

	return res.render("check_certificate", { title: "Check Certificate" });
});

module.exports = router;
