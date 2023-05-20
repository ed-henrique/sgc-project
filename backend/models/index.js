import { Sequelize } from "sequelize";
import sequelize from "../config/sequelize.js";
import Course from "./course.model.js";
import User from "./user.model.js";
import Certificate from "./certificate.model.js"; 
import Category from "./category.model.js"; 
import CourseCategory from "./course_category.model.js"; 
import Subscription from "./subcription.model.js";

export const course = Course(sequelize, Sequelize.DataTypes);
export const user = User(sequelize, Sequelize.DataTypes);
export const certificate = Certificate(sequelize, Sequelize.DataTypes);
export const category = Category(sequelize, Sequelize.DataTypes);
export const courseCategory = CourseCategory(sequelize);
export const subscription = Subscription(sequelize);

