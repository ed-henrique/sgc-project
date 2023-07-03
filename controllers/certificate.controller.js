const crypto = require("crypto");
const { User } = require("../models/index.js");
const { Course } = require("../models/index.js");

class CertificateController {
	constructor(CertificateModel) {
		this.certificate = CertificateModel;
	}

	async readByUserId(id) {
		const certificates = await this.certificate.findAll({ where: { UserId: id }, include: Course });

		if (!certificates) throw new Error("Inscrições não encontradas!");

		return certificates;
	}

	async readByCode(code) {
		const certificate = await this.certificate.findOne({ where: { code: code }, include: [ Course, User ]});
		return certificate;
	}

	async create(certificate) {
		let certificateExists = [0];
		let newCode = "a";
		
		while (certificateExists !== null) {
			newCode = crypto.randomBytes(20).toString("hex");

			certificateExists = await this.certificate.findOne({
				where: { code: newCode },
			});
		}

		if (!certificateExists) {
			await this.certificate.create({ ...certificate, code: newCode });
		} else {
			throw new Error("Certificado já existe!");
		}
	}
};

module.exports = CertificateController;
