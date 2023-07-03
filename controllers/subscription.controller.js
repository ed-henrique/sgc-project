const { Op } = require("sequelize");
const { User } = require("../models/index.js");

class SubscriptionController {
	constructor(SubscriptionModel) {
		this.subscription = SubscriptionModel;
	}

	async readByUserId(id) {
		const subscriptions = await this.subscription.findAll({where: { UserId: id }});

		if (!subscriptions) throw new Error("Inscrições não encontradas!");

		return subscriptions;
	}

	async readByCourseId(id) {
		const subscriptions = await this.subscription.findAll({
			attributes: ["id", "status", "UserId", "CourseId"],
			where: { CourseId: id },
			include: User,
		});

		if (!subscriptions) throw new Error("Inscrições não encontradas!");

		subscriptions.forEach(async subscription => {
			subscription.User.image = `data:${subscription.User.imageMimeType};base64,${btoa(subscription.User.image.reduce((data, byte) => data + String.fromCharCode(byte), ""))}`;
		});

		return subscriptions;
	}

	async create(subscription) {
		const subscriptionExists = await this.subscription.findOne({
			where: { [Op.and]: [
				{
					UserId: subscription.UserId
				},
				{
					CourseId: subscription.CourseId
				}
			]},
		});

		if (!subscriptionExists) {
			await this.subscription.create(subscription);
		} else {
			throw new Error("Inscrição já existe!");
		}
	}

	async update(userId, courseId, data) {
		const subscriptionExists = await this.subscription.findOne({ where: { UserId: userId, CourseId: courseId }, attributes: ["id"] });

		if (subscriptionExists) {
			await this.subscription.update(data, { where: { id: subscriptionExists.id } });
		} else {
			throw new Error("Inscrição não existe!");
		}
	}

	async delete(id) {
		await this.subscription.destroy({ where: { id } });
	}
};

module.exports = SubscriptionController;
