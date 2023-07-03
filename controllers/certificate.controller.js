class CertificateController {
	constructor(CertificateModel) {
		this.certificate = CertificateModel;
	}

	async readByUserId(id) {
		const certificates = await this.certificate.findAll({ where: { UserId: id }});

		if (!certificates) throw new Error("Inscrições não encontradas!");

		return certificates;
	}

	async readById(id) {
		const certificate = await this.certificate.findByPk(id);

		if (!certificate) throw new Error("Certificado não encontrado!");

		return certificate;
	}

	async create(certificate) {
		const certificateExists = await this.certificate.findOne({
			where: { code: certificate.code },
		});

		if (!certificateExists) {
			await this.certificate.create(certificate);
		} else {
			throw new Error("Certificado já existe!");
		}
	}
};

module.exports = CertificateController;
