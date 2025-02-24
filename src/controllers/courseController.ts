import { Response } from "express";
import { Request } from "express";
import Course from "../models/courseModel";
import { ExportFormat } from "@aws-sdk/client-dynamodb";

const listCourses = async (req: Request, res: Response): Promise<void> => {
  const { category } = req.query;

  try {
    const courses =
      category && category !== "all"
        ? await Course.query("category").eq(category).exec()
        : await Course.scan().exec();

    res.json({ message: "Courses fetched successfully", data: courses });
  } catch (error) {
    res.status(500).json({ message: "Error fetching courses", error });
  }
};
const getCourse = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const course = Course.get(id);

    if (!course) {
      res.status(404).json({ message: "Course not found" });
    }

    res.json({ message: "Course fetched successfully", data: course });
  } catch (error) {
    res.status(500).json({ message: "Error fetching course", error });
  }
};

export { listCourses, getCourse };
