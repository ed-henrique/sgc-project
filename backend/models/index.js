import { DataTypes } from "sequelize";
import sequelize from "../config/sequelize.js";
import Course from "./course.model.js";
import User from "./user.model.js";
import Certificate from "./certificate.model.js"; 
import Category from "./category.model.js"; 
import CourseCategory from "./course_category.model.js"; 
import Subscription from "./subcription.model.js";

export const course = Course(sequelize, DataTypes);
export const user = User(sequelize, DataTypes);
export const certificate = Certificate(sequelize, DataTypes);
export const category = Category(sequelize, DataTypes);
export const courseCategory = CourseCategory(sequelize);
export const subscription = Subscription(sequelize);

