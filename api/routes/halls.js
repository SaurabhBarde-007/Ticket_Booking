import express from "express";
import {
  createHall,
  deleteHall,
  getHall,
  getHalls,
  updateHall,
  updateHallAvailability,
} from "../controllers/hall.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();
//CREATE
router.post("/:hotelid", verifyAdmin, createHall);

//UPDATE
router.put("/availability/:id", updateHallAvailability);
router.put("/:id", verifyAdmin, updateHall);
//DELETE
router.delete("/:id/:hotelid", verifyAdmin, deleteHall);
//GET

router.get("/:id", getHall);
//GET ALL

router.get("/", getHalls);

export default router;
