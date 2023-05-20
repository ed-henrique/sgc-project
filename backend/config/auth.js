import "../dotenv.js";

export const auth = {
  secret: process.env.SECRET,
  expireIn: "6h",
};
