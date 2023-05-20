export class CourseController {
  constructor(CourseModel) {
    this.course = CourseModel;
  }

  async getAll() {
    const courses = await this.course.findAll();
    return courses;
  }

  async adicionar(courseDTO) {
    try {
      console.log(courseDTO);
      await this.course.create(courseDTO);
    } catch (error) {
      console.log(error);
    }
  }
}
