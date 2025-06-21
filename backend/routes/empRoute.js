import express from "express";
import { empList } from "../controllers/empController.js";

const empRouter = express.Router()

empRouter.get('/list', empList)

export default empRouter