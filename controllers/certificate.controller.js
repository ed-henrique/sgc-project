class CertificateController {
	constructor(CertificateModel) {
		this.certificate = CertificateModel;
	}

	async readAll() {
		const certificates = await this.certificate.findAll();

		if (!certificates) throw new Error("Não há certificados!");

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

	async delete(id) {
		await this.certificate.destroy({ where: { id } });
	}
};

module.exports = CertificateController;
