require("../dotenv.js");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");

roles = {
	"root": 0,
	"admin": 1,
	"student": 2,
}

module.exports = (role) => async (req, res, next) => {
	const token = req.cookies.jwt;

	if (!token) {
		return res.redirect("/users/login");
	}

	try {
		const decoded = await promisify(jwt.verify)(token, process.env.SECRET ?? "Oi");

		if (!decoded) {
			return res.redirect("/users/login");
		}

		if (decoded.role !== "root" && (!roles[role] || roles[decoded.role] > roles[role])) {
			return res.redirect("/");
		}

		req.userId = decoded.id;
		req.userRole = decoded.role;
		req.username = decoded.name;
		
		return next();
	} catch (error) {
		console.error(error);
		return res.redirect("/users/login");
	}
};
